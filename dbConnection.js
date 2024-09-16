const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://admin:sQbQ7UpBocNpW85I@cluster0.c1bcmhv.mongodb.net/";
const client = new MongoClient(uri);
const dbName = 'happy_streak';

let db;

// Connect to MongoDB server
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB - HappyStreak');
        db = client.db(dbName);
    } catch (err) {
        console.error('Failed to connect to the database. Error:', err);
    }
}

// Function to get the database instance
const getDB = () => db; 

// Export the functions to connect and get the database
module.exports = { connectDB, getDB };