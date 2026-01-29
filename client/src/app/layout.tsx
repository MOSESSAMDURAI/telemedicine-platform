import type { Metadata } from 'next';
import './globals.css';
import Providers from '../components/Providers';

export const metadata: Metadata = {
  title: 'TeleMed Rural Access',
  description: 'AI-Enabled Telemedicine for Rural Healthcare',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
