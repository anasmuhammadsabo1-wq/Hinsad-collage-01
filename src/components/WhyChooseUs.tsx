import React from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  Hospital, 
  CreditCard, 
  Building2, 
  TrendingUp,
  Sparkles,
  Award,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { WHY_CHOOSE_US, COLLEGE_INFO } from '../data/mockData';

interface WhyChooseUsProps {
  onOpenApply: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenApply }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
      case 'FlaskConical': return <FlaskConical className="w-6 h-6 text-blue-500" />;
      case 'Hospital': return <Hospital className="w-6 h-6 text-emerald-500" />;
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-blue-500" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-emerald-500" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6 text-blue-500" />;
      default: return <Award className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Institutional Distinction
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Why Choose HINSAD College?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Setting the highest academic and clinical benchmark in Northern Nigeria with ultra-modern laboratories, regulatory licensure, and guaranteed clinical hospital rotations.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 hover:bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 hover:border-emerald-500/40 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="w-13 h-13 rounded-2xl bg-white group-hover:bg-emerald-50 border border-slate-200 group-hover:border-emerald-200 flex items-center justify-center mb-5 shadow-xs transition-all duration-300">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-lg font-bold text-slate-900 font-display group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Standardized &amp; Verified</span>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Callout Banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-10 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl text-center lg:text-left">
            <div className="text-emerald-400 font-extrabold text-xs uppercase tracking-widest">
              Direct Admissions Assistance
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
              Ready to embark on a fulfilling healthcare career?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              Our admissions counseling team is available to guide you through course selection and registration requirements.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${COLLEGE_INFO.phone1}`}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call: {COLLEGE_INFO.phone1}</span>
            </a>

            <button
              onClick={onOpenApply}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              Start Online Application
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
