'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        welcome: 'Welcome',
        login: 'Login',
        register: 'Register',
        symptoms: 'Enter Symptoms',
        submit: 'Submit',
        sos: 'SOS - Emergency Help',
        dashboard: 'Dashboard',
        consultation: 'Doctor Consultation',
        my_records: 'My Health Records',
        doctor_chat: 'Chat with Doctor',
        logout: 'Logout',
        // Add more...
    },
    ta: {
        welcome: 'வணக்கம்',
        login: 'உள்நுழைய',
        register: 'பதிவு செய்ய',
        symptoms: 'அறிகுறிகளை உள்ளிடவும்',
        submit: 'சமர்ப்பிக்கவும்',
        sos: 'SOS - அவசர உதவி',
        dashboard: 'முகப்பு',
        consultation: 'மருத்துவர் ஆலோசனை',
        my_records: 'என் மருத்துவ பதிவுகள்',
        doctor_chat: 'மருத்துவருடன் அரட்டை',
        logout: 'வெளியேறு',
        // Add more...
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
    return context;
};
