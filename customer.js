//application dependencies 
require("dotenv").config();
const key = require("./key");
const mysql = require('mysql')
const inquirer = require('inquirer')
const columnify = require('columnify')
const chalk = require('chalk')

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    // Your username from .env file
    user: 'root',

    // Your password from .env file
    password: key.mySQL.password,

    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    listAllItems();
});
  
function listAllItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        const columns = []
        for(i=0;i<res.length;i++){
            const newColumn = {
                    'ID': res[i].item_id,
                    'NAME': res[i].product_name,
                    'DEPARTMENT': res[i].department_name,
                    'PRICE': `$${res[i].price}`,
                    'IN-STOCK': res[i].stock_quantity
                }
            columns.push(newColumn)    
        }
        const allItems = columnify(columns, {columnSplitter: ' | '})
        console.log(allItems)
        connection.end()
    });
}
  