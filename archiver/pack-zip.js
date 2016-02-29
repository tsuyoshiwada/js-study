"use strict";

const fs = require("fs");
const archiver = require("archiver");

const output = fs.createWriteStream(__dirname + "/output.zip");
const archive = archiver("zip");
const prefix = "sample-files";

const files = [
  "files/index.html",
  "files/script.js",
  "files/style.css",
  "files/text.txt"
];

output.on("close", () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log("Done!!");
});

archive.on("error", (err) => {
  throw err;
});

archive.on("entry", (entry) => {
  console.log(`entry => ${entry.name}`);
});

archive.pipe(output);

files.forEach((fileName) => {
  archive.append(fs.createReadStream(fileName), {
    name: fileName,
    prefix
  });
});

archive.finalize();
