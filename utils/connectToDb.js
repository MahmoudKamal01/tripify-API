// utils/db.js
import mongoose from 'mongoose';
import { MONGO_URI } from '../configs/keys.js';

const connectToMongoDB = async () => {
  try {
    mongoose
      .connect(MONGO_URI)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.error('MongoDB connection error:', err));
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
  }
};

export default connectToMongoDB;
