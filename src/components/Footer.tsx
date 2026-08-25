import React from 'react';
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  ExternalLink, 
  Heart,
  ArrowUp,
  Award,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/mockData';
import { TabType } from '../types';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  setActiveTab: (tab: TabType) => void;
  onOpenApply: () => void;
  onOpenStatusCheck: () => void;
  onOpenStudentPortal: () => void;
  onOpenStaffPortal: () => void;
  onOpenResultChecker: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenApply,
  onOpenStatusCheck,
  onOpenStudentPortal,
  onOpenStaffPortal,
  onOpenResultChecker
}) => {
  const { isDay } = useTheme();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const accreditedBoards = [
    { name: "CHPRBN", desc: "Community Health Practitioners Registration Board" },
    { name: "PCN", desc: "Pharmacy Council of Nigeria" },
    { name: "MLSCN", desc: "Medical Laboratory Science Council of Nigeria" },
    { name: "EHORECON", desc: "Environmental Health Officers Registration Council" },
    { name: "HRORBN", desc: "Health Records Officers Registration Board" },
    { name: "WAHEB", desc: "West Africa Health Examinations Board" }
  ];

  return (
    <footer className={`border-t relative transition-colors duration-300 ${
      isDay 
        ? 'bg-[#0E1E16] text-[#FAF7F2] border-[#1C3628]' 
        : 'bg-slate-950 text-white border-slate-800'
    }`}>
      {/* Regulatory Accreditation Seals Banner */}
      <div className={`border-b py-6 px-4 ${
        isDay ? 'bg-[#0A1811] border-[#1C3628]' : 'bg-slate-900/90 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-xs font-bold uppercase tracking-wider mb-4 flex items-center justify-center gap-2 text-emerald-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Approved, Regulated &amp; Licensed Under National Regulatory Health Boards</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {accreditedBoards.map((b, idx) => (
              <div 
                key={idx}
                className={`p-2.5 rounded-xl border text-center transition-colors group ${
                  isDay 
                    ? 'bg-[#12241B] border-[#1E3A2C] hover:border-emerald-400' 
                    : 'bg-slate-800/80 border-slate-700/60 hover:border-emerald-500/50'
                }`}
              >
                <div className="text-xs font-black text-emerald-400 group-hover:text-emerald-300 font-mono">
                  {b.name}
                </div>
                <div className={`text-[10px] mt-0.5 line-clamp-1 ${isDay ? 'text-[#9CB3A5]' : 'text-slate-400'}`}>
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Col 1: Identity & Motto */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#065F46] to-[#044E3B] flex items-center justify-center text-white shadow-md">
                <GraduationCap className="w-7 h-7 text-emerald-200" />
              </div>
              <div>
                <span className="font-black text-lg text-white font-display">
                  HINSAD <span className="text-emerald-400">COLLEGE</span>
                </span>
                <p className={`text-xs leading-tight ${isDay ? 'text-[#9CB3A5]' : 'text-slate-400'}`}>
                  Health Technology &amp; General Studies
                </p>
              </div>
            </div>

            <p className={`text-xs leading-relaxed ${isDay ? 'text-[#C5D9CC]' : 'text-slate-300'}`}>
              A premier citadel of health technology excellence in Bauchi State, dedicated to training highly skilled, compassionate, and licensed healthcare practitioners.
            </p>

            <div className={`p-3 rounded-xl border text-xs font-bold italic flex items-center gap-2 ${
              isDay 
                ? 'bg-[#12241B] border-[#1E3A2C] text-emerald-300' 
                : 'bg-slate-900 border-slate-800 text-emerald-300'
            }`}>
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>College Motto: &quot;{COLLEGE_INFO.motto}&quot;</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              Quick Navigation
            </h4>
            <ul className={`space-y-2 text-xs font-medium ${isDay ? 'text-[#C5D9CC]' : 'text-slate-300'}`}>
              <li>
                <button 
                  onClick={() => { setActiveTab('home'); scrollToTop(); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('about'); scrollToTop(); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  About the College
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('programs'); scrollToTop(); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Academic Programs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('admissions'); scrollToTop(); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Admissions Guide
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('campus'); scrollToTop(); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Campus Life &amp; Labs
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('news'); scrollToTop(); }}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  News &amp; Events
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: E-Portals */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              E-Portals &amp; Verification
            </h4>
            <ul className={`space-y-2 text-xs font-medium ${isDay ? 'text-[#C5D9CC]' : 'text-slate-300'}`}>
              <li>
                <button 
                  onClick={() => { setActiveTab('classroom'); scrollToTop(); }}
                  className="text-emerald-300 hover:text-emerald-200 font-bold transition-colors cursor-pointer flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Google Classroom E-Learning</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenApply}
                  className="hover:text-emerald-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>2025/2026 Online Application</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenStatusCheck}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • Check Admission Status
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenStudentPortal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • Student Dashboard Login
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenStaffPortal}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • Staff &amp; Lecturer Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenResultChecker}
                  className="hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  • Verify Student Result / Transcript
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus Contact Info */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-display">
              Bauchi Campus
            </h4>
            <div className={`space-y-2.5 text-xs ${isDay ? 'text-[#C5D9CC]' : 'text-slate-300'}`}>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COLLEGE_INFO.phone1} / {COLLEGE_INFO.phone2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{COLLEGE_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenApply}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#065F46] to-[#047857] hover:from-[#047857] hover:to-[#065F46] text-white font-bold text-xs shadow-md cursor-pointer transition-all hover:scale-[1.02]"
              >
                Apply Online Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className={`mt-12 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs ${
          isDay ? 'border-[#1C3628] text-[#9CB3A5]' : 'border-slate-800 text-slate-400'
        }`}>
          <div>
            &copy; {new Date().getFullYear()} {COLLEGE_INFO.name}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className={isDay ? 'text-[#7B9585]' : 'text-slate-500'}>Inkil Unguwan Magaji Gombe Road, Bauchi</span>
            <button
              onClick={scrollToTop}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isDay 
                  ? 'bg-[#152B20] hover:bg-[#1E3D2D] text-[#FAF7F2]' 
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white'
              }`}
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
