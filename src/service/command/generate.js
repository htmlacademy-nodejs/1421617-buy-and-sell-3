'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);

const {
  FILE_MIN_LIMIT, FILE_MAX_LIMIT, FILE_NAME,
  PICTURE_MIN_LIMIT, PICTURE_MAX_LIMIT,
  DESCRIPTION_MIN_LIMIT, DESCRIPTION_MAX_LIMIT,
  SUM_MIN_LIMIT, SUM_MAX_LIMIT,
  EXIT_CODE
} = require(`../constants`);
const {getRandomIntInclusive, getNumberWithZero, shuffleArray} = require(`../utils`);
const {titleList, descriptionList, categoryList, typeList} = require(`../data`);

const messageType = {
  error: {
    tooMuch: `Не больше ${FILE_MAX_LIMIT} объявлений`
  },
  success: chalk`Данные соханены в файл {underline ${FILE_NAME}}`
};

const generateList = (count) => {
  return Array(count).fill({}).map(() => ({
    title: titleList[getRandomIntInclusive(0, titleList.length - 1)],
    picture: `item${getNumberWithZero(getRandomIntInclusive(PICTURE_MIN_LIMIT, PICTURE_MAX_LIMIT))}.jpg`,
    description: shuffleArray(descriptionList).slice(DESCRIPTION_MIN_LIMIT, DESCRIPTION_MAX_LIMIT).join(` `),
    type: typeList[getRandomIntInclusive(0, typeList.length - 1)],
    sum: getRandomIntInclusive(SUM_MIN_LIMIT, SUM_MAX_LIMIT),
    category: Array(getRandomIntInclusive(0, categoryList.length - 1)).fill().map((item, index) => categoryList[index]),
  }));
};

const sendMessage = (error) => {
  if (error) {
    console.log(chalk.red(error));
    return;
  }

  console.log(messageType.success);
};

const saveFile = (data) => {
  try {
    fs.writeFileSync(FILE_NAME, data);
    sendMessage();
  } catch (err) {
    sendMessage(err);
    process.exitCode = EXIT_CODE.ERROR;
  }
};

const run = (count) => {
  count = Number(count) || FILE_MIN_LIMIT;

  if (count > FILE_MAX_LIMIT) {
    sendMessage(messageType.error.tooMuch);
    process.exitCode = EXIT_CODE.ERROR;
    return;
  }

  const data = JSON.stringify(generateList(count));
  saveFile(data);
};

module.exports = {
  run
};
