const { Food, validateFood } = require("../models/food");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const mongoose = require("mongoose");
const { Cart } = require("../models/cart");
const Order = require("../models/order");
const { User } = require("../models/user");

exports.getAllFoods = (req, res, next) => {
  Food.find()
    .then(foods => {
      res.status(200).json(foods);
    })
    .catch(err => console.log(err));
};

exports.getFoods = (req, res, next) => {
  const restId = req.params.id;
  Food.find()
    .where({ restaurantId: restId })
    .then(foods => {
      res.status(200).json({
        message: "Foods fetched sucessfully",
        foods
      });
    })
    .catch(err => console.log(err));
};

exports.createFood = (req, res, next) => {
  // const { error } = validateFood(req.body);
  // if (error) return res.status(400).json({ message: error.details[0].message });
  const name = req.body.name;
  const description = req.body.description;
  const price = req.body.price;
  console.log(req.body);
  const restaurantId = mongoose.Types.ObjectId(req.body.restaurantId);

  const food = new Food({
    name,
    description,
    price,
    restaurantId
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

exports.rateRestaurant = (req, res, next) => {
  Restaurant.findById(req.body.restaurantId)
    .then(restaurant => {
      restaurant.rating.stars = req.body.stars;
      // restaurant.rating.review = req.body.review;
      return restaurant.save();
    })
    .then(result => {
      console.log(result);
    });
};

exports.getCartStatus = async (req, res, next) => {
  const user = await User.findById(req.params.userId);
  res.status(200).json(user.cart.items);
};

exports.getCart = (req, res, next) => {
  Cart.findOne()
    .deepPopulate("cart.items.foodId")
    .then(cart => {
      console.log(cart.cart);
      res.status(200).json(cart.cart);
    })
    .catch(err => console.log(err));
};

exports.addToCart = async (req, res, next) => {
  const user = await User.findById(req.body.userId);

  const foodItem = {
    foodId: req.body.foodId,
    quantity: 1,
    restaurantId: req.body.restaurantId
  };

  const food = await Food.findById(foodItem.foodId);

  user.cart.totalPrice += food.price;

  const index = user.cart.items.findIndex(
    foodItem => foodItem.foodId.toString() === req.body.foodId.toString()
  );

  if (index === -1) {
    user.cart.items.push(foodItem);
  } else {
    user.cart.items[index].quantity += 1;
  }

  await user.save();
  res.status(200).json(user.cart.items);
};

exports.postAddToCart = async (req, res, next) => {
  const prodId = req.body.prodId;
  const food = await Food.findById(prodId);
  const user = await User.findById(req.user.userId);
  await user.addToCart(food);
};

exports.getOrders = (req, res, next) => {
  Order.find()
    .then(orders => {
      res.status(200).json(orders);
    })
    .catch(error => {
      console.log(error);
    });
};

exports.createOrder = (req, res, next) => {
  // console.log(req.body);

  order = new Order({
    items: req.body.items,
    formData: {
      address: req.body.formData.address,
      name: req.body.formData.name
    }
  });

  order.save();
};
