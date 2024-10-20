const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  coins: { type: Number, default: 0 },
  inventory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  completedQuests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quest' }],
  achievements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Achievement' }],
});

module.exports = mongoose.model('User', userSchema);
