'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {DEFAULT_PORT, HTTP_CODE} = require(`../constants`);
const routes = require(`../api`);

const app = express();

const run = (port) => {
  port = port || DEFAULT_PORT;

  app
    .use(express.json())
    .use(`/api`, routes)
    .use((req, res) => res.status(HTTP_CODE.NOT_FOUND).send(`Not found`))
    .listen(port, () => console.log(chalk`{blue Сервер работает на http://localhost:${port}}`));
};

module.exports = {
  run
};
