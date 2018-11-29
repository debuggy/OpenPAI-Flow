const version = require('./version')
const baseDocker = require('./base-docker')
const envVariables = require('./env-variables')
const runSteps = require('./run-steps')
const entrypointSteps = require('./entrypoint-steps')
const _ = require('lodash')

const componentsList = [version, baseDocker, envVariables, runSteps, entrypointSteps]

function selectComponent (type) {
  const component = componentsList.find(item => item.type === type)
  if (_.isNil(component)) {
    throw new Error(`cannot find component: '${type}'`)
  }

  return component
}

function buildConfig (config) {
  let dockerContent = ''

  if (!_.isNil(config.version)) {
    dockerContent += selectComponent('version').build(config)
  }

  if (!_.isNil(config.base_docker)) {
    dockerContent += selectComponent('base_docker').build(config)
  }

  if (!_.isNil(config.env_variables)) {
    dockerContent += selectComponent('env_variables').build(config)
  }

  if (!_.isNil(config.run_steps)) {
    dockerContent += selectComponent('run_steps').build(config)
  }

  if (!_.isNil(config.entrypoint_steps)) {
    dockerContent += selectComponent('entrypoint_steps').build(config)
  }

  return dockerContent
}

module.exports = buildConfig
