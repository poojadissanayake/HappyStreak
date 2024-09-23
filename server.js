const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const app = express();
const port = 3000;
const { connectDB } = require("./dbConnection"); // Import the connection function
const routes = require("./routes/index");

let server = require("http").createServer(app);
let io = require("socket.io")(server);

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

// Connect to the database when the server starts
async function startServer() {
  await connectDB(); // Wait for the database connection
  // Built-in middleware to parse JSON
  app.use(express.json());

  // Built-in middleware to parse URL-encoded data
  app.use(express.urlencoded({ extended: true }));

  // Set the view engine to EJS
  app.set("view engine", "ejs");

  // Use routes
  app.use("/", routes);

  // Serve static files from the 'public' directory
  app.use(express.static(path.join(__dirname, "public")));

  // Start the server
  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start the server:", error);
});
