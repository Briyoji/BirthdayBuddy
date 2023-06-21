const router = require("express").Router();

const { verifyUser } = require("../../../middleware/verifyUser");

const User = require("../../../models/User");
const Birthday = require("../../../models/Birthday");

router.get("/", verifyUser, async (req, res) => {
  try {
    
    // Ensuring the User exists.
    const user = await User.findOne({ _id: req.data.id });
    if (!user) return res.status(401).send("User not found");
    
    // Fetching the Birthdays.
    const birthdays = await Birthday.find({ createdBy: user._id });
    if (!birthdays) return res.status(404).send("No birthdays found!");

    // Sending the response.
    return res.send(birthdays);
  
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong!");  
  }
})

module.exports = router;