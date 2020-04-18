'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/`, (req, res) => res.render(`pages/main`));
router.get(`/register`, (req, res) => res.render(`pages/sign-up`));
router.get(`/login`, (req, res) => res.render(`pages/login`));
router.get(`/search`, (req, res) => res.render(`pages/search-result`));

module.exports = router;
