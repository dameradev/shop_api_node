const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

const shopController = require("../controllers/shop");

router.get("/products", shopController.getProducts);

router.post("/create-product", shopController.createProduct);

router.get("/restaurants", shopController.getRestaurants);

router.post("/create-restaurant", shopController.createRestaurant);

module.exports = router;
