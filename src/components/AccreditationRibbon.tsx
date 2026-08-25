import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Building2, 
  FileBadge, 
  X,
  Stethoscope,
  Pill,
  Microscope,
  FileSpreadsheet,
  Globe2
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface BoardInfo {
  acronym: string;
  name: string;
  category: string;
  statutoryRole: string;
  credential: string;
  icon: React.ReactNode;
  badgeColor: string;
  description: string;
}

const BOARDS: BoardInfo[] = [
  {
    acronym: 'CHPRBN',
    name: 'Community Health Practitioners Registration Board of Nigeria',
    category: 'Community Health Extension',
    statutoryRole: 'Statutory Regulatory Authority for CHEW & JCHEW Training & Licensing',
    credential: 'CHEW / JCHEW Professional License & ND',
    icon: <Stethoscope className="w-5 h-5" />,
    badgeColor: 'from-emerald-600 to-teal-700',
    description: 'Regulates curriculum standards, indexation of candidates, clinical logbooks, and conducts national professional board licensing examinations.'
  },
  {
    acronym: 'PCN',
    name: 'Pharmacy Council of Nigeria',
    category: 'Pharmaceutical Sciences',
    statutoryRole: 'Federal Regulatory Agency for Pharmacy Technicians & Dispensing Education',
    credential: 'Certified Pharmacy Technician (C.P.T)',
    icon: <Pill className="w-5 h-5" />,
    badgeColor: 'from-blue-600 to-indigo-800',
    description: 'Inspects pharmaceutical compounding suites, oversees drug dispensary rotations, and issues statutory certified pharmacy technician licenses.'
  },
  {
    acronym: 'MLSCN',
    name: 'Medical Laboratory Science Council of Nigeria',
    category: 'Medical Diagnostics',
    statutoryRole: 'Regulatory Council for Medical Laboratory Technicians & Quality Practice',
    credential: 'MLT Professional License & National Diploma',
    icon: <Microscope className="w-5 h-5" />,
    badgeColor: 'from-cyan-600 to-blue-700',
    description: 'Enforces diagnostic lab bench standards, quality assurance, pathology lab indexing, and conducts nationwide licensing boards.'
  },
  {
    acronym: 'HRORBN',
    name: 'Health Records Officers Registration Board of Nigeria',
    category: 'Health Informatics',
    statutoryRole: 'Statutory Body Regulating Health Information Management Practice',
    credential: 'HIM Professional License & ND',
    icon: <FileSpreadsheet className="w-5 h-5" />,
    badgeColor: 'from-teal-600 to-emerald-800',
    description: 'Accredits health informatics coding labs, electronic medical records (EMR) training, and ICD-10 medical classification curriculum.'
  },
  {
    acronym: 'WAHEB',
    name: 'West African Health Examinations Board',
    category: 'Environmental Health',
    statutoryRole: 'Regional Examining Body for Public & Environmental Health Officers',
    credential: 'WAHEB National Environmental Health Diploma',
    icon: <Globe2 className="w-5 h-5" />,
    badgeColor: 'from-emerald-700 to-green-900',
    description: 'Conducts synchronized West African professional certification exams for environmental health and sanitation professionals.'
  },
  {
    acronym: 'BAUCHI MOH',
    name: 'Bauchi State Ministry of Health & Human Services',
    category: 'State Health Authority',
    statutoryRole: 'State Oversight, Clinical Posting Affiliations & Tertiary Hospital Rotations',
    credential: 'State Operational License & MoH Approval',
    icon: <Building2 className="w-5 h-5" />,
    badgeColor: 'from-slate-700 to-slate-900',
    description: 'Provides direct operational clearance and clinical posting affiliations at ATBUTH, State Specialist Hospital Bauchi, and General Hospitals.'
  }
];

export const AccreditationRibbon: React.FC = () => {
  const { isDay } = useTheme();
  const [selectedBoard, setSelectedBoard] = useState<BoardInfo | null>(null);

  return (
    <section className={`w-full py-10 border-y relative overflow-hidden transition-colors duration-300 ${
      isDay 
        ? 'bg-[#FAF7F2] text-[#14281E] border-[#E8E1D7]' 
        : 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-slate-800/80'
    }`}>
      {/* Decorative Glow */}
      <div className={`absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
        isDay ? 'bg-emerald-500/10' : 'bg-emerald-500/10'
      }`} />
      <div className={`absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
        isDay ? 'bg-[#065F46]/10' : 'bg-blue-500/10'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Ribbon Header */}
        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b ${
          isDay ? 'border-[#E5DDD1]' : 'border-slate-800'
        }`}>
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
              isDay 
                ? 'bg-[#EBF7EE] border-[#BCE4C9] text-[#065F46]' 
                : 'bg-blue-500/15 border-blue-400/30 text-blue-300'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Statutory Compliance &amp; Regulatory Standing</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black font-display ${
              isDay ? 'text-[#14281E]' : 'text-white'
            }`}>
              Approved by National Health Boards &amp; Regulatory Councils
            </h2>
          </div>
          <p className={`text-xs sm:text-sm max-w-md ${
            isDay ? 'text-[#475C4F]' : 'text-slate-400'
          }`}>
            All HINSAD College diplomas and certificates qualify students for statutory national indexing, clinical rotations, and professional license exams.
          </p>
        </div>

        {/* Board Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {BOARDS.map((board) => (
            <button
              key={board.acronym}
              onClick={() => setSelectedBoard(board)}
              className={`p-3.5 rounded-2xl border transition-all text-left group cursor-pointer flex flex-col justify-between hover:scale-[1.02] hover:shadow-lg ${
                isDay 
                  ? 'bg-[#FFFDF9] hover:bg-[#F7F2E9] border-[#E8E0D5] hover:border-emerald-600 shadow-emerald-950/5' 
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 hover:border-emerald-500/40 shadow-black/40'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${board.badgeColor} flex items-center justify-center text-white shadow-md shadow-black/20 group-hover:rotate-6 transition-transform`}>
                  {board.icon}
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                  isDay 
                    ? 'bg-emerald-50 text-[#065F46] border-emerald-200' 
                    : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20'
                }`}>
                  Accredited
                </span>
              </div>

              <div>
                <h3 className={`text-base font-black transition-colors font-display ${
                  isDay 
                    ? 'text-[#14281E] group-hover:text-[#065F46]' 
                    : 'text-white group-hover:text-emerald-300'
                }`}>
                  {board.acronym}
                </h3>
                <p className={`text-[11px] line-clamp-2 mt-1 leading-snug ${
                  isDay ? 'text-[#586C60]' : 'text-slate-400'
                }`}>
                  {board.name}
                </p>
              </div>

              <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] ${
                isDay 
                  ? 'border-[#EAE3D9] text-[#586C60] group-hover:text-[#14281E]' 
                  : 'border-slate-800/80 text-slate-400 group-hover:text-slate-300'
              }`}>
                <span className={`font-semibold ${isDay ? 'text-[#065F46]' : 'text-blue-400'}`}>{board.category}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Board Verification Modal */}
      {selectedBoard && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 ${
            isDay ? 'bg-[#FFFDF9] border-[#E0D8CB] text-[#14281E]' : 'bg-slate-900 border-slate-700 text-white'
          }`}>
            <button
              onClick={() => setSelectedBoard(null)}
              className={`absolute top-5 right-5 p-2 rounded-full transition-colors cursor-pointer ${
                isDay ? 'bg-[#F0EAE0] hover:bg-[#E5DEC7] text-slate-700' : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedBoard.badgeColor} flex items-center justify-center text-white shadow-lg`}>
                {selectedBoard.icon}
              </div>
              <div>
                <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                  isDay ? 'bg-emerald-50 text-[#065F46] border-emerald-200' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Statutory Accreditation Verified
                </div>
                <h3 className={`text-2xl font-black font-display mt-1 ${isDay ? 'text-[#14281E]' : 'text-white'}`}>
                  {selectedBoard.acronym}
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <label className={`text-xs font-bold uppercase tracking-wider block ${
                  isDay ? 'text-[#5E7165]' : 'text-slate-400'
                }`}>Full Regulatory Council Name</label>
                <p className={`font-semibold mt-0.5 ${isDay ? 'text-[#14281E]' : 'text-white'}`}>{selectedBoard.name}</p>
              </div>

              <div className={`p-3.5 rounded-xl border ${
                isDay ? 'bg-[#FAF7F2] border-[#E2DAD0]' : 'bg-slate-800/80 border-slate-700/60'
              }`}>
                <label className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                  isDay ? 'text-[#065F46]' : 'text-emerald-400'
                }`}>Board Mandate &amp; Standards</label>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDay ? 'text-[#3B4E42]' : 'text-slate-300'}`}>{selectedBoard.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-xl border ${
                  isDay ? 'bg-[#FAF7F2] border-[#E2DAD0]' : 'bg-slate-800/50 border-slate-700/40'
                }`}>
                  <span className={`text-[11px] block font-medium ${isDay ? 'text-[#5E7165]' : 'text-slate-400'}`}>Awarded Credential</span>
                  <span className={`text-xs font-bold mt-0.5 block ${isDay ? 'text-[#14281E]' : 'text-white'}`}>{selectedBoard.credential}</span>
                </div>
                <div className={`p-3 rounded-xl border ${
                  isDay ? 'bg-[#FAF7F2] border-[#E2DAD0]' : 'bg-slate-800/50 border-slate-700/40'
                }`}>
                  <span className={`text-[11px] block font-medium ${isDay ? 'text-[#5E7165]' : 'text-slate-400'}`}>Indexation Status</span>
                  <span className={`text-xs font-bold mt-0.5 block ${isDay ? 'text-[#065F46]' : 'text-emerald-400'}`}>Active / 2025 Approved</span>
                </div>
              </div>
            </div>

            <div className={`mt-6 pt-4 border-t flex justify-end ${isDay ? 'border-[#EAE3D9]' : 'border-slate-800'}`}>
              <button
                onClick={() => setSelectedBoard(null)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#065F46] to-[#047857] hover:from-[#047857] hover:to-[#065F46] text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
