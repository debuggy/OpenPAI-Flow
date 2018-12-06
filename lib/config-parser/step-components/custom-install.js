
function buildCustomInstall (step) {
  let dockerContent = ''
  dockerContent += `${step.config.command} && \\ \n`
  return dockerContent
}

module.exports = {
  'type': 'custom_command',
  'build': buildCustomInstall
}
