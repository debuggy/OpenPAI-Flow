
function buildBase (config) {
  return [`From ${config.base_docker.image_url}`]
}

module.exports = {
  type: 'base_docker',
  build: buildBase
}
