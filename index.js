const MONGODB_URI = "mongodb://localhost/shop_api";
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

//ROUTES
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

require("./startup/validation")();

const app = express();
app.use(cors());

app.use(express.json());

app.use("/shop", shopRoutes);
app.use(authRoutes);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to mongoDb");
    app.listen(3002);
  })
  .catch(err => console.log(err));
