const User = require("../models/User");

exports.goSignin = (req, res) => {
  console.log("requests content body", req.body);
  sess = req.session;
  sess.email = req.body.email;

  var user = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    phone: req.body.phone,
    gender: req.body.gender,
    password: req.body.password,
    verified: false,
    admin: false
  });

  User.findOne({ email: req.body.email }, (findErr, isThere) => {
    if (findErr) {
      console.log("error in finding", findErr);
      res.send("error in finding");
    } else if (isThere) {
      console.log("email exists");
      res.send("email already exists, use another email");
    } else {
      console.log("data does not exist");
      user.save((err, success) => {
        if (err) {
          console.log("error in saving data", err);
          res.send("error in saving");
        } else {
          console.log("data saved successfully", success);
          res.render("signin");
        }
      });
    }
  });
};
