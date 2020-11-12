'use strict';
const {HTTP_CODE} = require(`../constants`);

const {getLogger} = require(`../logger`);
const logger = getLogger();

module.exports = (service) => (req, res, next) => {
  const {offerId} = req.params;
  const offer = service.findOne(offerId);

  if (!offer) {
    res.status(HTTP_CODE.NOT_FOUND)
      .json({message: `Offer with ${offerId} not found`});
    return logger.info(`End request with status code ${res.statusCode}`);
  }

  res.locals.offer = offer;
  return next();
};
