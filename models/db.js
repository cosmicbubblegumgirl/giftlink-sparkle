const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

let dbInstance = null;

const connectToDatabase = async () => {
    try {
        if (!dbInstance) {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            await client.connect();
            dbInstance = client.db();
            console.log('Successfully connected to the database');
        }
        return dbInstance;
    } catch (error) {
        console.error('Database connection error:', error);
        throw new Error('Could not connect to the database.');
    }
};

module.exports = { connectToDatabase };