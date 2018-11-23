#!/usr/bin/env node

var gpp = require('../src/index');
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
} else if (args === 'pnpm') {
    gpp.npmrc(args);
} else if (args === '-d') {
    nodeDebug(process.argv[3], process.argv[4]);
} else {
    gpp.gitPullPush();
}

function nodeDebug(moduleName, command) {
    var module = fs.readFileSync(path.resolve(`${process.cwd()}/node_modules/.bin/${moduleName}`)).toString();
    var cliPath = module.match(/basedir\/\.\.\/.+?"/)[0].split('../')[1].split("\"")[0];

    shell.exec(
        `node --inspect-brk node_modules${path.sep}${cliPath} ${command}`, {
            async: false
        });

}
