
function buildEnv (config) {
  return Object.entries(config.env_variables).map(
    ([key, val]) => `ENV ${key}="${val}"`
  )
}

module.exports = {
  type: 'env_variables',
  build: buildEnv
}
