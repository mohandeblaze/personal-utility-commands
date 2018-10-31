var gulp = require('gulp');
const fsExtra = require('fs-extra');
const shell = require('shelljs');

gulp.task('publish', function () {
    var packageJson = fsExtra.readJsonSync('package.json');
    var version = parseInt(packageJson.version.split('.')[2]);
    version = (++version).toString();
    packageJson.version = packageJson.version.split('.')[0] + '.' + packageJson.version.split('.')[1] + '.' +
        version;
    fsExtra.writeJsonSync('package.json', packageJson, {
        spaces: 2
    });

    shell.exec('npm publish', {
        silent: false
    });
})
