const fs = require('fs-extra')
const path = require('path')

const util = require('../util')

const testVersions = [
  { condaVersion: '4.5.11', pythonVersion: '2.7' },
  { condaVersion: 'latest', pythonVersion: '3.6' }
]

async function buildAndRun (condaVersion, pythonVersion) {
  const templateFile = path.resolve(__dirname, '..', 'data', 'install-conda.json')
  const template = await fs.readJSON(templateFile)
  template.run_steps[0].config.conda_version = condaVersion
  template.run_steps[0].config.python_version = pythonVersion
  await util.buildAndRun(template, `conda_${condaVersion}_py${pythonVersion}`)
}

/* eslint-env jest */
it('install conda', async () => {
  for (const { condaVersion, pythonVersion } of testVersions) {
    await buildAndRun(condaVersion, pythonVersion)
  }
}, 500 * 1000)
