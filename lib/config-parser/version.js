
function buildVersion (config) {
  return `# version: ${config.version}\n`
}

module.exports = {
  type: 'version',
  build: buildVersion
}
