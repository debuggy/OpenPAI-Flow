const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')

const dockerfileGenerator = require('../../dockerfile-generator')

const testVersions = [
  { condaVerson: '4.5.11', pythonVersion: '2.7' },
  { condaVerson: 'latest', pythonVersion: '3.6' }
]

async function buildAndRun (condaVersion, pythonVersion) {
  const templateFile = path.resolve(__dirname, '..', 'data', 'install-conda.json')
  const dockerFile = path.resolve(__dirname, '..', '..', '..', 'out', 'dockerfile')
  const imageName = `test_conda_install_${condaVersion}`
  const containerName = `test_conda_install_container_${condaVersion}`
  const template = await fs.readJSON(templateFile)
  template.run_steps[0].config.conda_version = condaVersion
  template.run_steps[0].config.python_version = pythonVersion
  await dockerfileGenerator(template, dockerFile)
  await execa.shell(`docker build -t ${imageName} ${path.dirname(dockerFile)}`)
  await execa.shell(`docker run --rm --name ${containerName} ${imageName}`)
  await execa.shell(`docker rmi ${imageName}`)
}

/* eslint-env jest */
it('install conda', async () => {
  for (const { condaVersion, pythonVersion } of testVersions) {
    await buildAndRun(condaVersion, pythonVersion)
  }
}, 500 * 1000)
