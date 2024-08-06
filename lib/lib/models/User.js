"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : {
    "default": e
  };
}
var UserSchema = new _mongoose["default"].Schema({
  username: String,
  googleId: String,
  email: String,
  password: String,
  refreshToken: String,
  createdAt: {
    type: Date,
    "default": Date.now
  },
  tripPlanIds: [String]
});
var User = _mongoose["default"].model('User', UserSchema);
var _default = exports["default"] = User;