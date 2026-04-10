/* jshint esversion: 11, node: true */
const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require('../logger');

let client;
let database;

async function connectToDatabase() {
  if (database) {
    return database;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
  const dbName = process.env.MONGODB_DB || 'GiftsDB';

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: false
    }
  });

  await client.connect();
  database = client.db(dbName);
  logger.info(`Connected to ${dbName}`);
  return database;
}

module.exports = { connectToDatabase };
