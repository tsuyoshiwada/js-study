"use strict";

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(JSON.stringify(req.user, null, 2));
});

module.exports = router;
