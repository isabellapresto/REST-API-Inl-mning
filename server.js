const express = require("express");
 
const app = express();
 
app.listen(3000, () => {
 console.log(`Array med böcker http://localhost:3000/products`);
});
 
const bodyParser = require("body-parser"); //denna annars crashar det
 
let products = require("./products.json");
 
//alla produkter Get KLAR
app.get("/products", (req, res) => {
 res.json(products);
});
 
// plockar ut ett id KLAR
app.get("/products/:id", (req, res) => {
 let findProduct = products.find((product) => product.id === (req.params.id));
 if (!findProduct) {
   res.status(404).send("Data saknas"); //bara här?
 } else {
   res.json(findProduct);
}});
 
//skapar ny produkt Create KLAR
app.post("/products", bodyParser.json(), (req, res) => {
  products.push(req.body);
  save();
  res.json({
    status: "success",
    productInfo: req.body,
  });
 });
 //////////////////////////////PUT/////////////////////////////////////////////


 
//uppdaterar Update-bra
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
 
//tar bort KLAR
app.delete("/products/:id", (req, res) => {
 products = products.filter((product) => product.id !== req.params.id);
 save();
 res.json({
   status: "success",
   removed: req.params.id,
   newLength: products.length,
 });
});
 
 