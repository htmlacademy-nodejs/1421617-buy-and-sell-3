'use strict';

const {Router} = require(`express`);
const router = new Router();

router.get(`/category/:id`, (req, res) => res.render(`pages/category`));
router.get(`/add`, (req, res) => res.render(`pages/new-ticket`));
router.get(`/edit/:id`, (req, res) => res.render(`pages/ticket-edit`));
router.get(`/:id`, (req, res) => res.render(`pages/main`));

module.exports = router;
