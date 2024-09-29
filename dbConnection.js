const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:sQbQ7UpBocNpW85I@cluster0.c1bcmhv.mongodb.net/";
const dbName = 'happy_streak';

let db;

async function connectDB() {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        console.log('Connected to MongoDB - HappyStreak');
        db = client.db(dbName); // Initialize the db variable after successful connection
    } catch (err) {
        console.error('Failed to connect to the database. Error:', err);
    }
}

// Function to get the database instance
const getDB = () => {
    if (!db) {
        throw new Error('Database not initialized. Please call connectDB first.');
    }
    return db;
};

module.exports = { connectDB, getDB };
