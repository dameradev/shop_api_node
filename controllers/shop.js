const { Food, validateFood } = require("../models/food");
const { Restaurant, validateRestaurant } = require("../models/restaurant");

exports.getFoods = (req, res, next) => {
  console.log(req.user);
  Food.find()
    .then(foods => {
      res.status(200).json({
        message: "Foods fetched sucessfully",
        foods
      });
    })
    .catch(err => console.log(err));
};

exports.createFood = (req, res, next) => {
  const { error } = validateFood(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const name = req.body.name;
  const description = req.body.description;

  const food = new Food({
    name,
    description,
    userId: req.user.userId
  });

  food
    .save()
    .then(result => {
      res.status(201).json({
        message: "Food created successfully",
        food
      });
    })
    .catch(err => console.log(err));
};

exports.getRestaurants = (req, res, next) => {
  Restaurant.find().then(restaurants => {
    res.status(200).json(restaurants);
  });
};

exports.getRestaurant = (req, res, next) => {
  const restaurantId = req.params.id;
  Restaurant.findById(restaurantId).then(restaurant => {
    res.status(200).json(restaurant);
  });
};

exports.createRestaurant = (req, res, next) => {
  const { error } = validateRestaurant(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const name = req.body.name;
  const img = req.body.img;
  const workTime = req.body.workTime;

  const restaurant = new Restaurant({
    name,
    img,
    workTime
  });

  restaurant
    .save()
    .then(result => {
      res
        .status(200)
        .json({ message: "Restaurant created successfully", restaurant });
    })
    .catch(err => console.log(err));
};

exports.postAddToCart = async (req, res, next) => {
  const prodId = req.body.prodId;
  const food = await Food.findById(prodId);
  const user = await User.findById(req.user.userId);
  await user.addToCart(food);
};
