'use strict';
const {HTTP_CODE} = require(`../constants`);
const offerKeys = [`text`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HTTP_CODE.BAD_REQUEST)
      .send(`Bad request`);
  }

  return next();
};
