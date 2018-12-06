
function build (step) {
  return [step.config.command]
}

module.exports = {
  type: 'custom_command',
  build,
  os: ['debian', 'ubuntu'],
  command: ['run', 'entrypoint']
}
