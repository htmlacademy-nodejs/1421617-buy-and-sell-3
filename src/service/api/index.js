'use strict';

const {Router} = require(`express`);
const categories = require(`./categories`);
const offers = require(`./offers`);
const search = require(`./search`);

const {getMockData} = require(`../lib/get-mock-data`);
const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService
} = require(`../data-service`);

const routes = async () => {
  const router = new Router();
  const mockData = await getMockData();

  router.use(`/categories`, categories(new CategoryService(mockData)));
  router.use(`/offers`, offers(new OfferService(mockData), new CommentService()));
  router.use(`/search`, search(new SearchService(mockData)));

  return router;
};

module.exports = routes;
