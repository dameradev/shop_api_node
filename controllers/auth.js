const { User, validateUser } = require("../models/user");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const _ = require("lodash");

// export shop_jwtPrivateKey=mySecureKey
exports.signup = async (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  let user = await User.findOne({ email });
  if (user)
    return res.status(400).json({ errorMessage: "Email aready exists" });

  const hashedPassword = await bcrypt.hash(password, 12);
  user = new User({
    name,
    email,
    password: hashedPassword
  });
  await user.save();

  let token = "";
  try {
    token = jwt.sign({ _id: user._id, email: user.email }, "secret", {
      expiresIn: "1h"
    });
  } catch (error) {
    console.log("ERROR==================>" + error);
  }

  res
    .header("x-auth-token", token)
    .status(201)
    .send(user.name, user.email, user._id);
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let isEqual;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User with that email doesn't exist");
      error.statusCode = 401;
      throw error;
    } else {
      isEqual = await bcrypt.compare(password, user.password);
    }

    if (!isEqual) {
      const error = new Error("Invalid password!");
      error.statusCode = 401;
      throw error;
    } else {
      const token = jwt.sign({ _id: user._id, email: user.email }, "secret");
      res
        .header("x-auth-token", token)
        .status(201)
        .json({
          name: user.name,
          email: user.email,
          id: user._id,
          token,
          expiresIn: 3600
        });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
