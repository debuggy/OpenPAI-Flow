const Ajv = require('ajv');
const fs = require('fs-extra');
const _ = require('lodash');
const SchemaValidationError = require('./schema-validation-error');

async function validateJson(schema, data) {
    const ajv = new Ajv();
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return { valid: false, errors: ajv.errors};
    } else {
        return { valid: true };
    }
}

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

async function dockerGen() {
    const configSchema = await fs.readJson('.\\config-schema.json');
    const configExample = await fs.readJson('.\\examples\\config-negative-example.json');
    const validation = await validateJson(configSchema, configExample);
    if (!validation.valid) {
        throw new SchemaValidationError(`The config validation is not passed.`, validation.errors);
    }

    const dockerContent = await configConverter(configExample);
    const dockerFilePath = '.\\dockerfile';
    await fs.outputFile(dockerFilePath, dockerContent);
    return 'success';
}

dockerGen().then((data) => {
    console.log(data);
}).catch((err) => {
    console.log(err);
});