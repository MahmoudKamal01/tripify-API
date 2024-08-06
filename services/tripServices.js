// services/tripService.js
import TripPlan from '../models/TripPlan.js'; // Adjust path as needed

export const getTripPlanByIdService = async (planId) => {
  try {
    const plan = await TripPlan.findById(planId).exec();
    return plan;
  } catch (error) {
    throw new Error(`Error fetching trip plan: ${error.message}`);
  }
};

export const addTripPlanToDbService = async (tripPlanData) => {
  try {
    const newTripPlan = await TripPlan.create(tripPlanData);
    return newTripPlan;
  } catch (error) {
    throw new Error(`Error creating trip plan: ${error.message}`);
  }
};

export const updateTripPlanByIdService = async (planId, updateData) => {
  try {
    const updatedTripPlan = await TripPlan.findByIdAndUpdate(
      planId,
      updateData,
      {
        new: true, // Return the updated document
        runValidators: true, // Ensure validators run on update
      }
    ).exec();

    if (!updatedTripPlan) {
      throw new Error('Trip plan not found');
    }

    console.log('Updated TripPlan ID:', updatedTripPlan._id); // Log the ID
    return updatedTripPlan;
  } catch (error) {
    throw new Error(`Error updating trip plan: ${error.message}`);
  }
};

export const deleteTripPlanByIdService = async (planId) => {
  try {
    const deletedTripPlan = await TripPlan.findByIdAndDelete(planId).exec();

    if (!deletedTripPlan) {
      throw new Error('Trip plan not found');
    }

    console.log('Deleted TripPlan ID:', deletedTripPlan._id); // Log the ID
    return deletedTripPlan;
  } catch (error) {
    throw new Error(`Error deleting trip plan: ${error.message}`);
  }
};
