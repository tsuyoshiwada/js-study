"use strict";

const request = require("request");
const FeedParser = require("feedparser");

module.exports = function requestXML(url, options) {
  return new Promise((resolve, reject) => {
    options = options ? options : {};

    const req = request(url);
    const parser = new FeedParser(options);
    const filterItem = options.filterItem ? options.filterItem : item => item;
    const data = {
      meta: {},
      items: []
    };

    req.on("error", err => reject(err));
    parser.on("error", err => reject(err));

    req.on("response", function(res) {
      if (res.statusCode !== 200) {
        this.emit("error", new Error("Bad status code"));
      } else {
        this.pipe(parser);
      }
    });

    parser.on("readable", function() {
      data.meta = this.meta;

      let item;

      while (item = this.read()) {
        item = filterItem(item);
        if (item) {
          data.items.push(item);
        }
      }
    });

    parser.on("end", () => {
      resolve(data);
    });
  });
};
