// routes/userRoutes.js
const express = require("express");
const authenticateToken = require("../middlewares/authenticateToken.js");
const {
  getUserTripPlansByUserIdHandler,
  updateUserNameAndEmailHandler,
  updateUserPasswordHandler,
} = require("../controllers/userController.js");

const router = express.Router();

// Update username and email
router.put("/update-profile", authenticateToken, updateUserNameAndEmailHandler);

// Update password
router.put("/update-password", authenticateToken, updateUserPasswordHandler);

//get user trip plans
router.get(
  "/:id/trip-plans",
  authenticateToken,
  getUserTripPlansByUserIdHandler
);
module.exports = router;
