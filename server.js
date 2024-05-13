const express = require("express");
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const jsonfile = require("jsonfile");

const app = express();
const PORT = process.env.PORT || 3000;
const file = "./db/blogs.json";

app.set("view engine", "ejs");
app.listen(PORT);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  try {
    const data = await jsonfile.readFile(file);
    res.render("index.ejs", { title: "Home", blogs: data });
  } catch (err) {
    console.log(err);
    res.status(500).render("sr.ejs", { title: "Server Error" });
  }
});

app.get("/new", (req, res) => {
  res.render("new.ejs", { title: "Create New Blog" });
});

app.post("/new-blog/", async (req, res) => {
  try {
    const blog = {
      title: req.body.title,
      author: req.body.author,
      content: req.body.content,
    };

    const data = await jsonfile.readFile(file);
    data.push(blog);
    await jsonfile.writeFile(file, data);
    console.log("file was written");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).render("sr.ejs", { title: "Server Error" });
  }
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { title: "About Us" });
});

app.use((req, res) => {
  res.render("nf.ejs", { title: "Page Not Found" });
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT ERROR:", err);
  process.exit(1);
});

module.exports.handler = serverless;