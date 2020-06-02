'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/categories`, route);

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(HTTP_CODE.SUCCESS).json(categories);
  });
};
