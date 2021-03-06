const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const config = require("config");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
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
    ],
    totalPrice: { type: Number, default: 0 }
  }
});

userSchema.methods.generateAuthToken = function() {};

userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

const User = mongoose.model("User", userSchema);

const validateUser = function validateUser(user) {
  const Schema = {
    name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .email()
      .required(),
    password: Joi.string()
      .min(6)
      .max(1024)
      .required()
  };

  return Joi.validate(user, Schema);
};
exports.User = User;
exports.validateUser = validateUser;

// userSchema.methods.addToCart = function(product) {
//   if (this.cart.items.indexOf(product === -1)) {
//     this.cart.items.push({
//       productId: product._id,
//       quantity: 1
//     });
//   } else {
//     const cartProductIndex = this.cart.items.findIndex(cartProduct => {
//       cartProduct.productId.toString() === product._id.toString();
//     });
//     this.cart.items[cartProductIndex].quantity += 1;
//   }
// };
