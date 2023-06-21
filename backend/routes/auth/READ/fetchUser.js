require("dotenv").config();

const express = require("express");
const router = express.Router();

const User = require("../../../models/User");

const { verifyUser } = require("../../../middleware/verifyUser");
const { validateAuthToken } = require("../Helpers/tokens");

router.get("/", verifyUser, async (req, res) => {
  try {
    // Fetching the user
    const user = await User.findById(req.data.id).select("-password");
    res.send(user);

  } catch (error) {
    // Catching any unwanted errors
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
})

module.exports = router;
