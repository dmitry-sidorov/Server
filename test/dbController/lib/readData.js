const fs = require('fs');

const readData = filePath => {
  const data = fs.readFileSync(filePath, 'utf8', error => {
    if (error) {
      console.log(`Error while reading file ${filePath}!`);
    }
  });
  console.log(`Data succesfully read from ${filePath}!`);
  return data;
};

module.exports = readData;
