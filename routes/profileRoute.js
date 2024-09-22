const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Route for rendering the user profile page
router.get('/', (req, res) => {
    res.render('userprofile');
});

// API route for fetching profile data along with challenges
router.get('/api/profile', profileController.getUserProfile);

module.exports = router;
