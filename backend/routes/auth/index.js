require("dotenv").config();

const express = require("express");
const router = express.Router();

// CREATE routes
router.use("/signup", require("./CREATE/signup")); // Signup route
router.use("/login", require("./CREATE/login")); // Login route

// READ routes
router.use("/fetchUser", require("./READ/fetchuser")); // Get the details of the Logged In User
router.use("/getUser", require("./READ/getuser")); // Get the details of another User by username

// UPDATE routes
router.use("/updateUser", require("./UPDATE/updateUser")); // Update the details of the Logged In User

// DELETE routes
router.use("/signout", require("./DELETE/signout"));


module.exports = router;
