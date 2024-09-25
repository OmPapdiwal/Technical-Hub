const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const ContactSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // Correct spelling for "required"
  },
  email: {
    type: String,
    required: true, // Correct spelling for "required"
  },
  message: {
    type: String,
    required: true, // Correct spelling for "required"
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

// json web token generation (if needed)
ContactSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      "secret",
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// define the model or the collection name
const Contact = new mongoose.model("Contact", ContactSchema);
module.exports = Contact;
