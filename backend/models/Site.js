const mongoose = require("mongoose");

const InspectionSchema = new mongoose.Schema({
  date:      { type: String },
  inspector: { type: String },
  type:      { type: String },
  result:    { type: String, default: "Pending" },
  score:     { type: String },
  notes:     { type: String },
  followUp:  { type: String },
});

const WorkerSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  role:      { type: String },
  phone:     { type: String },
  nic:       { type: String },
  startDate: { type: String },
  status:    { type: String, default: "Active" },
});

const SiteSchema = new mongoose.Schema({
  name:            { type: String, required: true },
  address:         { type: String, required: true },
  district:        { type: String },
  siteManager:     { type: String },
  phone:           { type: String },
  area:            { type: String },
  status:          { type: String, default: "Active" },
  mapLink:         { type: String },
  inspections:     [InspectionSchema],
  workers:         [WorkerSchema],
  // 🔽 'Mixed' වෙනුවට Project එකට ObjectId Reference එකක් දුන්නා
  assignedProject: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project', 
    default: null 
  }, 
}, { timestamps: true });

module.exports = mongoose.model("Site", SiteSchema);