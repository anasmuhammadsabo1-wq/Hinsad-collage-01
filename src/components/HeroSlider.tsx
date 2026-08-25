import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  FlaskConical, 
  Hospital,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Award
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface HeroSliderProps {
  onOpenApply: () => void;
  onOpenStatusCheck: (initialQuery?: string) => void;
  onExplorePrograms: () => void;
}

const SLIDES = [
  {
    title: "Pioneering Modern Health Technology & Healthcare Education",
    subtitle: "Accredited National Diplomas, Clinical Skills, and State-of-the-Art Laboratories in Bauchi State.",
    tag: "2025/2026 Admissions In Progress",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1800&q=85",
    highlight: "Health is Wealth",
    stats: "100% Accredited Programs"
  },
  {
    title: "Advanced Practical Labs in Pharmacy & Medical Diagnostics",
    subtitle: "Hands-on clinical training, sterile compounding facilities, and state specialist hospital rotations.",
    tag: "Excellence In Medical Science",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1800&q=85",
    highlight: "Hands-On Clinical Mastery",
    stats: "6 Specialized Laboratories"
  },
  {
    title: "Community Health & Primary Healthcare Leadership",
    subtitle: "Equipping licensed CHEW and public health officers with high clinical competence and ethics.",
    tag: "CHPRBN & PCN Regulated",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1800&q=85",
    highlight: "Shaping Frontline Healers",
    stats: "98% Clinical Placement"
  }
];

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenApply,
  onOpenStatusCheck,
  onExplorePrograms
}) => {
  const { isDay } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [appInput, setAppInput] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const handleQuickStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appInput.trim()) {
      onOpenStatusCheck(appInput.trim());
    } else {
      onOpenStatusCheck();
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[660px] lg:min-h-[720px] flex items-center">
      {/* Background Images with Crossfade */}
      {SLIDES.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } transform transition-transform duration-10000`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center brightness-[0.45] contrast-[1.12]"
            referrerPolicy="no-referrer"
          />
        </div>
      ))}

      {/* Cyber/Medical High-Tech Overlay Gradients & Royal Blue Mesh Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/85 to-slate-950/40 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40 z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-600/15 blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-3xl pointer-events-none z-10" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Frosted Glassmorphism Hero Content Card */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden space-y-6">
              {/* Subtle Royal Blue & Emerald Ambient Gradient Corner */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-600/30 to-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
              
              {/* Tag Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 backdrop-blur-md text-emerald-300 text-xs sm:text-sm font-bold tracking-wide">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>{SLIDES[currentSlide].tag}</span>
                <span className="hidden sm:inline-block text-slate-400 font-normal">|</span>
                <span className="hidden sm:inline-block text-blue-300 text-xs font-semibold">Bauchi State</span>
              </div>

              {/* Main Title & Motto */}
              <div className="space-y-3">
                <div className="text-emerald-400 font-extrabold tracking-wider text-xs uppercase font-display flex items-center gap-2">
                  <span className="w-6 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded" />
                  <span>College Motto: &quot;{COLLEGE_INFO.motto}&quot;</span>
                </div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-display leading-[1.14]">
                  {SLIDES[currentSlide].title}
                </h1>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {SLIDES[currentSlide].subtitle}
                </p>
              </div>

              {/* Accreditation & Value Pillars */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm text-slate-200 font-medium pt-1 border-t border-white/10">
                <span className="flex items-center gap-1.5 text-emerald-300 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>CHPRBN &amp; PCN Approved</span>
                </span>
                <span className="flex items-center gap-1.5 text-blue-300 bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-500/20">
                  <FlaskConical className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>6 Diagnostic Labs</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-300 bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  <Hospital className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Clinical Postings</span>
                </span>
              </div>

              {/* Hero Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-apply-btn"
                  onClick={onOpenApply}
                  className="px-6 sm:px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-900/50 hover:shadow-emerald-700/60 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  id="hero-explore-programs-btn"
                  onClick={onExplorePrograms}
                  className="px-5 sm:px-6 py-3.5 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 text-white font-bold text-sm sm:text-base border border-blue-400/30 hover:border-blue-400/60 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-blue-950/40"
                >
                  <GraduationCap className="w-5 h-5 text-blue-300" />
                  <span>Explore 14+ Programs</span>
                </button>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center gap-2.5 pt-2">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentSlide 
                        ? 'w-8 bg-gradient-to-r from-emerald-400 to-blue-400' 
                        : 'w-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
                <span className="text-[11px] text-slate-400 ml-2">
                  0{currentSlide + 1} / 0{SLIDES.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Instant "Check Admission Status" Widget */}
          <div className="lg:col-span-5">
            <div className={`backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden transition-colors duration-300 ${
              isDay 
                ? 'bg-[#FFFDF9]/95 border border-[#E7E0D6] text-[#14281E]' 
                : 'bg-[#121A23]/95 border border-[#1E293B] text-[#F1F5F9]'
            }`}>
              {/* Top Accent bar */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#047857] via-[#065F46] to-[#044E3B]" />
              
              {/* Widget Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide border ${
                    isDay
                      ? 'bg-emerald-50 text-[#065F46] border-emerald-200/80'
                      : 'bg-emerald-950/40 text-emerald-300 border-emerald-800/60'
                  }`}>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Instant Portal Lookup
                  </div>
                  <h3 className={`text-xl sm:text-2xl font-black font-display mt-1 ${
                    isDay ? 'text-[#14281E]' : 'text-white'
                  }`}>
                    Check Admission Status
                  </h3>
                  <p className={`text-xs mt-0.5 ${
                    isDay ? 'text-[#4A5D52]' : 'text-slate-400'
                  }`}>
                    Enter your Application Reg No or Phone Number to verify your 2025/2026 status.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#065F46] to-[#044E3B] text-white shadow-md shadow-emerald-950/30 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
              </div>

              {/* Status Search Form */}
              <form onSubmit={handleQuickStatusSubmit} className="space-y-3.5">
                <div>
                  <label htmlFor="app-input-field" className={`block text-xs font-bold mb-1 ${
                    isDay ? 'text-[#2C3E33]' : 'text-slate-300'
                  }`}>
                    Application / Phone Number
                  </label>
                  <div className="relative">
                    <input
                      id="app-input-field"
                      type="text"
                      placeholder="e.g. HIN/2025/0842 or 08060951190"
                      value={appInput}
                      onChange={(e) => setAppInput(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-600 outline-none transition-all ${
                        isDay 
                          ? 'bg-[#FAF7F2] border border-[#DDD5C7] text-[#14281E] placeholder:text-[#8D9B91]'
                          : 'bg-[#0A1017] border border-[#273546] text-white placeholder:text-slate-500'
                      }`}
                    />
                    <Search className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <button
                  type="submit"
                  id="hero-check-status-submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#065F46] via-[#047857] to-[#044E3B] hover:from-[#047857] hover:to-[#065F46] text-white font-bold text-sm shadow-md shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4 text-lime-300" />
                  <span>Check Admission &amp; Print Letter</span>
                </button>
              </form>

              {/* Sample Quick Demo Tags */}
              <div className={`mt-4 pt-3.5 border-t flex flex-wrap items-center gap-1.5 text-xs ${
                isDay ? 'border-[#EAE3D9] text-[#5C6E63]' : 'border-[#1E293B] text-slate-400'
              }`}>
                <span className="font-semibold">Quick Test IDs:</span>
                <button
                  type="button"
                  onClick={() => { setAppInput('HIN/2025/0842'); onOpenStatusCheck('HIN/2025/0842'); }}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors cursor-pointer border ${
                    isDay 
                      ? 'bg-[#F2ECE1] hover:bg-emerald-100 text-[#1B3627] border-[#D9D0C1]' 
                      : 'bg-slate-800 hover:bg-emerald-900/40 text-slate-200 border-slate-700'
                  }`}
                >
                  HIN/2025/0842 (Merit)
                </button>
                <button
                  type="button"
                  onClick={() => { setAppInput('HIN/2025/1109'); onOpenStatusCheck('HIN/2025/1109'); }}
                  className={`px-2.5 py-1 rounded font-mono text-[11px] transition-colors cursor-pointer border ${
                    isDay 
                      ? 'bg-[#F2ECE1] hover:bg-emerald-100 text-[#1B3627] border-[#D9D0C1]' 
                      : 'bg-slate-800 hover:bg-emerald-900/40 text-slate-200 border-slate-700'
                  }`}
                >
                  HIN/2025/1109 (Batch B)
                </button>
              </div>

              {/* Quick Advisory note */}
              <div className={`mt-3.5 p-3 rounded-xl border flex items-center gap-2 text-xs ${
                isDay 
                  ? 'bg-[#EEF8F1] border-emerald-200/80 text-[#0E3823]' 
                  : 'bg-emerald-950/30 border-emerald-800/40 text-emerald-200'
              }`}>
                <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="leading-snug">
                  Admitted candidates can download their <strong>Official Provisional Admission Letter (PDF)</strong> instantly.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

