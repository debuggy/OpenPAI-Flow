const _ = require('lodash')

const customCommand = require('./step-components/custom-command')
const installPython = require('./step-components/install-python')
const defaultStep = require('./step-components/default')

const runStepsList = [customCommand, installPython]

function selectRunBuilder (stepType) {
  return runStepsList.find(item => item.type === stepType)
}

function buildSteps (config) {
  let dockerContent = ''
  for (let step of config.run_steps) {
    let runBuilder = selectRunBuilder(step.type)
    if (_.isNil(runBuilder)) {
      // throw new Error(`cannot find step builder: '${step.type}'`)
      runBuilder = defaultStep
    }
    dockerContent += '    ' + runBuilder.build(step)
  }
  dockerContent = 'RUN' + dockerContent.substring(3, dockerContent.length - 6) + '\n\n'

  return dockerContent
}

module.exports = {
  type: 'run_steps',
  build: buildSteps
}
