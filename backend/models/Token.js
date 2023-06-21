const { Schema, default: mongoose } = require("mongoose");

const TokenSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  valid: {
    type: Boolean,
    default: true,
  },
  tokenString: {
    type: String,
    required: true,
  },
  expiresAt: { type: Date, expires: 0, default: Date.now }
});

TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("Token", TokenSchema);