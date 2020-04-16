'use strict';

const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);
const server = require(`./server`);
const commandManager = {
  '--help': help,
  '--version': version,
  '--generate': generate,
  '--server': server,
};

module.exports = commandManager;
