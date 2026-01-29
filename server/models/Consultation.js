const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: {
        type: String,
        enum: ['PENDING', 'ACTIVE', 'COMPLETED', 'EMERGENCY'],
        default: 'PENDING'
    },
    symptoms: [{ type: String }],
    details: { type: String }, // Additional details
    aiTriageResult: {
        type: String,
        enum: ['EMERGENCY', 'MEDIUM', 'NORMAL'],
        default: 'NORMAL'
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Consultation', consultationSchema);
