const express = require('express');
const router = express.Router();
const { rateLimit, ipKeyGenerator } = require('express-rate-limit');
const { generateBulletPoints, generateProjectBullets } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

// Every Gemini call has a real dollar cost, so this route gets its own,
// tighter limit than the rest of the API — keyed per logged-in user rather
// than per IP, since it already sits behind `protect`. Falls back to a
// (correctly IPv6-normalized) IP key in the odd case req.user is missing.
const aiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // 20 generations per user per window
  keyGenerator: (req) => (req.user?._id ? req.user._id.toString() : ipKeyGenerator(req.ip)),
  message: { message: 'Too many AI generation requests. Please try again in a few minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/generate-bullets', protect, aiRateLimiter, generateBulletPoints);
router.post('/generate-project-bullets', protect, aiRateLimiter, generateProjectBullets);

module.exports = router;
