const version = require('./commands/version')
const from = require('./commands/from')
const env = require('./commands/env')
const run = require('./commands/run')
const entrypoint = require('./commands/entrypoint')

const commands = {
  'version': version,
  'base_docker': from,
  'run_steps': run,
  'entrypoint_steps': entrypoint,
  'env_variables': env
}

function buildConfig (config) {
  const result = []

  for (const [ key, builder ] of Object.entries(commands)) {
    if (config[key]) {
      result.push(...builder.build(config))
      result.push('')
    }
  }

  return result.join('\n')
}

module.exports = buildConfig
