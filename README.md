# Inventory System

Inventory system is a dynamic web application that uses node.js, express, and pug

## Set Up 

Use these commands to set up the environment for Inventory System

```bash
mkdir inventory-system
cd inventory-system
mkdir public
npm init -y
npm install express 
npm install mysql 
npm install body-parser
npm install cors
npm install path
npm install escape-html
npm install pug
node databaseInit.js
```

## File System Set Up

The following files should be contained in the public folder:
+ addProduct.html
+ deleteProduct.js
+ index.html
+ product-added-success.html
+ product-deleted-success.html
+ searchProduct.html
+ searchResults.pug
+ style.css

server.js and databaseInit.js need to be in the inventory-system folder but not in the public folder

## Running the Application

In order to run the application, navigate to the inventory-system folder and run server.js
```Bash
cd inventory-system
node server.js
```
Once the server is running, navigate to [http://localhost:3000/](http://localhost:3000/)

## License

[MIT](https://choosealicense.com/licenses/mit/)