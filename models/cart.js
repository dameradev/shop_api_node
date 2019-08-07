const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");
const deepPopulate = require("mongoose-deep-populate")(mongoose);
const cartSchema = new Schema({
  cart: {
    items: [
      {
        foodId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food"
          // required: true
        },
        quantity: {
          type: Number
          // required: true
        },
        restaurantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Restaurant"
          // required: true
        }
      }
    ]
  }
});
cartSchema.plugin(deepPopulate);
const cart = mongoose.model("Cart", cartSchema);

exports.Cart = cart;
