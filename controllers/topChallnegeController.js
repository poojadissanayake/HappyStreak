// const { fetchTopChallenge } = require(`../models/topChallengeModel`);

// const getTopChallenge = async (req, res) => {
//   try {
//     const selectedCategory = req.query.category || 'all';

//     let query = {};
//     if (selectedCategory !== 'all') {
//       query = { category: selectedCategory };
//     }

//     const topChallenge = await fetchTopChallenge();

//     res.render('challenges', {
//       topChallenge,
//     });
//   } catch (error) {
//     console.error('Error fetching top challenges:', error);
//     res.status(500).send('Internal Server Error');
//   }
// };

// module.exports = { getTopChallenge };
