// routes/userRoutes.js
import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';
import {
  getUserTripPlansByUserIdHandler,
  updateUserNameAndEmailHandler,
  updateUserPasswordHandler,
} from '../controllers/userController.js';

const router = express.Router();

// Update username and email
router.put('/update-profile', authenticateToken, updateUserNameAndEmailHandler);

// Update password
router.put('/update-password', authenticateToken, updateUserPasswordHandler);

//get user trip plans
router.get(
  '/:id/trip-plans',
  authenticateToken,
  getUserTripPlansByUserIdHandler
);
export default router;
