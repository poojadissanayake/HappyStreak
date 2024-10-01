const profileModel = require('../models/profileModel');
const userChallengeModel = require('../models/userChallengeModel');
const { ObjectId } = require('mongodb'); // Import ObjectId

console.log('Profile Model:', profileModel);
// Getting user profile details
const getUserProfile = async (req, res) => {
    const userId = req.session.userId;
    console.log("from profileController getUserProfile: " + userId);
    if (!userId) {
        return res.status(401).json({ message: 'User not logged in' });
    }

    try {
        const user = await profileModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const userChallenges = await profileModel.getUserChallenges(userId);
        const challengesCount = userChallenges.length;
        console.log('Retrieved User Challenges:', userChallenges);

        // Fetch challenge details for each user challenge
        const challenges = await Promise.all(userChallenges.map(async (userChallenge) => {
            const challenge = await profileModel.getChallengeById(new ObjectId(userChallenge.challengeId));
            console.log('Challenge ID:', userChallenge.challengeId);
            if (!challenge) return null;

            return {
                id: userChallenge.challengeId,
                title: challenge.title,
                category: challenge.category,
                steps_progress: userChallenge.progress,
                total_steps: userChallenge.steps.length,
                steps: challenge.steps
            };
        }));

        const validChallenges = challenges.filter(challenge => challenge);
        const completedChallenges = validChallenges.filter(challenge => challenge.steps_progress === challenge.total_steps);
        const completedChallengesCount = completedChallenges.length;
        const challengesToGoCount = challengesCount - completedChallengesCount;
        console.log("validChallenges");
        console.log(validChallenges);

        res.render('profile', {
            user: user,
            userId,
            challenges: validChallenges,
            challengesCount,
            completedChallenges,
            completedChallengesCount,
            challengesToGoCount
        });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Error fetching user profile' });
    }
};

// Delete a specific challenge
const deleteChallenge = async (req, res) => {
    const userId = req.session.userId; 
    const { challengeId } = req.body; 

    if (!userId || !challengeId) {
        return res.status(400).json({ message: 'User ID and Challenge ID are required.' });
    }

    try {
        const result = await profileModel.deleteUserChallenge(userId, challengeId);
        if (result.deletedCount > 0) { 
            res.status(200).json({ success: true, message: 'Challenge deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Challenge not found' });
        }
    } catch (error) {
        console.error('Error deleting challenge:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Update challenge progress
const updateChallengeProgress = async (req, res) => {
    const userId = req.session.userId; 
    const { challengeId, progress } = req.body; 

    if (!userId || !challengeId || progress === undefined) {
        return res.status(400).json({ message: 'User ID, Challenge ID, and Progress are required.' });
    }

    try {
        const updated = await profileModel.updateUserProgress(userId, challengeId, progress);
        if (updated) {
            res.status(200).json({ success: true, message: 'Progress updated successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Challenge not found' });
        }
    } catch (error) {
        console.error('Error updating progress:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
module.exports = { getUserProfile, deleteChallenge, updateChallengeProgress };