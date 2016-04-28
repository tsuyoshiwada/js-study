"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const webshot = require("webshot");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.set("views", `${__dirname}/views`);

function createScreenshot(url, options = {}) {
  return new Promise((resolve, reject) => {
    webshot(url, options, (err, renderStream) => {
      if (err) return reject(err);
      const chunks = new Array();
      renderStream.on("data", data => chunks.push(new Buffer(data)));
      renderStream.on("error", (err) => reject(err));
      renderStream.on("end", () => {
        const data = Buffer.concat(chunks);
        resolve(data);
      });
    });
  });
}

app.get("/api/image/:url", (req, res) => {
  const {url} = req.params;
  const options = {
    windowSize: {
      width: 1280,
      height: 768
    },
    shotSize: {
      width: "window",
      height: "all"
    }
  };

  createScreenshot(url, options).then((data) => {
    res.status(200).end(data, "binary");
  });
});

app.get("/", (req, res) => {
  res.render("index", {});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
