const { Product, validateProduct } = require("../models/product");
const { Restaurant, validateRestaurant } = require("../models/restaurant");

exports.getProducts = (req, res, next) => {
  console.log(req.user);
  Product.find()
    .then(products => {
      res.status(200).json({
        message: "Products fetched sucessfully",
        products
      });
    })
    .catch(err => console.log(err));
};

exports.createProduct = (req, res, next) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const name = req.body.name;
  const description = req.body.description;

  const product = new Product({
    name,
    description,
    userId: req.user.userId
  });

  product
    .save()
    .then(result => {
      res.status(201).json({
        message: "Product created successfully",
        product
      });
    })
    .catch(err => console.log(err));
};

exports.getRestaurants = (req, res, next) => {
  Restaurant.find().then(restaurants => {
    res.status(200).json(restaurants);
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
  const product = await Product.findById(prodId);
  const user = await User.findById(req.user.userId);
  await user.addToCart(product);
};
