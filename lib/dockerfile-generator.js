const fs = require('fs-extra')
const SchemaValidationError = require('./schema-validation-error')
const schemaValidator = require('./schema-validator')
const path = require('path')
const configParser = require('./config-parser')

async function dockerfileGenerator (config, dockerfilePath) {
  const configSchema = await fs.readJson(path.join(__dirname, '../schemas/config-schema.json'))
  const validation = await schemaValidator(configSchema, config)
  if (!validation.valid) {
    throw new SchemaValidationError(`The config validation is not passed.`, validation.errors)
  }
  const dockerContent = configParser(config)
  await fs.outputFile(dockerfilePath, dockerContent)

  return dockerfilePath
}

module.exports = dockerfileGenerator
