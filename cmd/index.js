"use strict";

const which = require("which");
const cmdList = [
  "git",
  "ls",
  "bad_command"
];

/*
Output:
    [Success: git]
    [Success: ls]
    [Not found: bad_command]
*/
cmdList.forEach((cmd) => {
  try {
    which.sync(cmd);
    console.log(`[Success: ${cmd}]`);
  } catch (e) {
    console.log(`[Not found: ${cmd}]`);
  }
});
