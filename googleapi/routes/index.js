"use strict";

const express = require("express");
const router = express.Router();
const Google = require("googleapis");
const GoogleAuth = require("google-auth-library");

const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
const auth = new GoogleAuth();
const oauth2Client = new auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);

router.get("/", (req, res) => {
  const token = req.session.token;

  if (token) {
    res.json(token);

  } else {
    const url = oauth2Client.generateAuthUrl({
      scope: SCOPES
    });
    res.send(url);
  }
});

router.get("/callback", (req, res) => {
  oauth2Client.getToken(req.query.code, (err, token) => {
    if (err) return console.log("Error while trying to retrieve access token", err);

    req.session.token = token;
    res.redirect("/");
  });
});

module.exports = router;
