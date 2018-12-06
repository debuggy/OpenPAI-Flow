module.exports = {
  writeBashrc: (content) => `echo "${content}" >> ~/.bashrc && source ~/.bashrc`,
  aptInstall: (...packages) => `apt-get install -y --no-install-recommends ${packages.join(' ')}`
}
