const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    consultationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultation', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicines: [{
        name: { type: String, required: true },
        dosage: { type: String, required: true },
        frequency: { type: String, required: true },
        duration: { type: String, required: true }
    }],
    notes: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
