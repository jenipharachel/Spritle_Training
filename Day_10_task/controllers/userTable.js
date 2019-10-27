const User = require("../models/User");

exports.showUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log("error in finding the data", err);
      res.send("error in finding the user");
    } else if (users) {
      var userMap = {};
      // users.forEach(function(user) {
      //   userMap[user._id] = user;
      // });
      // res.send(userMap);
      console.log("users present", users);
      res.json(users);
    }
  });
};
