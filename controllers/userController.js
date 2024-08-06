// controllers/userController.js
import { getTripsByUserIdService } from '../services/userServices.js'; // Adjust path as needed
import getToken from '../utils/getToken.js';
import getUserIdFromToken from '../utils/getUserIdFromToken.js';

export const getUserTripPlansByUserIdHandler = async (req, res) => {
  const { id } = req.params; // Extract userId from route parameters
  try {
    // Call the service function to get trips for the user
    const trips = await getTripsByUserIdService(id);

    // Send the trips data as the response
    res.json(trips);
  } catch (error) {
    console.error('Error getting user trips:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateUserNameAndEmailHandler = async (req, res) => {
  const { newUsername, newEmail } = req.body;
  const userId = getUserIdFromToken(getToken(req));

  try {
    const updatedUser = await updateUserDetailsService(userId, {
      newUsername,
      newEmail,
    });
    res.json({
      message: 'User details updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUserPasswordHandler = async (req, res) => {
  const { newPassword } = req.body;
  const userId = getUserIdFromToken(getToken(req));

  try {
    // Hash the new password before updating
    const updatedUser = await updateUserPasswordService(userId, newPassword);
    res.json({ message: 'Password updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
