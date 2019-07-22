const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
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

module.exports = mongoose.model("User", userSchema);
