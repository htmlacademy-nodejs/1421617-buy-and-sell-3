'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {title} = req.query;
    const result = service.search(title);

    if (!title) {
      return res.status(HTTP_CODE.BAD_REQUEST).send(`Bad request`);
    }

    if (!result.length) {
      return res.status(HTTP_CODE.NOT_FOUND).send(`Not found offer`);
    }

    return res.status(HTTP_CODE.SUCCESS).json(result);
  });
};
