'use strict';

const {Router} = require(`express`);
const router = new Router();

const handleRequest = (req, res) => {
  res.send(req.url);
};

router.get(`/`, handleRequest);
router.get(`/register`, handleRequest);
router.get(`/login`, handleRequest);
router.get(`/my`, handleRequest);
router.get(`/my/comments`, handleRequest);
router.get(`/offers/category/:id`, handleRequest);
router.get(`/offers/add`, handleRequest);
router.get(`/search`, handleRequest);
router.get(`/offers/edit/:id`, handleRequest);
router.get(`/offers/:id`, handleRequest);

module.exports = router;
