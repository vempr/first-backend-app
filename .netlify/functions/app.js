const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const indexRoute = require("../../routes/index");
const newRoute = require("../../routes/new");
const aboutRoute = require("../../routes/about");
const notFoundRoute = require("../../routes/nf");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.listen(PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.use("/app/", indexRoute);
app.use("/app/new", newRoute);
app.use("/app/about", aboutRoute);
app.use(notFoundRoute);

module.exports.handler = serverless(app);