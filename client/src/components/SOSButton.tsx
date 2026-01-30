'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SOSButton() {
    const [showConfirm, setShowConfirm] = useState(false);
    const { t } = useLanguage();
    const { user } = useAuth();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleSOS = () => {
        setLoading(true);

        const sendAlert = async (lat?: number, lng?: number) => {
            // 1. Trigger Call to 108
            window.location.href = 'tel:108';

            // 2. Share Location (Save to Backend)
            if (user) {
                try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
                    await fetch(`${apiUrl}/consultations`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${user.token}`
                        },
                        body: JSON.stringify({
                            symptoms: ['SOS EMERGENCY'],
                            details: lat ? `GPS Location: ${lat}, ${lng}` : 'GPS Location Unavailable',
                            status: 'EMERGENCY',
                            aiTriageResult: 'EMERGENCY'
                        })
                    });
                    // Refresh data on dashboard
                    router.refresh();
                    router.push('/dashboard/patient');
                } catch (error) {
                    console.error('Failed to send SOS', error);
                }
            } else {
                const params = lat ? `?emergency=true&lat=${lat}&lng=${lng}` : '?emergency=true';
                router.push(`/login${params}`);
            }
            setShowConfirm(false);
            setLoading(false);
        };

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    sendAlert(latitude, longitude);
                },
                (error) => {
                    console.error('Location Access Denied or Error:', error);
                    sendAlert(); // Proceed even if location fails
                },
                { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
            );
        } else {
            console.warn('Geolocation not supported');
            sendAlert();
        }
    };

    return (
        <>
            <button
                onClick={() => setShowConfirm(true)}
                className="fixed bottom-4 right-4 z-50 bg-red-600 text-white font-bold py-4 px-6 rounded-full shadow-lg border-4 border-white animate-pulse hover:bg-red-700 transition-colors text-lg flex items-center gap-2"
                aria-label="SOS Emergency Help"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                {t('sos')}
            </button>

            {showConfirm && (
                <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-2xl text-center">
                        <h2 className="text-2xl font-bold text-red-600 mb-4">EMERGENCY?</h2>
                        <p className="text-gray-700 mb-6 text-lg">Are you sure you want to trigger an SOS alert? This is for critical emergencies only.</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleSOS}
                                disabled={loading}
                                className={`w-full bg-red-600 text-white font-bold py-3 rounded-lg text-xl hover:bg-red-700 transition-all ${loading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {loading ? 'LOCATING...' : 'YES, I NEED HELP'}
                            </button>
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="w-full bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg text-lg hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
