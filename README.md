therify-cli
===========

Therify CLI 

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/therify-cli.svg)](https://npmjs.org/package/therify-cli)
[![Downloads/week](https://img.shields.io/npm/dw/therify-cli.svg)](https://npmjs.org/package/therify-cli)
[![License](https://img.shields.io/npm/l/therify-cli.svg)](https://github.com/JessieWooten/therify-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g therify-cli
$ therify COMMAND
running command...
$ therify (-v|--version|version)
therify-cli/0.0.0 darwin-x64 node-v14.15.1
$ therify --help [COMMAND]
USAGE
  $ therify COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`therify hello [FILE]`](#therify-hello-file)
* [`therify help [COMMAND]`](#therify-help-command)

## `therify hello [FILE]`

describe the command here

```
USAGE
  $ therify hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ therify hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/JessieWooten/therify-cli/blob/v0.0.0/src/commands/hello.ts)_

## `therify help [COMMAND]`

display help for therify

```
USAGE
  $ therify help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_
<!-- commandsstop -->
