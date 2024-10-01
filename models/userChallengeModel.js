const { getDB } = require('../dbConnection');
const { ObjectId } = require('mongodb');

const addUserChallenge = async (userId, challengeId, steps) => {
    try {
        const db = getDB();
        const userChallengesCollection = db.collection('user_challenges');
        const result = await userChallengesCollection.insertOne({ userId, challengeId, steps, progress: 0 });
        console.log("useid at userchalleng:" + userId);
        console.log('Challenge added to DB:', result);
        return result;
    } catch (error) {
        console.error('Error adding to database:', error);
        throw error;
    }
};

const findUserChallenges = async (userId) => {
    const db = getDB();
    const userChallengesCollection = db.collection('user_challenges');

    try {
        const challenges = await userChallengesCollection.find({ userId }).toArray();
        console.log("Retrieved User Challenges:", challenges);
        return challenges;
    } catch (error) {
        console.error('Error retrieving user challenges:', error);
        throw error;
    }
};

const updateChallengeProgress = async (userId, challengeId, stepNumber, completed) => {
    const db = getDB();
    const userChallengesCollection = db.collection('user_challenges');

    const challenge = await userChallengesCollection.findOne({ userId, challengeId });
    if (challenge) {
        challenge.steps[stepNumber - 1].completed = completed;
        // Recalculate progress
        const totalSteps = challenge.steps.length;
        const completedSteps = challenge.steps.filter(step => step.completed).length;
        challenge.progress = (completedSteps / totalSteps) * 100;

        await userChallengesCollection.updateOne(
            { userId, challengeId },
            { $set: { steps: challenge.steps, progress: challenge.progress } }
        );
    }
};

module.exports = { addUserChallenge, updateChallengeProgress, findUserChallenges };
