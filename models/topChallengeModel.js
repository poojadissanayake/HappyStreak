const { getDB } = require('../dbConnection');

const fetchTopChallenge = async () => {
    const db = getDB();
    const userChallengesCollection = db.collection('user_challenges');

    // The challenge that has the highest number of users participating in it
    const topChallenge = await userChallengesCollection.aggregate([
        {
            $group: {
                _id: '$challengeId', // This is a string in <user_challenges>
                totalUsers: { $sum: 1 },
            },
        },
        {
            // Join with the challenges collection using a pipeline
            $lookup: {
                from: 'challenges',
                let: { challengeId: { $toObjectId: '$_id' } }, // Convert string to ObjectId
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ['$_id', '$$challengeId'], // Compare ObjectId with converted string
                            },
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            title: 1,
                            description: 1,
                            category: 1,
                            steps: 1,
                        },
                    },
                ],
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
    ]).toArray(); 

    return topChallenge[0];
};

module.exports = { fetchTopChallenge };