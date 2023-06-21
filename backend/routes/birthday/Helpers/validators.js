require("dotenv").config();

const { body, validationResult } = require("express-validator");
const { isEmpty, isLength } = require("validator");

const User = require("../../../models/User");

const CheckValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

const createBirthdayValidation = [
  body('username').custom((username, { req }) => {

    if (Date.parse(req.body.birthdate) && !isEmpty(req.body.name)) {
      // if the user has provided a birthdate and name,  create the birthday with the provided data.
      req.modeflag = false;
      return true;
  
    } else if (!isEmpty(username) && username.length > 3) {
      // If the user has provided a username,  fetch the user with that username and add the user's name and birthdate to the birthdayData.
      req.modeflag = true;
      return true;
  
    } else {
      // If no data is provided, error is thrown.
      throw new Error("No Data Provided!");
    }

  }),
];

module.exports = { CheckValidation, createBirthdayValidation };