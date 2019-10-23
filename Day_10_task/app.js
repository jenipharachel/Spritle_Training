const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("port", 3090);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost:27017/nodetask");

mongoose.connection.on("error", err => {
  console.log("moongo error", err);
  process.exit();
});

const indexController = require("./controllers/index");
const signinController = require("./controllers/signin");

app.listen(app.get("port"), () => {
  console.log("app is running");
});

app.get("/", indexController.showIndex);
app.post("/signin", indexController.showSignin);
app.post("/home", signinController.showHome);
