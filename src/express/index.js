'use strict';

const express = require(`express`);
const chalk = require(`chalk`);
const {DEFAULT_PORT} = require(`./constants`);
const indexRouter = require(`./routes`);

const app = express();

app.use(`/`, indexRouter)
   .listen(DEFAULT_PORT, () => console.log(chalk`{blue Сервер работает на http://localhost:${DEFAULT_PORT}}`));
