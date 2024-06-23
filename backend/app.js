// require('dotenv').config();
// const express = require('express');
// const session = require('express-session');
// const passport = require('./auth');
// const { connectToDatabase } = require('./Database');
// const userRoutes = require('./src/routes/userRoutes');
// const authRoutes = require('./src/routes/authRoutes');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // Initialize session middleware
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));

// // Initialize Passport and restore authentication state, if any, from the session
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect to MongoDB and then start the server
// connectToDatabase().then((client) => {
//   // Make the MongoDB client available in the request object
//   app.use((req, res, next) => {
//     req.dbClient = client;
//     req.db = client.db('investment_advisor_db'); // Replace with your database name
//     next();
//   });

//   // Mount routes
//   app.use('/api/users', userRoutes);
//   app.use(authRoutes);

//   // Start the server
//   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }).catch((error) => {
//   console.error('Failed to connect to MongoDB', error);
// });

const express = require("express");
const { UserRoute } = require("./Constant.js");
const app = express();
const port = process.env.PORT || 5001;
const connectDB = require("./src/DB/Connect.js");
require("dotenv").config();
const cors = require("cors");

// Importing Routes
const userRouter = require("./src/routes/userroutes.js");

app.use(cors());

app.use(express.json());

// For User Routes
app.use(UserRoute, userRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
