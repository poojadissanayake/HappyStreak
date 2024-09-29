const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

async function renderLogin(req, res) {
  res.render("login");
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;
    const user = await userModel.findUserByEmail(email);

    if (user) {
      // Compare entered password with stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        // Handle successful login (e.g., create session)
        return res.json({
          statusCode: 201,
          message: "Login Successful",
          data: {
            name: user.name,
            id: user._id,
          },
        });
        // return res.redirect("/profile");
        // return res.render("login", { success: "Login successful!" }); // Pass success message
      } else {
        return res.json({
          statusCode: 401,
          message: "Invalid credentials",
        });
        // return res.render("login", { error: "Invalid credentials" });
      }
    } else {
      return res.json({
        statusCode: 401,
        message: "Invalid credentials",
      });
      // return res.render("login", { error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.json({
      statusCode: 401,
      message: "Invalid credentials",
    });
    // return res.render("login", { error: "Something went wrong" });
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
