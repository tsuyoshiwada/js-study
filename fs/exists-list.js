"use strict";

const fs = require("fs");
const list = [
  "data/a.txt",
  "data/b.txt",
  "data/c.txt",
  "data/hoge.txt",
  "data/",
  "data/fuga/"
];

const files = list.filter(function(fileName) {
  try {
    return fs.statSync(fileName).isFile();
  } catch (e) {
    return false;
  }
});

console.log(files);
