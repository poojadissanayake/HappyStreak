const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const { connectDB } = require('./dbConnection'); // Import the connection function
const routes = require('./routes/index');

// Connect to the database when the server starts
async function startServer() {
    await connectDB(); // Wait for the database connection
    // Built-in middleware to parse JSON
    app.use(express.json());

    // Built-in middleware to parse URL-encoded data
    app.use(express.urlencoded({ extended: true }));

    // Set the view engine to EJS
    app.set('view engine', 'ejs');

    // Use routes
    app.use('/', routes);

    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

startServer().catch(error => {
    console.error('Failed to start the server:', error);
});
