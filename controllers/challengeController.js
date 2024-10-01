const { Challenge } = require('../models/challengeModel');

const getChallenges = async (req, res) => {
    try {
        const selectedCategory = req.query.category || 'all';
        const challenges = await Challenge.findChallengesByCategory(selectedCategory);
        return challenges; // Return challenges to be used in the route
    } catch (error) {
        console.error('Error fetching challenges:', error);
        throw error; 
    }
};

module.exports = { getChallenges };