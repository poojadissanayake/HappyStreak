const express = require('express');
const router = express.Router();
const ContactController = require('../controllers/contactController');

// POST route to handle contact form submission
router.post('/', ContactController.submitContactForm);

module.exports = router;