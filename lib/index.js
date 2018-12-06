const SchemaValidationError = require('./schema-validation-error')
const schemaValidator = require('./schema-validator')
const configSchema = require('../schemas/config-schema.json')

const commands = [
  require('./commands/version'),
  require('./commands/from'),
  require('./commands/shell'),
  require('./commands/env'),
  require('./commands/run'),
  require('./commands/entrypoint')
]

function validate (config) {
  const validation = schemaValidator(configSchema, config)
  if (!validation.valid) {
    throw new SchemaValidationError(`The config validation is not passed.`, validation.errors)
  }
}

function buildConfig (config) {
  validate(config)

  const result = ['']

  for (const builder of commands) {
    result.push(...builder.build(config))
    result.push('')
  }

  return result.join('\n')
}

module.exports = buildConfig
