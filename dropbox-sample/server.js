"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const passport = require("passport");
const DropboxStrategy = require("passport-dropbox").Strategy;
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

passport.use(new DropboxStrategy({
  consumerKey: process.env.DROPBOX_KEY,
  consumerSecret: process.env.DROPBOX_SECRET,
  callbackURL: "http://localhost:3000/login/callback"
}, (token, tokenSecret, profile, cb) => {
  profile.token = token;
  return cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use(passport.initialize());
app.use(passport.session());

app.use("", require("./routes/index"));
app.use("/login", require("./routes/login"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
