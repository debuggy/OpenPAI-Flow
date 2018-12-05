const commands = [
  require('./commands/version'),
  require('./commands/from'),
  require('./commands/shell'),
  require('./commands/env'),
  require('./commands/run'),
  require('./commands/entrypoint')
]

function buildConfig (config) {
  const result = ['']

  for (const builder of commands) {
    result.push(...builder.build(config))
    result.push('')
  }

  return result.join('\n')
}

module.exports = buildConfig
