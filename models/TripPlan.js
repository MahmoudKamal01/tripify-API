import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the schema for a place
const placeSchema = new Schema({
  place: {
    type: String,
    required: true,
  },
  isHotel: {
    type: Boolean,
    required: true,
  },
  scheduledHours: {
    type: String,
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  workingHours: [
    {
      type: String,
    },
  ],
  imageUrl: {
    type: String,
    required: true,
  },
});

// Define the schema for a trip plan
const tripPlanSchema = new Schema({
  places: [placeSchema], // Array of places
});

const TripPlan = mongoose.model('TripPlan', tripPlanSchema);

export default TripPlan;
