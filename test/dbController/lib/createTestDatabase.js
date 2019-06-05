/* eslint-disable dot-notation */
const writeDatabase = require('./writeDatabase');
const readData = require('./readData');

const createTestDatabase = (mongoUri, projectName) => {
  const collections = [
    'users',
    'topics',
    'events',
    'departments',
    'subscriptions',
    // 'substitution',
    'logs',
    'archives'
  ];
  const folder = './collectionBackups/';
  const extension = '-bson.json';
  return new Promise((resolve, reject) => {
    collections.forEach(collection => {
      const path = folder + collection + extension;
      readData(path).then(data => {
        writeDatabase(mongoUri, projectName, collection, data);
      });
    });
    resolve();
  });
};

module.exports = createTestDatabase;
