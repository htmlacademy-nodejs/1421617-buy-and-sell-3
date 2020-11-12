'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);

const {getLogger} = require(`../logger`);

module.exports = (service) => {
  const route = new Router();
  const logger = getLogger();

  route.get(`/`, (req, res) => {
    const {title} = req.query;
    const result = service.search(title);

    if (!title) {
      res.status(HTTP_CODE.BAD_REQUEST).json({message: `Bad request`});
      return logger.info(`End request with status code ${res.statusCode}`);
    }

    if (!result.length) {
      res.status(HTTP_CODE.SUCCESS).json([]);
      return logger.info(`End request with status code ${res.statusCode}`);
    }

    res.status(HTTP_CODE.SUCCESS).json(result);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  return route;
};
