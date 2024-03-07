const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

// we will create a variable with an empty array to store the information
var team = [];

// array of questions for user

const managerQuestions = [
  {
    type: "input",
    name: "name",
    message: "enter manager name",
  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "name",
    message: "enter engineer name",
  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "gitHub",
    message: "What is your gitHub user name?",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "name",
    message: "enter intern name",
  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "input",
    name: "school",
    message: "What is your school name?",
  },
];

const menuOptions = [
  {
    type: "list",
    name: "menu",
    message: "choose your option or finish",
    choices: ["Engineer", "Intern", "Finish"],
  },
];

// TODO: Write Code to gather information about the development team members, and render the HTML file.

// gather information about the development team members and creates objects for each team member using the correct classes as blueprints using enquirer.prompt.
// then  we use .then to create a new keyword  to filters the arguments
// push the new object to an empty array
// prompt the user to add another member or just finish the task
// if user selects engineer then prompt questions (.then)
// if questions are answered, then go back to menu or finish task (.then)

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log("Success!")
  );
}

// function to generate Whole Team
function createTeam() {
  inquirer.prompt(managerQuestions).then((managerAnswers) => {
    console.log(managerAnswers);
    const manager = new Manager(
      managerAnswers.name,
      managerAnswers.id,
      managerAnswers.email,
      managerAnswers.officeNumber
    );
    team.push(manager);
    showMenu();
  });
}

// function to generate engineer

function showEngineer() {
  inquirer.prompt(engineerQuestions).then((engineerAnswers) => {
    console.log(engineerAnswers);
    const engineer = new Engineer(
      engineerAnswers.name,
      engineerAnswers.id,
      engineerAnswers.email,
      engineerAnswers.github
    );
    team.push(engineer);
    showMenu();
  });
}

// function to generate intern

function showIntern() {
  inquirer.prompt(internQuestions).then((internAnswers) => {
    console.log(internAnswers);
    const intern = new Intern(
      internAnswers.name,
      internAnswers.id,
      internAnswers.email,
      internAnswers.school
    );
    team.push(intern);
    showMenu();
  });
}

// function to generate menu

function showMenu() {
  inquirer.prompt(menuOptions).then((menuAnswers) => {
    console.log(menuAnswers);
    if (menuAnswers.menu === "Engineer") {
      showEngineer();
    } else if (menuAnswers.menu === "Intern") {
      showIntern();
    } else {
      writeToFile("index.HTML", render(team));
    }
  });
}

// function call to initialize program
createTeam();
