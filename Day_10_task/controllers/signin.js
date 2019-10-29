const User = require("../models/User");

exports.showHome = (req, res) => {
  console.log("requests content body", req.body);
  User.findOne({ email: req.body.email }, (findErr, isThere) => {
    if (findErr) {
      console.log("error in finding", findErr);
      res.send("error in finding");
    } else if (isThere) {
      if (isThere.password == req.body.password) {
        console.log("account exists");
        sess = req.session;
        sess.email = req.body.email;
        sess.name = req.body.name;
        console.log(sess);
        res.render("home", { username: isThere.name });
        // res.send("Welcome " + isThere.name);
      } else {
        console.log("incorrect password");
        // res.writeHead(200, { "Content-Type": "text/html" });
        res.send("Incorrect Password");
        // res.redirect("/signin");
      }
    } else {
      console.log("user does not exist");
      res.send(
        "Email doesnt exist, create a new account or sign in with another email"
      );
    }
  });
};

exports.goHome = (req, res) => {
  sess = req.session;
  console.log(sess);
  if (sess.email) {
    res.render("home", { username: sess.name });
  } else {
    res.redirect("signin");
  }
};

// && localStorage.getItem("status") != null
