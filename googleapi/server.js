"use strcit";

require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const authenticate = require("./middleware/auth");

app.use(cookieParser());
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views/`);
app.use(express.static("public"));

app.use(authenticate);
app.use("/api", require("./routes/api"));
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
