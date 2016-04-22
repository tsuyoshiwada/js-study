"use strict";

const fs = require("fs");
const express = require("express");
const router = express.Router();
const Google = require("googleapis");
const GoogleAuth = require("google-auth-library");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];


function authorize(token, callback) {
  const auth = new GoogleAuth();
  const oauth2 = new auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

  if (token) {
  } else {
  }
}


router.get("/", (req, res) => {
  authorize(req.session.token, () => {
    console.log("test");
  });

  // const url = "";
  // res.render("login", {title: "", url: url});
});


router.get("/callback", (req, res) => {
  console.log(req.query.code);
  res.send(req.query.code);
});


module.exports = router;
