const dockerfileGenerator = require('./dockerfile-generator');
const fs = require('fs-extra');
const path = require('path');

const dockerfilePath = path.join(__dirname, '../out/dockerfile');
fs.readJson('./examples/config-example.json')
  .then(example => dockerfileGenerator(example, dockerfilePath))
  .then(data => console.log(data))
  .catch(err => console.log(err));

module.exports = dockerfileGenerator;
