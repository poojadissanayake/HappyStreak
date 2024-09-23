const { getDB } = require('../dbConnection');
const { ObjectId } = require('mongodb'); // Import ObjectId

// Fetch a user by their ID from the users collection
exports.findById = async (userId) => {
    const db = getDB();
    const collection = db.collection('users');
    return await collection.findOne({ _id: new ObjectId(userId) }); // Use new ObjectId()
};

// Fetch user challenges by user ID
exports.getUserChallenges = async (userId) => {
    const db = getDB();
    const collection = db.collection('user_challenges');
    return await collection.find({ user_id: new ObjectId(userId) }).toArray(); // Convert userId to ObjectId
};

// Fetch challenge details by challenge ID
exports.getChallengeById = async (challengeId) => {
    const db = getDB();
    const collection = db.collection('challenges'); //
    return await collection.findOne({ _id: new ObjectId(challengeId) }); // Use new ObjectId()
};
