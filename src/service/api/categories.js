'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);
const {getLogger} = require(`../logger`);

module.exports = (service) => {
  const route = new Router();
  const logger = getLogger();

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(HTTP_CODE.SUCCESS).json(categories);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  return route;
};
