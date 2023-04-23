const inquirer  = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const generateTeam = require("./util/generateHtml")
const fs = require('fs')
const team = []
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
            console.log(team)
            html2write = generateTeam(team)
            write2File(html2write)
        }
    });
}
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
        message: "What is the engineer's employee id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the engineer;s email address?",
        name: "email",
      },
      {
        type: "input",
        message: "What is the engineer's github?",
        name: "github",
      },
    ])
    .then((ans) => {
        const engineer = new Engineer(ans.name,ans.id,ans.email,ans.github)
        team.push(engineer)
        questionLoop()
    });
}
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
        message: "What is the intern's employee id?",
        name: "id",
      },
      {
        type: "input",
        message: "What is the intern's email address?",
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
function write2File(html){
    fs.writeFile('team.html', html , (err) =>
  err ? console.error(err) : console.log('Success!')
);

}
onStart()