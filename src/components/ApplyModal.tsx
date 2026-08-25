import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  CreditCard, 
  FileText, 
  Download, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle,
  Building,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROGRAMS, COLLEGE_INFO } from '../data/mockData';
import { ApplicationFormData } from '../types';
import { generateApplicationSlipPDF } from '../utils/pdfGenerator';
import { saveApplicationToFirestore } from '../services/firestoreData';
import { useAuth } from '../context/AuthContext';

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramName?: string;
}

const DEFAULT_SUBJECTS = [
  { subject: 'English Language', grade: 'B3' },
  { subject: 'Mathematics', grade: 'A1' },
  { subject: 'Biology', grade: 'B2' },
  { subject: 'Chemistry', grade: 'B3' },
  { subject: 'Physics', grade: 'C4' }
];

export const ApplyModal: React.FC<ApplyModalProps> = ({
  isOpen,
  onClose,
  defaultProgramName
}) => {
  const { user, profile } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<ApplicationFormData>(() => ({
    fullName: profile?.displayName || user?.displayName || '',
    email: user?.email || '',
    phone: profile?.phone || '',
    gender: 'Male',
    dateOfBirth: '2004-05-12',
    stateOfOrigin: 'Bauchi',
    lga: 'Bauchi LGA',
    address: 'Inkil Area, Bauchi',
    programChoice1: defaultProgramName || 'Community Health Extension Worker (CHEW)',
    programChoice2: 'Medical Laboratory Technician (MLT)',
    entryQualification: 'SSCE (WAEC / NECO / NABTEB)',
    olevelExam: 'WAEC',
    olevelYear: '2024',
    olevelRegNo: '4120982310',
    olevelSubjects: DEFAULT_SUBJECTS,
    uploadedFiles: {
      passport: 'uploaded_passport_photo.jpg',
      ssceResult: 'waec_result_slip.pdf',
      birthCert: 'birth_certificate.pdf',
      lgaIndigene: 'bauchi_lga_indigene.pdf'
    },
    paymentMethod: 'card',
    paymentRef: 'HIN-RRR-' + Math.floor(1000000000 + Math.random() * 9000000000)
  }));


  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubjectGradeChange = (index: number, field: 'subject' | 'grade', value: string) => {
    const updated = [...formData.olevelSubjects];
    updated[index][field] = value;
    setFormData({ ...formData, olevelSubjects: updated });
  };

  const handleSimulatePayment = async () => {
    setPaymentProcessing(true);
    const generatedAppId = `HIN-2025-${formData.paymentRef?.slice(-4) || Math.floor(1000 + Math.random() * 9000)}`;
    
    try {
      await saveApplicationToFirestore(generatedAppId, formData);
    } catch (e) {
      console.warn('Persisting locally if offline:', e);
    }

    setPaymentProcessing(false);
    setSubmitted(true);
    setCurrentStep(5);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative my-auto">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 sm:p-6 rounded-t-2xl flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-display tracking-tight text-white">
                2025/2026 Online Application Portal
              </h3>
              <p className="text-xs text-emerald-400">
                HINSAD College of Health Technology &amp; General Studies, Bauchi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {[
              { num: 1, title: 'Bio-Data' },
              { num: 2, title: "O'Level & Choices" },
              { num: 3, title: 'Uploads' },
              { num: 4, title: 'Payment (N8,500)' },
              { num: 5, title: 'Acknowledgement' },
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === step.num
                      ? 'bg-emerald-600 text-white ring-4 ring-emerald-100'
                      : currentStep > step.num
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
                </div>
                <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700 mt-1 text-center hidden sm:block">
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Form Body */}
        <div className="p-6 sm:p-8 flex-1 space-y-6">
          {/* STEP 1: BIO-DATA & CONTACT */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Please ensure your personal details match your National Identity Number (NIN) and O'Level statement of results.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Candidate Name (Surname First) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. SULEIMAN Ahmad Musa"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="candidate@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="08031234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Gender *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    State of Origin *
                  </label>
                  <input
                    type="text"
                    value={formData.stateOfOrigin}
                    onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Local Government Area (LGA) *
                  </label>
                  <input
                    type="text"
                    value={formData.lga}
                    onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Permanent Home Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: PROGRAM CHOICE & O LEVEL SUBJECTS */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    1st Choice Academic Programme *
                  </label>
                  <select
                    value={formData.programChoice1}
                    onChange={(e) => setFormData({ ...formData, programChoice1: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {PROGRAMS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.code} - {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    2nd Choice Programme (Alternative)
                  </label>
                  <select
                    value={formData.programChoice2}
                    onChange={(e) => setFormData({ ...formData, programChoice2: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    {PROGRAMS.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.code} - {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* O'Level Exam Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>O'Level (SSCE) Credentials Verification</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Exam Type</label>
                    <select
                      value={formData.olevelExam}
                      onChange={(e) => setFormData({ ...formData, olevelExam: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium"
                    >
                      <option value="WAEC">WAEC (May/June or GCE)</option>
                      <option value="NECO">NECO (SSCE or External)</option>
                      <option value="NABTEB">NABTEB (May/June)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Exam Year</label>
                    <input
                      type="text"
                      value={formData.olevelYear}
                      onChange={(e) => setFormData({ ...formData, olevelYear: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Examination Reg Number</label>
                    <input
                      type="text"
                      value={formData.olevelRegNo}
                      onChange={(e) => setFormData({ ...formData, olevelRegNo: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs font-medium"
                    />
                  </div>
                </div>

                {/* 5-Subject Grade Entry Table */}
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Core 5-Credit Subjects
                  </div>
                  {formData.olevelSubjects.map((sub, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-8">
                        <input
                          type="text"
                          value={sub.subject}
                          onChange={(e) => handleSubjectGradeChange(idx, 'subject', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-medium"
                        />
                      </div>
                      <div className="col-span-4">
                        <select
                          value={sub.grade}
                          onChange={(e) => handleSubjectGradeChange(idx, 'grade', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-emerald-800"
                        >
                          <option value="A1">A1 (Excellent)</option>
                          <option value="B2">B2 (Very Good)</option>
                          <option value="B3">B3 (Good)</option>
                          <option value="C4">C4 (Credit)</option>
                          <option value="C5">C5 (Credit)</option>
                          <option value="C6">C6 (Credit)</option>
                          <option value="D7">D7 (Pass)</option>
                          <option value="E8">E8 (Pass)</option>
                          <option value="F9">F9 (Fail)</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: DOCUMENT UPLOADS */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Supported formats: JPG, PNG, PDF (Max 2MB per file). Clean scanned copies are required for rapid verification.
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-700">
                      <Upload className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Recent Passport Photo *</h4>
                      <p className="text-[11px] text-slate-500">Red or white background (JPG/PNG)</p>
                      <span className="text-[10px] font-semibold text-emerald-600 mt-1 inline-block">
                        ✓ File attached: passport_photo.jpg
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-blue-100 text-blue-700">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">O'Level Result Statement *</h4>
                      <p className="text-[11px] text-slate-500">WAEC / NECO / NABTEB slip</p>
                      <span className="text-[10px] font-semibold text-emerald-600 mt-1 inline-block">
                        ✓ File attached: ssce_result.pdf
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-purple-100 text-purple-700">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Birth Certificate / Age Decl.</h4>
                      <p className="text-[11px] text-slate-500">National Population Commission</p>
                      <span className="text-[10px] font-semibold text-emerald-600 mt-1 inline-block">
                        ✓ File attached: birth_certificate.pdf
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-amber-100 text-amber-700">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">LGA Indigene Certificate</h4>
                      <p className="text-[11px] text-slate-500">Local Government Identification</p>
                      <span className="text-[10px] font-semibold text-emerald-600 mt-1 inline-block">
                        ✓ File attached: lga_certificate.pdf
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: APPLICATION FEE PAYMENT GATEWAY */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">
                    2025/2026 Application Form Fee
                  </span>
                  <div className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                    ₦8,500.00
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Remita Retrieval Reference (RRR): <span className="font-mono text-white">{formData.paymentRef}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Secure Payment
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">
                  Select Payment Gateway / Method:
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'card', name: 'Debit Card', desc: 'Mastercard, Visa, Verve', icon: CreditCard },
                    { id: 'transfer', name: 'Direct Bank Transfer', desc: 'Instant account transfer', icon: Building },
                    { id: 'remita', name: 'Remita / Bank Branch', desc: 'Pay at any commercial bank', icon: FileText }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        formData.paymentMethod === m.id
                          ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <m.icon className={`w-5 h-5 mb-1.5 ${formData.paymentMethod === m.id ? 'text-emerald-700' : 'text-slate-600'}`} />
                      <div className="text-xs font-bold text-slate-900">{m.name}</div>
                      <div className="text-[10px] text-slate-500">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 leading-relaxed">
                By clicking &quot;Pay ₦8,500 &amp; Submit Application&quot;, your application record will be submitted to the HINSAD Academic Registry, generating your official <strong>Application Acknowledgement Slip</strong> with entrance screening schedule.
              </div>

              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={paymentProcessing}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-700/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {paymentProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment with Bank Gateway...</span>
                  </div>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay ₦8,500 &amp; Complete Application</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 5: SUCCESS ACKNOWLEDGEMENT & PDF DOWNLOAD */}
          {currentStep === 5 && (
            <div className="text-center space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                  Application Successfully Submitted
                </span>
                <h3 className="text-2xl font-black text-slate-900 font-display mt-2">
                  Welcome to the HINSAD Academic Family!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mt-1">
                  Your admission form has been received and verified. Your Application Number is:
                </p>
                <div className="inline-block mt-2 px-4 py-1.5 rounded-lg bg-blue-50 text-blue-900 font-mono font-bold text-base border border-blue-200">
                  HIN/2025/{formData.paymentRef?.slice(-4) || '8492'}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-900">{formData.fullName || 'Candidate'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Chosen Program:</span>
                  <span className="font-bold text-emerald-700">{formData.programChoice1}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="text-slate-500">Fee Status:</span>
                  <span className="font-bold text-emerald-600">PAID (₦8,500)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Screening Venue:</span>
                  <span className="font-bold text-slate-900">Inkil Campus CBT Centre</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => generateApplicationSlipPDF(formData)}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Application Slip (PDF)</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Close &amp; Return to Home
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {currentStep < 4 && (
          <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between rounded-b-2xl">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <span>{currentStep === 3 ? 'Proceed to Payment' : 'Next Step'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
