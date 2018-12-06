const fs = require('fs')
const gelato = require('./')

const configPath = process.argv[2]

if (!configPath) {
  console.log('Usage: gelato <config file>')
  console.log('A dockerfile generator')
  process.exit(-1)
} else {
  const file = fs.readFileSync(configPath)
  const json = JSON.parse(file)
  console.log(gelato(json))
}
