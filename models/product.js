const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

const Product = mongoose.model("Product", productSchema);

const validateProduct = function(product) {
  const Schema = {
    name: Joi.string()
      .min(4)
      .max(255)
      .required(),
    description: Joi.string()
      .min(20)
      .max(1024)
      .required(),
    userId: Joi.objectId().required()
  };
  return Joi.validate(product, Schema);
};

exports.Product = Product;
exports.validateProduct = validateProduct;
