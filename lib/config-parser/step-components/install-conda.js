function buildInstallConda (step) {
  let dockerContent = `wget https://repo.continuum.io/miniconda/Miniconda3-3.7.0-Linux-x86_64.sh -O ~/miniconda.sh && \\ \n` +
                      `bash ~/miniconda.sh -b -p $HOME/miniconda && \\ \n` +
                      `export PATH="$HOME/miniconda/bin:$PATH && \\ \n"` +
                      `conda -V && \\ \n` +
                      `export CONDA_ENV_NAME='${step.config.env_name}' && \\ \n` +
                      `conda create --yes -n $CONDA_ENV_NAME python=${step.config.python_version} && \\ \n` +
                      `source activate $CONDA_ENV_NAME && \\ \n`

  return dockerContent
}

module.exports = {
  'type': 'install_conda',
  'build': buildInstallConda
}
