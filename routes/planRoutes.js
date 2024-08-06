import express from 'express';
import getPlaceDetailsController from '../controllers/getPlaceDetails.js';
import {
  createTripPlanHandler,
  deleteTripPlanHandler,
  getTripPlanHandler,
} from '../controllers/tripPlanController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { getUserTripPlansByUserIdHandler } from '../controllers/userController.js';
const router = express.Router();

router.post('/get-place-details', authenticateToken, getPlaceDetailsController);
router.post('/trip-plan', authenticateToken, createTripPlanHandler);
router.get('/trip-plan/:id', authenticateToken, getTripPlanHandler);
router.delete('/trip-plan/:id', authenticateToken, deleteTripPlanHandler);
router.get(
  '/user/:id/trip-plans',
  authenticateToken,
  getUserTripPlansByUserIdHandler
);

export default router;
