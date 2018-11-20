
function buildEnv (config) {
  let dockerContent = ''
  for (const envKey in config.env_variables) {
    dockerContent += `ENV ${envKey}=${config.env_variables[envKey]}\n`
  }
  return dockerContent
}

module.exports = {
  type: 'env_variables',
  build: buildEnv
}
