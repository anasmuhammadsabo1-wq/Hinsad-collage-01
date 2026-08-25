import React from 'react';
import { 
  X, 
  Clock, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  Sparkles,
  Building,
  GraduationCap
} from 'lucide-react';
import { Program } from '../types';
import { generateProgramProspectusPDF } from '../utils/pdfGenerator';

interface ProgramDetailModalProps {
  program: Program | null;
  onClose: () => void;
  onApply: (programName: string) => void;
}

export const ProgramDetailModal: React.FC<ProgramDetailModalProps> = ({
  program,
  onClose,
  onApply
}) => {
  if (!program) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative my-auto">
        {/* Banner with Image & Close */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={program.image}
            alt={program.name}
            className="w-full h-full object-cover brightness-[0.6]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-5 right-5 text-white">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-emerald-600 text-white uppercase tracking-wide">
              {program.school}
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white mt-1">
              {program.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-1">
              <span className="flex items-center gap-1 font-semibold text-emerald-300">
                <Award className="w-4 h-4 text-emerald-400" />
                {program.credential}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-slate-400" />
                {program.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          {/* Regulatory Accreditation */}
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-950">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Accrediting &amp; Professional Licensing Board:</span>
              <p className="mt-0.5 text-slate-700">{program.board}</p>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 font-display">
              Programme Overview
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {program.overview}
            </p>
          </div>

          {/* Requirements & Career in 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Admission Requirements</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {program.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 space-y-2">
              <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Career Opportunities</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {program.careerProspects.map((cp, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{cp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sample Curriculum */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-display">
              Curriculum &amp; Course Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.curriculum.map((sem, sIdx) => (
                <div key={sIdx} className="rounded-xl border border-slate-200 overflow-hidden text-xs">
                  <div className="bg-slate-900 text-white px-3 py-2 font-bold text-[11px]">
                    {sem.semester}
                  </div>
                  <div className="divide-y divide-slate-100 bg-white">
                    {sem.courses.map((c, cIdx) => (
                      <div key={cIdx} className="p-2.5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900">{c.code}:</span>{' '}
                          <span className="text-slate-700">{c.title}</span>
                        </div>
                        <span className="font-mono font-semibold text-emerald-700 shrink-0 ml-2">
                          {c.units} Units
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={() => generateProgramProspectusPDF(program)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Download Prospectus (PDF)</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold cursor-pointer"
            >
              Close
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onApply(program.name);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Apply for this Course</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
