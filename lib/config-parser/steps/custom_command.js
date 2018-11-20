
function buildCustom (step) {
  let dockerContent = ''
  dockerContent += `CMD ${step.config.command}\n`
  return dockerContent
}

module.exports = {
  'type': 'custom_command',
  'build': buildCustom
}
