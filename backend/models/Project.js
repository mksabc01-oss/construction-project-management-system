// backend/models/Project.js
const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema(
  {
    manager:     { type: String, trim: true },
    startDate:   { type: String, trim: true },
    endDate:     { type: String, trim: true },
    contractor:  { type: String, trim: true },
    description: { type: String, trim: true },
    phase:       { type: String, trim: true },
    notes:       { type: String, trim: true },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    name:     { type: String, required: true, trim: true },
    site:     { type: String, required: true, trim: true },
    progress: { type: Number, required: true, min: 0, max: 100 },
    status:   { type: String, enum: ["On Track", "Delayed", "At Risk", "Completed"], default: "On Track" },
    workers:  { type: Number, required: true, min: 0 },
    budget:   { type: String, required: true, trim: true },
    assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    details: { type: detailsSchema, default: undefined },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);