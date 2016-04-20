"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const google = require("googleapis");

const config = require("./config.js");
const PORT = process.env.PORT || config.PORT || 3000;
const CLIENT_ID = config.CLIENT_ID;
const CLIENT_SECRET = config.CLIENT_SECRET;
const REDIRECT_URL = config.REDIRECT_URL;
const SCOPE = "https://www.googleapis.com/auth/drive.file";

const app = express();
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use("/", require("./routes/index"));

const auth = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
