function buildCondaInstall (step) {
  const packages = step.config.packages
  return [`conda install ${packages.join(' ')}`]
}

module.exports = {
  type: 'conda_install',
  build: buildCondaInstall,
  os: ['debian', 'ubuntu'],
  command: ['run', 'entrypoint']
}
