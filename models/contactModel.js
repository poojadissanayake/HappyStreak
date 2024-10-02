const dbConnection = require('../dbConnection');

class Contact {
    constructor(name, email, message) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.createdAt = new Date();
    }

    static async create(contactData) {
        const db = dbConnection.getDB();
        const result = await db.collection('contact_us').insertOne(contactData);
        return result;
    }
}

module.exports = Contact;