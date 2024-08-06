import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/authRoutes.js';
import planRoutes from './routes/planRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { SESSION_SECRET } from './configs/keys.js';
import authenticateToken from './middlewares/authenticateToken.js';
import connectToMongoDB from './utils/connectToDb.js';

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.session());
app.use(passport.initialize());

// Routes
app.use('/', planRoutes);
app.use('/auth', authRoutes);
app.use('/user/', userRoutes);

app.get('/protected', authenticateToken, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user,
  });
});

connectToMongoDB();

export default app;
