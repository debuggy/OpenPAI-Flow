module.exports = {
  type: 'conda_install',
  build: () => ['echo "conda install is not supported"'],
  os: ['debian', 'ubuntu'],
  command: ['run', 'entrypoint']
}
