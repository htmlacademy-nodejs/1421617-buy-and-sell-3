'use strict';

const fs = require(`fs`);
const {MOCK_FILE_NAME} = require(`../constants`);

let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.promises.readFile(MOCK_FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

const getMockDataSync = () => {
  if (data !== null) {
    return data;
  }

  try {
    const fileContent = fs.readFileSync(MOCK_FILE_NAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return err;
  }

  return data;
};

module.exports = {
  getMockData,
  getMockDataSync
};
