'use strict';

const help = require(`./help`);
const version = require(`./version`);
const generate = require(`./generate`);
const alias = {
  '--help': help,
  '--version': version,
  '--generate': generate,
};

const commandManager = (name, count) => {
  if (name) {
    alias[name].run(count);
    return;
  }

  help.run();
};

module.exports = commandManager;
