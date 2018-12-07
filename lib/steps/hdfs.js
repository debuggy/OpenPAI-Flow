function download (step) {
  const result = [
    `(pip -V || (echo "Error: pip is not installed" && exit 1))`
  ]
  result.push(
    'pip install hdfs',
    'echo "[global]" >> ~/.hdfscli.cfg',
    'echo "default.alias = dev" >> ~/.hdfscli.cfg',
    'echo "[dev.alias]" >> ~/.hdfscli.cfg',
    `echo "url = ${step.config.url}" >> ~/.hdfscli.cfg`,
    `hdfscli download ${step.config.source_path} ${step.config.destination_path}`
  )

  return result
}

module.exports = {
  download: {
    type: 'hdfs_download',
    build: download,
    os: ['ubuntu'],
    command: ['entrypoint']
  }
}
