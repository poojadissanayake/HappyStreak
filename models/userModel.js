const { getDB } = require('../dbConnection');

async function createUser(user) {
    const db = getDB();  // Ensure connection is established and db is initialized
    try {
        const result = await db.collection('users').insertOne(user);
        console.log('User created:', result);
        return result;
    } catch (error) {
        console.error('Error inserting user into MongoDB:', error);
        throw error;
    }
}

async function findUserByEmail(email) {
    const db = getDB();  // Ensure connection is established and db is initialized
    try {
        return await db.collection('users').findOne({ email });
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw error;
    }
}

module.exports = {
    createUser,
    findUserByEmail,
};
