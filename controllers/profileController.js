const profileModel = require('../models/profileModel');
const challengesModel = require('../models/challengeModel');

// Retrieve user profile and challenges
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const profile = await profileModel.findUserById(userId);
        const challenges = await challengesModel.getUserChallenges(userId); // Fetch user's challenges
        res.status(200).json({ profile, challenges }); // Send both profile and challenges
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Retrieve user's challenges
exports.getUserChallenges = async (req, res) => {
    try {
        const userId = req.user.id;
        const { count, challenges } = await profileModel.getUserChallenges(userId);
        res.status(200).json({ count, challenges }); // Send both count and challenge details
    } catch (error) {
        console.error("Error fetching challenges:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};