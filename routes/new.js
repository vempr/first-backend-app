const express = require("express");
const router = express.Router();
const jsonfile = require("jsonfile");

const file = "./db/blogs.json";

router.get("/", (req, res) => {
  res.render("new.ejs", { title: "Create New Blog" });
});

router.post("/", async (req, res) => {
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

module.exports = router;
