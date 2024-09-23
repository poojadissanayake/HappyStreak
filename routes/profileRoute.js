const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Route for retrieving user profile by user ID
router.get('/profile/:userId', profileController.getUserProfile);

module.exports = router;