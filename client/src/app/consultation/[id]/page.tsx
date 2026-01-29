'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import ChatWindow from '../../../components/ChatWindow';
import Card from '../../../components/ui/Card';
import TriageResult from '../../../components/TriageResult';
import { useParams } from 'next/navigation';

interface Consultation {
    _id: string;
    patientId: { name: string };
    symptoms: string[];
    aiTriageResult: 'EMERGENCY' | 'MEDIUM' | 'NORMAL';
    status: string;
    details: string;
    createdAt: string;
}

export default function ConsultationPage() {
    const { user } = useAuth();
    const { id } = useParams();
    const [consultation, setConsultation] = useState<Consultation | null>(null);

    const fetchDetails = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/consultations/${id}`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const data = await res.json();
            setConsultation(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line
        if (user && id) fetchDetails();
    }, [user, id]);

    if (!consultation) return <div className="p-8 text-center">Loading consultation details...</div>;

    return (
        <div className="min-h-screen bg-slate-50 p-4">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Patient Info & Clinical Details */}
                <div className="md:col-span-1 flex flex-col gap-6">
                    <Card title="Consultation Details">
                        <h3 className="font-bold text-lg mb-2">{consultation.patientId?.name || 'Patient'}</h3>
                        <p className="text-sm text-slate-500 mb-4">{new Date(consultation.createdAt).toLocaleString()}</p>

                        <div className="mb-4">
                            <h4 className="font-semibold text-slate-700">Symptoms</h4>
                            <p className="text-slate-600">{consultation.symptoms.join(', ')}</p>
                        </div>

                        <div className="mb-4">
                            <h4 className="font-semibold text-slate-700">Clinical Notes</h4>
                            <p className="text-slate-600 italic bg-slate-50 p-2 rounded">{consultation.details}</p>
                        </div>

                        <TriageResult status={consultation.aiTriageResult} />
                    </Card>

                    {/* Actions (Prescription, Close) can go here */}
                    {user?.role === 'DOCTOR' && (
                        <Card title="Actions">
                            <button className="w-full bg-blue-100 text-blue-700 font-semibold py-2 rounded mb-2 hover:bg-blue-200">
                                Write Prescription
                            </button>
                            <button className="w-full bg-green-100 text-green-700 font-semibold py-2 rounded hover:bg-green-200">
                                Complete Consultation
                            </button>
                        </Card>
                    )}
                </div>

                {/* Chat Area */}
                <div className="md:col-span-2">
                    <ChatWindow consultationId={id as string} />
                </div>

            </div>
        </div>
    );
}
