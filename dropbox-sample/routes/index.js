"use strict";

const express = require("express");
const router = express.Router();
const dbox = require("dbox");

router.get("/", (req, res) => {
  const user = req.user;
  console.log(user);
  res.render("index", {url: ""});
});

module.exports = router;
