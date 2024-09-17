const express = require('express');
const router = express.Router();

// Route for rendering the landing page using EJS
router.get('/', (req, res) => {
    res.render('index'); // render 'index.ejs' in 'views' folder
});

// About route
router.get('/about', (req, res) => {
    res.render('about');
});

// Contact route
router.get('/contact', (req, res) => {
    res.render('contact');
});

// Login route
router.get('/login', (req, res) => {
    res.render('login');
});

// Userprofile route
router.get('/userprofile', (req, res) => {
    res.render('userprofile');
});

module.exports = router;
