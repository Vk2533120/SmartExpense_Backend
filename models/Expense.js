// server/models/Expense.js
const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, 'Please add an amount'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
    },
    date: {
      type: String, // Storing as string to match frontend input type="date"
      required: [true, 'Please add a date'],
    },
    note: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

module.exports = mongoose.model('Expense', ExpenseSchema);