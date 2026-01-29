# TeleMed Rural Prototype

A secure, AI-enabled telemedicine platform designed for rural healthcare access with low-bandwidth support.

## Features
- **Role-Based Access**: Patient, Doctor, Village Health Worker (Agent).
- **AI Triage**: Automatic classification of symptoms (Emergency/Medium/Normal).
- **Multilingual**: English and Tamil support.
- **Secure Chat**: Encrypted consultation messaging.
- **SOS Emergency**: One-click emergency alert system.

## Tech Stack
- **Frontend**: Next.js (React), Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, MongoDB
- **Security**: JWT Authentication, AES Encryption

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or URI)

### Installation

1. **Clone the repository** (if applicable)
2. **Backend Setup**
   ```bash
   cd server
   npm install
   npm run df
   # OR
   node server.js
   ```
   *Note: Ensure .env has MONGO_URI set.*

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Access the App**
   Open [http://localhost:3000](http://localhost:3000)

## Demo Credentials
- **Patient**: Register user with role 'Patient'
- **Doctor**: Register user with role 'Doctor'
- **Agent**: Register user with role 'Agent'

## Disclaimer
⚠️ **Health Hackathon Prototype**: This system uses AI for assistive triage only. It is NOT a medical device and should not replace professional medical advice. In case of real emergencies, contact local emergency services immediately.
