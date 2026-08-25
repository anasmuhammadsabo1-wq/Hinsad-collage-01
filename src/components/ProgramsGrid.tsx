import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Stethoscope, 
  Pill, 
  Microscope, 
  ShieldCheck, 
  Database, 
  HeartPulse, 
  BookOpen, 
  Activity,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  Award,
  Sparkles
} from 'lucide-react';
import { PROGRAMS } from '../data/mockData';
import { Program } from '../types';
import { generateProgramProspectusPDF } from '../utils/pdfGenerator';
import { useTheme } from '../context/ThemeContext';

interface ProgramsGridProps {
  onSelectProgram: (program: Program) => void;
  onApplyForProgram: (programName: string) => void;
}

export const ProgramsGrid: React.FC<ProgramsGridProps> = ({
  onSelectProgram,
  onApplyForProgram
}) => {
  const { isDay } = useTheme();
  const [selectedSchool, setSelectedSchool] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const schools = [
    'All',
    'Community Health',
    'Diagnostic & Pharmacy',
    'Environmental & Public Health',
    'Health Technology',
    'General Studies & Basic Academy'
  ];

  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter((prog) => {
      const matchSchool = selectedSchool === 'All' || prog.school === selectedSchool;
      const matchSearch = 
        prog.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.board.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prog.overview.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSchool && matchSearch;
    });
  }, [selectedSchool, searchQuery]);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-5 h-5" />;
      case 'Pill': return <Pill className="w-5 h-5" />;
      case 'Microscope': return <Microscope className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  return (
    <section id="programs-section" className={`py-16 sm:py-24 relative transition-colors duration-300 ${
      isDay ? 'bg-[#FAF7F2]' : 'bg-[#0A1017]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border ${
            isDay 
              ? 'bg-[#EBF7EE] border-[#BCE4C9] text-[#065F46]' 
              : 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Accredited Academic Disciplines</span>
          </div>
          <h2 className={`text-3xl sm:text-4xl font-black font-display tracking-tight ${
            isDay ? 'text-[#14281E]' : 'text-white'
          }`}>
            Academic Schools &amp; Professional Programs
          </h2>
          <p className={`text-base sm:text-lg mt-3 ${
            isDay ? 'text-[#4A5D50]' : 'text-slate-400'
          }`}>
            Explore our nationally accredited healthcare diplomas and general studies curricula designed to produce licensed clinical practitioners.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className={`p-4 rounded-2xl shadow-sm border mb-10 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors duration-300 ${
          isDay ? 'bg-[#FFFDF9] border-[#E8E0D5]' : 'bg-slate-900 border-slate-800'
        }`}>
          {/* School Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {schools.map((sch) => (
              <button
                key={sch}
                onClick={() => setSelectedSchool(sch)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSchool === sch
                    ? 'bg-[#065F46] text-white shadow-sm'
                    : isDay
                    ? 'bg-[#F2ECE1] text-[#33463B] hover:bg-[#E8E0D2]'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {sch}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <input
              type="text"
              placeholder="Search course, code or board..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                isDay 
                  ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                  : 'bg-slate-800 border-slate-700 text-white focus:ring-emerald-500'
              }`}
            />
            <Search className={`w-4 h-4 absolute left-3 top-2.5 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className={`rounded-2xl overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1 ${
                isDay 
                  ? 'bg-[#FFFDF9] border-[#E8E0D5]' 
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              {/* Program Thumbnail Image & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                
                {/* School pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-slate-900/80 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                    {program.code}
                  </span>
                </div>

                {/* Duration / Credential badge */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="flex items-center gap-1 font-semibold text-slate-200">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    {program.duration}
                  </span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-300">
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    {program.credential.split('&')[0]}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className={`flex items-center gap-2 text-xs font-bold mb-1.5 ${
                    isDay ? 'text-[#065F46]' : 'text-emerald-400'
                  }`}>
                    <div className={`p-1 rounded-md ${
                      isDay ? 'bg-[#EBF7EE] text-[#065F46]' : 'bg-slate-800 text-emerald-400'
                    }`}>
                      {renderIcon(program.iconName)}
                    </div>
                    <span>{program.school}</span>
                  </div>

                  <h3 className={`text-lg font-bold font-display transition-colors leading-snug ${
                    isDay ? 'text-[#14281E] group-hover:text-[#065F46]' : 'text-white group-hover:text-emerald-400'
                  }`}>
                    {program.name}
                  </h3>

                  <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${
                    isDay ? 'text-[#4A5D50]' : 'text-slate-400'
                  }`}>
                    {program.overview}
                  </p>

                  {/* Regulatory Body Tag */}
                  <div className={`mt-3 p-2 rounded-lg border flex items-start gap-1.5 text-[11px] ${
                    isDay 
                      ? 'bg-[#FAF7F2] border-[#E8E0D5] text-[#33463B]' 
                      : 'bg-slate-800/80 border-slate-700 text-slate-300'
                  }`}>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-medium">
                      <strong>Board:</strong> {program.board}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className={`mt-5 pt-4 border-t flex flex-col gap-2 ${
                  isDay ? 'border-[#E8E0D5]' : 'border-slate-800'
                }`}>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      id={`btn-view-program-${program.id}`}
                      onClick={() => onSelectProgram(program)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDay 
                          ? 'bg-[#FAF7F2] hover:bg-[#F0E9DC] text-[#14281E]' 
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                      }`}
                    >
                      <span>Syllabus &amp; Info</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      id={`btn-download-prospectus-${program.id}`}
                      onClick={() => generateProgramProspectusPDF(program)}
                      className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDay 
                          ? 'bg-[#EBF7EE] hover:bg-[#DCF3E1] text-[#065F46]' 
                          : 'bg-emerald-950/50 hover:bg-emerald-900/50 text-emerald-300'
                      }`}
                      title="Download PDF Prospectus"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Prospectus PDF</span>
                    </button>
                  </div>

                  <button
                    id={`btn-apply-program-${program.id}`}
                    onClick={() => onApplyForProgram(program.name)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#065F46] to-[#047857] hover:from-[#047857] hover:to-[#065F46] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply for {program.code}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
