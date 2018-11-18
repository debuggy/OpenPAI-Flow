const dockerfileGenerator = require('../dockerfile-generator')
const SchemaValidationError = require('../schema-validation-error')
const fs = require('fs-extra')
const path = require('path')

/* eslint-env jest */
it('throws schema validation error', async () => {
  expect.assertions(1)
  const negativeExample = await fs.readJson('./examples/config-negative-example.json')
  await expect(dockerfileGenerator(negativeExample)).rejects.toThrow(SchemaValidationError)
})

it('generates dockerfile successfully', async () => {
  expect.assertions(1)
  const example = await fs.readJson('./examples/config-example.json')
  const dockerFilePath = path.join(__dirname, '../../out/dockerfile')
  await fs.remove(dockerFilePath)
  const result = await dockerfileGenerator(example, dockerFilePath)
  expect(result).toEqual(dockerFilePath)
  expect(await fs.pathExists(dockerFilePath)).toBeTruthy()
})
