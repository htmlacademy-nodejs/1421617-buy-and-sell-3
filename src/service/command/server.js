'use strict';

const express = require(`express`);
const {DEFAULT_PORT, HTTP_CODE} = require(`../constants`);
const routes = require(`../api`);

const app = express();

const {getLogger} = require(`../logger`);
const logger = getLogger();

const run = async (port, mode = `listen`) => {
  port = port || DEFAULT_PORT;

  app
    .use(express.json())
    .use((req, res, next) => {
      logger.debug(`Start request type ${req.method} to url ${req.url}`);
      next();
    })
    .use(`/api`, await routes())
    .use((req, res) => {
      res.status(HTTP_CODE.NOT_FOUND).json({message: `Not found`});

      // Записываем, что запрос закончился неудачей
      logger.error(`End request with error ${res.statusCode}`);
    });

  if (mode === `listen`) {
    app
      .listen(port, () => logger.info(`Server worked on http://localhost:${port}`))
      .on(`error`, (err) => logger.error(`Server can't start. Error: ${err}`));
  }

  return app;
};

module.exports = {
  run
};
