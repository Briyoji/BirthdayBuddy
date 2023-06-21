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
    if (!user) return res.status(401).send({error: "User Not Authorized!"});

    // Fetching the details of the other user (whose profile is being requested) based on username.
    const details = await User.findOne({username : req.body.username, public: true}).select("-password");
    if (!details) return res.status(404).send({error: "User Not Found!"});

    res.send(details);

  } catch (error) {
    // Catching any unwanted errors
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
})

module.exports = router;
