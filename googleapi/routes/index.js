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

const isAuthenticated = (req, res, next) => {
  // TODO
};

router.get("/", (req, res) => {
  const token = req.session.token;

  if (token) {
    oauth2Client.credentials = token;

    const service = Google.drive("v3");

    service.files.create({
      auth: oauth2Client,
      resource: {
        name: "TEST",
        mimeType: "text/plain"
      },
      media: {
        mimeType: "text/plain",
        body: "HELLO WORLD!!"
      }
    }, (err, response) => {
      if (err) return console.log(err);
      res.json(response);
    });

    // service.files.list({
    //   auth: oauth2Client,
    //   page: 10,
    //   fields: "nextPageToken, files(id, name)"
    // }, (err, response) => {
    //   if (err) {
    //     res.send(`Error: ${err}`);
    //     return;
    //   }
    //   const files = response.files;
    //   console.log(files);
    //   res.json(files);
    // });

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
