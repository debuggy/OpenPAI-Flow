const _ = require('lodash')

const customCommand = require('./custom_command')
const installPython = require('./install_python')
const defaultStep = require('./default')

const stepsList = [customCommand, installPython]

function selectStepBuilder (stepType) {
  return stepsList.find(item => item.type === stepType)
}

function buildSteps (config) {
  let dockerContent = ''
  for (let step of config.steps) {
    let stepBuilder = selectStepBuilder(step.type)
    if (_.isNil(stepBuilder)) {
      // throw new Error(`cannot find step builder: '${step.type}'`)
      stepBuilder = defaultStep
    }
    dockerContent += stepBuilder.build(step)
  }

  return dockerContent
}

module.exports = {
  type: 'steps',
  build: buildSteps
}
