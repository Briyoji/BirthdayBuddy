require("dotenv").config();

const { signupValidation, CheckValidation } = require("../Helpers/validators");

const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const { generateAuthToken } = require("../Helpers/tokens");

const User = require("../../../models/User");

router.post("/", signupValidation, async (req, res) => {
  try {
    if (CheckValidation(req, res)) return null;

    const raiseInvalidSignupError = (
      code = 400,
      errs = [{ msg: "invalid Signup Details!", path: "email" }]
    ) => {
      const data = [];
      errs.map((err) => {
        data.push({
          msg: err.msg,
          type: "invalidSignup",
          path: err.path,
          location: "auth/signup",
        });
      });

      return res.status(code).json({errors:data});
    };

    req.body.email = req.body.email.toLowerCase().trim();
    req.body.username = req.body.username.toLowerCase().trim();
    req.body.name = req.body.name.toLowerCase().trim();
  
    // Checking if the user exists
    let user = await User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]});
    if (user) {
      if (user.email === req.body.email && user.username === req.body.username) return raiseInvalidSignupError(409, [{msg:"Username already exists!", path:"username"},{msg:"Email already exists!", path:"email"}]);
      if (user.email === req.body.email) return raiseInvalidSignupError(409, [{msg:"Email already exists!", path:"email"}]);
      if (user.username === req.body.username) return raiseInvalidSignupError(409, [{msg:"Username already exists!", path:"username"}]);
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password + process.env.PEPPER, salt);
  
    // Creating the user
    const userData = req.body;
    userData.password = hashedPassword;
    userData.birthdate = new Date(Date.parse(userData.birthdate)).toISOString().split('T')[0];
    
    user = await User.create(userData);
  
    // Generating Response Token
    const tokenData = {
      id: user._id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 )
    };
    
    const { authToken } = await generateAuthToken(tokenData);
    res.json({ authToken });

  } catch (error) {
    // Catching unwanted errors
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
