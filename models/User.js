import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  email: String,
  password: String,
  refreshToken: String,
  createdAt: { type: Date, default: Date.now },
  tripPlanIds: [String],
});

const User = mongoose.model('User', UserSchema);
export default User;
