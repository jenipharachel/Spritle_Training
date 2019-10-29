const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("port", 3080);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({ resave: false, saveUninitialized: false, secret: "ssshhhhh" })
);

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost:27017/libtask");

mongoose.connection.on("error", err => {
  console.log("mongo error", err);
  process.exit();
});

const homeController = require("./controllers/home");
const signupController = require("./controllers/signup");
const signinController = require("./controllers/signin");
const adminController = require("./controllers/admin");

app.listen(app.get("port"), () => {
  console.log("app is running");
});

app.get("/", homeController.showHome);
app.get("/signin", homeController.showSignin);
app.get("/signup", homeController.showSignup);
app.post("/signin", signupController.goSignin);
app.get("/landing", signinController.goLanding);
app.post("/landing", signinController.showLanding);
app.get("/usersdb", adminController.showUsers);
app.get("/book", adminController.goBooks);
app.post("/addbook", adminController.addBooks);
app.get("/booksdb", adminController.showBooks);
app.get("/logout", adminController.logOut);
// app.get("/book", adminController.showBooks);
