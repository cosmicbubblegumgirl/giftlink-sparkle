// giftlink-backend/db.js
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    return client;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = connectDB;
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
