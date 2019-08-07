const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const foodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const food = mongoose.model("Food", foodSchema);

const validateFood = function(food) {
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
  return Joi.validate(food, Schema);
};

exports.Food = food;
exports.validateFood = validateFood;
