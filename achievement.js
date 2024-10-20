const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  requirement: { type: String, required: true },
});

module.exports = mongoose.model('Achievement', achievementSchema);
