const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const authController = require("../controllers/auth");

router.post("/signup", authController.signup);
router.post("/login", authController.login);

module.exports = router;
