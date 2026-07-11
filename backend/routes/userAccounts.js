const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt  = require('jsonwebtoken');

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

// GET all users (admin only) — excludes password field
router.get('/', authMiddleware, async (req, res) => {
  try {
    const userRole = (req.user.role || "").toLowerCase();
    if (userRole !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;