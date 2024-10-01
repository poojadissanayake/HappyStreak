const { getDB } = require('../dbConnection');
const { ObjectId } = require('mongodb'); // Import ObjectId

// Fetch a user by their userId from the <users> collection
// const findById = async (userId) => {
//     const db = getDB();
//     const collection = db.collection('users');
//     return await collection.findOne({ _id: new ObjectId(userId) }); 
// };

const findById = async (userId) => {
    const db = getDB();
    return await db.collection('users').findOne({ _id: new ObjectId(userId) });
};

// Fetch user challenges by userId
const getUserChallenges = async (userId) => {
    const db = getDB();
    // const collection = db.collection('user_challenges');
    // return await collection.find({ userId: new ObjectId(userId) }).toArray();
    return await db.collection('user_challenges').find({ userId: userId }).toArray();
};

// Fetch challenge details by challengeId
const getChallengeById = async (challengeId) => {
    const db = getDB();
    // const collection = db.collection('challenges');
    // return await collection.findOne({ _id: new ObjectId(challengeId) });
    return await db.collection('challenges').findOne({ _id: challengeId });
};

// Delete user's specific challenge
const deleteUserChallenge = async (userId, challengeId) => {
    const db = getDB();
    // const collection = db.collection('user_challenges');
    // await collection.deleteOne({ userId: new ObjectId(userId), challengeId: new ObjectId(challengeId) });
    await db.collection('user_challenges').deleteOne({
        userId: userId,
        challengeId: challengeId
    });
};

// Update progress of a challenge for a user
const updateUserProgress = async (userId, challengeId, progress) => {
    const db = getDB();
    // const collection = db.collection('user_challenges');
    // const result = await collection.updateOne(
    //     { userId: new ObjectId(userId), challengeId: new ObjectId(challengeId) },
    //     { $set: { progress: progress } }
    // );
    // return result.modifiedCount > 0;
    const result = await db.collection('user_challenges').updateOne(
        { userId: userId, challengeId: challengeId },
        { $set: { progress: progress } }
    );
    return result.modifiedCount > 0;
};

module.exports = { findById, getUserChallenges, getChallengeById, deleteUserChallenge, updateUserProgress };