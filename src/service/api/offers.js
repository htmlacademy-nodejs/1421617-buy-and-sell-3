'use strict';

const {Router} = require(`express`);
const {HTTP_CODE} = require(`../constants`);
const {
  offerExist,
  offerValidator,
  commentValidator,
} = require(`../middlewares`);

const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  // ресурс возвращает список объявлений
  route.get(`/`, (req, res) => {
    const categories = offerService.findAll();
    res.status(HTTP_CODE.SUCCESS)
      .json(categories);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;

    return res.status(HTTP_CODE.SUCCESS).json(offer);
  });

  // создаёт новое объявление
  route.post(`/`, offerValidator, (req, res) => {
    const {body} = req;
    const offer = offerService.create(body);

    return res.status(HTTP_CODE.SUCCESS).json(offer);
  });

  // редактирует определённое объявление
  route.put(`/:offerId`, [offerValidator, offerExist(offerService)], (req, res) => {
    const {offer} = res.locals;
    const {body} = req;
    const resOffer = offerService.update(offer, body);

    return res.status(HTTP_CODE.SUCCESS).json(resOffer);
  });

  // удаляет определённое объявление
  route.delete(`/:offerId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const resOffer = offerService.drop(offer);

    return res.status(HTTP_CODE.SUCCESS).json(resOffer);
  });

  // создаёт новый комментарий
  route.post(`/:offerId/comments`, [commentValidator, offerExist(offerService)], (req, res) => {
    const {offer} = res.locals;
    const {body} = req;
    const comment = commentService.create(offer, body);

    return res.status(HTTP_CODE.SUCCESS).json(comment);
  });

  // удаляет из определённой публикации комментарий с идентификатором
  route.delete(`/:offerId/comments/:commentId`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const {commentId} = req.params;
    const comment = commentService.drop(offer, commentId);

    if (!comment) {
      return res.status(HTTP_CODE.NOT_FOUND).send(`Comment with ${commentId} not found`);
    }

    return res.status(HTTP_CODE.SUCCESS).json(comment);
  });

  // возвращает полную информацию определённого объявления
  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    return res.status(HTTP_CODE.SUCCESS).json(comments);
  });
};
