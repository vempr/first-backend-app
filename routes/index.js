const express = require("express");
const router = express.Router();
const jsonfile = require("jsonfile");

const file = "./db/blogs.json";

router.get("/", async (req, res) => {
  try {
    const data = await jsonfile.readFile(file);
    res.render("index.ejs", { title: "Home", blogs: data });
  } catch (err) {
    console.log(err);
    res.status(500).render("sr.ejs", { title: "Server Error" });
  }
});

module.exports = router;