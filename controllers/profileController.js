const profileModel = require('../models/profileModel');
const { ObjectId } = require('mongodb'); // Import ObjectId

// Getting user profile details 
exports.getUserProfile = async (req, res) => {
    const userId = req.params.userId; 
    try {
        // Fetch user details using ObjectId
        const user = await profileModel.findById(new ObjectId(userId)); // Convert userId to ObjectId
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch user's challenges
        const userChallenges = await profileModel.getUserChallenges(userId);

        // Count the number of challenges belonging to the user
        const challengesCount = userChallenges.length;
        
        // Fetch challenge details for each user challenge
        const challenges = await Promise.all(userChallenges.map(async (userChallenge) => {
                        const challenge = await profileModel.getChallengeById(new ObjectId(userChallenge.challengeId)); // Convert challengeId to ObjectId
            
            if (!challenge) {
                console.warn("Challenge not found for ID:", userChallenge.challengeId);
                return null; // Return null if challenge is not found
            }

            return {
                id: userChallenge.challengeId,
                title: challenge.title,
                category: challenge.category,
                steps_progress: userChallenge.progress, 
                total_steps: userChallenge.steps.length,
                steps: challenge.steps
            };
        }));

        // Filter out any null challenges
        const validChallenges = challenges.filter(challenge => challenge !== null);

        // Render profile.ejs and pass user and challenges data
        res.render('profile', { user, challenges: validChallenges, challengesCount });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete challenge 
exports.deleteChallenge = async (req, res) => {
    const { userId, challengeId } = req.params;

    try {
        await profileModel.deleteUserChallenge(userId, challengeId);
        
        res.json({ success: true, message: 'Challenge deleted successfully' });
    } catch (error) {
        console.error("Error deleting challenge:", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};