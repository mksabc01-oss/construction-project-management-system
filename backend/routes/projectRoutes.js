// routes/projectRoutes.js
const express  = require("express");
const router   = express.Router();
const Project  = require("../models/Project");

// ── Middleware: verify JWT token ─────────────────────────────
const jwt  = require("jsonwebtoken");

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

// ── GET /api/projects  → fetch projects (role-filtered) ──────
router.get("/", authMiddleware, async (req, res) => {
  try {
    let projects;
    if (req.user.role === "admin") {
      projects = await Project.find().sort({ createdAt: -1 }).populate("assignedUsers", "name email");
    } else {
      projects = await Project.find({ assignedUsers: req.user.id }).sort({ createdAt: -1 });
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err.message });
  }
});

// ── POST /api/projects  → create new project ─────────────────
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, site, progress, status, workers, budget } = req.body;

    // Basic validation
    if (!name || !site || progress === undefined || !workers || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = new Project({ name, site, progress, status, workers, budget });
    const saved   = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save project", error: err.message });
  }
});

// ── PUT /api/projects/:id  → update a project ────────────────
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { returnDocument: "after", runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update project", error: err.message });
  }
});

// ── PUT /api/projects/:id/details → save/update project details ─
router.put("/:id/details", authMiddleware, async (req, res) => {
  try {
    const { manager, startDate, endDate, contractor, description, phase, notes } = req.body;

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: { details: { manager, startDate, endDate, contractor, description, phase, notes } } },
      { returnDocument: "after", runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to save details", error: err.message });
  }
});

// ── PUT /api/projects/:id/assign-users → admin assigns users ─
router.put("/:id/assign-users", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }

    const { userIds } = req.body; // array of user ObjectIds

    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: { assignedUsers: userIds } },
      { returnDocument: "after" }
    ).populate("assignedUsers", "name email");

    if (!updated) return res.status(404).json({ message: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to assign users", error: err.message });
  }
});

// ── DELETE /api/projects/:id  → delete a project ─────────────
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete project", error: err.message });
  }
});

module.exports = router;