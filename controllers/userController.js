const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

async function renderLogin(req, res) {
  res.render("login", { error: null });
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);
    console.log("Fetched user:", user);
    if (!user) {
      return res.json({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }
    if (user) {
      console.log("User found in database:", user);

      // Compare entered password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match result:", isMatch);

      if (isMatch) {
        req.session.userId = user._id; // Store user ID in session
        console.log("User logged in, user ID: " + req.session.userId);
        return res.json({
          statusCode: 200,
          message: "Login successful",
          data: { id: user._id },
        });
      } else {
        return res.json({
          statusCode: 401,
          message: "Password is incorrect",
        });
      }
    } else {
      return res.json({
        statusCode: 401,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.json({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }
}

async function renderRegister(req, res) {
  res.render("register", { error: null });
}

async function registerUser(req, res) {
  console.log(req.body);
  try {
    const { name, email, dob, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.json({
        statusCode: 422,
        message: "Passwords do not match",
      });
      // return res.render("register", { error: "Passwords do not match" });
    }

    // Check if email is already in use
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
      return res.json({
        statusCode: 422,
        message: "Email already in use",
      });
      // return res.render("register", { error: "Email already in use" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Convert dob to Date object
    const dobAsDate = new Date(dob); // Convert the string from the form to a Date object

    // Create new user in the database
    await userModel.createUser({
      name,
      email,
      dob: dobAsDate,
      password: hashedPassword,
    });
    return res.json({
      statusCode: 201,
      message: "Registered Successfully!",
    });
    // res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);
    return res.json({
      statusCode: 401,
      message: error,
    });
    // res.render("register", { error: "Something went wrong" });
  }
}

// Placeholder for forgot password logic
async function renderForgotPassword(req, res) {
  res.render("forgotpassword");
}

async function handleForgotPassword(req, res) {
  // Implement password recovery logic here
}

module.exports = {
  renderLogin,
  loginUser,
  renderRegister,
  registerUser,
  renderForgotPassword,
  handleForgotPassword,
};
