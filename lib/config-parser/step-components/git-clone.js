const _ = require('lodash')

function buildInstallConda (step) {
  let dockerContent = `git clone ${step.config.url} && \\ \n`

  // get git repo dir
  const repoNameReg = /\/([\w.@:-~_]+)\.git/
  const repoName = repoNameReg.exec(step.config.url)[1]
  dockerContent += `cd ${repoName} && \\ \n`
  if (step.config.branch !== 'master') {
    dockerContent += `git checkout ${step.config.branch} && \\ \n`
  }
  if (!_.isNil(step.config.tag)) {
    dockerContent += `git checkout tags/${step.config.tag} && \\ \n`
  }

  return dockerContent
}

module.exports = {
  'type': 'install_conda',
  'build': buildInstallConda
}
