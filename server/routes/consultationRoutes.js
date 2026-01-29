const express = require('express');
const router = express.Router();
const { createConsultation, getConsultations, getConsultationById, updateConsultation } = require('../controllers/consultationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createConsultation).get(protect, getConsultations);
router.route('/:id').get(protect, getConsultationById).put(protect, updateConsultation);

module.exports = router;
