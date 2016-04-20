"use strict";

const express = require("express");
const router = express.Router();
const google = require("googleapis");

const config = require("../config.js");
const PORT = process.env.PORT || config.PORT || 3000;
const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const REDIRECT_URL = config.REDIRECT_URL;
const SCOPE = "https://www.googleapis.com/auth/drive.file";

const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

const url = auth.generateAuthUrl({scope: SCOPE});
const getAccessToken = (code) => {
  auth.getToken(code, (err, tokens) => {
    if (err) {
      console.log("Error while trying to retrieve access token", err);
      return;
    }
    auth.credentials = tokens;
    upload();
  });
};

const upload = () => {
  const drive = google.drive({version: "v2", auth: auth});
  drive.files.insert({
    resource: {
      title: "My Document",
      mimeType: "text/plain"
    },
    media: {
      mimeType: "text/plain",
      body: "Hello World!!"
    }
  }, console.log);
};

router.get("/", (req, res) => {
  res.render("index", {title: "test", url: url});
});

router.get("/callback", (req, res) => {
});

module.exports = router;
