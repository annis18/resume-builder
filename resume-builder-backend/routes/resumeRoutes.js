const express = require('express');
const router = express.Router();
const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
} = require('../controllers/resumeController');
const { protect } = require('../middleware/authMiddleware');

// Every route below requires a valid JWT
router.use(protect);

router.route('/').post(createResume).get(getResumes);

router.route('/:id').get(getResumeById).put(updateResume).delete(deleteResume);

module.exports = router;
