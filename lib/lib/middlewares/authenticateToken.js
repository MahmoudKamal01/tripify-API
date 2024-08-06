"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
var authenticateToken = function authenticateToken(req, res, next) {
  // Extract the token from headers or query parameters
  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (token == null) return res.sendStatus(401); // Unauthorized if no token

  _jsonwebtoken["default"].verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.sendStatus(403); // Forbidden if token is invalid
    req.user = user; // Attach user info to request object
    next(); // Proceed to the next middleware or route handler
  });
};
var _default = exports["default"] = authenticateToken;