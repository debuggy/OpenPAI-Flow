const gelato = require('../..')
const SchemaValidationError = require('../../schema-validation-error')
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

/* eslint-env jest */
it('throws schema validation error', async () => {
  const templateFile = path.resolve(__dirname, '..', 'data', 'config-negative-example.yml')
  const template = yaml.safeLoad(fs.readFileSync(templateFile))
  expect(() => gelato(template)).toThrow(SchemaValidationError)
})

it.each([
  path.resolve(__dirname, '..', '..', '..', 'examples', 'config-example.json'),
  path.resolve(__dirname, '..', 'data', 'install-conda.json'),
  path.resolve(__dirname, '..', 'data', 'install-python.json'),
  path.resolve(__dirname, '..', 'data', 'pip-install.json'),
  path.resolve(__dirname, '..', 'data', 'hdfs-download-insecure.json'),
  path.resolve(__dirname, '..', 'data', 'hdfs-download-token.json')
])('generates dockerfile successfully', async (filePath) => {
  const template = await fs.readJson(filePath)
  expect(typeof gelato(template)).toBe('string')
})
