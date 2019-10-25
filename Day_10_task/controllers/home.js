const User = require("../models/User");

exports.showUserDetail = (req, res) => {
  console.log("requests content body ------->", req.query);
  User.findOne({ email: req.query.email }, (findErr, isThere) => {
    console.log("Ajax response ------>", isThere);
    if (findErr) {
      console.log("error in finding", findErr);
      res.send("error in finding");
    } else if (isThere) {
      console.log("user present", isThere);
      res.json(isThere);
    } else {
      console.log(isThere);
      res.send(null);
    }
  });
};
