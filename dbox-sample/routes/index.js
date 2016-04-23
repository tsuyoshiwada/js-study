"use strict";

const express = require("express");
const router = express.Router();

const dbox = require("dbox");
const dboxApp = dbox.app({
  app_key: process.env.DROPBOX_KEY,
  app_secret: process.env.DROPBOX_SECRET
});

router.get("/", (req, res) => {
  dboxApp.requesttoken((status, requestToken) => {
    console.log(status, requestToken);
    res.send(requestToken);
  });
});

module.exports = router;
