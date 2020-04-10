'use strict';

const chalk = require(`chalk`);
const message = chalk`{grey
Программа запускает http-сервер и формирует файл с данными для API.

Гайд:
{italic server <command>}

Команды:
{italic --version:         }   выводит номер версии
{italic --help:            }   печатает этот текст
{italic --generate <count> }   формирует файл mocks.json
}`;

const run = () => {
  console.log(message);
};

module.exports = {
  run
};
