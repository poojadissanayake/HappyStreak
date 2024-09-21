const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const port = 3000;
const { connectDB } = require("./dbConnection"); // Import the connection function
const routes = require("./routes/index");

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: "live.smtp.mailtrap.io",
  port: 587,
  secure: false, // use SSL
  auth: {
    user: process.env.EMAIL_USER_ID,
    pass: process.env.EMAIL_USER_PASSWORD,
  },
});

io.on("connection", (socket) => {
  console.log("Connection established");

  socket.on("sendEmail", (data) => {
    const mailOptions = {
      from: "info@happystreak.com.au",
      to: "edwinmhzn@gmail.com",
      subject: data.subject,
      text: data.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        socket.emit("emailStatus", "Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        socket.emit("emailStatus", "Email sent successfully");
      }
    });
  });

  socket.on("disconnect", () => {
    console.log("Disconnected");
  });
});
const { connectDB } = require("./dbConnection"); // Import the connection function
const routes = require("./routes/index");

const server = http.createServer(app);
const io = new Server(server);

// Connect to the database when the server starts
async function startServer() {
  await connectDB(); // Wait for the database connection
  // Built-in middleware to parse JSON
  app.use(express.json());
  await connectDB(); // Wait for the database connection
  // Built-in middleware to parse JSON
  app.use(express.json());

  // Built-in middleware to parse URL-encoded data
  app.use(express.urlencoded({ extended: true }));

  // Set the view engine to EJS
  app.set("view engine", "ejs");

  // Use routes
  app.use("/", routes);
  // Middleware to parse JSON and URL-encoded data
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Set the view engine to EJS
  app.set("view engine", "ejs");

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));

  // Set up session middleware
  const sessionMiddleware = session({
    secret: "1qaz2wsx@A",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://admin:sQbQ7UpBocNpW85I@cluster0.c1bcmhv.mongodb.net/",
      collectionName: "sessions",
    }),
    cookie: { secure: false }, // Set to true if using HTTPS
  });

  app.use(sessionMiddleware);

  // Pass the session middleware to Socket.IO
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
  });

  // Use routes
  app.use("/", routes);

  // Socket.IO connection handler
  io.on("connection", (socket) => {
    const session = socket.request.session;

    console.log("user connected");

    if (session.userId) {
      console.log(`User ID from session: ${session.userId}`);
    } else {
      console.log("No user in session");
    }

    socket.on("markStep", (data) => {
      const { challengeId, step } = data;
      // Handle marking the step in the challenge for this user --> should work on this later
      console.log(
        `Marking step ${step} of challenge ${challengeId} for user ${session.userId}`
      );
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
  // Built-in middleware to parse URL-encoded data
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));

  // Start the server
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
  // Set the view engine to EJS
  app.set("view engine", "ejs");

  // Use routes
  app.use("/", routes);

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
