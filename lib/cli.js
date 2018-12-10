const fs = require('fs')
const gelato = require('./')
const SchemaValidationError = require('./schema-validation-error')

const configPath = process.argv[2]

if (!configPath) {
  console.log('Usage: gelato <config file>')
  console.log('A dockerfile generator')
  process.exit(-1)
} else {
  try {
    const file = fs.readFileSync(configPath)
    const json = JSON.parse(file)
    console.log(gelato(json))
  } catch (e) {
    if (e instanceof SchemaValidationError) {
      console.log(`${e.message}, details:`)
      console.log(e.validationDetails)
    } else {
      console.log(e)
    }
  }
}
