import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  Clock, 
  Award, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  Stethoscope,
  Pill,
  Microscope,
  FileSpreadsheet,
  TreePine,
  Eye
} from 'lucide-react';
import { PROGRAMS } from '../data/mockData';
import { Program } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CourseFinderProps {
  onSelectProgram: (program: Program) => void;
  onApply: (programName: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All 14+ Programs', icon: GraduationCap },
  { id: 'Community Health', label: 'Community Health', icon: Stethoscope },
  { id: 'Pharmacy', label: 'Pharmacy & Drugs', icon: Pill },
  { id: 'Medical Laboratory', label: 'Diagnostics & Lab', icon: Microscope },
  { id: 'Health Information', label: 'Health Informatics', icon: FileSpreadsheet },
  { id: 'Environmental Health', label: 'Environmental & Public Health', icon: TreePine },
  { id: 'Dental & Optical', label: 'Dental & Optometry', icon: Eye }
];

export const CourseFinder: React.FC<CourseFinderProps> = ({
  onSelectProgram,
  onApply
}) => {
  const { isDay } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter((p) => {
      const matchesSearch = 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.overview.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.board.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = 
        selectedCategory === 'all' || 
        p.school.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Pharmacy' && p.name.toLowerCase().includes('pharm')) ||
        (selectedCategory === 'Dental & Optical' && (p.name.toLowerCase().includes('optic') || p.name.toLowerCase().includes('dental')));

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <section className={`w-full py-12 sm:py-16 relative overflow-hidden border-b transition-colors duration-300 ${
      isDay 
        ? 'bg-[#FAF7F2] text-[#14281E] border-[#E8E1D7]' 
        : 'bg-[#0E1620] text-white border-slate-800'
    }`}>
      {/* Background Decorative Accents */}
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDay ? 'bg-emerald-500/10' : 'bg-blue-600/10'
      }`} />
      <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
        isDay ? 'bg-[#065F46]/10' : 'bg-emerald-600/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
            isDay
              ? 'bg-[#EAF5EE] text-[#065F46] border-[#B9E1C6]'
              : 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Program Navigator</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-black tracking-tight font-display ${
            isDay ? 'text-[#14281E]' : 'text-white'
          }`}>
            Find Your Ideal Healthcare Career Pathway
          </h2>
          <p className={`text-sm sm:text-base ${
            isDay ? 'text-[#3E5246]' : 'text-slate-300'
          }`}>
            Explore 14+ nationally accredited Diplomas and Certificates with state-of-the-art laboratory training and direct hospital clinical postings.
          </p>
        </div>

        {/* Search and Category Filter Bar */}
        <div className={`p-4 sm:p-6 rounded-3xl shadow-xl space-y-4 mb-8 border transition-colors duration-300 ${
          isDay 
            ? 'bg-[#FFFDF9] border-[#E3DBD0]' 
            : 'bg-[#151F2C] border-slate-700/80'
        }`}>
          {/* Main Search Input */}
          <div className="relative">
            <input
              id="course-finder-search-input"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your preferred course (e.g. Pharmacy, CHEW, Medical Lab, Health Info, Dispensing Optics...)"
              className={`w-full pl-12 pr-10 py-3.5 rounded-2xl text-sm sm:text-base font-medium outline-none transition-all ${
                isDay 
                  ? 'bg-[#FAF7F2] border border-[#DDD5C7] text-[#14281E] placeholder:text-[#88988C] focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600' 
                  : 'bg-[#0A1017] border border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
            />
            <Search className="w-5 h-5 text-emerald-600 absolute left-4 top-4" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className={`absolute right-4 top-3.5 text-xs font-bold px-2 py-1 rounded cursor-pointer ${
                  isDay ? 'bg-[#EDE7DC] text-[#334439] hover:bg-[#E0D8CA]' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`course-finder-cat-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#047857] to-[#065F46] text-white shadow-md shadow-emerald-950/30 scale-105'
                      : isDay
                        ? 'bg-[#FAF7F2] text-[#2D4235] hover:bg-emerald-50 hover:text-[#065F46] border border-[#E0D8CC]'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : isDay ? 'text-emerald-700' : 'text-emerald-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className={`flex items-center justify-between text-xs sm:text-sm mb-6 px-1 ${
          isDay ? 'text-[#5A6D61]' : 'text-slate-400'
        }`}>
          <span className="font-semibold">
            Showing <strong className={isDay ? 'text-[#065F46]' : 'text-emerald-400'}>{filteredPrograms.length}</strong> matching programs
          </span>
          {searchTerm && (
            <span>
              Keyword: &quot;<strong className={isDay ? 'text-[#14281E]' : 'text-white'}>{searchTerm}</strong>&quot;
            </span>
          )}
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => (
            <div
              key={prog.id}
              className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between group hover:shadow-xl ${
                isDay 
                  ? 'bg-[#FFFDF9] border-[#E6DFD4] hover:border-emerald-600 hover:shadow-emerald-900/10' 
                  : 'bg-[#151F2C] border-slate-700/80 hover:border-emerald-500/50 hover:shadow-emerald-950/30'
              }`}
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Badge Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                    isDay 
                      ? 'bg-emerald-50 text-[#065F46] border-emerald-200' 
                      : 'bg-blue-500/15 text-blue-300 border-blue-400/20'
                  }`}>
                    <span>{prog.code}</span>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${
                    isDay ? 'bg-[#F2EDE4] text-[#415549]' : 'bg-slate-900/60 text-slate-400'
                  }`}>
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    {prog.duration}
                  </span>
                </div>

                {/* Course Name & School */}
                <div>
                  <h3 className={`text-lg font-bold transition-colors line-clamp-2 font-display ${
                    isDay 
                      ? 'text-[#14281E] group-hover:text-[#065F46]' 
                      : 'text-white group-hover:text-emerald-300'
                  }`}>
                    {prog.name}
                  </h3>
                  <p className={`text-xs font-semibold mt-1 ${
                    isDay ? 'text-[#065F46]' : 'text-emerald-400'
                  }`}>
                    School of {prog.school}
                  </p>
                </div>

                {/* Overview Excerpt */}
                <p className={`text-xs line-clamp-3 leading-relaxed ${
                  isDay ? 'text-[#4A5E52]' : 'text-slate-300'
                }`}>
                  {prog.overview}
                </p>

                {/* Board Accreditation Tag */}
                <div className={`p-2.5 rounded-xl border flex items-start gap-2 text-[11px] ${
                  isDay 
                    ? 'bg-[#FAF7F2] border-[#E5DDD1] text-[#243B2E]' 
                    : 'bg-slate-900/60 border-slate-700/50 text-slate-300'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-2 leading-snug">
                    Regulated by: <strong>{prog.board}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`p-4 border-t grid grid-cols-2 gap-2 ${
                isDay ? 'bg-[#FAF7F2] border-[#E8E1D6]' : 'bg-slate-900/80 border-slate-700/60'
              }`}>
                <button
                  onClick={() => onSelectProgram(prog)}
                  className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border ${
                    isDay
                      ? 'bg-[#FFFDF9] hover:bg-[#F2ECE1] text-[#1B3627] border-[#D9D0C1]'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700'
                  }`}
                >
                  <BookOpen className={`w-3.5 h-3.5 ${isDay ? 'text-[#065F46]' : 'text-blue-400'}`} />
                  <span>View Details</span>
                </button>
                <button
                  onClick={() => onApply(prog.name)}
                  className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#065F46] via-[#047857] to-[#044E3B] hover:from-[#047857] hover:to-[#065F46] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-emerald-950/30 transition-all cursor-pointer"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className={`text-center py-12 rounded-3xl border p-8 ${
            isDay ? 'bg-[#FFFDF9] border-[#E2DAD0]' : 'bg-slate-800/40 border-slate-700'
          }`}>
            <GraduationCap className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className={`text-lg font-bold ${isDay ? 'text-[#14281E]' : 'text-white'}`}>No matching programs found</h3>
            <p className={`text-xs mt-1 max-w-md mx-auto ${isDay ? 'text-[#5C6E63]' : 'text-slate-400'}`}>
              We couldn&apos;t find any course matching &quot;{searchTerm}&quot;. Try searching for general keywords like &quot;Health&quot;, &quot;Pharmacy&quot;, &quot;Lab&quot;, or &quot;CHEW&quot;.
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
