function buildInstallConda (step) {
  return [
    'wget https://repo.continuum.io/miniconda/Miniconda3-3.7.0-Linux-x86_64.sh -O ~/miniconda.sh',
    'bash ~/miniconda.sh -b -p $HOME/miniconda',
    'export PATH="$HOME/miniconda/bin:$PATH"',
    'conda -V',
    `export CONDA_ENV_NAME='${step.config.env_name}'`,
    `conda create --yes -n $CONDA_ENV_NAME python=${step.config.python_version}`,
    'source activate $CONDA_ENV_NAME'
  ]
}

module.exports = {
  type: 'install_conda',
  build: buildInstallConda,
  os: ['debian', 'ubuntu'],
  command: ['run']
}
