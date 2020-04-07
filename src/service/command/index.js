'use strict';

const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);
const commandManager = {
  '--help': help,
  '--version': version,
  '--generate': generate,
};

module.exports = commandManager;
