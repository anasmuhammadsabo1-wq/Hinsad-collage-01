import React from 'react';
import { 
  GraduationCap, 
  Users, 
  Award, 
  FlaskConical, 
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { COLLEGE_STATS } from '../data/mockData';

export const StatsCounter: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    GraduationCap: <GraduationCap className="w-7 h-7 text-emerald-500" />,
    Users: <Users className="w-7 h-7 text-blue-500" />,
    Award: <Award className="w-7 h-7 text-emerald-500" />,
    FlaskConical: <FlaskConical className="w-7 h-7 text-blue-500" />,
    TrendingUp: <TrendingUp className="w-7 h-7 text-emerald-500" />,
  };

  return (
    <section className="relative z-30 -mt-8 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {COLLEGE_STATS.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col items-center text-center group ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
            >
              <div className="p-3 rounded-2xl bg-slate-50 group-hover:bg-emerald-50 group-hover:scale-110 transition-all duration-300 mb-3 shadow-xs">
                {iconMap[stat.icon] || <ShieldCheck className="w-7 h-7 text-emerald-600" />}
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display tracking-tight group-hover:text-emerald-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-800 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                {stat.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
