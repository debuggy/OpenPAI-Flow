const version = require('./version')
const baseDocker = require('./base_docker')
const envVariables = require('./env_variables')
const steps = require('./steps')
const _ = require('lodash')

const componentsList = [version, baseDocker, envVariables, steps]

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

  if (!_.isNil(config.steps)) {
    dockerContent += selectComponent('steps').build(config)
  }

  return dockerContent
}

module.exports = buildConfig
