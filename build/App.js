"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stock_json_1 = __importDefault(require("./task_files/stock.json"));
const transactions_json_1 = __importDefault(require("./task_files/transactions.json"));
class App {
    constructor() {
        this.express = (0, express_1.default)();
        this.mountRoutes(stock_json_1.default, transactions_json_1.default);
    }
    find(array, string) {
        return array.reduce((r, o) => {
            if (Object.values(o).some(v => v === string)) {
                r.push(o);
                return r;
            }
            if (Array.isArray(o.sku)) {
                var sku_1 = this.find(o.sku, string);
                if (sku_1.length)
                    r.push(Object.assign({}, o, { sku_1 }));
            }
            return r;
        }, []);
    }
    getQuantity(array, totalquantity) {
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (element.type === 'order') {
                totalquantity -= parseInt(element.qty);
            }
            if (element.type === 'refund') {
                totalquantity += parseInt(element.qty);
            }
        }
        return totalquantity;
    }
    mountRoutes(stock, transactions) {
        const router = express_1.default.Router();
        router.get('/', (req, res) => {
            const param = req.query.sku;
            const getStockData = this.find(stock, param);
            const getTranData = this.find(transactions, param);
            const sku = req.query.sku;
            let calculateQty = 0;
            if (getStockData.length > 0) {
                calculateQty = this.getQuantity(getTranData, getStockData[0].stock) || 0;
            }
            res.json({
                message: 'Available Stocks', data: { sku: sku, qty: calculateQty }
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
