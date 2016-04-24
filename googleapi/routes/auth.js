"use strict";

const express = require("express");
const router = express.Router();

router.get("/callback", (req, res) => {
  const oauth2Client = req.oauth2Client;

  oauth2Client.getToken(req.query.code, (err, token) => {
    if (err) {
      console.log("Error while trying to retrieve access token", err);
      res.redirect("/");
      return;
    }
    req.session.token = token;
    res.redirect("/");
  });
});

module.exports = router;
