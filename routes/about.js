const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("about.ejs", { title: "About Us" });
});

module.exports = router;
