import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Quote, 
  Star, 
  GraduationCap, 
  HeartHandshake, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { CAMPUS_FACILITIES, TESTIMONIALS } from '../data/mockData';

export const CampusLife: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Academic', 'Diagnostic', 'Research', 'Pharmaceutical', 'Technology', 'Recreation'];

  const filteredFacilities = activeCategory === 'All' 
    ? CAMPUS_FACILITIES 
    : CAMPUS_FACILITIES.filter(f => f.category === activeCategory);

  return (
    <section id="campus-life-section" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Vibrant Student Environment
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
            Campus Life &amp; Ultra-Modern Facilities
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Experience our serene, purpose-built health sciences campus at Inkil Unguwan Magaji, designed for academic focus, medical simulation, and holistic student growth.
          </p>
        </div>

        {/* Facility Filter Pills */}
        <div className="flex items-center justify-center gap-1.5 flex-wrap mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFacilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-600 text-white uppercase tracking-wider shadow-sm">
                  {fac.category}
                </span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 font-display group-hover:text-emerald-700 transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>Inkil Campus, Bauchi</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <span>Active Lab</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Student Testimonials & Alumni Voices */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-emerald-600 font-bold text-xs uppercase tracking-widest">
              Alumni Success Stories
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display mt-1">
              Trusted by Hundreds of Certified Health Officers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-emerald-100 mb-2" />
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    &quot;{t.quote}&quot;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">{t.name}</div>
                    <div className="text-[11px] text-emerald-700 font-medium">{t.role}</div>
                    <div className="text-[10px] text-slate-400">{t.gradYear}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
