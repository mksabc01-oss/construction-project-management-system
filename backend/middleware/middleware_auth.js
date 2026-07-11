// middleware/auth.js
// ─────────────────────────────────────────────────────────────
// Usage in routes:
//   const { protect, adminOnly } = require('../middleware/auth');
//   router.delete('/:id', protect, adminOnly, handler);   // admin only
//   router.get('/',       protect, handler);              // any logged-in user
// ─────────────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

// ── protect: any logged-in user ──────────────────────────────
const protect = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token, access denied' });

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;   // { id, role }
    next();
  } catch {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

// ── adminOnly: restrict to role === 'admin' ───────────────────
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin')
    return res.status(403).json({ message: 'Admin access required' });
  next();
};

module.exports = { protect, adminOnly };
