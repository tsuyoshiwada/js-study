"use strict";

const PORT = process.env.PORT || 3000;
const FeedParser = require("feedparser");
const request = require("request");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/api/feed/:url", (req, res) => {
  console.log("START");
  const client = request(req.params.url);
  const feedparser = new FeedParser();
  const data = {};

  client.on("error", err => console.log(err));
  client.on("response", function(response) {
    console.log("RESPONSE");
    this.pipe(feedparser);
  });

  feedparser.on("error", err => console.log(err));
  feedparser.on("readable", function() {
    const meta = this.meta;
    let item;
    console.log("READABLE");

    while (item = this.read()) {
      console.log(item);
    }

    // TODO
    res.json(data);
  });
});

app.all("*", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
