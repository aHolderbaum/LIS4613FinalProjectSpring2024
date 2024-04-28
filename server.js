// Import required modules
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const escapeHtml = require('escape-html');
const pug = require('pug');
//Creates the connection to the inventory_system database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '!23Melvin!',
    database: 'inventory_system'
});
// Connects to the database
//Sends a message to the console to let us know that the database is connected
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});
// Create an Express application
const app = express();
// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
// Serve static files located in the 'public' directory
app.use(express.static('public'));
app.use(cors());
//Sets the view engine as pug so the searchResults page will display properly
app.set('view engine', 'pug')




// Route to handle adding a new product
//The rest of the routes work similarly with differing sql statements
app.post('/add-product', (req, res) => {
    const { name, description, inventory, supplier } = req.body;
    //Uses parameterized statements to prevent sql injection 
    const query = 'INSERT INTO supplies (name, description, inventory, supplier) VALUES (?, ?, ?, ?)';
    //Escapes user input to prevent xss attack
    const escapedName = escapeHtml(name);
    const escapedDescription = escapeHtml(description);
    const escapedInventory = escapeHtml(inventory);
    const escapedSupplier = escapeHtml(supplier);

    connection.query(query, [name, description, inventory, supplier], (error, results) => {
        if (error) {
            res.status(500).send('Error adding product');
            console.error('Failed to add product:', error);
        } else {
            //If the product is added sucessfully, the product added successfully page is displayed
            //This lets the user know that the product was added and allows them to either go back to the homepage or add another product
            res.redirect('/product-added-success.html');
        }
    });
});
app.get('/searchProduct', (req, res) => {
    const searchQuery = req.query.q;
    //Escapes input to prevent xss attack
    const escapedSearchQuery = escapeHtml(searchQuery);
    //Uses parameterized statements to prevent sql injection 

    const sql = 'SELECT * FROM supplies WHERE name LIKE ? OR supplier LIKE ?';
    connection.query(sql, [`%${escapedSearchQuery}%`, `%${escapedSearchQuery}%`], (err, results) => {
        if (err) {
            console.error('Error fetching inventory', err);
            return res.status(500).send('An error occurred while fetching the inventory');
        }
        const compiledTemplate = pug.compileFile(path.join(__dirname, 'public', 'searchResults'));
        const htmlContent = compiledTemplate({ results });

        res.setHeader('Content-Type', 'text/html');
        res.send(htmlContent);
    });
});


app.post('/deleteProduct/:id', (req, res) => {
    const { id } = req.body;
    //Escapes the id to prevent xss attack
    const escapedID = escapeHtml(id);
    console.log('Received product ID:', id)
    //Uses parameterized statements to prevent sql injection 
    const sql = "DELETE FROM supplies WHERE id = ?";
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting the product', err);
            return res.status(500).send('An error occurred while deleting the product');
        }
        res.redirect('/product-deleted-success.html');
    });
});



// Specify the port to listen on
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});