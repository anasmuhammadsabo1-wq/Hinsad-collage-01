import React from 'react';
import { 
  Award, 
  Target, 
  Eye, 
  ShieldCheck, 
  Users, 
  Building2, 
  Sparkles, 
  CheckCircle2,
  GraduationCap,
  Hospital
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/mockData';

interface AboutSectionProps {
  onOpenApply: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenApply }) => {
  return (
    <div className="py-16 sm:py-24 bg-white space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            About HINSAD College
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
            Nurturing Healthcare Champions for Bauchi State &amp; Nigeria
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Founded with a visionary mandate to bridge frontline healthcare workforce shortages through rigorous clinical training, advanced laboratory technologies, and ethical medical education.
          </p>
        </div>

        {/* Provost Address & Leadership Vision */}
        <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 relative">
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
                alt="Provost of HINSAD College"
                className="w-full h-80 sm:h-96 object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-emerald-700 text-white p-4 rounded-2xl shadow-lg text-xs">
              <span className="font-extrabold block text-sm">Excellence in Health</span>
              <span className="text-emerald-200">Established {COLLEGE_INFO.established}</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="text-emerald-700 font-bold text-xs uppercase tracking-widest">
              From the Desk of the Provost
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
              &quot;Healthcare is our Sacred Calling, Quality Education is our Guarantee.&quot;
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Welcome to HINSAD College of Health Technology &amp; General Studies. Our college was founded on the fundamental principle that primary health care and diagnostic accuracy form the backbone of national prosperity.
            </p>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Here at Inkil Unguwan Magaji along Gombe Road in Bauchi, we have invested heavily in molecular diagnostic analyzers, clinical skills simulation wards, digital e-libraries, and a dedicated team of licensed clinicians. Our graduates step out as licensed professionals ready to make immediate lifesaving impacts.
            </p>
            <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-sm">Dr. M. S. Inkil, MBBS, FWACS</div>
                <div className="text-xs text-slate-500">Provost &amp; Chief Academic Officer</div>
              </div>
              <button
                onClick={onOpenApply}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Join HINSAD
              </button>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Core Values Bento Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Our Mission</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                To provide world-class, accessible, and community-centered health technology education using modern practical simulations, producing licensed healthcare professionals with unmatched ethical standards.
              </p>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-blue-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Our Vision</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                To become the premier health technology polytechnic in West Africa, recognized globally for groundbreaking clinical training, community disease eradication, and academic excellence.
              </p>
            </div>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-emerald-500/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Core Values</h3>
              <ul className="text-xs text-slate-600 mt-2 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Clinical Integrity &amp; Compassion</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Practical Diagnostic Mastery</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Innovation &amp; Digital Health</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Community Service &amp; Ethics</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
