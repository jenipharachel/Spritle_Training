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

app.use(session({ secret: "ssshhhhh" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(app.get("port"), () => {
  console.log("app is running");
});

app.get("/", indexController.showIndex);
app.post("/signin", indexController.showSignin);
app.get("/signin", indexController.goSignin);
app.post("/home", signinController.showHome);
app.get("/userdetails", homeController.showUserDetail);
