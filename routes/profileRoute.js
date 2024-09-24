const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

// Route for retrieving user profile by user ID
router.get('/profile/:userId', profileController.getUserProfile);

// Route for deleting specific challenge
router.delete('/profile/:userId/delete-challenge/:challengeId', profileController.deleteChallenge);

module.exports = router;