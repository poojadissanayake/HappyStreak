const { getDB } = require('../dbConnection');
const { ObjectId } = require('mongodb');

const fetchTopChallenge = async () => {
  const db = getDB();
  const userChallengesCollection = db.collection('user_challenges');

  // the challenge that has the highest number of users participating in it
  const topChallenge = await userChallengesCollection
    //   help complex data processing and query
    .aggregate([
      {
        $group: {
          _id: '$challengeId',
          totalUsers: { $sum: 1 },
        },
      },
      {
        // join with the challenges collection
        $lookup: {
          from: 'challenges',
          localField: '_id',
          foreignField: '_id',
          as: 'challengeDetails',
        },
      },
      {
        $unwind: '$challengeDetails',
      },
      {
        $project: {
          _id: '$challengeDetails._id',
          title: '$challengeDetails.title',
          description: '$challengeDetails.description',
          category: '$challengeDetails.category',
          steps: '$challengeDetails.steps',
        },
      },
      {
        $sort: { totalUsers: -1 },
      },
      {
        $limit: 1,
      },
    ])
    .next();

  return topChallenge;
};

module.exports = {
  fetchTopChallenge,
};
