const shell = require('shelljs');
const inquirer = require("inquirer");
const fs = require('fs-extra');
const path = require('path');

exports.gitPullPush = function () {
    var branchRef = shell.exec('git symbolic-ref HEAD', {
        async: false
    }).stdout;
    var branchName = branchRef.split('refs/heads/')[1];

    shell.exec(`git branch --set-upstream-to=origin/${branchName}`, {
        async: false
    });

    shell.exec('git pull', {
        async: false
    });

    askQuestions().then(function (answer) {
        shell.exec(`git pull origin ${answer.BRANCH}`, {
            async: false
        });

        shell.exec(`git push`, {
            async: false
        });
    })
}

function askQuestions() {

    var branch = readJson().branch;

    const questions = [{
        type: "list",
        name: "BRANCH",
        message: "Which branch is your target?",
        choices: branch
    }];
    return inquirer.prompt(questions);
};

exports.branchAdd = function (value) {
    if (value !== undefined && value !== null) {
        var json = readJson();
        json.branch.push(value.toString());
        writeJson(json);
        console.log(`"${value}" added to branch array.`);
    }
}

exports.branchRemove = function (value) {
    if (value !== undefined && value !== null) {
        var json = readJson();
        var duplicate = [];
        for (let i = 0; i < json.branch.length; i++) {
            if (json.branch[i] !== value) {
                duplicate.push(json.branch[i]);
            }
        }
        json.branch = duplicate;
        writeJson(json);
        console.log(`"${value}" removed from branch array.`);
    }
}

function readJson() {
    return fs.readJsonSync(path.resolve(__dirname, './branch.json'));
}

function writeJson(json) {
    fs.writeJSONSync(path.resolve(__dirname, './branch.json'), json, {
        spaces: 2
    })
}
