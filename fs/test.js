"use strict";

const fs = require("fs");

fs.writeFileSync("sample.txt", "Hello world");
const stat = fs.statSync("sample.txt");
console.log(stat.isFile());
