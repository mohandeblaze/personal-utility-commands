# Node Modules Remover

Used to remove the node_modules folder and other regular folders using Node.js.

NPM: `npm i -g node-modules-remover`

Yarn: `yarn global add node-modules-remover`

## Usage

### CLI

* Open command prompt & navigate to the root of the project where node_modules exists.
* Type `$ nmr` and hit enter to remove node_modules.
* Type `$ nmr "<folder-path>"` and hit enter to remove the specified folder (if the folder path contains spaces in it then it should be enclosed in double quotes).

> It will not delete the root folder, but it will delete all the sub and deep folders. For Example, `nmr E:\some-folder`, it will delete all the files and folders inside `some-folder` except `some-folder` itself.

### Local project

* Install `$ npm i node-modules-remover` or `$ yarn add node-modules-remover`.

```javascript
var nmr = require('node-modules-remover');
nmr('./node_modules');
nmr('./dist');
```

### Multi-folder delete

* Go to the root path of the local drive and run `$ npm link node-modules-remover` and `$ npm link path`.
* create a js file in that folder.

```javascript
var nmr  = require('node-modules-remover');
var path = require('path');

var folders = [];

folders.push(path.resolve(__dirname, 'E:\\development\\folder1'));
folders.push(path.resolve(__dirname, 'E:\\development\\folder2'));

folders.forEach(function(folder) {
    nmr(folder);
});
```
* Finally run `$ node <file-name>.js`.
