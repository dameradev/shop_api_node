const MONGODB_URI = "mongodb://localhost/shop_api";
const mongoose = require("mongoose");
const express = require("express");

//ROUTES
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.use("/products", productRoutes);
app.use(authRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongoDb");
    app.listen(3000);
  })
  .catch(err => console.log(err));
