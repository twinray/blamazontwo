
// how to work with mysql and npm
//$ npm install mysql
// make sure we do a version of the below down below
//var mysql      = require('mysql');
//var connection = mysql.createConnection({
 // host     : 'localhost',
  //user     : 'me',
  //password : 'secret',
  //database : 'my_db'
//});
 
connection.connect();
 
connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});
 
connection.end();


var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    //  username
    user: "root",
    //  password
    password: "888Locative",
    //database in mysql
    database: "bamazon_DB",
    charset: 'utf8'
});
//instantiate table 
// var table = new Table({
//     head: ['TH ID','TH Product','TH Department','TH Price','TH Stock'],
//     colWidths:[100,300,300,100,100]
// });

//connecting to mysqlDB b/amazonDB

connection.connect(function(err){
    if(err) throw err;
    console.log("connected as id : " + connection.thread + "\n");
    displayProductList();
});


function displayProductList(){
    let sql = 'SELECT * FROM products WHERE item_id BETWEEN 1 AND 10';
    
    connection.query(sql, (err,res,cols)=>{
        if(err) throw err;
        console.log("Items for sale bamazon : ");

       // console.log(res);
        for(var i = 0; i < res.length ; i ++){
            // table.push(
            //     [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
            // );
            console.log("\n =====================================");
            console.log("ID : " + res[i].item_id);
            console.log("Product : " + res[i].product_name);
            console.log("Department :" + res[i].department_name);
            console.log("Price : " + res[i].price);
            console.log("Stock : " + res[i].stock_quantity);
        }
        customerChoice();
    });
}
// i have to have up to ten according to directions
function customerChoice(){
    console.log("Purchase below..");
    inquirer.prompt([{        
        name: "product",        
        message: "What product would you like? Put your ID below...",
        type: "list",
        choices: ["1","2","3","4","5","6","7","8","9","10"]
    },{
        name: "unit",
        message: "How many units ?"
    }
    ]).then(function(answers){
        let productID = answers.product;
        let unitAmt = answers.unit;
        console.log("\nThis is the product ID : " + productID);
        console.log("This is how many units you can buy : " + unitAmt);

        searchProducts(productID, unitAmt);
       
    });
}
function searchProducts(productID, unitAmt){
    let sql = "SELECT product_name, stock_quantity, price FROM products WHERE ?";
    
    connection.query(sql, {item_id: productID}, function(err,res){
        console.log(res);       
        let existingAmt = res[0].stock_quantity;
        let unitPrice = res[0].price;

        if(unitAmt > existingAmt){
           console.log("The " + res[0].product_name + "  is a insufficient quantity!");
           console.log("Thank you come again... ");
           displayProductList();
        }else{
            updateProducts(unitAmt, existingAmt, productID, unitPrice);

        }
    });
    
}
function  updateProducts(unitAmt,existingAmt,productID,unitPrice) {
    console.log("Submitting your order...");
    let newAmt = (existingAmt-unitAmt);
    let customerPrice = (unitAmt * unitPrice);
    
    connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
              stock_quantity: newAmt
          },
          {
            item_id: productID
          }
        ], function(err,res){
            if (err) throw err;
            console.log(" Order has been processed...");
            console.log(res.affectedRows + " Existing amount..")
        }
    );
    console.log("This is how much you paid $ " + customerPrice);
    console.log("The amount left of the product " + newAmt);
    connection.end();
}

