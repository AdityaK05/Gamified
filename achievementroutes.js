const express = require('express');
const Achievement = require('../models/Achievement');
const User = require('../models/User');

const router = express.Router();

// Get all achievements
router.get('/', async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching achievements', error: error.message });
  }
});

// Unlock an achievement
router.post('/:id/unlock', async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.achievements.includes(achievement._id)) {
      return res.status(400).json({ message: 'Achievement already unlocked' });
    }
    user.achievements.push(achievement._id);
    await user.save();
    res.json({ message: 'Achievement unlocked successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error unlocking achievement', error: error.message });
  }
});

module.exports = router;
