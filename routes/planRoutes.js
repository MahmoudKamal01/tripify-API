const express = require("express");
const getPlaceDetailsController = require("../controllers/getPlaceDetails.js");
const {
  createTripPlanHandler,
  deleteTripPlanHandler,
  getTripPlanHandler,
} = require("../controllers/tripPlanController.js");
const authenticateToken = require("../middlewares/authenticateToken.js");
const {
  getUserTripPlansByUserIdHandler,
} = require("../controllers/userController.js");

const router = express.Router();

router.post("/get-place-details", authenticateToken, getPlaceDetailsController);
router.post("/trip-plan", authenticateToken, createTripPlanHandler);
router.get("/trip-plan/:id", authenticateToken, getTripPlanHandler);
router.delete("/trip-plan/:id", authenticateToken, deleteTripPlanHandler);
router.get(
  "/user/:id/trip-plans",
  authenticateToken,
  getUserTripPlansByUserIdHandler
);

module.exports = router;
