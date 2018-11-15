const Ajv = require('ajv');
const configSchema = require('../config_schema.json');
const fs = require('fs');

const ajv = new Ajv();
const validate = ajv.compile(configSchema);
const valid = validate()
