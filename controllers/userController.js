// controllers/userController.js
const { getTripsByUserIdService } = require("../services/userServices.js"); // Adjust path as needed
const getToken = require("../utils/getToken.js");
const getUserIdFromToken = require("../utils/getUserIdFromToken.js");

const getUserTripPlansByUserIdHandler = async (req, res) => {
  const { id } = req.params; // Extract userId from route parameters
  try {
    // Call the service function to get trips for the user
    const trips = await getTripsByUserIdService(id);

    // Send the trips data as the response
    res.json(trips);
  } catch (error) {
    console.error("Error getting user trips:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const updateUserNameAndEmailHandler = async (req, res) => {
  const { newUsername, newEmail } = req.body;
  const userId = getUserIdFromToken(getToken(req));

  try {
    const updatedUser = await updateUserDetailsService(userId, {
      newUsername,
      newEmail,
    });
    res.json({
      message: "User details updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserPasswordHandler = async (req, res) => {
  const { newPassword } = req.body;
  const userId = getUserIdFromToken(getToken(req));

  try {
    // Hash the new password before updating
    const updatedUser = await updateUserPasswordService(userId, newPassword);
    res.json({ message: "Password updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getUserTripPlansByUserIdHandler,
  updateUserNameAndEmailHandler,
  updateUserPasswordHandler,
};
