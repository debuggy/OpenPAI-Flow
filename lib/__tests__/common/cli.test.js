const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')
const _ = require('lodash')

const cliPath = path.resolve(__dirname, '..', '..', 'cli.js')
const examplePath = path.resolve(__dirname, '..', '..', '..', 'examples', 'config-example.json')
const outputDir = path.resolve(__dirname, '..', '..', '..', 'out', 'cli')

/* eslint-env jest */
it('cli wrong arguments', async () => {
  try {
    await execa.shell(`node ${cliPath}`)
  } catch (e) {
    expect(_.includes(e.stderr, 'Arguments error!'))
  }
})

/* eslint-env jest */
it('cli output dockerfile successfully', async () => {
  await execa.shell(`node ${cliPath} ${examplePath}`)
}, 5 * 1000)

/* eslint-env jest */
it('cli save dockerfile successfully', async () => {
  expect.assertions(1)
  await fs.remove(outputDir)
  await execa.shell(`node ${cliPath} --output ${outputDir} ${examplePath}`)
  const result = await fs.pathExists(path.join(outputDir, 'dockerfile'))
  expect(result).toBe(true)
})
