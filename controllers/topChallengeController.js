const { fetchTopChallenge } = require(`../models/topChallengeModel`);
 
const getTopChallenge = async (req, res) => {
  try {
    const topChallenge = await fetchTopChallenge();
 
    res.render('challenges', {
      challenges: req.challenges,
      topChallenge,
    });
  } catch (error) {
    console.error('Error fetching top challenges:', error);
    res.status(500).send('Internal Server Error');
  }
};
 
module.exports = { getTopChallenge };