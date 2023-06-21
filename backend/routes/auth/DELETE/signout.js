require("dotenv").config();

const express = require("express");
const router = express.Router();

const Token = require("../../../models/Token");

const { validateAuthToken } = require("../Helpers/tokens");

router.delete("/", async (req, res) => {

  const raiseInvalidTokenError = () => {
    res.status(401).send({error: "Please authenticate using a valid token!"});
  };

  // Checking if the token is valid
  const hashedToken = req.headers.authorization;
  if (!hashedToken) return raiseInvalidTokenError();

  // Checking if the token is valid
  const { success, token } = await validateAuthToken(hashedToken)
  if (!success) return raiseInvalidTokenError();

  try {    
    // Deleting the token
    await Token.findOneAndDelete({tokenString: token});
    res.send({message: "User logged out successfully!"});
  } catch (error) {
    // Catching any unwanted errors
    console.error(error.message);
    res.status(500).send("Internal Server Error!");
  }

});

module.exports = router;
