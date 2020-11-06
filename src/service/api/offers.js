'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);
const {
  offerExist,
  offerValidator,
  commentValidator,
} = require(`../middlewares`);

const route = new Router();

const {getLogger} = require(`../logger`);
const logger = getLogger();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  // ресурс возвращает список объявлений
  route.get(`/`, (req, res) => {
    const categories = offerService.findAll();
    res.status(HTTP_CODE.SUCCESS)
      .json(categories);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;

    res.status(HTTP_CODE.SUCCESS).json(offer);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  // создаёт новое объявление
  route.post(`/`, offerValidator, (req, res) => {
    const {body} = req;
    const offer = offerService.create(body);

    res.status(HTTP_CODE.SUCCESS).json(offer);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  // редактирует определённое объявление
  route.put(`/:offerId`, [offerValidator, offerExist(offerService)], (req, res) => {
    const {offer} = res.locals;
    const {body} = req;
    const resOffer = offerService.update(offer, body);

    res.status(HTTP_CODE.SUCCESS).json(resOffer);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  // удаляет определённое объявление
  route.delete(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const resOffer = offerService.drop(offer);

    res.status(HTTP_CODE.SUCCESS).json(resOffer);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  // создаёт новый комментарий
  route.post(`/:offerId/comments`, [commentValidator, offerExist(offerService)], (req, res) => {
    const {offer} = res.locals;
    const {body} = req;
    const comment = commentService.create(offer, body);

    res.status(HTTP_CODE.SUCCESS).json(comment);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  // удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:offerId/comments/:commentId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const comment = commentService.drop(offer, commentId);

    if (!comment) {
      res.status(HTTP_CODE.NOT_FOUND).send(`Comment with ${commentId} not found`);
      return logger.info(`End request with status code ${res.statusCode}`);
    }

    res.status(HTTP_CODE.SUCCESS).json(comment);
    return logger.info(`End request with status code ${res.statusCode}`);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    res.status(HTTP_CODE.SUCCESS).json(comments);
    return logger.info(`End request with status code ${res.statusCode}`);
  });
};
