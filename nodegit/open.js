const Git = require("nodegit");

function getMostRecentCommit(repository) {
  return repository.getBranchCommit("master");
}

function getCommitMessage(commit) {
  return commit.message();
}

Git.Repository.open("./sweet-scroll")
  .then(getMostRecentCommit)
  .then(getCommitMessage)
  .then((message) => {
    console.log(message);
  })
  .catch((err) => {
    console.log(err);
  });
