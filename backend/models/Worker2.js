const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name:   { type: String, required: true, trim: true },
  phone:  { type: String, required: true },
  role:   { type: String, required: true },
  salary: { type: Number, required: true },
  // 'on leave' එක enum එකට එකතු කළා
  status: { type: String, enum: ['active', 'inactive', 'on leave'], default: 'active' },
}, { timestamps: true });

module.exports = mongoose.model('Worker', workerSchema);