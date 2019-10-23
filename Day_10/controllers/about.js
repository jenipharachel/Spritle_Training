const User = require("../models/User");

exports.showAbout = (req, res) => {
  res.render("about");
};

exports.doSignup = (req, res) => {
  console.log("requests content body", req.body);

  var user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  });

  // var user = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   age: req.body.age
  // };
  // new User(user);

  User.findOne({ email: req.body.email }, (findErr, isThere) => {
    if (findErr) {
      console.log("error in finding", findErr);
      res.send("error in finding");
    } else if (isThere) {
      console.log("email exists");
      res.send("email already exists");
    } else {
      console.log("data does not exist");
      user.save((err, success) => {
        if (err) {
          console.log("error in saving data", err);
          res.send("error in saving");
        } else {
          console.log("data saved successfully", success);
          res.send("Sign Up received");
        }
      });
    }
  });
};
