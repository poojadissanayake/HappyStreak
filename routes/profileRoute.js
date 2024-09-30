const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

// Route for retrieving user profile
router.get('/profile/:userId', profileController.getUserProfile);

// Route for deleting a challenge
router.delete('/profile/delete-challenge', profileController.deleteChallenge);

// Route for updating progress
router.post('/profile/update-progress', profileController.updateChallengeProgress);

module.exports = router;