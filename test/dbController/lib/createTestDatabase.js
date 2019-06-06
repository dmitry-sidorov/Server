/* eslint-disable dot-notation */
const path = require('path');
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
  const folder = '../collectionBackups/';
  const extension = '.json';
  return new Promise((resolve, reject) => {
    collections.forEach(collection => {
      const resolvedPath = path.resolve(
        __dirname,
        folder + collection + extension
      );
      readData(resolvedPath).then(data => {
        writeDatabase(mongoUri, projectName, collection, data);
      });
    });
    resolve();
  });
};

module.exports = createTestDatabase;
