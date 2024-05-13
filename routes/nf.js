const express = require("express");
const router = express.Router();

router.use((req, res) => {
  res.render("nf.ejs", { title: "Page Not Found" });
});

module.exports = router;
