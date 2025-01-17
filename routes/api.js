const express = require('express');
const { User, TarotCard, UserTarotResult } = require('../models');

const router = express.Router();

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get all tarot cards
router.get('/tarot-cards', async (req, res) => {
  try {
    const cards = await TarotCard.findAll();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tarot cards' });
  }
});

// Add a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.create({ name, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
});

// Add a new tarot card
router.post('/tarot-cards', async (req, res) => {
  try {
    const { name, description } = req.body;
    const card = await TarotCard.create({ name, description });
    res.status(201).json(card);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create tarot card' });
  }
});

// Add a user-tarot result
router.post('/user-tarot-results', async (req, res) => {
  try {
    const { userId, tarotCardId } = req.body;
    const result = await UserTarotResult.create({ userId, tarotCardId });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user-tarot result' });
  }
});

module.exports = router;
