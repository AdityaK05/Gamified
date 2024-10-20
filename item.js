const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  value: { type: Number, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
