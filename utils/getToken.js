function getToken(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer token
  if (!token) throw new Error("Token not provided");
  return token;
}

module.exports = getToken;
