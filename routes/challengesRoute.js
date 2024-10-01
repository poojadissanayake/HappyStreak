const express = require('express');
const router = express.Router();
const { Challenge } = require('../models/challengeModel'); // Import model for regular challenges
const { getTopChallenge } = require('../controllers/topChallengeController'); // Import top challenge controller

// Fetch challenges based on category and render the challenges view
router.get('/', async (req, res) => {
    try {
        const selectedCategory = req.query.category || 'all';
        
        // Fetch regular challenges
        const challenges = await Challenge.findChallengesByCategory(selectedCategory);
        
        // Fetch top challenge
        const topChallenge = await getTopChallenge();

        // Render the view with both sets of challenges
        res.render('challenges', { 
            challenges, 
            topChallenge, 
            selectedCategory 
        });
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;