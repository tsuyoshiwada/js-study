"use strict";

const PORT = process.env.PORT || 3000;
const express = require("express");
const bodyParser = require("body-parser");
const requestXML = require("./request-xml");
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/api/feed/:url", (req, res) => {
  requestXML(req.params.url, {
      filterItem(item) {
        const image = item.description.match(/<img.*?src=[\"\'](.+?)[\"\'].*?>/i);
        if (!image) return null;
        item.image = image[1];
        return item;
      }
    })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.log("[requestXML]", err);
      res.json({error: err});
    });
});

app.all("*", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
