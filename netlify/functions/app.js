const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const indexRoute = require("../../routes/index");
const newRoute = require("../../routes/new");
const aboutRoute = require("../../routes/about");
const notFoundRoute = require("../../routes/notFound");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.listen(PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/", indexRoute);
app.use("/new", newRoute);
app.use("/about", aboutRoute);
app.use(notFoundRoute);

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT ERROR:", err);
  process.exit(1);
});

module.exports.handler = serverless;