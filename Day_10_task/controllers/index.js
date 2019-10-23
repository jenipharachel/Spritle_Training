const User = require("../models/User");

exports.showIndex = (req, res) => {
  res.render("index");
};

exports.showSignin = (req, res) => {
  console.log("requests content body", req.body);

  var user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    phone: req.body.phone,
    gender: req.body.gender,
    password: req.body.password
  });

  res.render("signin");
};
