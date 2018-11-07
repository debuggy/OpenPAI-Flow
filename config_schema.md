# Configuring PAI Flow

## Table of Contents
- [version](#version)
- [image](#image)
  - [name](#name)
  - [registry (reserved)](#registry)
- environment
- data
- code
- output

## version

| Key     | Required | Type   | Discription                                              |
|---------|----------|--------|----------------------------------------------------------|
| version | Y        | String | The version of config definition. Current version is 0.1 |

The version field is intended to be used in order to issue warnings for deprecation or breaking changes.

## image_name

| Key     | Required | Type   | Discription                                              |
|---------|----------|--------|----------------------------------------------------------|
| name    | Y        | String |  |