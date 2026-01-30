'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Link from 'next/link';

interface Hospital {
    id: string;
    name: string;
    type: 'HOSPITAL' | 'PHC' | 'CLINIC';
    distance: number; // in km
    address: string;
    lat: number;
    lng: number;
}

export default function HospitalFinder() {
    const { t, language } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [error, setError] = useState('');

    // Mock Data Generator relative to user location
    const generateMockHospitals = (userLat: number, userLng: number): Hospital[] => {
        return [
            {
                id: '1',
                name: language === 'en' ? 'District Government Hospital' : 'மாவட்ட அரசு மருத்துவமனை',
                type: 'HOSPITAL',
                distance: 2.3,
                address: language === 'en' ? '45, Main Road, Near Bus Stand' : '45, பிரதான சாலை, பேருந்து நிலையம் அருகில்',
                lat: userLat + 0.02,
                lng: userLng + 0.02
            },
            {
                id: '2',
                name: language === 'en' ? 'Village Primary Health Center (PHC)' : 'கிராம ஆரம்ப சுகாதார நிலையம் (PHC)',
                type: 'PHC',
                distance: 4.1,
                address: language === 'en' ? 'South Street, Panchayat Office' : 'தெற்கு தெரு, பஞ்சாயத்து அலுவலகம்',
                lat: userLat - 0.03,
                lng: userLng - 0.01
            },
            {
                id: '3',
                name: language === 'en' ? 'Govt Mobile Clinic Unit' : 'அரசு நடமாடும் மருத்துவ மனை',
                type: 'CLINIC',
                distance: 6.8,
                address: language === 'en' ? 'Weekly Market Road' : 'வார சந்தை சாலை',
                lat: userLat + 0.05,
                lng: userLng - 0.02
            }
        ];
    };

    const findHospitals = () => {
        setLoading(true);
        setError('');
        setHospitals([]);

        if (!('geolocation' in navigator)) {
            setError('Geolocation is not supported by your browser.');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });

                // Simulate network delay
                setTimeout(() => {
                    const mockData = generateMockHospitals(latitude, longitude);
                    setHospitals(mockData);
                    setLoading(false);

                    // Auto-speak nearest
                    const nearest = mockData[0];
                    speak(nearest.distance, nearest.name);
                }, 1500);
            },
            (err) => {
                console.error(err);
                setError('Unable to retrieve your location. Please allow access.');
                setLoading(false);
            },
            { enableHighAccuracy: true }
        );
    };

    const speak = (dist: number, name: string) => {
        if ('speechSynthesis' in window) {
            const text = language === 'en'
                ? `The nearest center is ${name}, ${dist} kilometers away.`
                : `அருகிலுள்ள மையம் ${name}, ${dist} தொலைவில் உள்ளது.`;

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'en' ? 'en-US' : 'ta-IN';
            window.speechSynthesis.speak(utterance);
        }
    };

    const openDirections = (lat: number, lng: number) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <header className="bg-white shadow-sm p-4 flex items-center gap-4">
                <Link href="/" className="text-blue-600 font-bold">← Back</Link>
                <h1 className="text-xl font-bold text-slate-800">
                    {language === 'en' ? 'Nearby Govt. Hospitals' : 'அருகிலுள்ள அரசு மருத்துவமனைகள்'}
                </h1>
            </header>

            <main className="p-4 flex-1 flex flex-col max-w-lg mx-auto w-full gap-6">

                {/* Control Panel */}
                <Card className="text-center py-8">
                    <div className="mb-6 flex justify-center">
                        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl shadow-inner">
                            🏥
                        </div>
                    </div>
                    <p className="text-slate-600 mb-6 px-4">
                        {language === 'en'
                            ? 'Find the nearest Government Hospitals and PHCs automatically.'
                            : 'அருகிலுள்ள அரசு மருத்துவமனைகள் மற்றும் PHC களை தானாகக் கண்டறியவும்.'}
                    </p>
                    <Button size="lg" onClick={findHospitals} disabled={loading} className="w-full text-lg shadow-xl shadow-blue-200">
                        {loading
                            ? (language === 'en' ? 'Locating...' : 'கண்டுபிடிக்கிறது...')
                            : (language === 'en' ? 'Find Nearest Hospitals' : 'மருத்துவமனைகளைக் கண்டுபிடி')}
                    </Button>

                    {error && (
                        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm font-bold">
                            {error}
                        </div>
                    )}
                </Card>

                {/* Results List */}
                {hospitals.length > 0 && (
                    <div className="flex flex-col gap-4 animate-in slide-in-from-bottom-5 fade-in duration-500">
                        <div className="flex justify-between items-center px-2">
                            <h2 className="font-bold text-slate-700">Results ({hospitals.length})</h2>
                            <button onClick={() => speak(hospitals[0].distance, hospitals[0].name)} className="text-blue-600 text-sm font-bold flex items-center gap-1">
                                🔊 {language === 'en' ? 'Read Nearest' : 'படிக்கவும்'}
                            </button>
                        </div>

                        {hospitals.map((h) => (
                            <div key={h.id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-l-green-500 flex flex-col gap-3 relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
                                    {h.distance} km
                                </div>

                                <div>
                                    <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">{h.type}</span>
                                    <h3 className="text-lg font-bold text-slate-900 leading-tight mt-1">{h.name}</h3>
                                    <p className="text-slate-500 text-sm mt-1">{h.address}</p>
                                </div>

                                <button
                                    onClick={() => openDirections(h.lat, h.lng)}
                                    className="mt-2 w-full bg-slate-100 text-slate-700 font-bold py-2 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                                >
                                    <span>🗺️</span>
                                    {language === 'en' ? 'Get Directions' : 'வழிமுறைகளைப் பெறுங்கள்'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
