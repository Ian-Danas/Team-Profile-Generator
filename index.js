const inquirer  = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateTeam = require("./util/generateHtml")
const fs = require('fs')
const team = []
//function to prompt user about the manager when program starts up
function onStart (){
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the team manager?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the managers employee id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the managers email address?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the managers office number?",
        name: "office",
      },
    ])
    .then((ans) => {
        const manager = new Manager(ans.name,ans.id,ans.email,ans.office)
        team.push(manager)
        questionLoop()
    });
}

//function to call back to to continue to ask user to add engineers or interns until they choose to finish
function questionLoop(){
    inquirer
    .prompt([
      {
        type: "list",
        message: "Add an engineer",
        name: "menu",
        choices:[
            'add an engineer',
            'add an intern',
            'finish building my team'
        ]
      },
    ])
    .then((ans) => {
        if(ans.menu === 'add an engineer'){
            addEnginner()
        }
        else if(ans.menu === 'add an intern'){
            addIntern()
        }
        else{
            html2write = generateTeam(team)
            write2File(html2write)
        }
    });
}
//function to prompt user for questiona about enginner to build new engineer object
function addEnginner(){
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the enginner?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the engineers employee id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the engineers email address?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the engineers github?",
        name: "github",
      },
    ])
    .then((ans) => {
        const engineer = new Engineer(ans.name,ans.id,ans.email,ans.github)
        team.push(engineer)
        questionLoop()
    });
}
//function to prompt user for questiona about intern to build new intern object
function addIntern(){
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Intern?",
        name: "name",
      },
      {
        type: "input",
        message: "What is the interns employee id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the interns email address?",
        name: "email",
      },
      {
        type: "input",
        message: "What school does the intern go to?",
        name: "school",
      },
    ])
    .then((ans) => {
        const intern = new Intern(ans.name,ans.id,ans.email,ans.school)
        team.push(intern)
        questionLoop()
    });
}
//function to write html to a file
function write2File(html){
    fs.writeFile('team.html', html , (err) =>
  err ? console.error(err) : console.log('Success!')
);

}
onStart()