const dockerfileGenerator = require('../../dockerfile-generator')
const SchemaValidationError = require('../../schema-validation-error')
const fs = require('fs-extra')
const path = require('path')

/* eslint-env jest */
it('throws schema validation error', async () => {
  expect.assertions(1)
  const templateFile = path.resolve(__dirname, '..', 'data', 'config-negative-example.json')
  const template = await fs.readJson(templateFile)
  await expect(dockerfileGenerator(template)).rejects.toThrow(SchemaValidationError)
})

it('generates dockerfile successfully', async () => {
  expect.assertions(2)
  const templateFile = path.resolve(__dirname, '..', '..', '..', 'examples', 'config-example.json')
  const template = await fs.readJson(templateFile)
  const dockerFilePath = path.resolve(__dirname, '..', '..', '..', 'out', 'dockerfile')
  await fs.remove(dockerFilePath)
  const result = await dockerfileGenerator(template, dockerFilePath)
  expect(result).toEqual(dockerFilePath)
  expect(await fs.pathExists(dockerFilePath)).toBeTruthy()
})
