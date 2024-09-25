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
    const challenges = await collection.find({ userId: new ObjectId(userId) }).toArray(); // Change user_id to userId
    return challenges;
};

// Fetch challenge details by challenge ID
exports.getChallengeById = async (challengeId) => {
    const db = getDB();
    const collection = db.collection('challenges');
    return await collection.findOne({ _id: new ObjectId(challengeId) }); // Use new ObjectId()
};

// Delete user's specific challenge
exports.deleteUserChallenge = async (userId, challengeId) => {
    const db = getDB();
    const collection = db.collection('user_challenges');
    await collection.deleteOne({ userId: new ObjectId(userId), challengeId: new ObjectId(challengeId) }); // Use new ObjectId()
};

// Update progress of user
exports.updateUserProgress = async (userId, challengeId, progress) => {
    const db = getDB();
    const collection = db.collection('user_challenges');

    const result = await collection.updateOne(
        { userId: new ObjectId(userId), challengeId: new ObjectId(challengeId) }, // Use new ObjectId()
        { $set: { progress: progress } }
    );

    return result.modifiedCount > 0;
};