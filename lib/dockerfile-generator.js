const fs = require('fs-extra');
const _ = require('lodash');
const SchemaValidationError = require('./schema-validation-error');
const schemaValidator = require('./schema-validator');
const path = require('path');

async function configConverter(config) {
    let dockerContent = '';
    dockerContent += `From ${config.base_docker}\n`; 
    if (!_.isNil(config.env_variables)) {
        for (const envKey in config.env_variables) {
            dockerContent += `ENV ${envKey}=${config.env_variables[envKey]}\n`;
        }
    }
    if (!_.isNil(config.steps)) {
        for (buildStep of config.steps) {
            if (buildStep.type == 'custom') {
                dockerContent += `CMD ${buildStep.config.command}\n`;
            }
        }
    }

    return dockerContent;
}

async function dockerfileGenerator(config, dockerfilePath) {
    const configSchema = await fs.readJson(path.join(__dirname, '../schemas/config-schema.json'));
    const validation = await schemaValidator(configSchema, config);
    if (!validation.valid) {
        throw new SchemaValidationError(`The config validation is not passed.`, validation.errors);
    }
    const dockerContent = await configConverter(config);
    await fs.outputFile(dockerfilePath, dockerContent);
    return dockerfilePath;
}

module.exports = dockerfileGenerator;
