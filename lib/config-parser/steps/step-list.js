const steps = [
  require('./conda-install'),
  require('./custom-command'),
  require('./git-clone'),
  require('./install-conda'),
  require('./install-python')
]

const result = {}

for (const step of steps) {
  if (result[step.type]) {
    throw Error(`Step ID ${step.type} is not unique.`)
  }

  result[step.type] = step
}

module.exports = result
