const User = require("../models/User.js");
// services/userService.js
const TripPlan = require("../models/TripPlan.js"); // Adjust path as needed
const bcrypt = require("bcryptjs/dist/bcrypt.js");

const getUserByIdService = async (id) => {
  try {
    const user = await User.findById(id).exec();
    return user;
  } catch (error) {
    throw new Error(`Error fetching user : ${error.message}`);
  }
};

const addTripPlanToUser = async (userId, tripId) => {
  try {
    // Find the user and add tripId to the tripPlanIds array
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { tripPlanIds: tripId } }, // Use $addToSet to avoid duplicates
      { new: true, runValidators: true } // Return the updated document and validate
    ).exec();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    throw new Error(`Error adding trip plan to user: ${error.message}`);
  }
};

const deleteUserService = async (userId) => {
  try {
    // Find and delete the user by ID
    const result = await User.findByIdAndDelete(userId).exec();

    if (!result) {
      throw new Error("User not found");
    }

    return "User deleted successfully";
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

const getTripsByUserIdService = async (userId) => {
  try {
    // Find the user by userId
    const user = await User.findById(userId).exec();

    if (!user) {
      throw new Error("User not found");
    }

    // Find all trip plans where their IDs match the user's tripPlanIds
    const trips = await TripPlan.find({
      _id: { $in: user.tripPlanIds },
    }).exec();

    return trips;
  } catch (error) {
    throw new Error(
      `Error fetching trips for user ${userId}: ${error.message}`
    );
  }
};

const updateUserDetailsService = async (userId, { newUsername, newEmail }) => {
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error("User not found");
    }
    user.username = newUsername || user.username;
    user.email = newEmail || user.email;
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error updating user details: ${error.message}`);
  }
};

// Update password
const updateUserPasswordService = async (userId, newPassword) => {
  try {
    const user = await User.findById(userId).exec();
    if (!user) {
      throw new Error("User not found");
    }
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    return user;
  } catch (error) {
    throw new Error(`Error updating user password: ${error.message}`);
  }
};

module.exports = {
  getUserByIdService,
  addTripPlanToUser,
  deleteUserService,
  getTripsByUserIdService,
  updateUserDetailsService,
  updateUserPasswordService,
};
