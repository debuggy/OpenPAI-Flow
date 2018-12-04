const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')

const dockerfileGenerator = require('../dockerfile-generator')

async function test (version) {
  if (!process.env['GELATO_DOCKER_TEST']) {
    return
  }
  const templateFile = path.resolve(__dirname, 'data', 'install-python.json')
  const dockerFile = path.resolve(__dirname, '..', '..', 'out', 'dockerfile')
  const imageName = `test_python_install_${version}`
  const containerName = `test_python_install_container_${version}`
  const template = await fs.readJSON(templateFile)
  template.run_steps[0].config.version = version
  await dockerfileGenerator(template, dockerFile)
  await execa.shell(`docker build -t ${imageName} ${path.dirname(dockerFile)}`)
  await execa.shell(`docker run --rm --name ${containerName} ${imageName}`)
  await execa.shell(`docker rmi ${imageName}`)
}

beforeAll(() => {
  if (!process.env['GELATO_DOCKER_TEST']) {
    console.log('Set environment variable GELATO_DOCKER_TEST to enable docker run/build tests')
  }
})

/* eslint-env jest */
it.each(['2', '2.6'])('string version', async (version) => {
  await test(version)
}, 500 * 1000)

/* eslint-env jest */
it.each([3, 3.7])('number version', async (version) => {
  await test(version)
}, 500 * 1000)

/* eslint-env jest */
it.each([3, 3.7])('invalid version', async (version) => {
  await test(version)
}, 500 * 1000)
