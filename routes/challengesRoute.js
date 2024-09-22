const express = require('express');
const router = express.Router();
const { getDB } = require('../dbConnection');

// Fetch challenges based on category and render the challenges view
router.get('/', async (req, res) => {
    try {
        const db = getDB();
        // Get the selected category from query params, default to 'all'
        const selectedCategory = req.query.category || 'all';

        let query = {};
        if (selectedCategory !== 'all') {
            // Filter challenges by the exact category
            query = { category: selectedCategory };
        }

        // Fetch challenges based on the query
        const challenges = await db.collection('challenges').find(query).toArray();

        // Render the challenges.ejs view and pass the challenges array and selected category
        res.render('challenges', { challenges, selectedCategory });
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
