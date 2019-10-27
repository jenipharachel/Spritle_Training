const express = require("express");
const session = require("express-session");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.set("port", 3090);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({ resave: false, saveUninitialized: false, secret: "ssshhhhh" })
);

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost:27017/nodetask");

mongoose.connection.on("error", err => {
  console.log("mongo error", err);
  process.exit();
});

const indexController = require("./controllers/index");
const signinController = require("./controllers/signin");
const homeController = require("./controllers/home");
const usertableController = require("./controllers/userTable");

app.listen(app.get("port"), () => {
  console.log("app is running");
});

var sess;

app.get("/", indexController.showIndex);
app.post("/signin", indexController.showSignin);
app.get("/signin", indexController.goSignin);
app.post("/home", signinController.showHome);
app.get("/home", signinController.goHome);
app.get("/userdetails", homeController.showUserDetail);
app.get("/usertable", homeController.showTable);
app.get("/usersdb", usertableController.showUsers);
app.get("/logout", homeController.logOut);
