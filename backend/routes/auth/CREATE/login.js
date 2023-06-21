require("dotenv").config();

const { signupValidation, CheckValidation, loginValidation } = require("../Helpers/validators");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const { generateAuthToken } = require("../Helpers/tokens");

const User = require("../../../models/User");
const Token = require("../../../models/Token");

router.post("/", loginValidation, async (req, res) => {
  try {
    if (CheckValidation(req, res)) return null;

    const raiseInvalidLoginError = (code = 400, message = "invalid Login Details!") => {
      return res.status(code).json({ error: message });
    };
  
    const identifier = req.body.identifier.toLowerCase().trim();
    // Checking if the user exists
    let user = await User.findOne({ [req.identifierType] : identifier });
    if (!user) return raiseInvalidLoginError();

    // Comparing the password
    const passCompare = await bcrypt.compare(req.body.password + process.env.PEPPER,user.password);    
    if (!passCompare) return raiseInvalidLoginError();

    // Checking if the user is already logged in
    const token = await Token.findOne({ id: user._id });
    if (token) return raiseInvalidLoginError(406, "User already logged in!")
    
    // Generating the token
    const data = {
      id: user._id,
      valid: true,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 )
    };

    const { authToken } = await generateAuthToken(data);
    res.json({authToken})
    
  } catch (error) {
    // Catching unwanted errors
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
