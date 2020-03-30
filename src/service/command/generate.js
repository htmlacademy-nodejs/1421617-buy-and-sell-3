'use strict';

const fs = require(`fs`);
const chalk = require(`chalk`);

const {getRandomIntInclusive, getNumberWithZero, shuffleArray, splitText} = require(`../utils`);
const {titleText, descriptionText, categoryText} = require(`../data`);

const titleList = splitText(titleText);
const descriptionList = splitText(descriptionText);
const categoryList = splitText(categoryText);
const typeList = [`offer`, `sale`];

const options = {
  minSize: 1,
  maxSize: 1000,
  fileName: `mock.json`,
  template: {
    title: ``,
    picture: ``,
    description: ``,
    type: ``,
    sum: 0,
    category: [],
  }
};

const messageType = {
  error: {
    tooMuch: `Не больше ${options.maxSize} объявлений`
  },
  success: chalk`Данные соханены в файл {underline ${options.fileName}}`
};

const generateItem = (name) => {
  const titleRange = {
    min: 0
  };
  const pictureRange = {
    min: 1,
    max: 16
  };
  const descriptionRange = {
    min: 0,
    max: 5
  };
  const typeRange = {
    min: 0,
    max: 1
  };
  const sumRange = {
    min: 1000,
    max: 10000
  };
  const categoryRange = {
    min: 0
  };

  let randomNumber;
  let value;

  switch (name) {
    case `title`:
      randomNumber = getRandomIntInclusive(titleRange.min, titleList.length - 1);
      value = titleList[randomNumber];
      break;
    case `picture`:
      randomNumber = getRandomIntInclusive(pictureRange.min, pictureRange.max);
      value = `item${getNumberWithZero(randomNumber)}.jpg`;
      break;
    case `description`:
      value = shuffleArray(descriptionList).slice(descriptionRange.min, descriptionRange.max).join(` `);
      break;
    case `type`:
      randomNumber = getRandomIntInclusive(typeRange.min, typeRange.max);
      value = typeList[randomNumber];
      break;
    case `sum`:
      value = getRandomIntInclusive(sumRange.min, sumRange.max);
      break;
    case `category`:
      randomNumber = getRandomIntInclusive(categoryRange.min, categoryList.length - 1);
      value = [];
      Array(randomNumber).fill().map((item, index) => {
        return value.push(categoryList[index]);
      });
      break;
  }

  return value;
};

const generateList = (count) => {
  return Array(count).fill().map(() => {
    let newTemplate = Object.assign({}, options.template);

    for (const key in newTemplate) {
      if (newTemplate.hasOwnProperty(key)) {
        newTemplate[key] = generateItem(key);
      }
    }
    return newTemplate;
  });
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
    fs.writeFileSync(options.fileName, data);
  } catch (err) {
    sendMessage(err);
    process.exit(1);
  }
};

const run = (count) => {
  count = Number(count) || options.minSize;

  if (count > options.maxSize) {
    sendMessage(messageType.error.tooMuch);
    process.exit(1);
  }

  const data = JSON.stringify(generateList(count));
  saveFile(data);
  sendMessage();
};

module.exports = {
  run
};
