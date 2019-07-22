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
  }
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { email: this.email, userId: this._id },
    config.get("jwtPrivateKey")
  );
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
