const analyzeSymptoms = (symptoms) => {
    const emergencyKeywords = ['chest pain', 'heart attack', 'unconscious', 'breathing difficulty', 'severe bleeding', 'stroke', 'seizure'];
    const mediumKeywords = ['fever', 'vomiting', 'pain', 'fracture', 'burn', 'dizziness'];

    const lowerSymptoms = symptoms.map(s => s.toLowerCase()).join(' ');

    for (const keyword of emergencyKeywords) {
        if (lowerSymptoms.includes(keyword)) return 'EMERGENCY';
    }

    for (const keyword of mediumKeywords) {
        if (lowerSymptoms.includes(keyword)) return 'MEDIUM';
    }

    return 'NORMAL';
};

module.exports = { analyzeSymptoms };
