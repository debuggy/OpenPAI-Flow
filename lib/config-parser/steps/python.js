const _ = require('lodash')

const availableVersions = [
  '2',
  '2.6',
  '2.7',
  '3',
  '3.4',
  '3.5',
  '3.6',
  '3.7'
]

function install (step) {
  let version = _.toString(step.config.version) || '3.6'
  if (!availableVersions.includes(version)) {
    throw Error(`Invalid python version ${version}`)
  }

  if (version === '2') {
    version = '2.7'
  }

  const python = `python${version}`
  const result = [
    'apt-get install -y --no-install-recommends apt-utils wget software-properties-common',
    'add-apt-repository ppa:deadsnakes/ppa',
    'apt-get update',
    `apt-get install -y --no-install-recommends ${python}`
  ]

  if (version[0] === 3) {
    result.push(
      'wget -O ~/get-pip.py https://bootstrap.pypa.io/get-pip.py',
      `${python} ~/get-pip.py`,
      'pip install setuptools',
      `ln -s /usr/bin/${python} /usr/local/bin/python`,
      `ln -s /usr/bin/${python} /usr/local/bin/python3`
    )
  } else {
    result.push(
      'apt-get install -y --no-install-recommends python-pip',
      'pip install setuptools',
      `ln -s /usr/bin/${python} /usr/local/bin/python`
    )
  }

  return result
}

module.exports = {
  availableVersions,
  install: {
    type: 'install_python',
    build: install,
    os: ['ubuntu'],
    command: ['run']
  }
}
