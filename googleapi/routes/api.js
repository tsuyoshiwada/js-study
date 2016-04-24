"use strict";

const express = require("express");
const router = express.Router();

router.use((req, res, next) => {
  if (!req.authenticated) {
    res.json({
      status: "error",
      message: "Login Required"
    });
    return;
  }
  next();
});

router.get("/", (req, res) => {
  console.log(req);
  const drive = req.drive;

  drive.files.list({
    spaces: "appDataFolder",
    fields: "nextPageToken, files(id, name)",
    pageSize: 100
  }, (err, response) => {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      res.json(response);
    }
  });
});

module.exports = router;
