const User = require("../models/User");

exports.showHome = (req, res) => {
  console.log("requests content body", req.body);
  User.findOne({ email: req.body.email }, (findErr, isThere) => {
    if (findErr) {
      console.log("error in finding", findErr);
      res.send("error in finding");
    } else if (isThere) {
      if (isThere.password == req.body.password) {
        console.log("email exists");
        res.render("home", { username: isThere.name });
        // res.send("Welcome " + isThere.name);
      } else {
        console.log("incorrect password");
        // res.writeHead(200, { "Content-Type": "text/html" });
        res.send("Incorrect Password");
        // res.redirect("/signin");
      }
    }
  });
};
