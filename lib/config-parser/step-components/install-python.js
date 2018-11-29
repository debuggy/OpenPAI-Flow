
function installPython (config) {
  return 'install python && \\ \n'
}

module.exports = {
  'type': 'install_python',
  'build': installPython
}
