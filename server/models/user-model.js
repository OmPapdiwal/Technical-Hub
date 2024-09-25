const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
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
  timestamps: true,
});

// Secure the password with bcrypt before saving
userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  try {
    const saltRounds = 10;
    const hash_password = await bcrypt.hash(user.password, saltRounds);
    user.password = hash_password;
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate JSON Web Token (JWT)
userSchema.methods.generateToken = function () {
  try {
    const secretKey = "secret";
    if (!secretKey) {
      throw new Error("JWT secret key is missing");
    }
    console.log(secretKey);
    console.log("Generating token with secret key:", secretKey);
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      secretKey,
      {
        expiresIn: "30d",
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
