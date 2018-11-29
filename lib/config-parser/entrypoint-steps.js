const _ = require('lodash')

const customCommand = require('./step-components/custom-command')
const defaultStep = require('./step-components/default')

const entrypointsList = [customCommand]

function selectEntrypointBuilder (stepType) {
  return entrypointsList.find(item => item.type === stepType)
}

function buildSteps (config) {
  let dockerContent = ''
  for (let step of config.entrypoint_steps) {
    let entrypointBuilder = selectEntrypointBuilder(step.type)
    if (_.isNil(entrypointBuilder)) {
      // throw new Error(`cannot find step builder: '${step.type}'`)
      entrypointBuilder = defaultStep
    }
    dockerContent += '           ' + entrypointBuilder.build(step)
  }
  dockerContent = 'ENTRYPOINT' + dockerContent.substring(10, dockerContent.length - 6) + '\n\n'

  return dockerContent
}

module.exports = {
  type: 'entrypoint_steps',
  build: buildSteps
}
