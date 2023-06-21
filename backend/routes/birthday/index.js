require("dotenv").config();

const express = require("express");
const router = express.Router();

// CREATE routes
router.use("/create", require("./CREATE/createBirthday"))

// READ routes
router.use("/fetch", require("./READ/fetchBirthday"))

// UPDATE routes
router.use("/update", require("./UPDATE/updateBirthday"))

// DELETE routes
router.use("/delete", require("./DELETE/deleteBirthday"))

module.exports = router;
