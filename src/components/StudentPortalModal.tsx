import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  BookOpen, 
  Award, 
  CreditCard, 
  Calendar, 
  Download, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  Sparkles,
  ShieldCheck,
  FileCheck2,
  AlertCircle,
  PlusCircle
} from 'lucide-react';
import { MOCK_STUDENTS } from '../data/mockData';
import { StudentResult } from '../types';
import { generateResultTranscriptPDF } from '../utils/pdfGenerator';

interface StudentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenClassroom?: () => void;
}

export const StudentPortalModal: React.FC<StudentPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenClassroom,
}) => {
  const [matricInput, setMatricInput] = useState('HIN/CHEW/2023/042');
  const [passwordInput, setPasswordInput] = useState('••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'courses' | 'fees' | 'timetable'>('results');
  const [currentStudent, setCurrentStudent] = useState<StudentResult>(MOCK_STUDENTS[0]);

  // Course registration state
  const [registeredCourses, setRegisteredCourses] = useState([
    { code: 'CHE 321', title: 'Maternal Health & Advanced Obstetric Care', units: 4, registered: true },
    { code: 'CHE 322', title: 'Epidemiological Surveillance & Disease Outbreak', units: 3, registered: true },
    { code: 'CHE 323', title: 'PHC Administration & Personnel Supervision', units: 2, registered: true },
    { code: 'CHE 324', title: 'Comprehensive Clinical Practicum & Rural Posting', units: 6, registered: true },
    { code: 'CHE 325', title: 'Health Research Project & Community Defense', units: 4, registered: true },
    { code: 'GNS 301', title: 'Health Entrepreneurship & Leadership', units: 2, registered: false }
  ]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_STUDENTS.find(s => s.matricNo.toLowerCase().includes(matricInput.toLowerCase()));
    if (found) {
      setCurrentStudent(found);
    }
    setIsLoggedIn(true);
  };

  const handleQuickLogin = (matric: string) => {
    setMatricInput(matric);
    const found = MOCK_STUDENTS.find(s => s.matricNo === matric);
    if (found) setCurrentStudent(found);
    setIsLoggedIn(true);
  };

  const toggleCourseReg = (index: number) => {
    const updated = [...registeredCourses];
    updated[index].registered = !updated[index].registered;
    setRegisteredCourses(updated);
  };

  const totalRegisteredUnits = registeredCourses
    .filter(c => c.registered)
    .reduce((sum, c) => sum + c.units, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative my-auto">
        {/* Portal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-5 sm:p-6 rounded-t-2xl flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold">
              <UserCheck className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-display tracking-tight text-white">
                HINSAD Student E-Portal Dashboard
              </h3>
              <p className="text-xs text-emerald-400">
                Academic Records, Course Registration &amp; Fee Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isLoggedIn && (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold border border-red-500/30 flex items-center gap-1 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {!isLoggedIn ? (
          /* LOGIN VIEW */
          <div className="p-6 sm:p-10 max-w-md mx-auto w-full space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                <UserCheck className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-display">
                Sign in to Student Portal
              </h4>
              <p className="text-xs text-slate-500">
                Enter your College Matriculation / Registration Number
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Matriculation / Reg Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HIN/CHEW/2023/042"
                  value={matricInput}
                  onChange={(e) => setMatricInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Portal Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md cursor-pointer transition-all"
              >
                Access Student Dashboard
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-500 block">
                Quick Demo Student Logins:
              </span>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('HIN/CHEW/2023/042')}
                  className="text-left px-3 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-medium transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>Fatima A. Garba (CHEW 300L)</span>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">CGPA: 3.82</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickLogin('HIN/MLT/2023/118')}
                  className="text-left px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-900 text-xs font-medium transition-colors cursor-pointer flex items-center justify-between"
                >
                  <span>Ibrahim S. Mohammed (MLT 200L)</span>
                  <span className="font-mono text-[10px] text-blue-700 font-bold">CGPA: 3.45</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* LOGGED IN DASHBOARD */
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in">
            {/* Student Bio Summary Card */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 sm:p-6 rounded-2xl border border-slate-800 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center text-emerald-300 font-black text-xl">
                  {currentStudent.studentName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white font-display">
                      {currentStudent.studentName}
                    </h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950">
                      Active Student
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono mt-0.5">
                    Matric No: {currentStudent.matricNo}
                  </div>
                  <div className="text-xs text-emerald-300 font-medium">
                    {currentStudent.program} ({currentStudent.level})
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-6 w-full md:w-auto justify-between md:justify-end">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Semester GPA</span>
                  <div className="text-xl font-black text-emerald-400 font-mono">
                    {currentStudent.gpa.toFixed(2)}
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Cumulative CGPA</span>
                  <div className="text-xl font-black text-blue-400 font-mono">
                    {currentStudent.cgpa.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Tabs */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                {[
                  { id: 'results', label: 'Semester Results & Transcript', icon: Award },
                  { id: 'courses', label: 'Course Registration', icon: BookOpen },
                  { id: 'fees', label: 'Tuition & Fee Receipts', icon: CreditCard },
                  { id: 'timetable', label: 'Lectures & Clinical Posting', icon: Calendar },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <tab.icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>

              {onOpenClassroom && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenClassroom();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold shrink-0 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Google Classroom</span>
                </button>
              )}
            </div>

            {/* TAB CONTENT 1: RESULTS */}
            {activeTab === 'results' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {currentStudent.session} - {currentStudent.semester}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Official grades approved by the College Academic Board
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => generateResultTranscriptPDF(currentStudent)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Official Transcript (PDF)</span>
                  </button>
                </div>

                {/* Course Grade Table */}
                <div className="rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-white uppercase text-[10px] font-bold">
                      <tr>
                        <th className="p-3">Course Code</th>
                        <th className="p-3">Course Title</th>
                        <th className="p-3 text-center">Units</th>
                        <th className="p-3 text-center">Score</th>
                        <th className="p-3 text-center">Grade</th>
                        <th className="p-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      {currentStudent.courses.map((c, i) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900">{c.code}</td>
                          <td className="p-3 text-slate-700">{c.title}</td>
                          <td className="p-3 text-center text-slate-600">{c.unit}</td>
                          <td className="p-3 text-center font-bold text-slate-800">{c.score}%</td>
                          <td className="p-3 text-center font-black text-emerald-700">{c.grade}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              {c.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900">
                  <strong>Academic Standing:</strong> {currentStudent.remarks}
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: COURSE REGISTRATION */}
            {activeTab === 'courses' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div>
                    <h4 className="text-xs font-bold text-blue-900">
                      2025/2026 First Semester Course Enrolment
                    </h4>
                    <p className="text-[11px] text-blue-700">
                      Maximum credit load limit: 24 Units. Current: <strong>{totalRegisteredUnits} Units</strong>
                    </p>
                  </div>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white">
                    Approved by HOD
                  </span>
                </div>

                <div className="space-y-2">
                  {registeredCourses.map((c, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        c.registered ? 'bg-white border-emerald-300' : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={c.registered}
                          onChange={() => toggleCourseReg(idx)}
                          className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500 cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{c.code}: {c.title}</div>
                          <div className="text-[11px] text-slate-500">{c.units} Credit Units</div>
                        </div>
                      </div>

                      <span className={`text-[11px] font-bold ${c.registered ? 'text-emerald-700' : 'text-slate-400'}`}>
                        {c.registered ? 'Enrolled' : 'Not Enrolled'}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Course registration slip for ${totalRegisteredUnits} units successfully saved and submitted to Departmental Coordinator!`)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md cursor-pointer transition-all"
                >
                  Save &amp; Print Course Registration Form ({totalRegisteredUnits} Units)
                </button>
              </div>
            )}

            {/* TAB CONTENT 3: FEE RECEIPTS */}
            {activeTab === 'fees' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Total Session Tuition</span>
                    <div className="text-lg font-black text-slate-900 mt-1">₦95,000.00</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Amount Paid</span>
                    <div className="text-lg font-black text-emerald-700 mt-1">₦95,000.00</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Outstanding Balance</span>
                    <div className="text-lg font-black text-emerald-600 mt-1">₦0.00 (Nil)</div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold">
                      <tr>
                        <th className="p-3">Receipt RRR</th>
                        <th className="p-3">Payment Description</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="p-3 font-mono font-bold text-blue-900">RRR-2490-1182</td>
                        <td className="p-3 font-medium">First &amp; Second Semester School Fees</td>
                        <td className="p-3 text-slate-500">12 Jan 2025</td>
                        <td className="p-3 font-bold text-emerald-700">₦95,000.00</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => alert("Official e-Receipt downloaded.")}
                            className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold cursor-pointer"
                          >
                            Print Receipt
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: LECTURES & CLINICAL POSTINGS */}
            {activeTab === 'timetable' && (
              <div className="space-y-4">
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950">
                  <strong>Hospital Clinical Rotation:</strong> Bauchi State Specialist Hospital (Maternal Health &amp; Diagnostic Ward B). Supervisor: Dr. Aliyu K.
                </div>

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-white font-bold text-[10px] uppercase">
                      <tr>
                        <th className="p-3">Day</th>
                        <th className="p-3">Time</th>
                        <th className="p-3">Course / Lab Practicum</th>
                        <th className="p-3">Venue</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Monday</td>
                        <td className="p-3 text-slate-600">8:00 AM – 10:00 AM</td>
                        <td className="p-3 text-slate-800">CHE 321: Obstetric Care &amp; Skills</td>
                        <td className="p-3">Clinical Skills Lab 2</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Tuesday</td>
                        <td className="p-3 text-slate-600">10:00 AM – 1:00 PM</td>
                        <td className="p-3 text-slate-800">CHE 324: Hospital Clinical Rotation</td>
                        <td className="p-3">State Specialist Hospital</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-slate-900">Thursday</td>
                        <td className="p-3 text-slate-600">11:00 AM – 1:00 PM</td>
                        <td className="p-3 text-slate-800">CHE 322: Disease Outbreak Surveillance</td>
                        <td className="p-3">Lecture Hall A</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
