const _ = require('lodash')

function build (step) {
  let result = [`git clone ${step.config.url}`]

  // get git repo dir
  const repoNameReg = /\/([\w.@:-~_]+)(\/)?(\.git)?$/
  const repoName = repoNameReg.exec(step.config.url)[1]
  result.push(`cd ${repoName}`)
  if (step.config.branch !== 'master') {
    result.push(`git checkout ${step.config.branch}`)
  }
  if (!_.isEmpty(step.config.tag)) {
    result.push(`git checkout tags/${step.config.tag}`)
  }

  return result
}

module.exports = {
  type: 'git_clone',
  build,
  os: ['debian', 'ubuntu'],
  command: ['run', 'entrypoint']
}
