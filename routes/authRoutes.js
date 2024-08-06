import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from '../configs/passport-auth.js';
import User from '../models/User.js';
const router = express.Router();

passport.initialize();
passport.session();
// Sign up route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ email, password: hashedPassword });
  await user.save();
  res.status(201).send('User created');
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '15m',
  });
  const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  user.refreshToken = refreshToken;
  await user.save();

  res.json({ accessToken, refreshToken });
});

// Refresh token route
router.post('/token', async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).send('Refresh token required');

  try {
    const { userId } = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user || user.refreshToken !== refreshToken)
      return res.status(403).send('Invalid refresh token');

    const newAccessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).send('Invalid refresh token');
  }
});

// Start Google OAuth flow
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }), // Disable session for OAuth callback
  async (req, res) => {
    try {
      // Check if user exists
      if (!req.user) {
        return res.status(401).send('Authentication failed');
      }

      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );
      const refreshToken = jwt.sign(
        { userId: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // Update user with the refresh token
      req.user.refreshToken = refreshToken;
      await req.user.save();

      // Redirect with tokens
      res.json({ accessToken, refreshToken });
    } catch (error) {
      console.error('Error handling Google callback:', error);
      res.status(500).send('Internal server error');
    }
  }
);

export default router;
