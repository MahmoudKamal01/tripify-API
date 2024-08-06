const jwt = require("jsonwebtoken");

const getUserIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    return decoded.userId;
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return null;
  }
};

module.exports = getUserIdFromToken;
