"use strict";

const fs = require("fs");
const path = require("path");
const glob = require("glob");
const colors = require("colors");
const Table = require("cli-table");

const table = new Table({
  head     : [colors.green("Filename"), colors.green("Size")]
});

const files = glob.sync("../**/*", {
  dot: true,
  nodir: true,
  ignore: [
    "../**/node_modules/**/*",
    "../**/.git/**/*"
  ]
});

files.forEach((fileName) => {
  const stat = fs.statSync(fileName);
  table.push([fileName, stat.size]);
});

console.log(table.toString());
