'use strict';

const commandManager = require(`./command`);
const cliArgsIndex = 2;
const cliArgs = process.argv.slice(cliArgsIndex);
const [name, count] = cliArgs;

commandManager(name, count);
