const { getDB } = require('../dbConnection');

// Find user by their ID
exports.findUserById = async (userId) => {
    const db = getDB();
    return await db.collection('users').findOne({ _id: userId });
};

// Retrieve user's challenges and count them
exports.getUserChallenges = async (userId) => {
    const db = getDB();
    const challenges = await db.collection('challenges').find({ userId }).toArray();
    return {
        count: challenges.length, // Count of challenges
        challenges // Return the challenges array as well
    };
};