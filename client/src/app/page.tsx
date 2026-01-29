'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">+</div>
          <h1 className="text-2xl font-bold text-blue-900">TeleMed Rural</h1>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="text-blue-600 font-semibold hover:bg-blue-50 px-3 py-1 rounded"
          >
            {language === 'en' ? 'தமிழ்' : 'English'}
          </button>
          <Link href="/login">
            <Button variant="primary">{t('login')}</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-blue-50 to-white">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-6 max-w-3xl leading-tight">
          {language === 'en' ? 'Quality Healthcare for Everyone, Everywhere' : 'எல்லோருக்கும், எங்கும் தரமான சுகாதாரம்'}
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-2xl">
          {language === 'en'
            ? 'Connect with doctors instantly. AI-assisted triage for faster care. Secure and private.'
            : 'உடனடியாக மருத்துவர்களுடன் இணைக்கவும். விரைவான சிகிச்சைக்காக AI உதவி.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link href="/login" className="flex-1">
            <Button size="lg" className="w-full text-xl py-4 shadow-lg shadow-blue-200">
              {t('consultation')}
            </Button>
          </Link>
          <Link href="/login?role=agent" className="flex-1">
            <Button variant="secondary" size="lg" className="w-full text-xl py-4">
              {language === 'en' ? 'Health Agent Login' : 'சுகாதார முகவர் உள்நுழைவு'}
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl w-full">
          {[
            { title: 'AI Triage', icon: '🤖', desc: 'Instant symptom analysis' },
            { title: 'Secure Chat', icon: '🔒', desc: 'Private consultation' },
            { title: 'Multilingual', icon: '🗣️', desc: 'English & Tamil Support' }
          ].map((f, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md border border-slate-100 flex flex-col items-center">
              <span className="text-4xl mb-4">{f.icon}</span>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-6 text-center">
        <p>© 2026 TeleMed Rural Prototype. Hackathon Edition.</p>
        <p className="text-xs mt-2 text-slate-600">AI is assistive only. Call 108 for real emergencies.</p>
      </footer>
    </div>
  );
}
