// Import the mysql module
const mysql = require('mysql');

// Creates a connection to the database
const connection = mysql.createConnection({
    host: 'localhost',      
    user: 'root',            
    password: 'yourPasswordHere',            
    database: 'inventory_system'  
});

//Creates the database if it does not exist and connects to it
connection.connect(error => {
    if (error) throw error;

    connection.query("CREATE DATABASE IF NOT EXISTS inventory_system", function (err, result) {
        if (err) throw err;
        console.log("Database created!");
    });

    console.log('Successfully connected to the database.');
});
//Creates the supplie table if it does not exist
// id is an auto incremented primary key that will be used to keep track of the items
// name holds up to 255 characters and is intended to store the name of the product
// description holds up to 255 characters and is intended to store a short description of the product
// inventory holds a number between 0 and 65535 and is used to hold how many of a product is in stock
// supplier holds up to 255 characters and is used to hold the name of the company that supplies the product
// In a more elaborate system, supplier would likely connect to another database that holds contact information on each supplier
function createSuppliesTable() {
    const sql = "CREATE TABLE  supplies  IF NOT EXISTS (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, inventory SMALLINT, supplier VARCHAR(255))";
  
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Supplies table created");
    });
  }
  createSuppliesTable();
//Adds example data into the supplies table. 
//This allows for testing of the inventory system without having to enter all the data through the add product page
  function insertIntoSupplies(){
    var sql = "INSERT INTO supplies (name, description, inventory, supplier) VALUES (?, ?, ?, ?);";
    var values = [
        ['Ice Cream', 'Assorted Flavors of Ice Cream. Quart sized', 7, 'Blue Bell'],
        ['Milk', '1 Gallon of whole milk', 10, 'Hiland Dairy'],
        ['Cheese', '1/2 lb block of cheddar cheese', 3, 'Hiland Dairy'],
        ['Eggs', 'Dozen Eggs', 4, 'Hiland Dairy'],
        ['Oranges', '1 Pound Oranges', 1, 'LIS CO.'],
        ['Apples', '1 Pound Apples', 5, 'LIS CO.'],
        ['Onions', '1 Pound Onions', 8, 'LIS CO.'],
        ['Carrots', '1/2 Pound Carrots', 3, 'LIS CO.'],
        ['Potatoes', '1 Pound Potatoes', 9, 'LIS CO.'],
        ['Bread', '1 loaf bread', 4, 'DGES Bakery']
];
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Data Added to Supplies Table");
      });
  }
  InsertIntoSupplies();
  
// Export the connection for use in other parts of the application
module.exports = connection;


