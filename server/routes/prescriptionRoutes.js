const express = require('express');
const router = express.Router();
const { createPrescription, getPrescription } = require('../controllers/prescriptionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(protect, createPrescription);
router.route('/:consultationId').get(protect, getPrescription);

module.exports = router;
