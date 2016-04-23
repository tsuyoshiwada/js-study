"use strict";

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

app.use("", require("./routes/index"));
// app.use("/login", require("./routes/login"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
