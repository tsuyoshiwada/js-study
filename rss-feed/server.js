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
  const client = request(req.params.url);
  const feedparser = new FeedParser();
  const data = {
    meta: {},
    items: []
  };

  // request
  client.on("error", err => console.log(err));

  client.on("response", function(response) {
    if (response.statusCode !== 200) return this.emit("error", new Error("Bad status code"));
    this.pipe(feedparser);
  });

  // feed parser
  feedparser.on("error", err => console.log(err));

  feedparser.on("readable", function() {
    data.meta = this.meta;

    let item;
    while (item = this.read()) {
      const image = item.description.match(/<img.*?src=[\"\'](.+?)[\"\'].*?>/i);
      if (image) {
        item.image = image[1];
        data.items.push(item);
      }
    }
  });

  feedparser.on("end", function() {
    data.items.forEach(item => {
      console.log(data.meta);
    });

    res.json(data);
  });
});

app.all("*", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
