# Configuring PAI Flow

## Table of Contents
- [version](#version)
- [environment]()
  - [base_docker](#base_docker)
  - [os](#os)
  - [env_variable](#env_variable)
  - [general_components(job type?)](#general_components)
    - tensorflow
      - version
      - is_gpu
      - is_distributed
    - pytorch
    - sklearn
  - [python_requirements](#python_requirements)
  - [custom_commands](#custom_commands)
- [dataset]()
  - [hdfs]()
    - mount
    - copy
  - [azure]()
    - file_share
    - blob
  - [nfs]()
    - data_dir
  - [local]()
    - data_dir
    - file_type
  - [http]()
    - url
    - request
  - [custom]()
    - commands
- [code]()
  - [git_repository]()
  - [local]()
    - base_path
    - start_command
- [pai_image]()
  - [name](#name)
  - [registry (reserved)](#registry)
- [output]()
  - [hdfs]()
  - [ssh]()
  - [nfs]()
  - [git_repository]()
  - [http]()
  - [ftp]()


## version

| Key     | Required | Type   | Discription                                              |
|---------|----------|--------|----------------------------------------------------------|
| version | Y        | String | The version of config definition. Current version is 0.1 |

The version field is intended to be used in order to issue warnings for deprecation or breaking changes.





## image_name

| Key     | Required | Type   | Discription                                              |
|---------|---------|--------|----------------------------------------------------------|
| name    | Y        | String |  |