const path = require('path');
const pak = require('../package.json');


console.log(pak.name);

console.log(path.join(__dirname, '..', pak.source))