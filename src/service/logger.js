'use strict';

const fs = require(`fs`);
const {LOGS_DIR} = require(`./constants`);

if (!fs.existsSync(LOGS_DIR)) {
  fs.mkdirSync(LOGS_DIR);
}

const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`
}, `${LOGS_DIR}/app.log`);

module.exports = {
  logger,
  // Метод всегда возвращает новый логгер, унаследованный
  // от стандартного логгера. В метод можно передать
  // специфичные настройки для нового экземпляра класса.
  getLogger(options = {}) {
    return logger.child(options);
  }
};
