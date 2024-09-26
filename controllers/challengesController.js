const {
  fetchChallenges,
  fetchUser,
  fetchTopChallenge,
} = require(`../models/userChallengeModel`);

const getChallenges = async (req, res) => {
  try {
    const selectedCategory = req.query.category || 'all';

    let query = {};
    if (selectedCategory !== 'all') {
      // Filter challenges by the exact category
      query = { category: selectedCategory };
    }
    const challenges = await fetchChallenges(query);
    const user = await fetchUser(req.session.userId);
    const topChallenge = await fetchTopChallenge();

    // Render the challenges.ejs view and pass the challenges array and selected category
    res.render('challenges', {
      challenges,
      selectedCategory,
      user,
      topChallenge,
    });
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getChallenges,
};
