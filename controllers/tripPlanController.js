import { chatSession } from '../services/AiModal.js'; // Adjust import path as needed
import getPlaceDetails from '../services/placeServices.js';
import {
  addTripPlanToDbService,
  deleteTripPlanByIdService,
  getTripPlanByIdService,
} from '../services/tripServices.js';
import { addTripPlanToUser } from '../services/userServices.js';
import getToken from '../utils/getToken.js';
import getUserIdFromToken from '../utils/getUserIdFromToken.js';

export const createTripPlanHandler = async (req, res) => {
  try {
    const { location, totalDays, groupSize, budgetLevel } = req.body;

    const message = `Generate Trip Plan for Location: ${location}, for ${totalDays} days for ${groupSize} with a ${budgetLevel} budget. Provide a list of hotels with descriptions and an itinerary with place names, details, and ticket pricing for each day. For each place put country name next to it in brackets in same place field. The whole response should be an array of places, add field isHotel as boolean to indicate if it is a hotel or not, and add day number for places to visit and hours of visit as scheduled per program of day of the day program which is your recommendation organize the hours suggest to visit each place like Effiel tower from 2 to 4pm, river from 4.30 to 6 pm like this name this field (scheduledHours), don’t add day or visiting hours for hotels.`;

    const result = await chatSession.sendMessage(message);

    if (!result || !result.response || !result.response.text) {
      throw new Error('Invalid response format from chatSession');
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(result.response.text());
    } catch (parseError) {
      console.error(
        'Failed to parse response text as JSON:',
        parseError.message
      );
      throw new Error('Failed to parse response text as JSON');
    }

    if (!Array.isArray(parsedResult)) {
      throw new Error('Parsed result is not an array');
    }

    const allPlaceNames = parsedResult.map((item) => item.place);
    const detailedPlacesPromises = allPlaceNames.map((place) =>
      getPlaceDetails(place, getToken(req))
    );
    const detailedPlaces = await Promise.all(detailedPlacesPromises);

    const placeDetailsMap = detailedPlaces.reduce((acc, placeDetails) => {
      if (placeDetails) {
        acc[placeDetails.place] = placeDetails;
      }
      return acc;
    }, {});

    const enrichedResult = parsedResult.map((place) => {
      const detailedInfo = placeDetailsMap[place.place] || {};
      return {
        ...place,
        ...detailedInfo,
        isHotel: place.place && place.place.toLowerCase().includes('hotel'),
      };
    });

    const combinedData = {
      places: enrichedResult,
    };
    const userId = getUserIdFromToken(getToken(req));
    const savedTripPlan = await addTripPlanToDbService(combinedData);
    const addedTripToUser = await addTripPlanToUser(userId, savedTripPlan._id);

    res.json({ trip_plan_id: savedTripPlan._id, ...combinedData });
  } catch (error) {
    console.error('Error generating trip plan:', error.message);
    res.status(500).send('Error generating trip plan');
  }
};

export const getTripPlanHandler = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you pass the planId as a route parameter
    const plan = await getTripPlanByIdService(id);

    if (plan) {
      res.json(plan);
    } else {
      res.status(404).json({ message: 'Trip plan not found' });
    }
  } catch (error) {
    console.error('Error fetching trip plan:', error.message);
    res.status(500).json({ message: 'Error fetching trip plan' });
  }
};

export const deleteTripPlanHandler = async (req, res) => {
  try {
    const { id } = req.params; // Extract trip plan ID from URL parameters
    const deletedTripPlan = await deleteTripPlanByIdService(id); // Call the service to delete the plan

    if (!deletedTripPlan) {
      return res.status(404).json({ message: 'Trip plan not found' });
    }

    res
      .status(200)
      .json({ message: 'Trip plan deleted successfully', deletedTripPlan });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
