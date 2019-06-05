const fs = require('fs');
const path = require('path');
const readData = require('./readData');
const parseBSONtoJSON = require('./parseBSONtoJSON');

function makeBackupFiles() {
  const collections = [
    'users',
    'topics',
    'events',
    'departments',
    'subscriptions',
    'logs',
    'archives'
  ];
  collections.forEach(async collection => {
    const resolvedFilePath = path.resolve(
      __dirname,
      `./../collectionBackups/${collection}-copy.bson`
    );
    const dataBSON = await readData(resolvedFilePath);
    const dataJSON = parseBSONtoJSON(dataBSON);
    const newFileName = `./../collectionBackups/${collection}-bson.json`;
    // const resolvedPath = path.relative(__dirname, newFileName);
    fs.writeFileSync(newFileName, dataJSON, err => {
      if (err) {
        console.log(`Error while writing data to file ${newFileName}`);
      }
    });
  });
}
makeBackupFiles();
// module.exports = makeBackupFiles;
