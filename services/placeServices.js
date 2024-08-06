const axios = require("axios");

const getPlaceDetails = async (placeName, token) => {
  try {
    const response = await axios.post(
      "https://etqan-abet-assessment-tool.onrender.com/get-place-details",
      {
        searchQuery: placeName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${placeName}:`, error.message);
    return null;
  }
};

module.exports = getPlaceDetails;
