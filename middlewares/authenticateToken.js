import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
  // Extract the token from headers or query parameters
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (token == null) return res.sendStatus(401); // Unauthorized if no token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};

export default authenticateToken;
