"use strict";

const Git = require("nodegit");
const inquirer = require("inquirer");
const colors = require("colors");
const moment = require("moment");

const REPO_PATH = "./sweet-scroll";

let repository;
let firstCommit, secondCommit;


function clearConsole() {
  process.stdout.write("\u001B[2J\u001B[0;0f");
}


function formatDate(date) {
  return moment(date).format("YYYY-MM-DD HH:mm:ss");
}


function getCurrentBranchCommit(repo) {
  repository = repo;

  return new Promise((resolve, reject) => {
    repo.getCurrentBranch().then((reference) => {
      resolve(repo.getBranchCommit(reference.shorthand()));
    }).catch(reject);
  });
}


function getAllCommit(commit) {
  return new Promise((resolve, reject) => {
    const eventEmitter = commit.history();
    eventEmitter.on("end", resolve);
    eventEmitter.on("error", reject);
    eventEmitter.start();
  });
}


function getFormatCommits(commits) {
  return commits.map((commit) => {
    return [
      commit.sha(),
      formatDate(commit.date()),
      commit.message().split("\n")[0].trim()
    ].join(" ");
  });
}


function promptListCommits(commits, message) {
  return new Promise((resolve, reject) => {
    const choices = getFormatCommits(commits);
    choices.unshift(new inquirer.Separator("======================"));
    inquirer.prompt([
      {
        type: "list",
        name: "commitId",
        message,
        choices
      }
    ], (answers) => {
      const commitId = answers.commitId.split(" ").shift();
      repository.getCommit(commitId)
        .then(commit => resolve({commits, commit}))
        .catch(reject);
    });
  });
}



// Initialize
clearConsole();

Git.Repository.open(REPO_PATH)
  .then(getCurrentBranchCommit)
  .then(getAllCommit)
  .then((commits) => {
    return promptListCommits(commits, "Select a first CommitID");
  })
  .then((res) => {
    firstCommit = res.commit;
    return promptListCommits(res.commits, "Select a second CommitID");
  })
  .then((res) => {
    secondCommit = res.commit;
    clearConsole();
    console.log(`${colors.cyan("First CommitID")} : ${firstCommit.sha()}`);
    console.log(`${colors.cyan("Second CommitID")} : ${secondCommit.sha()}`);
  })
  .catch((err) => {
    console.error(err);
  });
