"use strict";

const webshot = require("webshot");

webshot("https://blog.wadackel.me/2016/github-webhook-nodejs/", "./screenshot.png", {
  windowSize: {
    width: 1280,
    height: 768
  },
  shotSize: {
    width: "window",
    height: "all"
  }
}, (err) => {
  console.log("Done", err);
});
