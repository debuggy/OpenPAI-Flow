const schemaValidator = require('../../schema-validator')
const fs = require('fs-extra')
const path = require('path')
const yaml = require('js-yaml')

/* eslint-env jest */
it('schema validation succeeds', async () => {
  expect.assertions(1)
  const schemaFile = path.resolve(__dirname, '..', '..', '..', 'schemas', 'config-schema.json')
  const schema = await fs.readJson(schemaFile)
  const exampleFile = path.resolve(__dirname, '..', '..', '..', 'examples', 'config-example.yml')
  const example = yaml.safeLoad(fs.readFileSync(exampleFile))
  const validation = await schemaValidator(schema, example)
  expect(validation.valid).toBe(true)
})

it('schema validation fails', async () => {
  expect.assertions(1)
  const schemaFile = path.resolve(__dirname, '..', '..', '..', 'schemas', 'config-schema.json')
  const schema = await fs.readJson(schemaFile)
  const exampleFile = path.resolve(__dirname, '..', 'data', 'config-negative-example.yml')
  const example = yaml.safeLoad(fs.readFileSync(exampleFile))
  const validation = await schemaValidator(schema, example)
  expect(validation.valid).toBe(false)
})
