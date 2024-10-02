const { Challenge } = require('../models/challengeModel');

const getChallenges = async (req, res, next) => {
  try {
    const selectedCategory = req.query.category || 'all';
    const challenges = await Challenge.findChallengesByCategory(
      selectedCategory
    );
    req.challenges = challenges;
    req.selectedCategory = selectedCategory;
    next();
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { getChallenges };
