# SKU check project

Checking SKU based on transaction json and stock json 

IF sku is not present in stock json it should return 0, qty calculated based on refund and order stocks in transactions  json 

If in transactions file type is refund we are adding the qty in stocks and if the type is order then we are reducing the qty

Example URL : 
http://localhost:3000/?sku=LTV719449/39/39, 
result data : {"message":"Available Stocks","data":{"sku":"LTV719449/39/39","qty":8510}}

### Features

- Minimal
- TypeScript v4
- Testing with Jest
- Linting with Eslint and Prettier
- Pre-commit hooks with Husky
- VS Code debugger scripts
- Local development with Nodemon

### Scripts

#### `npm run start:dev`

Starts the application in development using `nodemon` and `ts-node` to do hot reloading.

#### `npm run start`

Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `build/index.js`.

#### `npm run build`

Builds the app at `build`, cleaning the folder first.

#### `npm run test`

Runs the `jest` tests once.

#### `npm run test:dev`

Run the `jest` tests in watch mode, waiting for file changes.

#### `npm run prettier-format`

Format your code.

#### `npm run prettier-watch`

Format your code in watch mode, waiting for file changes.
