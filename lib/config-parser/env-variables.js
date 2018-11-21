
function buildEnv (config) {
  let dockerContent = ''
  for (const envKey in config.env_variables) {
    dockerContent += `    ${envKey}=${config.env_variables[envKey]} \\ \n`
  }
  dockerContent = 'ENV' + dockerContent.substring(3, dockerContent.length - 4) + '\n\n'

  return dockerContent
}

module.exports = {
  type: 'env_variables',
  build: buildEnv
}
