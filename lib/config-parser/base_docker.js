
function buildBase (config) {
  let dockerContent = ''
  dockerContent += `From ${config.base_docker}\n`
  return dockerContent
}

module.exports = {
  type: 'base_docker',
  build: buildBase
}