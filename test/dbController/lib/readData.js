const fs = require('fs');
const path = require('path');

const readData = filePath => {
  const resolvedFilePath = path.relative(__dirname, filePath);
  return new Promise((resolve, reject) => {
    const data = fs.readFileSync(resolvedFilePath, 'utf8', error => {
      if (error) reject(error);
    });
    console.log(`Data succesfully read from ${filePath}!`);
    resolve(data);
  });
};

module.exports = readData;
