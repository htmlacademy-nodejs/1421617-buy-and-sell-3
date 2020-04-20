'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, HTTP_CODE, MOCK_FILE_NAME} = require(`../constants`);

const app = express();

const getOffers = async (req, res) => {
  try {
    const fileContent = await fs.readFile(MOCK_FILE_NAME, `utf8`);
    const mockList = JSON.parse(fileContent);

    res.json(mockList);
  } catch (err) {
    res.json([]);
  }
};

const run = (port) => {
  port = port || DEFAULT_PORT;

  app
    .use(express.json())
    .get(`/offers`, getOffers)
    .use((req, res) => res.status(HTTP_CODE.NOT_FOUND).send(`Not found`))
    .listen(port, () => console.log(chalk`{blue Сервер работает на http://localhost:${port}}`));
};

module.exports = {
  run
};
