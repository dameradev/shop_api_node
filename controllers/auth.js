const { User, validateUser } = require("../models/user");
const bcrypt = require("bcryptjs");

const _ = require("lodash");

// export shop_jwtPrivateKey=mySecureKey
exports.signup = (req, res, next) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      const user = new User({
        name,
        email,
        password: hashedPassword
      });
      return user.save();
    })
    .then(result => {
      res.status(201).json({ message: "User created", userId: result._id });
    })
    .catch(err => {
      console.log(err);
    });
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
      const token = user.generateAuthToken();
      res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "name", "email"]));
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
