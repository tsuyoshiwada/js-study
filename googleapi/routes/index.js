"use strict";

const express = require("express");
const router = express.Router();

router.get("/login", (req, res) => {
  res.redirect(req.authenticated ? "/" : req.authenticateURL);
});

router.get("*", (req, res) => {
  if (req.authenticated) {
    res.render("index", {
    });
  } else {
    res.render("landing", {
    });
  }
  // const drive = req.drive;
  //
  // drive.files.list({
  //   spaces: "appDataFolder",
  //   fields: "nextPageToken, files(id, name)",
  //   pageSize: 100
  // }, (err, response) => {
  //   if (err) {
  //     console.log(err);
  //     res.json(err);
  //   } else {
  //     res.json(response);
  //   }
  // });


//   drive.files.list({
//   spaces: 'appDataFolder',
//   fields: 'nextPageToken, files(id, name)',
//   pageSize: 100
// }, function(err, res) {
//   if(err) {
//     // Handle error
//     console.log(err);
//   } else {
//     res.files.forEach(function(file) {
//       console.log('Found file: ', file.name, file.id);
//     });
//   }
// });

  // const token = req.session.token;
  //
  // if (token) {
  //   oauth2Client.credentials = token;
  //
  //   const service = Google.drive("v3");
  //
  //   service.files.create({
  //     auth: oauth2Client,
  //     resource: {
  //       name: "TEST",
  //       mimeType: "text/plain"
  //     },
  //     media: {
  //       mimeType: "text/plain",
  //       body: "HELLO WORLD!!"
  //     }
  //   }, (err, response) => {
  //     if (err) return console.log(err);
  //     res.json(response);
  //   });
  //
  //   // service.files.list({
  //   //   auth: oauth2Client,
  //   //   page: 10,
  //   //   fields: "nextPageToken, files(id, name)"
  //   // }, (err, response) => {
  //   //   if (err) {
  //   //     res.send(`Error: ${err}`);
  //   //     return;
  //   //   }
  //   //   const files = response.files;
  //   //   console.log(files);
  //   //   res.json(files);
  //   // });
  //
  // } else {
  //   const url = oauth2Client.generateAuthUrl({
  //     scope: SCOPES
  //   });
  //   res.send(url);
  // }
});

module.exports = router;
