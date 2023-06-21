require('dotenv').config();

var jwt = require('jsonwebtoken');
const Token = require('../models/Token');

const { validateAuthToken } = require('../routes/auth/Helpers/tokens');

const verifyUser = async (req, res, next) => {

    const raiseInvalidTokenError = () => {
        res.status(401).send({error: "Please authenticate using a valid token!"});
    };

    const hashedToken = req.headers.authorization;
    if (!hashedToken) return raiseInvalidTokenError();

    // Checking if the token is valid
    const { success, token } = await validateAuthToken(hashedToken)
    if (!success) return raiseInvalidTokenError();

    try {
        const data = await Token.findOne({ tokenString: token });
        req.data = data;
        next();
    } catch (error) {
        return raiseInvalidTokenError();    
    }

}

module.exports = { verifyUser };