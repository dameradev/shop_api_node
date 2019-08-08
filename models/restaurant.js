const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  workTime: {
    type: Date
    // required: true
  },
  rating: {
    stars: {
      type: Number
    }
  }
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

const validateRestaurant = function(restaurant) {
  const Schema = {
    name: Joi.string()
      .min(6)
      .max(255)
      .required(),
    img: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    workTime: Joi.date()
  };
  return Joi.validate(restaurant, Schema);
};

exports.Restaurant = Restaurant;
exports.validateRestaurant = validateRestaurant;
