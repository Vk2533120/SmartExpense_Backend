// server/routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// @route   GET /api/expenses
// @desc    Get all expenses
// @access  Public
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1, createdAt: -1 }); // Sort by date descending, then creation date
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/expenses
// @desc    Add a new expense
// @access  Public
router.post('/', async (req, res) => {
  const { amount, category, date, note } = req.body;

  if (!amount || !category || !date) {
    return res.status(400).json({ message: 'Please include all required fields: amount, category, date' });
  }

  try {
    const newExpense = new Expense({
      amount,
      category,
      date,
      note,
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/expenses/:id
// @desc    Delete an expense
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await Expense.deleteOne({ _id: req.params.id }); // Use deleteOne for Mongoose 6+
    res.status(200).json({ message: 'Expense removed' });
  } catch (error) {
    // CastError for invalid ID format, MongooseError for other issues
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid expense ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/expenses/:id
// @desc    Update an expense
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document, run schema validators
    );

    res.status(200).json(updatedExpense);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid expense ID' });
    }
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;