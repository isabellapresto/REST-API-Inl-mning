const express = require("express");
 
const app = express();
 
app.listen(3000, () => {
  console.log(`Array med böcker http://localhost:3000/products`);
});
 
const bodyParser = require("body-parser"); 
 
let products = require("./products.json");
 
//GET - alla produkter 
app.get("/products", (req, res) => {
 res.json(products);
});
 
// GET - hämtar en spesifik produkt
app.get("/products/:id", (req, res) => {
 let findProduct = products.find((product) => product.id === (req.params.id));
 if (!findProduct) {
   res.status(404).send("Data saknas");
 } else {
   res.json(findProduct);
}});
 
//POST - skapar ny produkt 
app.post("/products", bodyParser.json(), (req, res) => {
  products.push(req.body);
  save();
  res.json({
    status: "success",
    productInfo: req.body,
  });
 });

// PUT - uppdaterar en produkt 
app.put("/products/:id", bodyParser.json(), (req, res) => {
  products = products.map((product) => {
    if (product.id === req.params.id) {
      return req.body;
    } else {
      return product;
    }
  });
  save();
  
  res.json({
    status: "success",
    productInfo: req.body,
  });
 });
 
const fs = require("fs");
 
//spara function
const save = () => {
 fs.writeFile(
   "./products.json",
   JSON.stringify(products, null, 2),
   (error) => {
     if (error) {
       throw error;
     }
   }
 );
};
 
//DELETE - tar bort en produkt
app.delete("/products/:id", (req, res) => {
 products = products.filter((product) => product.id !== req.params.id);
 save();
 res.json({
   status: "success",
   removed: req.params.id,
   newLength: products.length,
 });
});
 
 