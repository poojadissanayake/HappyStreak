const Contact = require('../models/contactModel');

class ContactController {
    static async submitContactForm(req, res) {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).send('All fields are required.');
        }

        try {
            const contactData = new Contact(name, email, message);
            await Contact.create(contactData);
            return res.status(200).send('Message sent!');
        } catch (err) {
            console.error(err);
            return res.status(500).send('Error occurred while sending the message.');
        }
    }
}

module.exports = ContactController;