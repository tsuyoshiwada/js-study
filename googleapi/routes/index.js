"use strict";

const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
  if (!req.session.token) {
    res.redirect("/login");
  } else {
    res.send("TODO");
  }
});


module.exports = router;
