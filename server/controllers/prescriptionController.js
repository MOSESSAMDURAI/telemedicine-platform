const Prescription = require('../models/Prescription');

exports.createPrescription = async (req, res) => {
    const { consultationId, medicines, notes } = req.body;

    try {
        const prescription = await Prescription.create({
            consultationId,
            doctorId: req.user._id,
            medicines,
            notes
        });

        res.status(201).json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPrescription = async (req, res) => {
    try {
        const prescription = await Prescription.findOne({ consultationId: req.params.consultationId })
            .populate('doctorId', 'name');

        if (prescription) {
            res.json(prescription);
        } else {
            res.status(404).json({ message: 'Prescription not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
