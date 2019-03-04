const jwt = require("jsonwebtoken");

const generateToken = userId => {
  if (process.env.JWT_SECRET) {
    const secret = process.env.JWT_SECRET;
    const payload = {
      userId
    };
    const token = jwt.sign(payload, secret, {
      expiresIn: "15day"
    });
    return token;
  } else {
    throw new Error("Erreur génération de token");
  }
};

module.exports = { generateToken };
