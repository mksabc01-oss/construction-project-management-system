const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Task = require("../models/Task");

// ── Auth middleware (same Bearer-token pattern used by the rest of the app) ──
function requireAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token" });
    req.user = decoded;
    next();
  });
}

// ── GET all tasks ──
router.get("/", requireAuth, async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    console.error("Failed to fetch tasks:", err);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
});

// ── POST create a task ──
router.post("/", requireAuth, async (req, res) => {
  try {
    const { text, priority } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: "Task text is required" });
    }
    const task = new Task({ text: text.trim(), priority: priority || "Medium" });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Failed to create task:", err);
    res.status(500).json({ message: "Server error creating task" });
  }
});

// ── PATCH toggle done / update a task ──
router.patch("/:id", requireAuth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (typeof req.body.done === "boolean") task.done = req.body.done;
    if (typeof req.body.text === "string") task.text = req.body.text.trim();
    if (typeof req.body.priority === "string") task.priority = req.body.priority;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error("Failed to update task:", err);
    res.status(500).json({ message: "Server error updating task" });
  }
});

// ── DELETE a task ──
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err) {
    console.error("Failed to delete task:", err);
    res.status(500).json({ message: "Server error deleting task" });
  }
});

// ── DELETE all completed tasks (for "Clear completed") ──
router.delete("/", requireAuth, async (req, res) => {
  try {
    await Task.deleteMany({ done: true });
    res.json({ message: "Completed tasks cleared" });
  } catch (err) {
    console.error("Failed to clear completed tasks:", err);
    res.status(500).json({ message: "Server error clearing tasks" });
  }
});

module.exports = router;