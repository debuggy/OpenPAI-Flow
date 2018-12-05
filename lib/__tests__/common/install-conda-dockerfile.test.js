const fs = require('fs-extra')
const path = require('path')

const dockerfileGenerator = require('../../dockerfile-generator')

/* eslint-env jest */
it('generate dockerfile with conda', async () => {
  const templateFile = path.resolve(__dirname, '..', 'data', 'install-conda.json')
  const dockerFile = path.resolve(__dirname, '..', '..', '..', 'out', 'dockerfile')
  const template = await fs.readJSON(templateFile)
  expect.assertions(2)
  await fs.remove(dockerFile)
  const result = await dockerfileGenerator(template, dockerFile)
  expect(result).toEqual(dockerFile)
  expect(await fs.pathExists(dockerFile)).toBeTruthy()
})
