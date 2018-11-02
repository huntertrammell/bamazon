//application dependencies 
require("dotenv").config();
const key = require("./key");
const mysql = require('mysql')
const inquirer = require('inquirer')
const columnify = require('columnify')
const chalk = require('chalk')
//color scheme
const list = chalk.white
const heading = chalk.bold.inverse
const selection = chalk.green
const question = chalk.blue
const error = chalk.red

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    // Your username from .env file
    user: 'root',

    // Your password from .env file
    password: key.mySQL.password,

    database: "bamazon_db"
});

const columns = []
const productNameArr = []
const productIDArr = []
const purchaseAmntArr = []

connection.connect(function(err) {
    if (err) throw err;
    console.log(heading('\nWelcome to my store, below you will see a list of all items available for purchase.\n'))
    listAllItems();
});
  
function listAllItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for(i=0;i<res.length;i++){
            const newColumn = {
                    'ID': res[i].item_id,
                    'NAME': res[i].product_name,
                    'PRICE': `$${res[i].price}`,
                    'QTY': res[i].stock_quantity
                }
            columns.push(newColumn)    
        }
        const allItems = columnify(columns, {columnSplitter: ' | '})
        console.log(list(allItems+'\n'))
        prodSelect()
    });
}

function prodSelect() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: question('Please type the ID of the product you wish to purchase')
        }
    ]).then(product => {
        for (i=0;i<columns.length;i++){
            productIDArr.push(parseInt(columns[i].ID))
        }
        const productID = parseInt(product.id)
        if (productIDArr.includes(productID)){
            productIDArr.splice(0,productIDArr.length)
            productIDArr.push(productID)
            productNameArr.push(columns[productID -1].NAME)
            qtySelect()
        } else {
            console.log(error('Item ID does not exist\n'))
            productIDArr.shift()
            prodSelect()
        }
    })
}

function qtySelect(){
    const productName = productNameArr[0]
    inquirer.prompt([
        {
            type: 'input',
            name: 'qty',
            message: question(`Please type how many ${productName}'s you would like to purchase`)
        }
    ]).then(product => {
        const currentID = parseInt(productIDArr)
        const currentStock = parseInt(columns[currentID -1].QTY)
        const purchaseAmnt = parseInt(product.qty)
        if (purchaseAmnt <= currentStock){
            console.log(selection(`\n${purchaseAmnt} ${productName}'s have been added to your cart!\n`))
            purchaseAmntArr.push(parseInt(purchaseAmnt))
            checkout()
        } else if (purchaseAmnt > currentStock) {
            console.log(error(`There are not enough units to meet your request. We currently have ${currentStock} units available.\n`))
            qtySelect()
        } else {
            console.log(error(`${product.qty} is not a valid entry please try again.\n`))
            qtySelect()
        }
    })
}

function checkout(){
    const currentID = parseInt(productIDArr)
    const currentStock = parseInt(columns[currentID -1].QTY)
    const priceFormat = columns[currentID-1].PRICE.substring(1)
    const basePrice = parseFloat(priceFormat)
    const multiplier = purchaseAmntArr[0]
    const total = basePrice * multiplier
    const newStockQTY = currentStock - multiplier
    connection.query("UPDATE products SET ? WHERE ?",[
        {
            stock_quantity: newStockQTY
        },
        {
            item_id: currentID
        }
    ], function(err, res) {
        if (err) throw err;
        console.log(selection(`Your total today comes to $${total}.\n\nThank You for Shopping`))
        connection.end()
    })
}