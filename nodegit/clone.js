const Git = require("nodegit");

Git.Clone("https://github.com/tsuyoshiwada/sweet-scroll.git", "sweet-scroll").then((repository) => {
  console.log("Clone done!!", repository);
});
