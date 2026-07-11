const express = require('express');
const router = express.Router();
const Worker  = require('../models/Worker2');
const Site    = require('../models/Site');
const Project = require('../models/Project');
const jwt     = require('jsonwebtoken');

// ── Auth middleware ──────────────────────────────────────────
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const token   = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user      = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// GET workers (role-filtered)
router.get('/', authMiddleware, async (req, res) => {
  try {
    let workers;
    const userRole = (req.user.role || "").toLowerCase();

    // Admin හෝ Viewer/viewer නම් සියලුම වර්කර්ස්ලා ලබාදේ
    if (userRole === "admin" || userRole === "viewer") {
      workers = await Worker.find().sort({ createdAt: -1 });
    } else {
      const userProjects = await Project.find({ assignedUsers: req.user.id }).select("_id");
      const projectIds = userProjects.map(p => p._id);
      const accessibleSites = await Site.find({ assignedProject: { $in: projectIds } }).select("workers");

      const workerKeys = new Set();
      accessibleSites.forEach(s =>
        (s.workers || []).forEach(w => {
          if (w._id) workerKeys.add(w._id.toString());
          if (w.name) workerKeys.add(w.name);
        })
      );

      workers = await Worker.find({
        $or: [
          { _id: { $in: [...workerKeys].filter(k => /^[0-9a-fA-F]{24}$/.test(k)) } },
          { name: { $in: [...workerKeys] } }
        ]
      }).sort({ createdAt: -1 });
    }

    res.json(workers);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST add worker
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, phone, role, salary, status } = req.body;
    const worker = await Worker.create({ name, phone, role, salary, status });
    res.status(201).json(worker);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE worker
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json({ message: 'Worker deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;