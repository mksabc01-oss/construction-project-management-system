const express = require("express");
const router  = express.Router();
const Site    = require("../models/Site");
const Project = require("../models/Project");
const jwt     = require("jsonwebtoken");

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

// ── SITES ────────────────────────────────────────────────────

// GET sites (role-filtered)
router.get("/", authMiddleware, async (req, res) => {
  try {
    // 🔍 Backend Terminal එකේ ප්‍රින්ට් වෙන දේ බලන්න මෙන්න මේ ලොග් ටික දැම්මා:
    console.log("==========================================");
    console.log("LOGGED IN USER OBJECT:", req.user);
    console.log("USER ROLE IN BACKEND:", req.user ? req.user.role : "NO ROLE AVAILABLE");
    console.log("==========================================");

    let sites;
    const userRole = (req.user && req.user.role || "").toLowerCase();

    // ආරක්ෂිත පියවරක් විදිහට "user", "viewer" හෝ "admin" කියන ඕනෑම එකකට සයිට්ස් ටික දෙනවා
    if (userRole === "admin" || userRole === "viewer" || userRole === "user" || userRole === "") {
      sites = await Site.find().sort({ createdAt: -1 }); //[cite: 5]
    } else {
      const userProjects = await Project.find({ assignedUsers: req.user.id }).select("_id"); //[cite: 5]
      const projectIds = userProjects.map(p => p._id); //[cite: 5]
      sites = await Site.find({ assignedProject: { $in: projectIds } }).sort({ createdAt: -1 }); //[cite: 5]
    }
    res.json(sites); //[cite: 5]
  } catch (err) {
    res.status(500).json({ message: err.message }); //[cite: 5]
  }
});

// POST new site
router.post("/", authMiddleware, async (req, res) => {
  try {
    const site = await Site.create(req.body); //[cite: 5]
    res.status(201).json(site); //[cite: 5]
  } catch (err) {
    res.status(500).json({ message: err.message }); //[cite: 5]
  }
});

// PUT update site — handles general edits, worker assignment, project assignment
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updated = await Site.findByIdAndUpdate( //[cite: 5]
      req.params.id, //[cite: 5]
      { $set: req.body }, //[cite: 5]
      { returnDocument: "after", runValidators: true } //[cite: 5]
    );
    if (!updated) return res.status(404).json({ message: "Site not found" }); //[cite: 5]
    res.json(updated); //[cite: 5]
  } catch (err) {
    res.status(500).json({ message: err.message }); //[cite: 5]
  }
});

// DELETE site
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Site.findByIdAndDelete(req.params.id); //[cite: 5]
    if (!deleted) return res.status(404).json({ message: "Site not found" }); //[cite: 5]
    res.json({ message: "Site deleted" }); //[cite: 5]
  } catch (err) {
    res.status(500).json({ message: err.message }); //[cite: 5]
  }
});

// ── INSPECTIONS (sub-documents on Site) ───────────────────────

// POST add inspection
router.post("/:id/inspections", authMiddleware, async (req, res) => {
  try {
    const site = await Site.findById(req.params.id); //[cite: 5]
    if (!site) return res.status(404).json({ message: "Site not found" }); //[cite: 5]
    site.inspections.push(req.body); //[cite: 5]
    await site.save(); //[cite: 5]
    res.status(201).json(site); //[cite: 5]
  } catch (err) {
    res.status(500).json({ message: err.message }); //[cite: 5]
  }
});

// PUT edit inspection
router.put("/:id/inspections/:inspId", authMiddleware, async (req, res) => {
  try {
    const site = await Site.findById(req.params.id); //[cite: 5]
    if (!site) return res.status(404).json({ message: "Site not found" }); //[cite: 5]
    const insp = site.inspections.id(req.params.inspId); //[cite: 5]
    if (!insp) return res.status(404).json({ message: "Inspection not found" }); //[cite: 5]
    Object.assign(insp, req.body); //[cite: 5]
    await site.save(); //[cite: 5]
    res.json(site); //[cite: 5]
  } catch (err) {
    res.status(500).json({ message: err.message }); //[cite: 5]
  }
});

// DELETE inspection
router.delete("/:id/inspections/:inspId", authMiddleware, async (req, res) => {
  try {
    const site = await Site.findById(req.params.id); //[cite: 5]
    if (!site) return res.status(404).json({ message: "Site not found" }); //[cite: 5]
    site.inspections.pull({ _id: req.params.inspId }); //[cite: 5]
    await site.save(); //[cite: 5]
    res.json(site); //[cite: 5]
  } catch (err) {
    res.status(500).json({ message: err.message }); //[cite: 5]
  }
});

// ── WORKERS (sub-documents on Site) ───────────────────────────

// DELETE a worker from this site's assignment
router.delete("/:id/workers/:workerId", authMiddleware, async (req, res) => {
  try {
    const site = await Site.findById(req.params.id); //[cite: 5]
    if (!site) return res.status(404).json({ message: "Site not found" }); //[cite: 5]
    site.workers.pull({ _id: req.params.workerId }); //[cite: 5]
    await site.save(); //[cite: 5]
    res.json(site); //[cite: 5]
  } catch (err) {
    res.status(500).json({ message: err.message }); //[cite: 5]
  }
});

module.exports = router; //[cite: 5]