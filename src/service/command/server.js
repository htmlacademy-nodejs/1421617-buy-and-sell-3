'use strict';

const http = require(`http`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {DEFAULT_PORT, HTTP_CODE, FILE_NAME} = require(`../constants`);

const sendResponse = (response, code, content) => {
  const template = `
    <!Doctype html>
    <html lang="ru">
      <head>
        <title>From Node with love!</title>
      </head>
      <body>${content}</body>
    </html>`;

  response.writeHead(code, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  response.end(template);
};

const onClientConnect = async (request, response) => {
  const {url} = request;

  switch (url) {
    case `/`:
      try {
        const fileContent = await fs.readFile(FILE_NAME, `utf8`);
        const mockList = JSON.parse(fileContent);
        const titleList = mockList.map((item) => `<li>${item.title}</li>`).join(``);

        sendResponse(response, HTTP_CODE.SUCCESS, `<ul>${titleList}</ul>`);
      } catch (err) {
        sendResponse(response, HTTP_CODE.NOT_FOUND, `Not found`);
      }
      break;

    default:
      sendResponse(response, HTTP_CODE.NOT_FOUND, `Not found`);
      break;
  }
};

const run = (port) => {
  port = port || DEFAULT_PORT;

  http
    .createServer(onClientConnect)
    .listen(port)
    .on(`listening`, (err)=> {
      if (err) {
        return console.error(`Ошибка при создании http-сервера.`, err);
      }
      return console.info(chalk`{green Принимаю подключения на ${port} порту}`);
    });
};

module.exports = {
  run
};
