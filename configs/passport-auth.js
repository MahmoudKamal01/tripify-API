import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js'; // Adjust the path according to your project structure
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './keys.js';

// Configure Passport to use Google OAuth 2.0 Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/callback', // Adjust to your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User already exists, return the user
          return done(null, user);
        }

        // User does not exist, create a new user
        user = new User({
          googleId: profile.id,
          email: profile.emails[0].value, // Assuming the email is available
          name: profile.displayName, // Assuming the displayName is available
        });

        await user.save();
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);

// Serialize user to store user ID in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the stored user ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
