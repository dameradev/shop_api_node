const express = require("express");
const router = express.Router();
const isAuth = require("../middleware/is-auth");

const productController = require("../controllers/product");

router.get("/", isAuth, productController.getProducts);

router.post("/create-product", isAuth, productController.createProduct);

module.exports = router;
