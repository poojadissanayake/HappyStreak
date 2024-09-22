const { getDB } = require('./dbConnection');

// Function to get all challenges
async function getChallenges() {
    const db = getDB();
    const challengesCollection = db.collection('challenges');

    // Retrieve all challenges
    return await challengesCollection.find().toArray();
}

module.exports = { createChallenge, getChallenges };