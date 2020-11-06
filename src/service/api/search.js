'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);

const route = new Router();

const {getLogger} = require(`../logger`);
const logger = getLogger();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {title} = req.query;
    const result = service.search(title);

    if (!title) {
      res.status(HTTP_CODE.BAD_REQUEST).send(`Bad request`);
      return logger.info(`End request with status code ${res.statusCode}`);
    }

    if (!result.length) {
      res.status(HTTP_CODE.SUCCESS).json([]);
      return logger.info(`End request with status code ${res.statusCode}`);
    }

    res.status(HTTP_CODE.SUCCESS).json(result);
    return logger.info(`End request with status code ${res.statusCode}`);
  });
};
