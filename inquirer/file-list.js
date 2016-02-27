"use strict";

const fs = require("fs");
const inquirer = require("inquirer");

function readAndPrompt(path) {
  if (fs.statSync(path).isFile()) {
    console.log(`End => ${path}`);
    return;
  }

  fs.readdir(path, (err, files) => {
    if (err) throw err;

    files = files.map((file) => {
      if (fs.statSync(`${path}/${file}`).isDirectory()) {
        return `${file}/`;
      }
      return file;
    });

    inquirer.prompt([
      {
        type: "list",
        name: "file",
        message: "Please select a file",
        choices: files
      }
    ], (answers) => {
      const file = /^.*\/$/.test(answers.file) ? answers.file.substr(0, answers.file.length - 1) : answers.file;
      readAndPrompt(`${path}/${file}`);
    });
  });
}

readAndPrompt(".");
