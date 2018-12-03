
function buildVersion (config) {
  return [`# version: ${config.version}`]
}

module.exports = {
  type: 'version',
  build: buildVersion
}
