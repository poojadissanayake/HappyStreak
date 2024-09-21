const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
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

// // Login route
// router.get('/login', (req, res) => {
//     res.render('login');
// });

// // Register route
// router.get('/register', (req, res) => {
//     res.render('register');
// });

// // Forgot password route
// router.get('/forgotpassword', (req, res) => {
//     res.render('forgotpassword');
// });

// Login routes
router.get('/login', userController.renderLogin);
router.post('/login', userController.loginUser);

// Register routes
router.get('/register', (req, res) => {
    res.render('register', { error: null }); // Pass null to avoid reference errors
});
router.post('/register', userController.registerUser);

// Forgot password routes
router.get('/forgotpassword', userController.renderForgotPassword);
router.post('/forgotpassword', userController.handleForgotPassword);

// Profile route
router.get('/profile', (req, res) => {
    res.render('userprofile');
});

router.use('/userChallenges', userChallengeRoute);

// Use challengeRoute for the '/challenges' path
router.use('/challenges', challengeRoute);

module.exports = router;
