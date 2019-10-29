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
      console.log("User doesnt exist", isThere);
      res.send(null); //to show user not found
    }
  });
};

exports.showTable = (req, res) => {
  sess = req.session;
  // if (typeof localStorage === "undefined" || localStorage === null) {
  //   var LocalStorage = require("node-localstorage").LocalStorage;
  //   localStorage = new LocalStorage("./scratch");
  // }
  console.log(sess);
  if (sess.email) {
    res.render("usertable");
    console.log("usertable");
  } else {
    res.redirect("signin");
  }
  // && localStorage.getItem("status") != null
};

exports.logOut = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/signin");
  });
};
