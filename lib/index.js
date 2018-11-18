const dockerfileGenerator = require('./dockerfile-generator');
const fs = require('fs-extra');

fs.readJson('./examples/config-example.json')
  .then(example => dockerfileGenerator(example))
  .then(data => console.log(data))
  .catch(err => console.log(err));

module.exports = dockerfileGenerator;
