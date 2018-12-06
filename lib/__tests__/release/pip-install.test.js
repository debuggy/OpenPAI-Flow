const fs = require('fs-extra')
const path = require('path')

const buildAndRun = require('../util').buildAndRun

/* eslint-env jest */
it('build and run pip-install image', async () => {
  const templateFilePath = path.resolve(__dirname, '..', 'data', 'pip-install.json')
  const template = await fs.readJSON(templateFilePath)
  await buildAndRun(template, 'pip_success')
}, 500 * 1000)

/* eslint-env jest */
it('failed when pip is not installed', async () => {
  const templateFilePath = path.resolve(__dirname, '..', 'data', 'pip-install-no-pip.json')
  const template = await fs.readJSON(templateFilePath)
  expect.assertions(1)
  await expect(buildAndRun(template, 'pip_failed')).rejects.toThrowError()
}, 500 * 1000)
