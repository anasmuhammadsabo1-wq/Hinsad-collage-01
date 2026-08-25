import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  CreditCard, 
  HelpCircle, 
  ChevronDown, 
  FileText, 
  Search,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { ADMISSION_ROADMAP, FAQ_ITEMS, COLLEGE_INFO } from '../data/mockData';

interface AdmissionsSectionProps {
  onOpenApply: () => void;
  onOpenStatusCheck: () => void;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({
  onOpenApply,
  onOpenStatusCheck
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="py-16 sm:py-24 bg-slate-50 space-y-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            2025/2026 Academic Session
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
            Admissions Guidelines &amp; Requirements
          </h1>
          <p className="text-slate-600 text-base sm:text-lg mt-3">
            Your journey toward becoming a certified health worker starts here. Complete your registration online or visit our Inkil Campus admissions office.
          </p>
        </div>

        {/* Quick Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">General Entry Requirements</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                5 O'Level credits (WAEC, NECO, or NABTEB) in English Language, Mathematics, Biology, Chemistry, and Physics in not more than two sittings.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">Application Fee</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Non-refundable application form fee of <strong>₦8,500.00</strong> payable online via Remita, Debit Card, or Direct Bank Transfer.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display">Screening &amp; CBT Schedule</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Computer-Based Entrance Aptitude Test and oral interviews are conducted bi-weekly at the College ICT Center, Inkil Campus.
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Pathway Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900 font-display">
              The 4-Step Online Admission Process
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              From online form completion to receiving your official provisional admission letter
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADMISSION_ROADMAP.map((step, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="text-2xl font-black text-emerald-600 font-display">{step.step}</div>
                <h4 className="text-sm font-bold text-slate-900">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenApply}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Apply Online Now (2025/2026)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenStatusCheck}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4 text-emerald-600" />
              <span>Check Admission Status</span>
            </button>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-emerald-700 font-bold text-xs uppercase tracking-widest">
              Got Questions?
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-display mt-1">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-slate-50 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
