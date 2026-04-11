/* jshint esversion: 11, node: true */
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const logger = require('../logger');

let client;
let database;
let connectionAttempted = false;

async function connectToDatabase() {
  if (database) {
    return database;
  }

  if (connectionAttempted) {
    return null;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
  const dbName = process.env.MONGODB_DB || 'GiftsDB';
  connectionAttempted = true;

  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: false,
      deprecationErrors: false
    },
    serverSelectionTimeoutMS: 3000
  });

  try {
    await client.connect();
    database = client.db(dbName);
    logger.info(`Connected to ${dbName}`);
  } catch (error) {
    logger.warn(`Database connection unavailable: ${error.message}`);
    client = null;
    database = null;
  }

  return database;
}

module.exports = { connectToDatabase };
