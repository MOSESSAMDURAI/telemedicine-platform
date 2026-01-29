'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Link from 'next/link';

interface Patient {
    _id: string;
    name: string;
    email: string;
}

export default function AgentDashboard() {
    const { user, logout } = useAuth();
    const [patients, setPatients] = useState<Patient[]>([]); // Mock list of patients agent manages
    const [newPatientName, setNewPatientName] = useState('');
    const [newPatientEmail, setNewPatientEmail] = useState('');

    // In a real app, Agent would fetch patients they support.
    // For prototype, we'll just allow creating a new patient user quickly.

    const handleCreatePatient = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            // Register logic reused, but maybe Agent api
            const res = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newPatientName,
                    email: newPatientEmail,
                    password: 'password123', // Default password for agent-created users
                    role: 'PATIENT',
                    language: 'ta' // Default to Tamil for rural
                })
            });

            const data = await res.json();
            if (res.ok) {
                alert(`Patient Created! Email: ${data.email}, Password: password123`);
                setNewPatientName('');
                setNewPatientEmail('');
                // Refresh list (mock)
            } else {
                alert('Error: ' + data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-900">Village Health Agent Dashboard</h1>
                <div className="flex gap-4">
                    <span className="font-semibold text-slate-700">Agent {user?.name}</span>
                    <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                <Card title="Register New Patient">
                    <p className="mb-4 text-sm text-slate-500">Create a digital profile for a patient who cannot use the device themselves.</p>
                    <form onSubmit={handleCreatePatient} className="flex flex-col gap-4">
                        <Input
                            label="Patient Name"
                            value={newPatientName}
                            onChange={(e) => setNewPatientName(e.target.value)}
                            required
                        />
                        <Input
                            label="Patient Email (Fake OK)"
                            value={newPatientEmail}
                            onChange={(e) => setNewPatientEmail(e.target.value)}
                            required
                        />
                        <Button type="submit">Create Patient Profile</Button>
                    </form>
                </Card>

                <Card title="Quick Actions">
                    <div className="flex flex-col gap-4">
                        <Link href="/dashboard/patient">
                            <Button variant="secondary" className="w-full">
                                Go to Patient View (Simulate)
                            </Button>
                        </Link>
                        <p className="text-xs text-slate-500 text-center">
                            Use &quot;Patient View&quot; to enter symptoms on behalf of the patient after logging in as them.
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
