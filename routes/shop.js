const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

const shopController = require("../controllers/shop");

router.get("/foods/:id", shopController.getFoods);

router.post("/create-food", shopController.createFood);

router.get("/restaurants", shopController.getRestaurants);

router.get("/restaurants/:id", shopController.getRestaurant);

router.post("/create-restaurant", shopController.createRestaurant);

router.post("/add-to-cart", shopController.addToCart);

router.get("/get-cart", shopController.getCart);
router.get("/status", shopController.getCartStatus);

module.exports = router;
