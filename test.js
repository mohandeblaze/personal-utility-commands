var gpp = require('./src/index.js');

var args = process.argv[2];
var value = process.argv[3];

const shell = require('shelljs');
const inquirer = require("inquirer");
const fs = require('fs-extra');
const path = require('path');


if (args === 'add') {
    gpp.branchAdd(value);
} else if (args === 'remove') {
    gpp.branchRemove(value);
} else if (args === 'o') {
    gpp.gitMaster(args, value);
} else if (args === 'rc') {
    gpp.npmrc(`${process.cwd()}`);
} else if (args === 'gulp') {
    gpp.npmrc(args);
} else if (args === 'debug') {
    nodeDebug(process.argv[3], process.argv[4]);
} else {
    gpp.gitPullPush();
}

function nodeDebug(value, command) {
    if (value === 'gulp') {
        shell.exec(
            `node --inspect-brk node_modules${path.sep}gulp${path.sep}bin${path.sep}gulp ${command}`, {
                async: false
            });
    }
}
