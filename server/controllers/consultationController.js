const Consultation = require('../models/Consultation');
const { analyzeSymptoms } = require('../utils/aiTriage');

exports.createConsultation = async (req, res) => {
    const { symptoms, details } = req.body;

    try {
        const aiTriageResult = analyzeSymptoms(symptoms);
        const status = aiTriageResult === 'EMERGENCY' ? 'EMERGENCY' : 'PENDING';

        const consultation = await Consultation.create({
            patientId: req.user._id, // Assuming patient creates it usually
            symptoms,
            details,
            aiTriageResult,
            status
        });

        res.status(201).json(consultation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getConsultations = async (req, res) => {
    try {
        let query = {};
        if (req.user.role === 'PATIENT') {
            query = { patientId: req.user._id };
        } else if (req.user.role === 'DOCTOR') {
            // Doctors see all for now, or assigned
            query = {};
        } else if (req.user.role === 'AGENT') {
            // Agents see ones they created? Or all patients?
            // For now, let's say Agents see all to help.
            query = {};
        }

        const consultations = await Consultation.find(query)
            .populate('patientId', 'name email')
            .sort({ status: 1, createdAt: -1 }); // Emergency/Pending first

        res.json(consultations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getConsultationById = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id)
            .populate('patientId', 'name email')
            .populate('doctorId', 'name email');

        if (consultation) {
            res.json(consultation);
        } else {
            res.status(404).json({ message: 'Consultation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateConsultation = async (req, res) => {
    try {
        const consultation = await Consultation.findById(req.params.id);
        if (!consultation) return res.status(404).json({ message: 'Not found' });

        // Only doctor updates status/notes usually
        // For now simple update all fields passed
        const updated = await Consultation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
