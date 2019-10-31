const User = require("../models/User");
const Book = require("../models/Book");

exports.showUsers = (req, res) => {
  User.find({ admin: false }, (err, users) => {
    if (err) {
      console.log("error in finding the data", err);
      res.send("error in finding the user");
    } else if (users) {
      // var userMap = {};
      // users.forEach(function(user) {
      //   userMap[user._id] = user;
      // });
      // res.send(userMap);
      console.log("users present", users);
      res.json(users);
    }
  });
};

exports.goBooks = (req, res) => {
  res.render("book");
};

exports.addBooks = (req, res) => {
  console.log("requests content body", req.body);
  sess = req.session;
  sess.email = req.body.email;

  var book = new Book({
    bookname: req.body.bookname,
    authorname: req.body.authorname
  });

  Book.findOne({ bookname: req.body.bookname }, (findErr, isThere) => {
    if (findErr) {
      console.log("error in finding", findErr);
      res.send("error in finding");
    } else if (isThere) {
      console.log("bookname exists");
      res.send("bookname already exists, add another bookname");
    } else {
      console.log("data does not exist");
      book.save((err, success) => {
        if (err) {
          console.log("error in saving data", err);
          res.send("error in saving");
        } else {
          console.log("data saved successfully", success);
          res.redirect("book");
        }
      });
    }
  });
};

exports.showBooks = (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      console.log("error in finding the data", err);
      res.send("error in finding the user");
    } else if (books) {
      console.log("books present", books);
      res.json(books);
    }
  });
};

exports.verifyUser = (req, res) => {
  console.log(req.query.email);
  User.findOneAndUpdate(
    { email: req.query.email },
    { $set: { verified: true } },
    (err, user) => {
      if (err) {
        console.log("error in finding the data", err);
        res.send("error in finding the user");
      } else if (user) {
        console.log("users present", user);
        // res.json(books);
      }
    }
  );
};

exports.logOut = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return console.log(err);
    }
    res.redirect("/signin");
  });
};
