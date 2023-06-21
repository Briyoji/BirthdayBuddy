require("dotenv").config();

const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Token = require("../../../models/Token");

// Encryption function
function encrypt(text) {
  let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(Buffer.from(process.env.TOKEN_KEY, 'base64'), 'hex'), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decryption function
function decrypt(text) {
  let textParts = text.split(':');
  let iv = Buffer.from(textParts.shift(), 'hex');
  let encryptedText = Buffer.from(textParts.join(':'), 'hex');
  let decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(Buffer.from(process.env.TOKEN_KEY, 'base64'), 'hex'), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

async function generateAuthToken(data, expiry = "1h") {
  let validatedToken = false;
  var token = {};
  var authToken = "";

  do {
    authToken = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: expiry });

    token = await Token.findOne({ tokenString: authToken });
    if (!token) {
      
      // Creating the token in the database
      data.tokenString = authToken;
      token = new Token(data);
      token.save();

      validatedToken = true;
    }

  } while (validatedToken === false);

  authToken = encrypt(authToken, process.env.TOKEN_KEY);
  return { authToken, token };

  // Extra: 
  //  - Salt the token for added security.

}

async function validateAuthToken(hashedToken) {
  try {
    
    authToken = decrypt(hashedToken, process.env.TOKEN_KEY);

    let token = jwt.verify(authToken, process.env.JWT_SECRET);
    token = await Token.findOne({ tokenString: authToken });
    
    if (!token) return false;
    if (!token.valid) return false;

    var expiry = new Date(token.expiresAt);
    var current = new Date(Date.now());
    
    return {success : expiry > current, token : expiry > current ? token.tokenString : hashedToken};

  } catch (error) {
    return {success : false , token : hashedToken };
  }
}

module.exports = { generateAuthToken, validateAuthToken };