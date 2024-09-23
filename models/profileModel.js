const { getDB } = require('../dbConnection');
const { ObjectId } = require('mongodb'); // Import ObjectId

// Fetch a user by their ID from the users collection
exports.findById = async (userId) => {
    const db = getDB();
    const collection = db.collection('users');
    return await collection.findOne({ _id: new ObjectId(userId) }); // Use new ObjectId()
};