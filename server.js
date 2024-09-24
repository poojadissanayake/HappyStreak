const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { connectDB, getDB } = require('./dbConnection');
const db = getDB();
const routes = require('./routes/index');

// Connect to the database when the server starts
connectDB();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Parse JSON bodies
app.use(express.json());

// Use routes
app.use('/', routes);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});