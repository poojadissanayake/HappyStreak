const { getDB } = require('../dbConnection');

const Challenge = {
    async findChallengesByCategory(category) {
        const db = getDB();
        let query = {};
        if (category !== 'all') {
            query = { category };
        }
        return await db.collection('challenges').find(query).toArray();
    }
};

module.exports = { Challenge };