const User = require("../models/user-model");
const bcrypt = require("bcryptjs");


// *-------------------
// Home Logic
// *-------------------

const home = async (req, res) => {
  try {
    res.status(200).send(
      "Welcome to the world's best MERN series by Thapa Technical using router!"
    );
  } catch (error) {
    console.error("Error in home route:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  const register = async (req, res) => {
    try {
      const { username, email, phone, password } = req.body;
      console.log(req.body);
  
      // Check if the user already exists
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Hash the password before saving the user
      const saltRounds = 10;
      const hash_password = await bcrypt.hash(password, saltRounds);
  
      // Create a new user with hashed password
      const newUser = new User({
        username,
        email,
        phone,
        password: hash_password, // Use hashed password
      });
  
      // Save the user to the database
      await newUser.save();
  
      // Generate JWT token
      const token = await newUser.generateToken();
      console.log(token);
  
      res.status(201).json({
        message: "Registration successful",
        token,
        userId: newUser._id.toString(),
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// *-------------------------------
//* User Login Logic 📝
// *-------------------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = await user.generateToken();

    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// *-------------------------------
//* To Send User Data - User Logic 📝
// *-------------------------------

const user = async (req, res) => {
  try {
    const userData = req.user; // Assuming req.user is populated via authentication middleware
    res.status(200).json({ userData });
  } catch (error) {
    console.error(`Error in user route: ${error}`);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { home, register, login, user };
