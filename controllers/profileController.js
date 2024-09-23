const profileModel = require('../models/profileModel'); // Ensure this path is correct
const { ObjectId } = require('mongodb'); // Import ObjectId

exports.getUserProfile = async (req, res) => {
    const userId = req.params.userId; // This should be the user ID
    try {
        // Fetch user details using ObjectId
        const user = await profileModel.findById(new ObjectId(userId)); // Convert userId to ObjectId
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch user's challenges
        const userChallenges = await profileModel.getUserChallenges(userId);
        
        // Fetch challenge details for each user challenge
        const challenges = await Promise.all(userChallenges.map(async (userChallenge) => {
                        const challenge = await profileModel.getChallengeById(new ObjectId(userChallenge.challengeId)); // Convert challengeId to ObjectId
            
            if (!challenge) {
                console.warn("Challenge not found for ID:", userChallenge.challengeId);
                return null; // Return null if challenge is not found
            }

            return {
                title: challenge.title,
                category: challenge.category,
                steps_progress: userChallenge.progress, // Ensure this field exists
                total_steps: userChallenge.steps.length // Assuming steps is an array
            };
        }));

        // Filter out any null challenges (if any)
        const validChallenges = challenges.filter(challenge => challenge !== null);

        // Render profile.ejs and pass user and challenges data
        res.render('profile', { user, challenges: validChallenges });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
