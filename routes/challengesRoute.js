const express = require('express');
const router = express.Router();
const { getChallenges } = require('../controllers/challengeController');

// Fetch challenges based on category and render the challenges view
router.get('/', getChallenges);

module.exports = router;