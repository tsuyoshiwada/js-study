const fs = require("fs");
const text = "text";
const file = "sample.txt";

fs.appendFileSync(file, text);
