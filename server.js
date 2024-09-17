const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { connectDB, getDB } = require('./dbConnection'); 
const db = getDB(); 

// Connect to the database when the server starts
connectDB();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// // Serve index.html from the 'views' folder
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'index.html'));
// });

// Route for rendering the landing page using EJS
app.get('/', (req, res) => {
    res.render('index'); // render 'index.ejs' in 'views' folder
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});