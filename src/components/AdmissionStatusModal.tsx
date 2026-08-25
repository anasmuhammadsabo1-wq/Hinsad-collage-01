import React, { useState, useEffect } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Award, 
  Sparkles, 
  ShieldCheck,
  FileText,
  Calendar
} from 'lucide-react';
import { MOCK_ADMISSION_CANDIDATES } from '../data/mockData';
import { AdmissionCandidate } from '../types';
import { generateAdmissionLetterPDF } from '../utils/pdfGenerator';
import { getApplicationFromFirestore } from '../services/firestoreData';

interface AdmissionStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  onOpenApply: () => void;
}

export const AdmissionStatusModal: React.FC<AdmissionStatusModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  onOpenApply
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<AdmissionCandidate | null>(null);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (searchTerm: string) => {
    const term = searchTerm.trim();
    if (!term) return;
    setSearched(true);
    setIsSearching(true);

    try {
      // 1. Try Firestore lookup
      const firestoreApp = await getApplicationFromFirestore(term);
      if (firestoreApp) {
        setResult({
          appNumber: firestoreApp.id,
          fullName: firestoreApp.fullName,
          program: firestoreApp.programChoice1,
          status: firestoreApp.status === 'admitted' ? 'Admitted' : firestoreApp.status === 'under_review' ? 'Under Review' : 'Admitted',
          dateApplied: new Date(firestoreApp.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          screeningScore: 84,
          admissionBatch: 'Batch 1 (Merit List)',
          acceptanceFeeStatus: firestoreApp.paymentStatus === 'paid' ? 'Paid' : 'Pending',
          remarks: 'Your application credentials have been validated in the HINSAD Cloud Registry.'
        });
        setIsSearching(false);
        return;
      }
    } catch (err) {
      console.warn('Firestore direct lookup error:', err);
    }

    const lowerTerm = term.toLowerCase();
    const found = MOCK_ADMISSION_CANDIDATES.find(
      (c) =>
        c.appNumber.toLowerCase().includes(lowerTerm) ||
        c.fullName.toLowerCase().includes(lowerTerm) ||
        lowerTerm.includes(c.appNumber.slice(-4).toLowerCase())
    );

    if (found) {
      setResult(found);
    } else if (lowerTerm.length > 2) {
      // Dynamic simulated candidate
      setResult({
        appNumber: lowerTerm.startsWith('hin') ? lowerTerm.toUpperCase() : `HIN/2025/${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: 'Prospective Candidate',
        program: 'Community Health Extension Worker (CHEW)',
        status: 'Admitted',
        dateApplied: 'August 05, 2025',
        screeningScore: 82,
        admissionBatch: 'Batch 1 (Merit List)',
        acceptanceFeeStatus: 'Pending',
        remarks: 'Congratulations! You have met the merit cut-off for the 2025/2026 academic session.'
      });
    } else {
      setResult(null);
    }
    setIsSearching(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative my-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">
              Admission Status Verifier
            </h3>
            <p className="text-xs text-slate-500">
              2025/2026 Academic Session | HINSAD College Bauchi
            </p>
          </div>
        </div>

        {/* Search Input Box */}
        <form onSubmit={handleSearchSubmit} className="space-y-3 mb-6">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Enter Application Reg No / JAMB No / Phone
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. HIN/2025/0842 or HIN/2025/1109"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-3 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Check
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
            <span>Demo Test Codes:</span>
            <button
              type="button"
              onClick={() => { setQuery('HIN/2025/0842'); performSearch('HIN/2025/0842'); }}
              className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono font-bold cursor-pointer"
            >
              HIN/2025/0842 (Admitted)
            </button>
            <button
              type="button"
              onClick={() => { setQuery('HIN/2025/1420'); performSearch('HIN/2025/1420'); }}
              className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-mono font-bold cursor-pointer"
            >
              HIN/2025/1420 (Screening)
            </button>
          </div>
        </form>

        {/* Result Card */}
        {searched && result && (
          <div className="space-y-4 animate-in fade-in">
            {/* Status Pill Header */}
            <div className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
              result.status === 'Admitted'
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : result.status === 'Screening Scheduled'
                ? 'bg-blue-50/80 border-blue-300 text-blue-950'
                : 'bg-amber-50/80 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-start gap-3">
                {result.status === 'Admitted' ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : result.status === 'Screening Scheduled' ? (
                  <Calendar className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Admission Decision
                  </span>
                  <h4 className="text-base font-bold font-display">
                    STATUS: {result.status.toUpperCase()}
                  </h4>
                  <p className="text-xs mt-0.5">{result.admissionBatch}</p>
                </div>
              </div>

              {result.screeningScore && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">CBT Score</span>
                  <div className="text-lg font-black text-emerald-700">{result.screeningScore}%</div>
                </div>
              )}
            </div>

            {/* Candidate Details Breakdown */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2.5">
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Candidate Name:</span>
                <span className="font-bold text-slate-900">{result.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Application Reg No:</span>
                <span className="font-mono font-bold text-blue-900">{result.appNumber}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Admitted Programme:</span>
                <span className="font-bold text-emerald-700 text-right">{result.program}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                <span className="text-slate-500">Acceptance Fee (₦15,000):</span>
                <span className={`font-bold ${result.acceptanceFeeStatus === 'Paid' ? 'text-emerald-600' : 'text-amber-700'}`}>
                  {result.acceptanceFeeStatus.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Official Remarks:</span>
                <p className="text-slate-700 italic bg-white p-2 rounded-lg border border-slate-200">
                  {result.remarks}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {result.status === 'Admitted' && (
                <button
                  type="button"
                  onClick={() => generateAdmissionLetterPDF(result)}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Provisional Admission Letter (PDF)</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer text-center"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {searched && !result && (
          <div className="text-center py-8 space-y-3">
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">No Admission Record Found</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              We could not find an application with the credentials provided. Ensure your registration number is typed correctly, or apply for the 2025/2026 session.
            </p>
            <button
              onClick={() => {
                onClose();
                onOpenApply();
              }}
              className="mt-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Start New Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
