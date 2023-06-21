const router = require("express").Router();

const { verifyUser } = require("../../../middleware/verifyUser");

const User = require("../../../models/User");
const Birthday = require("../../../models/Birthday");

router.delete('/:id', verifyUser, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.data.id });
    if (!user) return res.status(401).send("User not found");

    const birthday = await Birthday.findById(req.params.id);
    if (!birthday) return res.status(404).send("Birthday not found!");

    console.log(birthday.createdBy.toString(), req.data.id);

    if (birthday.createdBy.toString() !== req.data.id) return res.status(401).send("Unauthorized");

    await Birthday.findByIdAndDelete(req.params.id);

    res.status(200).send("Birthday deleted successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;