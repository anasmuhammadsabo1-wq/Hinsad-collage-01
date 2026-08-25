import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  GraduationCap, 
  ArrowRight, 
  Sparkles, 
  FileCheck, 
  RefreshCw,
  Award,
  ChevronRight
} from 'lucide-react';
import { PROGRAMS } from '../data/mockData';
import { useTheme } from '../context/ThemeContext';

interface AdmissionEligibilityCheckerProps {
  onApply: (programName: string) => void;
}

const CORE_SUBJECTS = [
  { id: 'eng', name: 'English Language', requiredFor: 'all' },
  { id: 'math', name: 'Mathematics', requiredFor: 'all' },
  { id: 'bio', name: 'Biology / Health Science', requiredFor: 'all' },
  { id: 'chem', name: 'Chemistry', requiredFor: 'science' },
  { id: 'phy', name: 'Physics', requiredFor: 'science' },
  { id: 'geo', name: 'Geography / Economics / Agric', requiredFor: 'general' }
];

export const AdmissionEligibilityChecker: React.FC<AdmissionEligibilityCheckerProps> = ({
  onApply
}) => {
  const { isDay } = useTheme();
  const [selectedCourseId, setSelectedCourseId] = useState(PROGRAMS[0].id);
  const [sittings, setSittings] = useState<'1' | '2'>('1');
  const [passedSubjects, setPassedSubjects] = useState<string[]>(['eng', 'math', 'bio', 'chem', 'phy']);
  const [evaluated, setEvaluated] = useState(false);

  const selectedProgram = PROGRAMS.find(p => p.id === selectedCourseId) || PROGRAMS[0];

  const handleToggleSubject = (subjectId: string) => {
    setPassedSubjects(prev => 
      prev.includes(subjectId) ? prev.filter(s => s !== subjectId) : [...prev, subjectId]
    );
    setEvaluated(false);
  };

  // Evaluation Logic
  const hasEng = passedSubjects.includes('eng');
  const hasMath = passedSubjects.includes('math');
  const hasBio = passedSubjects.includes('bio');
  const hasChem = passedSubjects.includes('chem');
  const hasPhy = passedSubjects.includes('phy');

  const totalCredits = passedSubjects.length;
  const isJchew = selectedCourseId === 'jchew' || selectedCourseId === 'eht-cert';

  let eligibilityStatus: 'qualified' | 'conditional' | 'not_qualified' = 'qualified';
  let message = '';
  let advice = '';

  if (isJchew) {
    if (totalCredits >= 3 && (hasEng || hasBio)) {
      eligibilityStatus = 'qualified';
      message = 'Fully Eligible for Certificate / JCHEW Admission!';
      advice = 'You meet the minimum entry requirement (3-4 O\'Level passes/credits including English/Biology in maximum 2 sittings).';
    } else {
      eligibilityStatus = 'not_qualified';
      message = 'Below Minimum JCHEW Entry Requirement';
      advice = 'You need at least 3 passes/credits including English or Biology.';
    }
  } else {
    // ND / Professional Diploma programs
    if (hasEng && hasMath && hasBio && hasChem && hasPhy) {
      eligibilityStatus = 'qualified';
      message = '100% Qualified for Direct Admission on Merit List!';
      advice = 'You possess the complete 5 Science Credits required by the National Regulatory Board (CHPRBN / PCN / MLSCN).';
    } else if (hasEng && hasBio && (hasChem || hasPhy || hasMath) && totalCredits >= 4) {
      eligibilityStatus = 'conditional';
      message = 'Eligible for Direct Screening / Auxiliary Review';
      advice = `You have strong science credits (${totalCredits} credits). You may apply directly or consider our Foundation / JCHEW pathway while making up missing subjects.`;
    } else {
      eligibilityStatus = 'not_qualified';
      message = 'Missing Core Prerequisite Science Credits';
      advice = 'This professional diploma requires English, Mathematics, Biology, Chemistry, and Physics. We recommend exploring our JCHEW or Certificate programs!';
    }
  }

  const handleEvaluate = (e: React.FormEvent) => {
    e.preventDefault();
    setEvaluated(true);
  };

  return (
    <section className={`w-full py-12 sm:py-16 border-b relative transition-colors duration-300 ${
      isDay ? 'bg-[#FAF7F2] text-[#14281E] border-[#E8E1D7]' : 'bg-white text-slate-900 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
            isDay 
              ? 'bg-[#EBF7EE] border-[#BCE4C9] text-[#065F46]' 
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <GraduationCap className="w-3.5 h-3.5 text-[#065F46]" />
            <span>Interactive Self-Assessment</span>
          </div>
          <h2 className={`text-2xl sm:text-4xl font-black font-display ${
            isDay ? 'text-[#14281E]' : 'text-slate-900'
          }`}>
            Check Your Admission Eligibility in 60 Seconds
          </h2>
          <p className={`text-sm sm:text-base ${
            isDay ? 'text-[#4A5D50]' : 'text-slate-600'
          }`}>
            Select your preferred program, check off your O&apos;Level grades (WAEC / NECO / NABTEB), and instantly verify your qualification status before applying.
          </p>
        </div>

        {/* Checker Interactive Card */}
        <div className={`rounded-3xl border shadow-xl overflow-hidden max-w-4xl mx-auto transition-colors duration-300 ${
          isDay ? 'bg-[#FFFDF9] border-[#E8E0D5] shadow-emerald-950/5' : 'bg-slate-50 border-slate-200'
        }`}>
          {/* Top colored accent */}
          <div className="h-2 bg-gradient-to-r from-[#065F46] via-emerald-500 to-teal-500" />

          <form onSubmit={handleEvaluate} className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Step 1: Select Desired Course */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                  isDay ? 'text-[#14281E]' : 'text-slate-700'
                }`}>
                  1. Choose Your Preferred Course
                </label>
                <select
                  id="eligibility-course-select"
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    setEvaluated(false);
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-semibold outline-none transition-all cursor-pointer shadow-xs ${
                    isDay 
                      ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-2 focus:ring-[#065F46] focus:border-[#065F46]' 
                      : 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
                  }`}
                >
                  {PROGRAMS.map((prog) => (
                    <option key={prog.id} value={prog.id}>
                      {prog.name} ({prog.duration})
                    </option>
                  ))}
                </select>
                <p className={`text-[11px] mt-1.5 flex items-center gap-1 ${
                  isDay ? 'text-[#586C60]' : 'text-slate-500'
                }`}>
                  <Award className="w-3 h-3 text-[#065F46]" />
                  <span>Credential: <strong>{selectedProgram.credential}</strong></span>
                </p>
              </div>

              {/* Step 2: Exam Sittings */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${
                  isDay ? 'text-[#14281E]' : 'text-slate-700'
                }`}>
                  2. Number of O&apos;Level Sittings
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => { setSittings('1'); setEvaluated(false); }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      sittings === '1'
                        ? 'bg-[#065F46] text-white border-[#065F46] shadow-md shadow-emerald-950/20'
                        : isDay
                        ? 'bg-[#FAF7F2] text-[#33463B] border-[#E2DAD0] hover:bg-[#F3ECE0]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>1 Sitting (Merit)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSittings('2'); setEvaluated(false); }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      sittings === '2'
                        ? 'bg-[#047857] text-white border-[#047857] shadow-md shadow-emerald-950/20'
                        : isDay
                        ? 'bg-[#FAF7F2] text-[#33463B] border-[#E2DAD0] hover:bg-[#F3ECE0]'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <span>2 Sittings Combined</span>
                  </button>
                </div>
                <p className={`text-[11px] mt-1.5 ${isDay ? 'text-[#586C60]' : 'text-slate-500'}`}>
                  Combination of WAEC + NECO or NABTEB is acceptable.
                </p>
              </div>
            </div>

            {/* Step 3: Check off subjects with Credit (A1-C6) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className={`block text-xs font-bold uppercase tracking-wider ${
                  isDay ? 'text-[#14281E]' : 'text-slate-700'
                }`}>
                  3. Select Subjects with Credit Pass (C6 or Higher)
                </label>
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                  isDay 
                    ? 'bg-[#EBF7EE] border-[#BCE4C9] text-[#065F46]' 
                    : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {passedSubjects.length} of {CORE_SUBJECTS.length} Selected
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {CORE_SUBJECTS.map((sub) => {
                  const isChecked = passedSubjects.includes(sub.id);
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => handleToggleSubject(sub.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? isDay
                            ? 'bg-[#EBF7EE] border-[#065F46] text-[#065F46] font-bold shadow-xs'
                            : 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                          : isDay
                          ? 'bg-[#FAF7F2] border-[#E8E0D5] text-[#4A5D50] hover:border-emerald-400'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs sm:text-sm">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#065F46] border-[#065F46] text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                        <span>{sub.name}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isChecked 
                          ? isDay ? 'bg-emerald-200 text-[#065F46]' : 'bg-emerald-200 text-emerald-900' 
                          : isDay ? 'bg-[#EFE9DF] text-slate-500' : 'bg-slate-100 text-slate-400'
                      }`}>
                        {isChecked ? 'CREDIT' : 'NONE'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Evaluate Trigger Button */}
            <div className="pt-2">
              <button
                type="submit"
                id="evaluate-eligibility-btn"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#065F46] via-[#047857] to-[#065F46] hover:from-[#047857] hover:to-[#065F46] text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-950/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-emerald-300" />
                <span>Evaluate My Admission Eligibility</span>
              </button>
            </div>
          </form>

          {/* Instant Assessment Results Box */}
          {evaluated && (
            <div className={`p-6 sm:p-8 border-t animate-in fade-in slide-in-from-bottom-3 ${
              isDay ? 'bg-[#FAF7F2] text-[#14281E] border-[#E8E0D5]' : 'bg-slate-900 text-white border-slate-800'
            }`}>
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b ${
                isDay ? 'border-[#E5DDD1]' : 'border-slate-800'
              }`}>
                <div className="flex items-start gap-3.5">
                  <div className={`p-3 rounded-2xl shrink-0 ${
                    eligibilityStatus === 'qualified'
                      ? 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/40'
                      : eligibilityStatus === 'conditional'
                      ? 'bg-amber-500/20 text-amber-600 border border-amber-500/40'
                      : 'bg-rose-500/20 text-rose-600 border border-rose-500/40'
                  }`}>
                    {eligibilityStatus === 'qualified' ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : eligibilityStatus === 'conditional' ? (
                      <AlertCircle className="w-7 h-7" />
                    ) : (
                      <HelpCircle className="w-7 h-7" />
                    )}
                  </div>

                  <div>
                    <span className={`text-[11px] font-mono uppercase tracking-wider block ${
                      isDay ? 'text-[#586C60]' : 'text-slate-400'
                    }`}>
                      Evaluation Result for {selectedProgram.name}
                    </span>
                    <h3 className={`text-xl sm:text-2xl font-black font-display mt-0.5 ${
                      isDay ? 'text-[#14281E]' : 'text-white'
                    }`}>
                      {message}
                    </h3>
                    <p className={`text-xs sm:text-sm mt-1 max-w-xl ${
                      isDay ? 'text-[#3E5246]' : 'text-slate-300'
                    }`}>
                      {advice}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onApply(selectedProgram.name)}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#065F46] to-[#047857] hover:from-[#047857] hover:to-[#065F46] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/30 shrink-0 cursor-pointer transition-all hover:scale-105"
                >
                  <span>Proceed to Apply</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Requirements Comparison Breakdown */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className={`p-3.5 rounded-xl border ${
                  isDay ? 'bg-[#FFFDF9] border-[#E8E0D5]' : 'bg-slate-800/80 border-slate-700'
                }`}>
                  <span className={`block font-semibold ${isDay ? 'text-[#586C60]' : 'text-slate-400'}`}>Program Applied For</span>
                  <span className={`text-sm font-bold mt-1 block ${isDay ? 'text-[#14281E]' : 'text-white'}`}>{selectedProgram.name}</span>
                </div>
                <div className={`p-3.5 rounded-xl border ${
                  isDay ? 'bg-[#FFFDF9] border-[#E8E0D5]' : 'bg-slate-800/80 border-slate-700'
                }`}>
                  <span className={`block font-semibold ${isDay ? 'text-[#586C60]' : 'text-slate-400'}`}>Regulatory Body</span>
                  <span className={`text-sm font-bold mt-1 block ${isDay ? 'text-[#065F46]' : 'text-emerald-400'}`}>{selectedProgram.board}</span>
                </div>
                <div className={`p-3.5 rounded-xl border ${
                  isDay ? 'bg-[#FFFDF9] border-[#E8E0D5]' : 'bg-slate-800/80 border-slate-700'
                }`}>
                  <span className={`block font-semibold ${isDay ? 'text-[#586C60]' : 'text-slate-400'}`}>Physical Screening Center</span>
                  <span className={`text-sm font-bold mt-1 block ${isDay ? 'text-[#065F46]' : 'text-blue-300'}`}>Inkil Campus, Gombe Rd, Bauchi</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
