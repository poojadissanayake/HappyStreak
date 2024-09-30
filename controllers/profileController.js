const profileModel = require('../models/profileModel');
const { ObjectId } = require('mongodb'); // Import ObjectId

// Getting user profile details
const getUserProfile = async (req, res) => {
    const userId = req.query.userId || '66eaded3bb0238296c1938cb'; // hard coded if not to use const userId = req.params.userId; 

    if (!userId) {
        return res.status(400).json({ message: 'User ID is required.' });
    }

    // Ensure the userId is a valid ObjectId
    let objectId;
    try {
        objectId = new ObjectId(userId);
    } catch (error) {
        return res.status(400).json({ message: 'Invalid User ID format.' });
    }

    try {
        const user = await profileModel.findById(objectId); 
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const userChallenges = await profileModel.getUserChallenges(objectId);
        const challengesCount = userChallenges.length;

        // Fetch challenge details for each user challenge
        const challenges = await Promise.all(userChallenges.map(async (userChallenge) => {
            const challenge = await profileModel.getChallengeById(userChallenge.challengeId);
            if (!challenge) return null;

            return {
                id: userChallenge.challengeId,
                title: challenge.title,
                category: challenge.category,
                steps_progress: userChallenge.progress,
                total_steps: challenge.steps.length,
                steps: challenge.steps
            };
        }));

        const validChallenges = challenges.filter(challenge => challenge !== null);
        const completedChallenges = validChallenges.filter(challenge => challenge.steps_progress === challenge.total_steps);
        const completedChallengesCount = completedChallenges.length;
        const challengesToGoCount = challengesCount - completedChallengesCount;

        res.render('profile', {
            user,
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
    const { userId, challengeId } = req.query;

    if (!userId || !challengeId) {
        return res.status(400).json({ message: 'User ID and Challenge ID are required.' });
    }

    try {
        await profileModel.deleteUserChallenge(new ObjectId(userId), new ObjectId(challengeId));
        res.status(200).json({ success: true, message: 'Challenge deleted successfully' });
    } catch (error) {
        console.error('Error deleting challenge:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Update challenge progress
const updateChallengeProgress = async (req, res) => {
    const { userId, challengeId } = req.query;
    const { progress } = req.body;

    if (!userId || !challengeId || progress === undefined) {
        return res.status(400).json({ message: 'User ID, Challenge ID, and Progress are required.' });
    }

    try {
        const updated = await profileModel.updateUserProgress(new ObjectId(userId), new ObjectId(challengeId), progress);
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