const { MongoClient } = require('mongodb');
const replaceMongoServiceSymbols = require('./replaceMongoServiceSymbols');

const writeDatabase = (mongoUri, databaseName, collectionName, data) => {
  MongoClient.connect(
    mongoUri,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err;
      client
        .db(databaseName)
        .collection(collectionName)
        .deleteMany({})
        .then(() => {
          console.log(
            `${collectionName} collection has been successfuly deleted`
          );
        })
        .catch(() => {
          console.log(`deleteMany operation error at: ${collectionName}`);
        });
      client
        .db(databaseName)
        .collection(collectionName)
        .insertMany(data)
        .then(() => {
          console.log(
            `${collectionName} collection has been wtiten successfuly to database ${databaseName}!`
          );
        })
        .catch(insertError => {
          console.log(`insertMany operation error at: ${collectionName}`);
          console.log(insertError);
        });
      client.close();
    }
  );
};

module.exports = writeDatabase;
