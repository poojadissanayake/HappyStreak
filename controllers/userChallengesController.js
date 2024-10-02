const { addUserChallenge, updateChallengeProgress, findUserChallenges } = require('../models/userChallengeModel');

const joinChallenge = async (req, res) => {
    console.log('Request body:', req.body);
    const { userId, challengeId, steps } = req.body;

    if (!userId || !challengeId || !steps) {
        return res.status(400).json({ message: 'User ID, Challenge ID, and Steps are required.' });
    }

    try {
        const existingChallenge = await findUserChallenges(userId);
        // .some -> array method in js tests if at least one element in the array passes the test implemented by the given function -> existingChallenge
        const isChallengeExists = existingChallenge.some(challenge => challenge.challengeId.toString() === challengeId);

        if (isChallengeExists) {
            return res.status(200).json({ message: 'Wow! You already participate in this Challenge.' });
        }
        await addUserChallenge(userId, challengeId, steps);
        res.status(200).json({ message: 'Challenge added successfully' });
    } catch (error) {
        console.error('Error adding challenge:', error);
        res.status(500).json({ message: 'Error adding challenge', error });
    }
};

const markStepComplete = async (req, res) => {
    const { userId, challengeId, stepNumber, completed } = req.body;

    if (!userId || !challengeId || stepNumber === undefined || completed === undefined) {
        return res.status(400).json({ message: 'User ID, Challenge ID, Step Number, and Completion Status are required.' });
    }

    try {
        await updateChallengeProgress(userId, challengeId, stepNumber, completed);
        res.status(200).json({ message: 'Step updated successfully' });
    } catch (error) {
        console.error('Error updating step:', error);
        res.status(500).json({ message: 'Error updating step', error });
    }
};

module.exports = { joinChallenge, markStepComplete };
