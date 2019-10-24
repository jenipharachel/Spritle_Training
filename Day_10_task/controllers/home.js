const User = require("../models/User");

exports.showUserDetail = (req, res) => {
  console.log("requests content body", req.body);
  User.findOne({ email: req.body.email }, (findErr, isThere) => {
    if (findErr) {
      console.log("error in finding", findErr);
      res.send("error in finding");
    } else if (isThere) {
      console.log(isThere);
    }
  });
};
