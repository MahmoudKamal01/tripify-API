const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes.js");
const planRoutes = require("./routes/planRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const { SESSION_SECRET } = require("./configs/keys.js");
const authenticateToken = require("./middlewares/authenticateToken.js");
const connectToMongoDB = require("./utils/connectToDb.js");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
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
app.use("/", planRoutes);
app.use("/auth", authRoutes);
app.use("/user/", userRoutes);

app.get("/protected", authenticateToken, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

connectToMongoDB();

module.exports = app;
