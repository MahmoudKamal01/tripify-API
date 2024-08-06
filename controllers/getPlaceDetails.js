import axios from 'axios';
import { GOOGLE_PLACE_API_KEY } from '../configs/keys.js';

const getPlaceDetailsController = async (req, res) => {
  const { searchQuery } = req.body;

  // Validate input
  if (!searchQuery) {
    return res.status(400).json({ error: 'searchQuery is required' });
  }

  try {
    // Search for places using text query
    const searchResponse = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          query: searchQuery,
          key: GOOGLE_PLACE_API_KEY,
        },
      }
    );

    // Extract place results
    const places = searchResponse.data.results;

    if (places.length > 0) {
      const placeId = places[0].place_id; // Get the place_id of the first result

      // Get detailed information about the place
      const detailsResponse = await axios.get(
        'https://maps.googleapis.com/maps/api/place/details/json',
        {
          params: {
            place_id: placeId,
            key: GOOGLE_PLACE_API_KEY,
          },
        }
      );

      const place = detailsResponse.data.result;

      // Extract working hours
      const workingHours = place.opening_hours
        ? place.opening_hours.weekday_text
        : 'No working hours available';

      const imageUrl = place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.GOOGLE_PLACE_API_KEY}`
        : null;

      // Respond with place details, working hours, and image URL
      res.json({
        place: searchQuery,
        website: place.website,
        address: place.formatted_address,
        rating: place.rating,
        workingHours: workingHours,
        imageUrl: imageUrl,
        priceLevel: place.price_level,
      });
    } else {
      res.status(404).json({ error: 'No places found' });
    }
  } catch (error) {
    console.error('Error fetching place details:', error);
    res
      .status(500)
      .json({ error: 'Error fetching place details from Google Places API' });
  }
};

export default getPlaceDetailsController;
