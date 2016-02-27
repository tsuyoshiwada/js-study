"use strict";

const inquirer = require("inquirer");

process.stdout.write("\u001B[2J\u001B[0;0f");

inquirer.prompt([
  {
    type: "checkbox",
    message: "Select toppings",
    name: "toppings",
    choices: [
      new inquirer.Separator(" = The Meats = "),
      {name: "Peperonni"},
      {name: "Ham"},
      {name: "Ground Meat"},
      {name: "Bacon"},
      new inquirer.Separator(" = The Cheeses = "),
      {name: "Mozzarella", checked: true},
      {name: "Cheddar"},
      {name: "Parmesan"},
      new inquirer.Separator(" = The usual ="),
      {name: "Mushroom"},
      {name: "Tomato"},
      new inquirer.Separator(" = The extras = "),
      {name: "Pineapple"},
      {name: "Olives", disabled: "out of stock"},
      {name: "Extra cheese"}
    ]
  }
], (answers) => {
  console.log(JSON.stringify(answers, null, "  "));
});
