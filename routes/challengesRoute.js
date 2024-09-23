const { ObjectId } = require('mongodb');
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

        // retrieve userId from session or request --> need to work on this later!
        const userId = req.session.userId; // use this if we store user ID in session
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) }); // Use ObjectId if we are using MongoDB

        // Render the challenges.ejs view and pass the challenges array and selected category
        res.render('challenges', { challenges, selectedCategory, user });
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
