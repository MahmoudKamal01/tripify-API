const axios = require("axios");
const { GOOGLE_PLACE_API_KEY } = require("../configs/keys");

const googlePlaceApiURL = "https://places.googleapis.com/v1/places:searchText";
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Google-Api-Key": GOOGLE_PLACE_API_KEY,
    "X-Goog-FieldMask": ["places.photo", "places.displayName", "places.id"],
  },
};
const GetPlaceDetails = (data) => axios.post(googlePlaceApiURL, data, config);

module.exports = {
  GetPlaceDetails,
};
