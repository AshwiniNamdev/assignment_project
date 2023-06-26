import express from 'express'
import stock from './task_files/stock.json'
import transactions from './task_files/transactions.json'

class App {
  public express
  constructor () {
    this.express = express()
    this.mountRoutes(stock, transactions)
  }

  private find(array:any, string:any) {
    return array.reduce((r:any, o:any) => {
        if (Object.values(o).some(v => v === string )) {
            r.push(o);
            return r;
        }
        if (Array.isArray(o.sku)) {
            var sku_1 = this.find(o.sku, string);
            if (sku_1.length) r.push(Object.assign({}, o, { sku_1 }));
        }
        return r;
    }, []);
  }

  private getQuantity(array:[] ,totalquantity:number){
    for (let index = 0; index < array.length; index++) {
        const element:any = array[index];
        if(element.type === 'order'){
            totalquantity -= parseInt(element.qty)
        }
        if(element.type === 'refund'){
            totalquantity += parseInt(element.qty)
        }
    }
   return totalquantity
  }

  private mountRoutes (stock: { sku: string; stock: number }[],transactions: { sku: string; type: string; qty: number }[]): void {
    const router = express.Router()
    router.get('/', (req, res) => {
      const param = req.query.sku;
      const getStockData = this.find(stock,param)
      const getTranData = this.find(transactions,param)
      const sku = req.query.sku
      let calculateQty = 0
      if(getStockData.length > 0){
          calculateQty = this.getQuantity(getTranData,getStockData[0].stock) || 0
      }
      res.json({
        message: 'Available Stocks', data: {sku: sku, qty: calculateQty}
      })
    })
    this.express.use('/', router)
  }
}

export default new App().express
