const express = require('express');
const profileController = require('../controllers/profileController');
const router = express.Router();

// Route for retrieving user profile
// router.get('/profile/:userId', profileController.getUserProfile);
router.get('/profile', async (req, res) => {
    try {
      const userId = req.session.userId;  
      if (!userId) {
        return res.redirect("/login");
      }
  
      console.log("from index.js profile route: " + userId);
      const user = await profileController.findById(userId);
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      res.render('profile', { user });  
    } catch (error) {
      console.error('Error loading profile:', error);
      res.status(500).send('An error occurred while loading the profile.');
    }
  });

// Route for deleting a challenge
router.delete('/profile/delete-challenge', profileController.deleteChallenge);

// Route for updating progress
router.post('/profile/update-progress', profileController.updateChallengeProgress);

module.exports = router;