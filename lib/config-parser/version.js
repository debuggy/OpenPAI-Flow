
function buildVersion (config) {
  return `# version: ${config.version}\n \n`
}

module.exports = {
  type: 'version',
  build: buildVersion
}
