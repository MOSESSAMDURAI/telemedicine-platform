'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import TriageResult from '../../../components/TriageResult';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Consultation {
    _id: string;
    symptoms: string[];
    aiTriageResult: 'EMERGENCY' | 'MEDIUM' | 'NORMAL';
    status: string;
    createdAt: string;
}

export default function PatientDashboard() {
    const { user, logout } = useAuth();
    const { t } = useLanguage();
    const [symptoms, setSymptoms] = useState('');
    const [consultations, setConsultations] = useState<Consultation[]>([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (user) fetchConsultations();
    }, [user]);

    const fetchConsultations = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/consultations`, {
                headers: { Authorization: `Bearer ${user?.token}` }
            });
            const data = await res.json();
            setConsultations(data);
        } catch (error) {
            console.error('Failed to fetch', error);
        }
    };

    const handleCreateConsultation = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
            const res = await fetch(`${apiUrl}/consultations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.token}`
                },
                body: JSON.stringify({ symptoms: [symptoms], details: symptoms })
            });

            if (res.ok) {
                setSymptoms('');
                fetchConsultations();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-4">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-blue-900">{t('dashboard')}</h1>
                <div className="flex gap-4">
                    <span className="font-semibold text-slate-700">{user?.name}</span>
                    <Button variant="secondary" size="sm" onClick={logout}>{t('logout')}</Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* New Consultation Form */}
                <Card title={t('symptoms')}>
                    <form onSubmit={handleCreateConsultation} className="flex flex-col gap-4">
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 h-32 text-black font-medium"
                            placeholder="Describe your symptoms (e.g., chest pain, fever...)"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            required
                        />
                        <Button type="submit" disabled={loading} size="lg">
                            {loading ? 'Analyzing...' : t('submit')}
                        </Button>
                    </form>
                </Card>

                {/* History / Status */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-bold text-slate-700">My Consultations</h3>
                    {consultations.length === 0 ? (
                        <p className="text-slate-500">No previous consultations.</p>
                    ) : (
                        consultations.map((c) => (
                            <Card key={c._id} className="hover:shadow-lg transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm text-slate-500">
                                        {new Date(c.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${c.status === 'EMERGENCY' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {c.status}
                                    </span>
                                </div>
                                <p className="font-semibold mb-3 truncate text-black">{c.symptoms.join(', ')}</p>
                                <TriageResult status={c.aiTriageResult} />
                                <Link href={`/consultation/${c._id}`}>
                                    <Button variant="secondary" size="sm" className="mt-3 w-full">
                                        View Details & Chat
                                    </Button>
                                </Link>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
