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

        console.log("Fetched User:", user); // Log fetched user

        // Fetch user's challenges
        console.log("Fetching challenges for user ID:", userId);
        const userChallenges = await profileModel.getUserChallenges(userId);
        
        console.log("Fetched User Challenges:", userChallenges); // Log fetched user challenges

        // Fetch challenge details for each user challenge
        const challenges = await Promise.all(userChallenges.map(async (userChallenge) => {
            console.log("Fetching challenge for ID:", userChallenge.challenge_id); // Log the challenge ID
            
            const challenge = await profileModel.getChallengeById(new ObjectId(userChallenge.challenge_id)); // Convert challenge_id to ObjectId
            
            if (!challenge) {
                console.warn("Challenge not found for ID:", userChallenge.challenge_id);
                return null; // Return null if challenge is not found
            }

            return {
                title: challenge.title,
                category: challenge.category,
                steps_progress: userChallenge.steps_progress,
                total_steps: userChallenge.total_steps
            };
        }));

        // Filter out any null challenges (if any)
        const validChallenges = challenges.filter(challenge => challenge !== null);

        console.log("Valid Challenges:", validChallenges); // Log valid challenges

        // Render profile.ejs and pass user and challenges data
        res.render('profile', { user, challenges: validChallenges });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};