module.exports = {
  type: 'shell',
  build: (config) => ['SHELL ["/bin/bash", "-c"]', 'ENV BASH_ENV=~/.bashrc']
}
