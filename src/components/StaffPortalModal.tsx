import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Upload, 
  Bell, 
  LogOut, 
  Sparkles,
  FileCheck2,
  Save,
  Plus
} from 'lucide-react';

interface StaffPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenClassroom?: () => void;
}

export const StaffPortalModal: React.FC<StaffPortalModalProps> = ({
  isOpen,
  onClose,
  onOpenClassroom,
}) => {
  const [staffId, setStaffId] = useState('STAFF/HT/019');
  const [password, setPassword] = useState('••••••••');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<'grading' | 'students' | 'broadcast'>('grading');
  
  // Sample grading table
  const [studentGrades, setStudentGrades] = useState([
    { id: '1', matricNo: 'HIN/CHEW/2023/042', name: 'Fatima Abubakar Garba', caScore: 28, examScore: 54, grade: 'A' },
    { id: '2', matricNo: 'HIN/CHEW/2023/045', name: 'Umar Farouq Yakubu', caScore: 24, examScore: 48, grade: 'A' },
    { id: '3', matricNo: 'HIN/CHEW/2023/051', name: 'Zainab Bello Inkil', caScore: 22, examScore: 45, grade: 'B' },
    { id: '4', matricNo: 'HIN/CHEW/2023/058', name: 'Kabir Danladi Bauchi', caScore: 19, examScore: 42, grade: 'B' },
    { id: '5', matricNo: 'HIN/CHEW/2023/062', name: 'Amina Sani Mohammed', caScore: 26, examScore: 50, grade: 'A' }
  ]);

  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleScoreChange = (index: number, field: 'caScore' | 'examScore', val: number) => {
    const updated = [...studentGrades];
    updated[index][field] = val;
    const total = updated[index].caScore + updated[index].examScore;
    let calculatedGrade = 'F';
    if (total >= 70) calculatedGrade = 'A';
    else if (total >= 60) calculatedGrade = 'B';
    else if (total >= 50) calculatedGrade = 'C';
    else if (total >= 45) calculatedGrade = 'D';
    else if (total >= 40) calculatedGrade = 'E';
    updated[index].grade = calculatedGrade;
    setStudentGrades(updated);
    setSavedSuccess(false);
  };

  const handleSaveGrades = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col relative my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 sm:p-6 rounded-t-2xl flex items-center justify-between sticky top-0 z-20 shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold">
              <Lock className="w-5 h-5 text-blue-200" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-display tracking-tight text-white">
                HINSAD Staff &amp; Faculty E-Portal
              </h3>
              <p className="text-xs text-blue-300">
                Departmental Grading, Course Allocation &amp; Student Registers
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
              <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mx-auto mb-2">
                <Lock className="w-7 h-7" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 font-display">
                Staff &amp; Lecturer Login
              </h4>
              <p className="text-xs text-slate-500">
                Enter your College Staff ID and portal access pin
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Staff ID Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. STAFF/HT/019"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs shadow-md cursor-pointer transition-all"
              >
                Access Faculty Portal
              </button>
            </form>
          </div>
        ) : (
          /* LOGGED IN VIEW */
          <div className="p-6 sm:p-8 space-y-6 animate-in fade-in">
            {/* Lecturer Bio card */}
            <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-display">
                    Dr. Aminu Haruna, FWACP
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white">
                    Senior Clinical Lecturer
                  </span>
                </div>
                <div className="text-xs text-slate-300 mt-0.5">
                  Staff ID: <strong>STAFF/HT/019</strong> | Dept: Community Health Sciences
                </div>
                <div className="text-xs text-emerald-300 mt-0.5">
                  Allocated Course: <strong>CHE 321 - Maternal Health &amp; Obstetric Care (300L)</strong>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold">Session</span>
                <div className="text-xs font-bold text-white">2024/2025 (2nd Semester)</div>
              </div>
            </div>

            {/* Sub-nav */}
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('grading')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
                    activeTab === 'grading' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <FileCheck2 className="w-3.5 h-3.5" />
                  <span>Continuous Assessment &amp; Grade Entry</span>
                </button>
                <button
                  onClick={() => setActiveTab('students')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
                    activeTab === 'students' ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Class Register (42 Students)</span>
                </button>
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

            {/* GRADING TAB */}
            {activeTab === 'grading' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <div>
                    <h4 className="text-xs font-bold text-blue-900">
                      Score Sheet: CHE 321 (Maternal Health Care)
                    </h4>
                    <p className="text-[11px] text-blue-700">
                      CA Max: 30 Marks | Exam Max: 70 Marks | Total: 100 Marks
                    </p>
                  </div>

                  <button
                    onClick={handleSaveGrades}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Commit &amp; Submit Grades to Dean</span>
                  </button>
                </div>

                {savedSuccess && (
                  <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Scores successfully committed and locked for Academic Board verification!</span>
                  </div>
                )}

                <div className="rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900 text-white font-bold uppercase text-[10px]">
                      <tr>
                        <th className="p-3">Matric No</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3 text-center">CA (/30)</th>
                        <th className="p-3 text-center">Exam (/70)</th>
                        <th className="p-3 text-center">Total (/100)</th>
                        <th className="p-3 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {studentGrades.map((s, idx) => (
                        <tr key={s.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-900">{s.matricNo}</td>
                          <td className="p-3 font-medium text-slate-800">{s.name}</td>
                          <td className="p-3 text-center">
                            <input
                              type="number"
                              min="0"
                              max="30"
                              value={s.caScore}
                              onChange={(e) => handleScoreChange(idx, 'caScore', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 rounded bg-slate-50 border border-slate-300 text-center font-bold text-xs"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <input
                              type="number"
                              min="0"
                              max="70"
                              value={s.examScore}
                              onChange={(e) => handleScoreChange(idx, 'examScore', parseInt(e.target.value) || 0)}
                              className="w-16 px-2 py-1 rounded bg-slate-50 border border-slate-300 text-center font-bold text-xs"
                            />
                          </td>
                          <td className="p-3 text-center font-bold text-slate-900">
                            {s.caScore + s.examScore}%
                          </td>
                          <td className="p-3 text-center font-black text-emerald-700">
                            {s.grade}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* STUDENTS REGISTER TAB */}
            {activeTab === 'students' && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900">Class Attendance &amp; Clinical Logbooks</div>
                <p className="text-slate-600">
                  42 students currently registered for CHE 321. 100% active in hospital clinical rotations at Bauchi Specialist Hospital.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
