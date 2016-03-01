"use strict";

const fs = require("fs");
const path = require("path");
const assert = require("power-assert");

describe("fs sample tests", () => {
  it("should be ", () => {
    fs.writeFileSync("sample.txt", "Hello world");
    const stat = fs.statSync("sample.txt");
    assert(stat.isFile());
  });
});
