"use strict";

const fs = require("fs");
const express = require("express");
const router = express.Router();
const google = require("googleapis");
const googleAuth = require("google-auth-library");

// const CLIENT_ID = process.env.CLIENT_ID;
// const CLIENT_SECRET = process.env.CLIENT_SECRET;
// const REDIRECT_URL = process.env.REDIRECT_URL;
// const SCOPES = ["https://www.googleapis.com/auth/drive.file"];


function authorize(credentials, callback) {
  // TODO
}


router.get("/", (req, res) => {
  fs.readFile("../client_secret.json", (err, content) => {
    if (err) {
      console.log(`Error loading client secret file: ${err}`);
      return;
    }
    authorize(JSON.parse(content), () => {
      console.log("test");
    });
  });

  // const url = "";
  // res.render("login", {title: "", url: url});
});


router.get("/callback", (req, res) => {
  console.log(req.query.code);
  res.send(req.query.code);
});


module.exports = router;
