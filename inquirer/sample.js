const inquirer = require("inquirer");

inquirer.prompt([
  {
    type: "list",
    name: "theme",
    message: "What do you want to do?",
    choices: [
      "test1",
      "test2",
      new inquirer.Separator(),
      "test3",
      "test4"
    ]
  }
], (answers) => {
  console.log(JSON.stringify(answers, null, "  "));
});
