const replaceObjectId = require('./replaceObjectId');
const replaceInteger = require('./replaceInteger');

const replaceMongoServiceSymbols = str => {
  const result = replaceObjectId(replaceInteger(str));
  console.log('replace func result: >>>', JSON.stringify(result));
  return result;
};

module.exports = replaceMongoServiceSymbols;
