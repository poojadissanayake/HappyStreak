const { getDB } = require('../dbConnection');
const { ObjectId } = require('mongodb');

const fetchTopChallenge = async () => {
  try {
    const db = getDB();
    const userChallengesCollection = db.collection('user_challenges');

    // Aggregation pipeline
    const topChallenge = await userChallengesCollection
      .aggregate([
        {
          $group: {
            _id: '$challengeId', // This is the string FK (foreign key)
            totalUsers: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: 'challenges',
            let: { challengeId: '$_id' }, // Use the string challengeId from users
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: [{ $toString: '$_id' }, '$$challengeId'], // Convert ObjectId to string for matching
                  },
                },
              },
            ],
            as: 'challengeDetails',
          },
        },
        {
          $unwind: '$challengeDetails', // Unwind to get details of the challenge
        },
        {
          $project: {
            _id: '$challengeDetails._id',
            title: '$challengeDetails.title',
            description: '$challengeDetails.description',
            category: '$challengeDetails.category',
            steps: '$challengeDetails.steps',
            totalUsers: 1, // Include the total number of users
          },
        },
        {
          $sort: { totalUsers: -1 }, // Sort by the number of users in descending order
        },
        {
          $limit: 1, // Limit to the top challenge
        },
      ])
      .next(); // Get the first result from the aggregation

    return topChallenge;
  } catch (error) {
    console.error('Error fetching top challenge:', error);
    throw error; // Rethrow error to handle it at the caller level
  }
};

module.exports = { fetchTopChallenge };
