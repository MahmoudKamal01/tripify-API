import axios from 'axios';
import { GOOGLE_PLACE_API_KEY } from '../configs/keys';

const googlePlaceApiURL = 'https://places.googleapis.com/v1/places:searchText';
const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Google-Api-Key': GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask': ['places.photo', 'places.displayName', 'places.id'],
  },
};
export const GetPlaceDetails = (data) =>
  axios.post(googlePlaceApiURL, data, config);
