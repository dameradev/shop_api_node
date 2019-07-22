const { Product, validateProduct } = require("../models/product");

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

exports.postAddToCart = async (req, res, next) => {
  const prodId = req.body.prodId;
  const product = await Product.findById(prodId);
  const user = await User.findById(req.user.userId);
  await user.addToCart(product);
};
