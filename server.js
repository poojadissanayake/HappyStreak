const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const port = 3000;
const { connectDB, getDB } = require('./dbConnection');
const db = getDB();
const routes = require('./routes/index');

const server = http.createServer(app);
const io = new Server(server);

// Connect to the database when the server starts
connectDB();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up session middleware
const sessionMiddleware = session({
  secret: '1qaz2wsx@A',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});

app.use(sessionMiddleware);

app.use((req, res, next) => {
  // this allows the use of req.io in any controller
  req.io = io;  
  next();
});

app.get('/getUserId', (req, res) => {
  if (req.session.userId) {
      res.json({ userId: req.session.userId });
  } else {
      res.status(404).json({ message: 'User not logged in' });
  }
});

// Pass the session middleware to Socket.IO
io.use((socket, next) => {
  sessionMiddleware(socket.request, socket.request.res || {}, next);
});

// Use routes
app.use('/', routes);
// app.use('/user', userRoutes);

// Socket.IO connection handler
io.on('connection', (socket) => {
  const session = socket.request.session;

  if (session.userId) {
    console.log(`User ID from session: ${session.userId}`);
  } else {
    console.log('No user in session');
  }

  socket.on('createUserSession', (data) => {
    session.userId = data.userId;
    session.save();
    console.log(`Session created for user: ${data.userId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});