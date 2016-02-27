const Git = require("nodegit");

function getMostRecentCommit(repository) {
  return repository.getBranchCommit("master");
}

function printAllCommitLog(commits) {
  commits.forEach((commit) => {
    console.log(commit.sha(), commit.date(), `<${commit.committer().name()}>`, commit.message().trim());
  });
}

Git.Repository.open("./sweet-scroll")
  .then(getMostRecentCommit)
  .then((commit) => {
    const emitter = commit.history();
    emitter.on("end", printAllCommitLog);
    emitter.start();
  })
  .catch((err) => {
    console.log(err);
  });
