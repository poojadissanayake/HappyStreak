const { fetchTopChallenge } = require('../models/topChallengeModel');

const getTopChallenge = async () => {
    try {
        return await fetchTopChallenge(); // Fetch the top challenge
    } catch (error) {
        console.error('Error fetching top challenge:', error);
        throw error; 
    }
};

module.exports = { getTopChallenge };