require('dotenv').config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // 'require' should be 'required'
  },
  email: {
    type: String,
    required: true, // 'require' should be 'required'
    unique: true,  // Ensure email is unique in the database
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,  // Automatically manage createdAt and updatedAt fields
});

// Secure the password with bcrypt before saving
userSchema.pre("save", async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = 10; // Specify salt rounds
    const hash_password = await bcrypt.hash(user.password, saltRounds);
    user.password = hash_password;
    next(); // Proceed with the next middleware
  } catch (error) {
    return next(error); // Pass any errors to the next middleware
  }
});

// Compare the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JSON Web Token (JWT)
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(), // Data to include in the token
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "secret",  // Correct way to access JWT_SECRET_KEY from environment
      {
        expiresIn: "30d",  // Token expiration time
      }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

// Check if the User model has already been compiled to avoid OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
