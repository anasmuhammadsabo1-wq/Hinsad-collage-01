import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck,
  Eye,
  FileCheck2
} from 'lucide-react';
import { 
  generateAcademicCalendarPDF, 
  generateProspectusPDF, 
  generateFeeSchedulePDF 
} from '../utils/pdfGenerator';

interface DownloadItem {
  id: string;
  title: string;
  category: string;
  format: string;
  size: string;
  desc: string;
  badgeColor: string;
  icon: React.ReactNode;
  downloadAction: () => void;
}

export const FastAccessDownloads: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string, action: () => void) => {
    setDownloadingId(id);
    setTimeout(() => {
      action();
      setDownloadingId(null);
    }, 600);
  };

  const DOCUMENTS: DownloadItem[] = [
    {
      id: 'calendar',
      title: '2025/2026 Academic Calendar',
      category: 'Academic Directorate',
      format: 'Official PDF',
      size: '180 KB',
      desc: 'Complete schedule of resumption dates, lecture timelines, clinical hospital postings, exams, and matriculation ceremony.',
      badgeColor: 'from-emerald-600 to-teal-700',
      icon: <Calendar className="w-6 h-6 text-emerald-300" />,
      downloadAction: generateAcademicCalendarPDF
    },
    {
      id: 'prospectus',
      title: 'Official Student Handbook & Prospectus',
      category: 'Registry & Admissions',
      format: 'Official PDF',
      size: '320 KB',
      desc: 'Comprehensive guide to college academic regulations, professional board licensing guidelines, and code of conduct.',
      badgeColor: 'from-blue-600 to-indigo-800',
      icon: <BookOpen className="w-6 h-6 text-blue-300" />,
      downloadAction: generateProspectusPDF
    },
    {
      id: 'fees',
      title: '2025/2026 Schedule of Fees & Payments',
      category: 'Bursary Department',
      format: 'Official PDF',
      size: '140 KB',
      desc: 'Itemized tuition fees, acceptance guidelines, lab consumables, indexing fees, and approved installment payment instructions.',
      badgeColor: 'from-amber-600 to-orange-700',
      icon: <CreditCard className="w-6 h-6 text-amber-300" />,
      downloadAction: generateFeeSchedulePDF
    },
    {
      id: 'requirements',
      title: 'Board Accreditation & Licensing Summary',
      category: 'Quality Assurance',
      format: 'Official PDF',
      size: '210 KB',
      desc: 'Official summary of regulatory approvals across CHPRBN, PCN, MLSCN, HRORBN, and WAHEB accreditation standards.',
      badgeColor: 'from-cyan-600 to-blue-700',
      icon: <FileCheck2 className="w-6 h-6 text-cyan-300" />,
      downloadAction: generateProspectusPDF
    }
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official College Resources &amp; Downloads</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Fast-Access Academic Documents &amp; Forms
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Download approved 2025/2026 academic schedules, student prospectuses, and bursary fee guides instantly in standard PDF format.
            </p>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {DOCUMENTS.map((doc) => {
            const isDownloading = downloadingId === doc.id;
            return (
              <div
                key={doc.id}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/40 transition-all flex flex-col justify-between group shadow-lg"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${doc.badgeColor} flex items-center justify-center shadow-md`}>
                      {doc.icon}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                      {doc.size}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                      {doc.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors font-display mt-0.5">
                      {doc.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {doc.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-700/60">
                  <button
                    onClick={() => handleDownload(doc.id, doc.downloadAction)}
                    disabled={isDownloading}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-emerald-950/30 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating PDF...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
