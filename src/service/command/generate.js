'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);

const {
  DATA_DIR, DATA_TITLES_FILE_NAME, DATA_SENTENCES_FILE_NAME, DATA_CATEGORIES_FILE_NAME, DATA_COMMENTS_FILE_NAME,
  MOCK_FILE_MIN_LIMIT, MOCK_FILE_MAX_LIMIT, MOCK_FILE_NAME,
  PICTURE_MIN_LIMIT, PICTURE_MAX_LIMIT,
  DESCRIPTION_MIN_LIMIT, DESCRIPTION_MAX_LIMIT,
  SUM_MIN_LIMIT, SUM_MAX_LIMIT,
  COMMENTS_MAX_LIMIT,
  EXIT_CODE,
  MAX_ID_LENGTH
} = require(`../constants`);
const {getRandomIntInclusive, getNumberWithZero, shuffleArray} = require(`../utils`);

const typeList = [`offer`, `sale`];

const messageType = {
  error: {
    tooMuch: `Не больше ${MOCK_FILE_MAX_LIMIT} объявлений`
  },
  success: chalk`{green Данные соханены в файл {underline ${MOCK_FILE_NAME}}}`
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffleArray(comments)
      .slice(0, getRandomIntInclusive(1, 3))
      .join(` `),
  }))
);

const generateList = (count, titleList, descriptionList, categoryList, commentList) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titleList[getRandomIntInclusive(0, titleList.length - 1)],
    picture: `item${getNumberWithZero(getRandomIntInclusive(PICTURE_MIN_LIMIT, PICTURE_MAX_LIMIT))}.jpg`,
    description: shuffleArray(descriptionList).slice(DESCRIPTION_MIN_LIMIT, DESCRIPTION_MAX_LIMIT).join(` `),
    type: typeList[getRandomIntInclusive(0, typeList.length - 1)],
    sum: getRandomIntInclusive(SUM_MIN_LIMIT, SUM_MAX_LIMIT),
    category: Array(getRandomIntInclusive(0, categoryList.length - 1)).fill().map((item, index) => categoryList[index]),
    comments: generateComments(getRandomIntInclusive(1, COMMENTS_MAX_LIMIT), commentList),
  }));
};

const sendMessage = (error) => {
  if (error) {
    console.log(chalk.red(error));
    return;
  }

  console.log(messageType.success);
};

const saveFile = async (data) => {
  try {
    await fs.writeFile(MOCK_FILE_NAME, data);
    sendMessage();
  } catch (err) {
    sendMessage(err);
    process.exitCode = EXIT_CODE.ERROR;
  }
};

const readFile = async (fileName) => {
  try {
    const text = await fs.readFile(DATA_DIR + fileName, `utf8`);
    return text.trim().split(`\n`);
  } catch (err) {
    sendMessage(err);
    return [];
  }
};

const run = async (count) => {
  count = +count || MOCK_FILE_MIN_LIMIT;

  const titleList = await readFile(DATA_TITLES_FILE_NAME);
  const descriptionList = await readFile(DATA_SENTENCES_FILE_NAME);
  const categoryList = await readFile(DATA_CATEGORIES_FILE_NAME);
  const commentList = await readFile(DATA_COMMENTS_FILE_NAME);

  if (count > MOCK_FILE_MAX_LIMIT) {
    sendMessage(messageType.error.tooMuch);
    process.exitCode = EXIT_CODE.ERROR;
    return;
  }

  const data = JSON.stringify(generateList(count, titleList, descriptionList, categoryList, commentList));
  saveFile(data);
};

module.exports = {
  run
};
