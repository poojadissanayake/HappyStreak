const { getDB } = require('../dbConnection');
const { ObjectId } = require('mongodb');

const fetchChallenges = async (query) => {
  try {
    const db = getDB();
    const challenges = await db.collection('challenges').find(query).toArray();

    return challenges;
  } catch (error) {
    console.error('Error adding to database:', error);
    throw error;
  }
};

const fetchUser = async (userId) => {
  try {
    const db = getDB();
    const user = await db
      .collection('users')
      .findOne({ _id: new ObjectId(userId) });

    return user;
  } catch (error) {
    console.error('Error adding to database:', error);
    throw error;
  }
};

const addUserChallenge = async (userId, challengeId, steps) => {
  try {
    const db = getDB();
    const userChallengesCollection = db.collection('user_challenges');
    const result = await userChallengesCollection.insertOne({
      userId,
      challengeId,
      steps,
      progress: 0,
    });
    console.log('Challenge added to DB:', result);
    return result;
  } catch (error) {
    console.error('Error adding to database:', error);
    throw error;
  }
};

const updateChallengeProgress = async (
  userId,
  challengeId,
  stepNumber,
  completed
) => {
  const db = getDB();
  const userChallengesCollection = db.collection('user_challenges');

  const challenge = await userChallengesCollection.findOne({
    userId,
    challengeId,
  });
  if (challenge) {
    challenge.steps[stepNumber - 1].completed = completed;
    // Recalculate progress
    const totalSteps = challenge.steps.length;
    const completedSteps = challenge.steps.filter(
      (step) => step.completed
    ).length;
    challenge.progress = (completedSteps / totalSteps) * 100;

    await userChallengesCollection.updateOne(
      { userId, challengeId },
      { $set: { steps: challenge.steps, progress: challenge.progress } }
    );
  }
};

const fetchTopChallenge = async () => {
  const db = getDB();
  const userChallengesCollection = db.collection('user_challenges');

  // Aggregation pipeline to count the number of users per challenge
  const topChallenge = await userChallengesCollection
    .aggregate([
      {
        $group: {
          _id: '$challengeId', // Group by challengeId (make sure this is an ObjectId)
          totalUsers: { $sum: 1 }, // Count the number of users per challenge
        },
      },
      {
        $lookup: {
          from: 'challenges', // Name of the challenges collection
          localField: '_id', // The challengeId in userChallenges
          foreignField: '_id', // The _id in challenges collection
          as: 'challengeDetails', // The resulting field for challenge details
        },
      },
      {
        $unwind: '$challengeDetails', // Deconstruct the array to include the challenge details
      },
      {
        $project: {
          _id: '$challengeDetails._id', // Include the original challenge _id
          title: '$challengeDetails.title', // Include the title of the challenge
          description: '$challengeDetails.description', // Include the description of the challenge
          category: '$challengeDetails.category', // Include the category of the challenge
          steps: '$challengeDetails.steps', // Include the steps of the challenge if needed
        },
      },
      {
        $sort: { totalUsers: -1 }, // Sort by number of users in descending order
      },
      {
        $limit: 1, // Limit to the top challenge
      },
    ])
    .next();

  return topChallenge;
};

module.exports = {
  fetchChallenges,
  fetchUser,
  addUserChallenge,
  updateChallengeProgress,
  fetchTopChallenge,
};
