const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

const shopController = require("../controllers/shop");

router.get("/foods", shopController.getFoods);

router.post("/create-food", shopController.createFood);

router.get("/restaurants", shopController.getRestaurants);

router.get("/restaurants/:id", shopController.getRestaurant);

router.post("/create-restaurant", shopController.createRestaurant);

module.exports = router;
