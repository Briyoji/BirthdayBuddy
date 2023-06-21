require("dotenv").config();

const { body, validationResult } = require("express-validator");
const { isEmail, isLength } = require("validator");

const CheckValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

const loginValidation = [
  body('identifier').custom((identifier, { req }) => {
    identifier = identifier.toLowerCase().trim();
    if (isEmail(identifier)) {
      req.identifierType = 'email';
      return true;
    } else {
      if (isLength(identifier, { min: 3, max: 15 })) {
        req.identifierType = 'username';
        return true;
      } else {
        throw new Error('Username should be between 3-15 Characters');
      }
    }
  }),
  body("password", "Password should be of atleast 6 Characters")
    .exists()
    .isLength({ min: 6 }),
];

const signupValidation = [
  body("email", "Enter a valid email").isEmail(),
  body("username", "Username should be of atleast 3 Characters")
    .exists()
    .isLength({ min: 3 }),
  body("password", "Password should be of atleast 6 Characters")
    .exists()
    .isLength({ min: 6 }),
];

module.exports = { CheckValidation, loginValidation, signupValidation };
