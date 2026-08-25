import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Laptop, 
  Award, 
  Sparkles,
  Search,
  Download
} from 'lucide-react';
import { ADMISSION_ROADMAP } from '../data/mockData';

interface AdmissionRoadmapProps {
  onOpenApply: () => void;
  onOpenStatusCheck: () => void;
}

export const AdmissionRoadmap: React.FC<AdmissionRoadmapProps> = ({
  onOpenApply,
  onOpenStatusCheck,
}) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,135,81,0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,51,153,0.25),transparent_60%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Simple 4-Step Pathway
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight">
            How to Apply for 2025/2026 Admissions
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-3">
            Follow our seamless digital admission workflow to secure your spot in Nigeria's leading health technology college.
          </p>
        </div>

        {/* 4-Step Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ADMISSION_ROADMAP.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 hover:bg-slate-800 rounded-2xl p-6 border border-slate-700/80 hover:border-emerald-500/50 shadow-lg transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-black text-emerald-400 font-display">
                    {item.step}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-700/80 text-emerald-300 border border-slate-600">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white font-display group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/80 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Phase {idx + 1} Cleared</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bottom Callout */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            id="roadmap-apply-btn"
            onClick={onOpenApply}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Proceed to Step 2: Fill Online Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="roadmap-status-btn"
            onClick={onOpenStatusCheck}
            className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-600 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Search className="w-4 h-4 text-emerald-400" />
            <span>Already Applied? Check Status</span>
          </button>
        </div>
      </div>
    </section>
  );
};
