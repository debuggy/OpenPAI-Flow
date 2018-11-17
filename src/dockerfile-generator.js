const fs = require('fs-extra');
const _ = require('lodash');
const SchemaValidationError = require('./schema-validation-error');
const schemaValidator = require('./schema-validator');

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

async function dockerfileGenerator(configExample) {
    const configSchema = await fs.readJson('.\\schemas\\config-schema.json');
    const validation = await schemaValidator(configSchema, configExample);
    if (!validation.valid) {
        throw new SchemaValidationError(`The config validation is not passed.`, validation.errors);
    }
    const dockerFilePath = '.\\dockerfile';
    const dockerContent = await configConverter(configExample);
    await fs.outputFile(dockerFilePath, dockerContent);
    return dockerFilePath;
}

module.exports = dockerfileGenerator;
