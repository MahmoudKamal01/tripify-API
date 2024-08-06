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
var Schema = _mongoose["default"].Schema;

// Define the schema for a place
var placeSchema = new Schema({
  place: {
    type: String,
    required: true
  },
  isHotel: {
    type: Boolean,
    required: true
  },
  scheduledHours: {
    type: String
  },
  website: {
    type: String
  },
  address: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  workingHours: [{
    type: String
  }],
  imageUrl: {
    type: String,
    required: true
  }
});

// Define the schema for a trip plan
var tripPlanSchema = new Schema({
  places: [placeSchema] // Array of places
});
var TripPlan = _mongoose["default"].model('TripPlan', tripPlanSchema);
var _default = exports["default"] = TripPlan;