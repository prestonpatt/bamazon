var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    createTable();
})

var createTable = function () {
    connection.query("SELECT * FROM products", function (err, res) {
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Price', 'Stock'],
            colWidths: [10, 45, 15, 10],
        });
        for (var i = 0; i < res.length; i++) {
            table.push([res[i].item_id, res[i].product_name, "$" + res[i].price, + res[i].stock_quantity]);
        }
        console.log(table.toString());
        start(res);
    })
}

var start = function (res) {
    inquirer
        .prompt([
            {
                name: "choice",
                type: "input",
                message: "Type the Item ID number you'd like to purchase or E to exit the purchase."
            }])
        .then(function (answer) {
            if (answer.choice === "E") {
                process.exit();
            }
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id == answer.choice) {
                    var productID = answer.choice;
                    var id = i;
                    inquirer
                        .prompt({
                            type: "input",
                            name: "quantity",
                            message: "Enter the quantity you want to purchase.",
                            validate: function (value) {
                                if (isNaN(value) === false) {
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        })
                        .then(function (answer) {
                            if ((res[id].stock_quantity - answer.quantity) > 0) {
                                console.log(res)
                                connection.query("UPDATE products SET stock_quantity='" + (res[id].stock_quantity - answer.quantity) + "'WHERE item_id='" + productID + "'", function () {
                                    console.log("Order made, your total is $" + (answer.quantity * res[id].price) + ". Here's what's left to order.");
                                    createTable();
                                })
                            } else {
                                console.log("That's too much, please select a lower quantity.");
                                start(res);
                            }
                        })

                }
            }
        })
}
