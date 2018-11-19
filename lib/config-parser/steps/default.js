
function buildDefault (step) {
  let dockerContent = ''
  dockerContent += `no processing for ${step.type}\n`
  return dockerContent
}

module.exports = {
  'type': 'default',
  'build': buildDefault
}
