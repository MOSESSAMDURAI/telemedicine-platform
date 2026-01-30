'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import { useState } from 'react';

export default function Home() {
  const { t, language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans">

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-20 flex justify-between items-center py-6 px-4 md:px-12 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 text-white p-2 rounded-lg shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">TeleMed<span className="text-blue-600">Pro</span></span>
            <span className="text-xs font-semibold text-slate-400 tracking-widest uppercase">Healthcare Redefined</span>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600 tracking-wide uppercase">
          {['Home', 'About Us', 'Services', 'Doctors', 'Contact'].map((item) => (
            <a key={item} href="#" className="hover:text-blue-600 transition-colors">{item}</a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
            className="text-slate-500 font-bold hover:text-blue-600 transition-colors"
          >
            {language === 'en' ? 'TA' : 'EN'}
          </button>
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all transform hover:-translate-y-0.5">
              {t('login')}
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative flex-1 flex flex-col md:flex-row items-center pt-24 md:pt-0">

        {/* Left Content */}
        <div className="w-full md:w-[55%] px-6 md:pl-24 md:pr-12 flex flex-col justify-center gap-6 z-10 pt-10 md:pt-0">
          <span className="inline-block px-4 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold w-fit tracking-wider uppercase mb-2">
            Fast • Secure • Reliable
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 leading-[1.1]">
            Reaching Beyond <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              The Boundaries
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed font-medium">
            {language === 'en'
              ? 'Consult the best doctors from anywhere in the world. Advanced AI triage and secure consultations at your fingertips.'
              : 'உலகில் எங்கிருந்தும் சிறந்த மருத்துவர்களுடன் கலந்தாலோசிக்கவும்.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/login" className="sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-bold rounded-xl shadow-xl shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 transition-all transform hover:-translate-y-1">
                {t('consultation')}
              </button>
            </Link>
            <Link href="/login?role=agent" className="sm:w-auto">
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 text-lg font-bold rounded-xl hover:bg-slate-50 hover:border-slate-200 transition-all">
                {language === 'en' ? 'Agent Portal' : 'முகவர் போர்டல்'}
              </button>
            </Link>
          </div>

          <div className="mt-6 flex flex-col items-center sm:items-start">
            <Link href="/hospitals" className="group flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition-all">
              <span className="text-2xl group-hover:scale-110 transition-transform">🏥</span>
              <span className="text-slate-600 font-bold border-b-2 border-transparent group-hover:text-blue-700 group-hover:border-blue-700 transition-all">
                {language === 'en' ? 'Find Nearby Govt. Hospitals' : 'அருகிலுள்ள அரசு மருத்துவமனைகள்'}
              </span>
            </Link>
          </div>


          {/* Stats Row */}
          <div className="flex gap-8 mt-12 border-t border-slate-100 pt-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900">10k+</h3>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">Patients</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900">500+</h3>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">Doctors</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900">24/7</h3>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide">Support</p>
            </div>
          </div>
        </div>

        {/* Right Visual (Diagonal Background) */}
        <div className="relative w-full md:w-[45%] h-[500px] md:h-screen bg-slate-50 overflow-hidden">
          {/* The Gradient Shape */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500"
            style={{
              clipPath: 'polygon(20% 0%, 100% 0, 100% 100%, 0% 100%)', // Diagonal Cut
              borderTopLeftRadius: '0px' // Can adjust curve here if implementing curve with SVG
            }}
          >
            {/* Overlay Pattern */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, #ffffff 2px, transparent 2px)',
                backgroundSize: '30px 30px'
              }}>
            </div>

            {/* Floating Elements (Decorative) */}
            <div className="absolute top-1/4 left-10 w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 animate-bounce delay-100"></div>
            <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-white/10 backdrop-blur-md rounded-full border border-white/20 animate-pulse"></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/10 text-9xl font-black select-none pointer-events-none">
              +
            </div>
          </div>

          {/* Can add an actual Image here later inside the clip-path */}
        </div>

      </main>
    </div>
  );
}
