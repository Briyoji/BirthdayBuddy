const { Schema, default: mongoose } = require("mongoose");

const BirthdaySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  username: {
    type: String,
    ref: "User",
    default: null,
  },
  note: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Birthday", BirthdaySchema);