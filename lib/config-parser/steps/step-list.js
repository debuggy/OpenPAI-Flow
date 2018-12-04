const steps = [
  require('./conda-install'),
  require('./custom'),
  require('./git').clone,
  require('./git').install,
  require('./install-conda'),
  require('./python').install
]

const result = {}

for (const step of steps) {
  if (result[step.type]) {
    throw Error(`Step ID ${step.type} is not unique.`)
  }

  result[step.type] = step
}

module.exports = result
