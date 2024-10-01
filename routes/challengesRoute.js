const express = require('express');
const router = express.Router();

const { getChallenges } = require('../controllers/challengeController');
const { getTopChallenge } = require(`../controllers/topChallengeController`);

// Fetch challenges based on category and render the challenges view
router.get('/', getChallenges, getTopChallenge);
module.exports = router;
