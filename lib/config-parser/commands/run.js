const _ = require('lodash')

const steps = require('../steps/step-list')

function buildSteps (config) {
  const result = []
  for (const step of config.run_steps) {
    const builder = steps[step.type]
    if (_.isNil(builder)) {
      throw Error(`cannot find step builder: '${step.type}'`)
    }
    if (!builder.command.includes('run')) {
      throw Error(`Step ${step.type} doesn't support RUN`)
    }
    if (!builder.os.includes(config.base_docker.os)) {
      throw Error(`Step ${step.type} doesn't support ${config.base_docker.os} OS`)
    }
    result.push(...builder.build(step))
  }

  return [`RUN ${result.join(` && \\ \n${' '.repeat(4)}`)}`]
}

module.exports = {
  type: 'run_steps',
  build: buildSteps
}
