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
   res.status(404).send("Data saknas");
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
 
//uppdaterar Update
app.put("/products/:id", bodyParser.json(), (req, res) => {
 products = products.map((product) => {
   if (product.product === req.params.id) {
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
 
//tar bort
app.delete("/products/:id", (req, res) => {
 products = products.filter((product) => product.id !== req.params.id);
 save();
 res.json({
   status: "success",
   removed: req.params.id,
   newLength: products.length,
 });
});
 
 
// app.delete("/products/:id", (req, res) => {
 
//     const { id } = rec.params;
 //     products = products.filter((product) => product.id !== id);
 //     res.send ("Bok med id ${id} raderad.")
//   });
 
 
/// old version
// const express = require("express");
 
// const app = express();
 
// //hämtar alla produkter
// app.get("/api/products", (rec, res) => {
//  res.status(200).send("Produkter från json");
 
// //  fetch('/products.json')
// // .then(res => res.json())
// // .then(console.log);
 
// })
 
// //hämtar en produkt
// app.get("/api/products/:id", (rec, res,  ) => {
//  res.status(200).send("Här är en specifik produkt med id" + rec.params.id);
// });
 
// app.post("/api/products", (rec, res,  ) => {
//  res.status(201).json(rec.body);
// });
 
// app.listen(3000,() => console.log ("Server is up!"));
 
// // fetch ('http://localhost:3000/api/products')
