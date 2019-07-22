const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.signup = (req, res, next) => {
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
