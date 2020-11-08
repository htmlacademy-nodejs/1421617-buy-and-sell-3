'use strict';
const {HTTP_CODE} = require(`../constants`);
const offerKeys = [`category`, `description`, `picture`, `title`, `type`, `sum`];

const {getLogger} = require(`../logger`);
const logger = getLogger();

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = offerKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    res.status(HTTP_CODE.BAD_REQUEST).json({message: `Bad request`});
    return logger.info(`End request with status code ${res.statusCode}`);
  }

  return next();
};
