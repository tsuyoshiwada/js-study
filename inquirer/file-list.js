"use strict";

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

function realpath(relative) {
  return path.join(__dirname, relative);
}

function readAndPrompt(currentPath) {
  const realCurrentPath = realpath(currentPath);

  if (fs.statSync(realCurrentPath).isFile()) {
    console.log(`End => ${realCurrentPath}`);
    return;
  }

  fs.readdir(currentPath, (err, files) => {
    if (err) throw err;

    files = files.map((file) => {
      if (fs.statSync(`${currentPath}/${file}`).isDirectory()) {
        return `${file}/`;
      }
      return file;
    });

    files.unshift("..");

    inquirer.prompt([
      {
        type: "list",
        name: "file",
        message: "Please select a file",
        choices: files
      }
    ], (answers) => {
      let file = answers.file;
      file = /^.*\/$/.test(file) ? file.substr(0, file.length - 1) : file;
      readAndPrompt(`${currentPath}/${file}`);
    });
  });
}

readAndPrompt(".");
