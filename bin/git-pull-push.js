#!/usr/bin/env node

var gpp = require('../src/index');
var args = process.argv[2];
var value = process.argv[3];

const shell = require('shelljs');
const inquirer = require("inquirer");
const fs = require('fs-extra');
const path = require('path');

const prettierrc = `{
    "singleQuote": true,
    "semi": true,
    "printWidth": 115,
    "tabWidth": 4,
    "jsxBracketSameLine": true,
    "jsxSingleQuote": true
}`;

if (args === 'add') {
    gpp.branchAdd(value);
} else if (args === 'remove') {
    gpp.branchRemove(value);
} else if (args === 'o') {
    gpp.gitPullPush(args, value);
} else if (args === 'rc') {
    gpp.npmrc(`${process.cwd()}`);
} else if (args === 'pnpm') {
    gpp.npmrc(args);
} else if (args === '-d') {
    nodeDebug(process.argv[3], process.argv[4]);
} else if (args === 'pretty') {
    const targetPath = process.cwd();
    fs.writeFileSync(path.resolve(`${targetPath}/.prettierrc`), prettierrc);
} else if (args === 'git') {
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
