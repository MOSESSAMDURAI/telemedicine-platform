'use client';

import { AuthProvider } from '../context/AuthContext';
import { LanguageProvider } from '../context/LanguageContext';
import SOSButton from './SOSButton';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <LanguageProvider>
                {children}
                <SOSButton />
            </LanguageProvider>
        </AuthProvider>
    );
}
