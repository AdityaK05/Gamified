const express = require('express');
const Quest = require('../models/Quest');
const User = require('../models/User');

const router = express.Router();

// Get all quests
router.get('/', async (req, res) => {
  try {
    const quests = await Quest.find();
    res.json(quests);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quests', error: error.message });
  }
});

// Get a specific quest
router.get('/:id', async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    res.json(quest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching quest', error: error.message });
  }
});

// Complete a quest
router.post('/:id/complete', async (req, res) => {
  try {
    const quest = await Quest.findById(req.params.id);
    if (!quest) {
      return res.status(404).json({ message: 'Quest not found' });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.level < quest.requiredLevel) {
      return res.status(400).json({ message: 'User level too low for this quest' });
    }
    user.exp += quest.expReward;
    user.coins += quest.coinReward;
    user.level = Math.floor(user.exp / 100) + 1;
    user.completedQuests.push(quest._id);
    await user.save();
    res.json({ message: 'Quest completed successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error completing quest', error: error.message });
  }
});

module.exports = router;
