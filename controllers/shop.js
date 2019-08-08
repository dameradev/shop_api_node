const { Food, validateFood } = require("../models/food");
const { Restaurant, validateRestaurant } = require("../models/restaurant");
const mongoose = require("mongoose");
const { Cart } = require("../models/cart");

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
  console.log(req.body);
  const restaurantId = mongoose.Types.ObjectId(req.body.restaurantId);

  const food = new Food({
    name,
    description,
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
  // throw new Error("SHIT NIGGA");
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
      console.log(restaurant);
      restaurant.rating.stars = req.body.stars;
      return restaurant.save();
    })
    .then(result => {
      console.log(result);
    });
};

exports.getCartStatus = (req, res, next) => {
  Cart.findOne()
    .then(cart => {
      console.log(cart.cart);
      res.status(200).json(cart.cart);
    })
    .catch(err => console.log(err));
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
  // console.log(req.body);
  const recievedItems = req.body[0];
  let cart = await Cart.findOne();
  if (!cart) {
    cart = new Cart({
      cart: {
        items: recievedItems
      }
    });
  } else {
    cart.cart.items = req.body;
    // cart.cart.items.forEach((cp, index) => {
    //   cp.quantity = req.body[index].quantity;
    // });
  }

  // const cartItems = [...cart.cart.items];
  // // console.log(cartItems);
  // const cartItemIndex = cartItems.findIndex(cp => {
  //   return cp["foodId"].toString() === recievedItems.foodId.toString();
  // });

  // console.log(cartItemIndex, "cartITEM INDEXX");
  // console.log("recitems", recievedItems);
  // if (cartItemIndex < 0) {
  //   cartItems.push({
  //     foodId: recievedItems.foodId,
  //     quantity: recievedItems.quantity,
  //     restaurantId: recievedItems.restaurantId
  //   });
  // } else {
  //   cartItems[cartItemIndex].quantity += 1;
  // }

  // console.log(cartItems);
  // console.log(cart.cart.items);
  // cart.cart.items = cartItems;
  cart.save().then(result => {
    res.send(result);
  });
};

exports.postAddToCart = async (req, res, next) => {
  const prodId = req.body.prodId;
  const food = await Food.findById(prodId);
  const user = await User.findById(req.user.userId);
  await user.addToCart(food);
};
