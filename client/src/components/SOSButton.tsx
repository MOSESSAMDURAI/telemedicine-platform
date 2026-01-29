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

    const handleSOS = () => {
        // Determine where to redirect or what API to call
        // For prototype, redirect to emergency consultation creation or trigger alert
        // If not logged in, maybe redirect to login with emergency flag?

        // Simplest flow: Redirect to special emergency page or create emergency consultation
        if (user) {
            // Create emergency consultation API call (mocked here by redirect)
            router.push('/dashboard/patient/emergency');
        } else {
            router.push('/login?emergency=true');
        }
        setShowConfirm(false);
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
                                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg text-xl hover:bg-red-700"
                            >
                                YES, I NEED HELP
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
