const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    trim: true,
    max: 15,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  name: {
    type: String,
    trim: true,
    required: true,
    max: 50,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  public: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("User", userSchema);