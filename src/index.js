const shell = require('shelljs');
const inquirer = require("inquirer");

function gitPullPush() {
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

    askQuestions().then(function(answer) {
        shell.exec(`git pull origin ${answer.BRANCH}`, {
            async: false
        });

        shell.exec(`git push`, {
            async: false
        });
    })
}
function askQuestions() {
    const questions = [{
        type: "list",
        name: "BRANCH",
        message: "Which branch is your target?",
        choices: ["development", "master"]
    }];
    return inquirer.prompt(questions);
};

module.exports = gitPullPush;
