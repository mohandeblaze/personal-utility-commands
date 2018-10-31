var gpp = require('./src/index.js');

var args = process.argv[2];
var value = process.argv[3];

if (args === 'add') {
    gpp.branchAdd(value);
} else if (args === 'remove') {
    gpp.branchRemove(value);
} else {
    gpp.gitPullPush();
}
