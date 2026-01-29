'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import TriageResult from '../../../components/TriageResult';
import Link from 'next/link';

interface Consultation {
    _id: string;
    patientId: { name: string; email: string };
    symptoms: string[];
    aiTriageResult: 'EMERGENCY' | 'MEDIUM' | 'NORMAL';
    status: string;
    createdAt: string;
}

export default function DoctorDashboard() {
    const { user, logout } = useAuth();
    const [consultations, setConsultations] = useState<Consultation[]>([]);

    const fetchQueue = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/consultations`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const data = await res.json();
            setConsultations(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line
        if (user) fetchQueue();
    }, [user]);

    // Prioritize Emergency
    const sortedConsultations = [...consultations].sort((a, b) => {
        const priority = { EMERGENCY: 0, MEDIUM: 1, NORMAL: 2 };
        return priority[a.aiTriageResult] - priority[b.aiTriageResult];
    });

    return (
        <div className="min-h-screen bg-slate-50 p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-900">Doctor Dashboard</h1>
                <div className="flex gap-4">
                    <span className="font-semibold text-slate-700">Dr. {user?.name}</span>
                    <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
                </div>
            </header>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-lg font-bold text-slate-700 mb-4">Patient Queue ({consultations.length})</h2>

                <div className="flex flex-col gap-4">
                    {sortedConsultations.map((c) => (
                        <Card key={c._id} className={c.aiTriageResult === 'EMERGENCY' ? 'border-2 border-red-500' : ''}>
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold text-blue-900">{c.patientId?.name || 'Unknown Patient'}</h3>
                                        <span className="text-sm text-slate-500">{new Date(c.createdAt).toLocaleString()}</span>
                                    </div>
                                    <p className="text-slate-600 mb-2">Symptoms: <span className="font-medium">{c.symptoms.join(', ')}</span></p>
                                    <TriageResult status={c.aiTriageResult} />
                                </div>
                                <div className="flex flex-col justify-center min-w-[150px]">
                                    <Link href={`/consultation/${c._id}`}>
                                        <Button className="w-full h-full text-lg">Start Consultation</Button>
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
