const profileModel = require('../models/profileModel');
const { ObjectId } = require('mongodb'); // Import ObjectId

exports.getUserProfile = async (req, res) => {
    const userId = req.params.userId; // This should be the user ID
    try {
        // Fetch user details using ObjectId
        const user = await profileModel.findById(new ObjectId(userId)); // Use new ObjectId()
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Render profile.ejs and pass user data
        res.render('profile', { user });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};