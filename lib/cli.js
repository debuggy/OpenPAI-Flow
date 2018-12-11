const fs = require('fs-extra')
const gelato = require('./')
const SchemaValidationError = require('./schema-validation-error')
const meow = require('meow')
const path = require('path')

const cli = meow(`
  Usage
    $ gelato <config file>

  Options
    --output, -o  Save docker file in a directory
    --help, help document

  Examples
    $ gelato --output ./out ./config.json
`, {
  flags: {
    output: {
      type: 'string',
      alias: 'o'
    }
  }
})

if (cli.input.length === 0 || cli.input.length > 1) {
  console.error('Arguments error!')
  console.error('Usage: gelato <config file>')
  process.exit(1)
} else {
  const configPath = cli.input[0]
  try {
    if (!fs.pathExistsSync(configPath)) {
      console.log(`cannot find the config file: ${configPath}`)
    }
    const file = fs.readFileSync(configPath)
    const json = JSON.parse(file)
    const result = gelato(json)
    if (cli.flags.output) {
      const outputDir = cli.flags.output
      fs.ensureDirSync(outputDir)
      fs.writeFileSync(path.join(outputDir, 'dockerfile'), result)
      console.log(`save docker file in ${outputDir}`)
    } else {
      console.log(gelato(json))
    }
  } catch (e) {
    if (e instanceof SchemaValidationError) {
      console.log(`${e.message}, details:`)
      console.log(e.validationDetails)
    } else {
      console.log(e)
    }
  }
}
