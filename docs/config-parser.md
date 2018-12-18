# Config Parser Design

- build-base

  `From ${config.base_docker}\n`

- build-env

  `ENV ${config.env_variables}\n`

- install
  - export universal interface with a type and a function
  - conda
  - python os
  - conda command
  - pip command
  - custom command
  - hdfs copy

- custom
  - publish to npm with a tag
  - expose a certain function
  - get tag list to require
