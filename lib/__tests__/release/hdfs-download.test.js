const fs = require('fs-extra')
const path = require('path')

const util = require('../util')

/* eslint-env jest */
it('hdfs download', async () => {
  const templateFile = path.resolve(__dirname, '..', 'data', 'hdfs-download-insecure.json')
  const template = await fs.readJSON(templateFile)
  await util.buildAndRun(template, 'hdfs')
}, 500 * 1000)
