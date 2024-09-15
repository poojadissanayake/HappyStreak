const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { connectDB, getDB } = require('./dbConnection'); 
const db = getDB(); 

// Connect to the database when the server starts
connectDB();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html from the 'views' folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});