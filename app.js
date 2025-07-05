// server/app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const expenseRoutes = require('./routes/expenses');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins by default (for development)
app.use(express.json()); // Body parser for JSON data

// Routes
app.use('/api/expenses', expenseRoutes);



app.get('/test', (req, res) => {
    res.send('Test route is working!');
  });
// Simple root route
app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});