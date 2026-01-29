const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));
app.use('/api/prescriptions', require('./routes/prescriptionRoutes'));

app.get('/', (req, res) => {
    res.send('Telemedicine API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
