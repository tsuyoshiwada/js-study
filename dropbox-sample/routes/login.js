"use strict";

const passport = require("passport");
const express = require("express");
const router = express.Router();

router.get("/", passport.authenticate("dropbox"));

router.get("/callback", passport.authenticate("dropbox", {failureRedirect: "/"}), (req, res) => {
  console.log("DONE");
  res.redirect("/");
});

module.exports = router;
