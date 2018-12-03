module.exports = {
  type: 'install_python',
  build: () => ['echo "install python is not supported"'],
  os: ['debian', 'ubuntu'],
  command: ['run']
}
