import React, { useState } from 'react';
import { 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  Pin, 
  FileText, 
  Download, 
  X,
  Share2,
  Clock
} from 'lucide-react';
import { NEWS_ITEMS, COLLEGE_INFO } from '../data/mockData';
import { NewsItem } from '../types';

interface NewsAndEventsProps {
  onOpenApply: () => void;
}

export const NewsAndEvents: React.FC<NewsAndEventsProps> = ({ onOpenApply }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeNewsModal, setActiveNewsModal] = useState<NewsItem | null>(null);

  const categories = ['All', 'Admissions', 'Academic', 'Events', 'Accreditation'];

  const filteredNews = selectedCategory === 'All'
    ? NEWS_ITEMS
    : NEWS_ITEMS.filter(n => n.category === selectedCategory);

  return (
    <section id="news-events-section" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Official Bulletins &amp; Notices
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
              News, Events &amp; Announcements
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Stay updated on admission cycles, screening timetables, matriculation dates, and clinical posting notices.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map(item => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              {/* News Thumbnail */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-200">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded text-[10px] font-bold bg-blue-900/90 text-blue-200 uppercase tracking-wide backdrop-blur-md">
                  {item.category}
                </span>

                {item.pinned && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
                    <Pin className="w-3 h-3" />
                    Pinned
                  </span>
                )}

                <div className="absolute bottom-2 left-3 text-[11px] font-semibold text-slate-300 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{item.date}</span>
                </div>
              </div>

              {/* News Text */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-display group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">
                    By {item.author}
                  </span>
                  <button
                    onClick={() => setActiveNewsModal(item)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Notice</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Academic Calendar Download Card */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-white/10 text-emerald-300 border border-white/10 shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-display">
                2025/2026 Official Academic Calendar
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Download the complete schedule for lectures, continuous assessments, hospital rotations, and semester exams.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                alert("2025/2026 HINSAD College Academic Calendar has been downloaded to your device.");
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Academic Calendar (PDF)</span>
            </button>
          </div>
        </div>
      </div>

      {/* News Detail Read Modal */}
      {activeNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative">
            <button
              onClick={() => setActiveNewsModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold bg-blue-100 text-blue-800 uppercase tracking-wide mb-3">
              <Tag className="w-3.5 h-3.5" />
              <span>{activeNewsModal.category}</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">
              {activeNewsModal.title}
            </h2>

            <div className="flex items-center gap-4 text-xs text-slate-500 my-4 pb-4 border-b border-slate-100">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-emerald-600" />
                {activeNewsModal.date}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-4 h-4 text-emerald-600" />
                {activeNewsModal.author}
              </span>
            </div>

            <div className="rounded-xl overflow-hidden mb-5">
              <img
                src={activeNewsModal.image}
                alt={activeNewsModal.title}
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="text-sm text-slate-700 leading-relaxed space-y-3 font-normal">
              <p>{activeNewsModal.content}</p>
              <p>
                For further clarification or official correspondence regarding this notice, kindly contact the Academic Registry, HINSAD College of Health Technology, Inkil Unguwan Magaji Gombe Road Campus, Bauchi.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setActiveNewsModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
              >
                Close Notice
              </button>

              {activeNewsModal.category === 'Admissions' && (
                <button
                  onClick={() => {
                    setActiveNewsModal(null);
                    onOpenApply();
                  }}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Apply Online Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
