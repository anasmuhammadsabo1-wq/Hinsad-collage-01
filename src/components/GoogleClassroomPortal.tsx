import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Calendar, 
  Clock, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  Send, 
  GraduationCap, 
  Sparkles, 
  MessageSquare, 
  FolderPlus, 
  ChevronRight, 
  Search, 
  ShieldCheck,
  Building,
  UserCheck,
  HelpCircle,
  X
} from 'lucide-react';
import { 
  googleSignIn, 
  googleSignOut, 
  initAuth, 
  getAccessToken, 
  setAccessToken 
} from '../services/firebaseAuth';
import { 
  ClassroomCourse, 
  ClassroomCourseWork, 
  ClassroomAnnouncement, 
  ClassroomTeacher, 
  ClassroomStudent, 
  fetchClassroomCourses, 
  createClassroomCourse, 
  fetchClassroomCourseWork, 
  createClassroomAssignment, 
  fetchClassroomAnnouncements, 
  postClassroomAnnouncement, 
  fetchClassroomTeachers, 
  fetchClassroomStudents 
} from '../services/googleClassroom';
import { User } from 'firebase/auth';

interface GoogleClassroomPortalProps {
  onClose?: () => void;
}

export const GoogleClassroomPortal: React.FC<GoogleClassroomPortalProps> = ({ onClose }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getAccessToken());
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Classroom data
  const [courses, setCourses] = useState<ClassroomCourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<ClassroomCourse | null>(null);
  const [activeTab, setActiveTab] = useState<'stream' | 'classwork' | 'people'>('stream');
  
  const [courseWork, setCourseWork] = useState<ClassroomCourseWork[]>([]);
  const [announcements, setAnnouncements] = useState<ClassroomAnnouncement[]>([]);
  const [teachers, setTeachers] = useState<ClassroomTeacher[]>([]);
  const [students, setStudents] = useState<ClassroomStudent[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');

  // Modals for creating course / announcement / assignment
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseSection, setNewCourseSection] = useState('2025/2026 Academic Session');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseRoom, setNewCourseRoom] = useState('Inkil Campus, Bauchi');

  const [isCreateWorkOpen, setIsCreateWorkOpen] = useState(false);
  const [newWorkTitle, setNewWorkTitle] = useState('');
  const [newWorkDesc, setNewWorkDesc] = useState('');
  const [newWorkPoints, setNewWorkPoints] = useState<number>(100);
  const [newWorkDueDays, setNewWorkDueDays] = useState<number>(7);

  const [isCreateAnnounceOpen, setIsCreateAnnounceOpen] = useState(false);
  const [newAnnounceText, setNewAnnounceText] = useState('');

  // Confirmation Modal State (Mandatory Workspace confirmation)
  const [pendingAction, setPendingAction] = useState<{
    title: string;
    description: string;
    actionType: 'create_course' | 'create_work' | 'post_announcement';
    confirmLabel: string;
    onConfirm: () => Promise<void>;
  } | null>(null);

  // Auto-clear success message
  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(null), 5000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, cachedToken) => {
        setCurrentUser(user);
        setToken(cachedToken);
      },
      () => {
        setCurrentUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch courses on login
  useEffect(() => {
    if (token) {
      loadCourses(token);
    }
  }, [token]);

  // Fetch course details when course is selected
  useEffect(() => {
    if (token && selectedCourse) {
      loadCourseDetails(token, selectedCourse.id);
    }
  }, [token, selectedCourse]);

  const loadCourses = async (authToken: string) => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const list = await fetchClassroomCourses(authToken);
      setCourses(list);
      if (list.length > 0 && !selectedCourse) {
        setSelectedCourse(list[0]);
      }
    } catch (err: any) {
      console.error('Error fetching courses:', err);
      setErrorMsg(err.message || 'Unable to load courses from Google Classroom.');
    } finally {
      setLoading(false);
    }
  };

  const loadCourseDetails = async (authToken: string, courseId: string) => {
    setLoadingDetails(true);
    try {
      const [cwList, annList, tList, sList] = await Promise.all([
        fetchClassroomCourseWork(authToken, courseId).catch(() => []),
        fetchClassroomAnnouncements(authToken, courseId).catch(() => []),
        fetchClassroomTeachers(authToken, courseId).catch(() => []),
        fetchClassroomStudents(authToken, courseId).catch(() => [])
      ]);
      setCourseWork(cwList);
      setAnnouncements(annList);
      setTeachers(tList);
      setStudents(sList);
    } catch (err: any) {
      console.error('Error loading course details:', err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setErrorMsg(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setCurrentUser(res.user);
        setToken(res.accessToken);
        setAccessToken(res.accessToken);
        setSuccessMsg(`Welcome, ${res.user.displayName || res.user.email}! Google Classroom connected.`);
        await loadCourses(res.accessToken);
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      setErrorMsg(err.message || 'Sign in with Google was cancelled or failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSignOut = async () => {
    await googleSignOut();
    setCurrentUser(null);
    setToken(null);
    setCourses([]);
    setSelectedCourse(null);
    setSuccessMsg('You have been signed out from Google Classroom.');
  };

  // --- Handlers with User Confirmation ---

  const handleRequestCreateCourse = () => {
    if (!newCourseName.trim()) {
      setErrorMsg('Please provide a course title.');
      return;
    }

    setPendingAction({
      title: `Create Classroom Course: "${newCourseName}"`,
      description: `This will create a new live Google Classroom course titled "${newCourseName}" (${newCourseSection}) under your Google Workspace account. Students and faculty will be able to join using the generated class code.`,
      actionType: 'create_course',
      confirmLabel: 'Confirm & Create Course',
      onConfirm: async () => {
        if (!token) return;
        setLoading(true);
        try {
          const created = await createClassroomCourse(token, {
            name: newCourseName.trim(),
            section: newCourseSection.trim(),
            description: newCourseDesc.trim(),
            room: newCourseRoom.trim(),
          });
          setSuccessMsg(`Successfully created Google Classroom course: ${created.name}`);
          setIsCreateCourseOpen(false);
          setNewCourseName('');
          setNewCourseDesc('');
          await loadCourses(token);
          setSelectedCourse(created);
        } catch (err: any) {
          setErrorMsg(err.message || 'Failed to create course. Ensure your Google account has teacher privileges in Classroom.');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleRequestCreateWork = () => {
    if (!selectedCourse || !token) return;
    if (!newWorkTitle.trim()) {
      setErrorMsg('Please specify an assignment title.');
      return;
    }

    const today = new Date();
    const dueDate = new Date(today.getTime() + (newWorkDueDays * 24 * 60 * 60 * 1000));

    setPendingAction({
      title: `Publish Assignment to "${selectedCourse.name}"`,
      description: `You are about to publish the assignment "${newWorkTitle}" worth ${newWorkPoints} points with a due date set to ${dueDate.toLocaleDateString()}. Enrolled students will receive notifications in their Google Classroom stream.`,
      actionType: 'create_work',
      confirmLabel: 'Publish Assignment',
      onConfirm: async () => {
        setLoading(true);
        try {
          await createClassroomAssignment(token, selectedCourse.id, {
            title: newWorkTitle.trim(),
            description: newWorkDesc.trim(),
            maxPoints: newWorkPoints,
            dueDate: {
              year: dueDate.getFullYear(),
              month: dueDate.getMonth() + 1,
              day: dueDate.getDate()
            }
          });
          setSuccessMsg(`Assignment "${newWorkTitle}" published successfully!`);
          setIsCreateWorkOpen(false);
          setNewWorkTitle('');
          setNewWorkDesc('');
          await loadCourseDetails(token, selectedCourse.id);
        } catch (err: any) {
          setErrorMsg(err.message || 'Failed to create assignment in Classroom.');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleRequestPostAnnouncement = () => {
    if (!selectedCourse || !token) return;
    if (!newAnnounceText.trim()) {
      setErrorMsg('Please enter the announcement content.');
      return;
    }

    setPendingAction({
      title: `Post Announcement to "${selectedCourse.name}" Stream`,
      description: `This announcement will be immediately visible to all students and instructors in ${selectedCourse.name}: "${newAnnounceText.slice(0, 100)}${newAnnounceText.length > 100 ? '...' : ''}"`,
      actionType: 'post_announcement',
      confirmLabel: 'Post Announcement',
      onConfirm: async () => {
        setLoading(true);
        try {
          await postClassroomAnnouncement(token, selectedCourse.id, newAnnounceText.trim());
          setSuccessMsg('Announcement posted to Google Classroom stream!');
          setIsCreateAnnounceOpen(false);
          setNewAnnounceText('');
          await loadCourseDetails(token, selectedCourse.id);
        } catch (err: any) {
          setErrorMsg(err.message || 'Failed to post announcement.');
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.section && c.section.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl border border-slate-800 shadow-2xl overflow-hidden relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner & Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-blue-700 flex items-center justify-center text-white shadow-xl shadow-emerald-950/50 shrink-0">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Google Classroom Academic Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              HINSAD E-Learning &amp; Classroom Portal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Synchronized course streams, clinical assignments, lecture materials, and rosters.
            </p>
          </div>
        </div>

        {/* User Auth Info / Controls */}
        <div className="flex items-center gap-3">
          {currentUser && token ? (
            <div className="flex items-center gap-3 bg-slate-800/90 border border-slate-700/80 px-3.5 py-2 rounded-2xl">
              {currentUser.photoURL ? (
                <img 
                  src={currentUser.photoURL} 
                  alt={currentUser.displayName || 'User'} 
                  className="w-9 h-9 rounded-full ring-2 ring-emerald-500"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-sm">
                  {(currentUser.displayName || currentUser.email || 'U')[0].toUpperCase()}
                </div>
              )}
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">
                  {currentUser.displayName || 'Faculty / Student'}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono block">
                  {currentUser.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="p-2 rounded-xl bg-slate-700/80 hover:bg-rose-600/80 text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
              {/* Official Google Sign-In Styled Button per Workspace Guidelines */}
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-3 transition-all cursor-pointer border border-slate-300 disabled:opacity-50 hover:scale-105 active:scale-95"
              >
                {/* Official Google 4-Color Logo SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
                <span>{isLoggingIn ? 'Connecting...' : 'Sign in with Google Classroom'}</span>
              </button>
            </div>
          )}

          {onClose && (
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-rose-950/80 border border-rose-600/50 text-rose-200 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-rose-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="mx-6 mt-4 p-3.5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Unauthenticated Landing State */}
      {!currentUser || !token ? (
        <div className="p-8 sm:p-14 text-center max-w-2xl mx-auto space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl">
            <BookOpen className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
              Connect Your Google Workspace &amp; Classroom Account
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sign in with your Google account to access your official HINSAD course materials, submit clinical assignments, track grades, and engage with lecturers in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                <FileText className="w-4 h-4" />
                <span>Coursework &amp; Tasks</span>
              </div>
              <p className="text-[11px] text-slate-400">
                View homework, laboratory reports, and clinical quiz deadlines.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Announcements</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Stay updated with departmental notices and lecture schedule changes.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-xs mb-1">
                <Users className="w-4 h-4" />
                <span>Class Rosters</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Interact with licensed course lecturers and your fellow student peers.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col items-center gap-3">
            <button
              onClick={handleSignIn}
              disabled={isLoggingIn}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 hover:from-emerald-400 hover:to-blue-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/50 hover:scale-105 transition-all cursor-pointer flex items-center gap-3"
            >
              <svg className="w-5 h-5 bg-white rounded-full p-0.5 shrink-0" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
              <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in to Google Classroom'}</span>
            </button>
            <p className="text-[11px] text-slate-500">
              Access is secured via official Google OAuth 2.0 API with explicit user permissions.
            </p>
          </div>
        </div>
      ) : (
        /* Authenticated Main Workspace Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          
          {/* Left Sidebar: Course Selection & Management */}
          <div className="lg:col-span-4 bg-slate-950/90 border-r border-slate-800 p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header & Create Button */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    My Classes ({courses.length})
                  </h3>
                  <span className="text-[11px] text-slate-400 font-normal">Active Classroom Sync</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => token && loadCourses(token)}
                    title="Refresh Courses"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                  <button
                    onClick={() => setIsCreateCourseOpen(true)}
                    className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Create Course</span>
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search class or course code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Course Cards List */}
              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {filteredCourses.map((c) => {
                  const isSelected = selectedCourse?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCourse(c)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-950/50'
                          : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/80 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {c.section || '2025/2026 Session'}
                          </span>
                          <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mt-1 font-display leading-tight line-clamp-1">
                            {c.name}
                          </h4>
                          {c.room && (
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              Room: {c.room}
                            </p>
                          )}
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-600'}`} />
                      </div>

                      {c.enrollmentCode && (
                        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                          <span className="text-slate-400 font-mono">Code: <strong className="text-emerald-400">{c.enrollmentCode}</strong></span>
                          {c.alternateLink && (
                            <a
                              href={c.alternateLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <span>Google Classroom</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}

                {filteredCourses.length === 0 && !loading && (
                  <div className="p-6 text-center bg-slate-900/50 rounded-2xl border border-slate-800">
                    <BookOpen className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <p className="text-xs text-slate-400 font-medium">No courses found in this Google account.</p>
                    <button
                      onClick={() => setIsCreateCourseOpen(true)}
                      className="mt-3 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                    >
                      + Create First Course
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Quick External Link */}
            <div className="pt-3 border-t border-slate-800/80">
              <a
                href="https://classroom.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-slate-800 transition-colors"
              >
                <span>Open Google Classroom Web App</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Right Main Pane: Active Course Details */}
          <div className="lg:col-span-8 p-6 space-y-6 flex flex-col justify-between">
            {selectedCourse ? (
              <div className="space-y-6">
                
                {/* Course Header Banner */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-blue-950 border border-emerald-500/30 relative overflow-hidden shadow-xl">
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 text-white text-[11px] font-mono">
                        <span>{selectedCourse.section || '2025/2026 Session'}</span>
                        {selectedCourse.enrollmentCode && (
                          <span>• Code: <strong>{selectedCourse.enrollmentCode}</strong></span>
                        )}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                        {selectedCourse.name}
                      </h3>
                      {selectedCourse.description && (
                        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-xl">
                          {selectedCourse.description}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {selectedCourse.alternateLink && (
                        <a
                          href={selectedCourse.alternateLink}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-md transition-colors flex items-center gap-1.5"
                        >
                          <span>Open in Classroom</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Tabs (Stream, Classwork, People) */}
                <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                  <button
                    onClick={() => setActiveTab('stream')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'stream'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Stream &amp; Notices ({announcements.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('classwork')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'classwork'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Classwork &amp; Tasks ({courseWork.length})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('people')}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                      activeTab === 'people'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Class Roster ({teachers.length + students.length})</span>
                  </button>
                </div>

                {/* Tab 1: Stream & Announcements */}
                {activeTab === 'stream' && (
                  <div className="space-y-4">
                    {/* Share with Class Trigger Box */}
                    <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-slate-300 font-medium">
                          Announce something to your class...
                        </span>
                      </div>
                      <button
                        onClick={() => setIsCreateAnnounceOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Post Announcement</span>
                      </button>
                    </div>

                    {/* Announcements Feed */}
                    <div className="space-y-3">
                      {announcements.map((ann) => (
                        <div
                          key={ann.id}
                          className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/70 hover:border-slate-600 transition-all space-y-2"
                        >
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="font-semibold text-emerald-400">Instructor Announcement</span>
                            <span>{ann.creationTime ? new Date(ann.creationTime).toLocaleDateString() : 'Active'}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
                            {ann.text}
                          </p>
                        </div>
                      ))}

                      {announcements.length === 0 && !loadingDetails && (
                        <div className="p-8 text-center bg-slate-800/30 rounded-2xl border border-slate-700">
                          <MessageSquare className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="text-xs text-slate-400">No announcements posted yet for this class.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 2: Classwork & Assignments */}
                {activeTab === 'classwork' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Assignments &amp; Clinical Submissions
                      </span>
                      <button
                        onClick={() => setIsCreateWorkOpen(true)}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create Assignment</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {courseWork.map((work) => (
                        <div
                          key={work.id}
                          className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 hover:border-emerald-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-start gap-3.5">
                            <div className="p-2.5 rounded-xl bg-blue-900/40 text-blue-400 border border-blue-500/20 shrink-0">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-white font-display">
                                {work.title}
                              </h4>
                              {work.description && (
                                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                                  {work.description}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 pt-1">
                                {work.maxPoints && (
                                  <span className="text-emerald-400 font-semibold">
                                    {work.maxPoints} Points
                                  </span>
                                )}
                                {work.dueDate && (
                                  <span className="flex items-center gap-1 text-amber-400">
                                    <Calendar className="w-3 h-3" />
                                    Due: {work.dueDate.day}/{work.dueDate.month}/{work.dueDate.year}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {work.alternateLink && (
                            <a
                              href={work.alternateLink}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-2 rounded-xl bg-slate-700 hover:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shrink-0"
                            >
                              <span>View Work</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}

                      {courseWork.length === 0 && !loadingDetails && (
                        <div className="p-8 text-center bg-slate-800/30 rounded-2xl border border-slate-700">
                          <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="text-xs text-slate-400">No active assignments published in this class yet.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab 3: People / Roster */}
                {activeTab === 'people' && (
                  <div className="space-y-6">
                    {/* Teachers */}
                    <div>
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                        Lecturers &amp; Clinical Instructors ({teachers.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {teachers.map((t) => (
                          <div
                            key={t.userId}
                            className="p-3.5 rounded-2xl bg-slate-800/70 border border-slate-700 flex items-center gap-3"
                          >
                            {t.profile?.photoUrl ? (
                              <img
                                src={t.profile.photoUrl}
                                alt={t.profile.name?.fullName || 'Teacher'}
                                className="w-9 h-9 rounded-full ring-2 ring-emerald-500"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-xs text-white">
                                {(t.profile?.name?.fullName || 'L')[0]}
                              </div>
                            )}
                            <div>
                              <span className="text-xs font-bold text-white block">
                                {t.profile?.name?.fullName || 'Course Lecturer'}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono block">
                                {t.profile?.emailAddress || 'Verified Instructor'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Students */}
                    <div>
                      <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-3">
                        Enrolled Students ({students.length})
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                        {students.map((s) => (
                          <div
                            key={s.userId}
                            className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/60 flex items-center gap-3"
                          >
                            {s.profile?.photoUrl ? (
                              <img
                                src={s.profile.photoUrl}
                                alt={s.profile.name?.fullName || 'Student'}
                                className="w-8 h-8 rounded-full"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white">
                                {(s.profile?.name?.fullName || 'S')[0]}
                              </div>
                            )}
                            <div>
                              <span className="text-xs font-bold text-white block">
                                {s.profile?.name?.fullName || 'Student'}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono block">
                                {s.profile?.emailAddress || 'Enrolled'}
                              </span>
                            </div>
                          </div>
                        ))}

                        {students.length === 0 && (
                          <div className="col-span-2 p-6 text-center bg-slate-800/20 rounded-2xl border border-slate-700">
                            <Users className="w-6 h-6 text-slate-600 mx-auto mb-1" />
                            <p className="text-xs text-slate-400">Share enrollment code <strong>{selectedCourse.enrollmentCode || 'N/A'}</strong> with students to join.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-12 text-center my-auto">
                <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white">Select a course to view details</h4>
                <p className="text-xs text-slate-400 mt-1">Choose a class from the left sidebar to manage coursework and stream notices.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* --- CREATE COURSE MODAL --- */}
      {isCreateCourseOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <FolderPlus className="w-5 h-5" />
                <span>Create Google Classroom Course</span>
              </div>
              <button
                onClick={() => setIsCreateCourseOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Course Title *</label>
                <input
                  type="text"
                  placeholder="e.g. CHEW 201: Community Health Clinical Practice"
                  value={newCourseName}
                  onChange={(e) => setNewCourseName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Academic Section</label>
                <input
                  type="text"
                  placeholder="2025/2026 Academic Session"
                  value={newCourseSection}
                  onChange={(e) => setNewCourseSection(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Room / Campus</label>
                <input
                  type="text"
                  placeholder="Inkil Campus, Bauchi"
                  value={newCourseRoom}
                  onChange={(e) => setNewCourseRoom(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Course overview, syllabus objectives, and clinical laboratory guidelines..."
                  value={newCourseDesc}
                  onChange={(e) => setNewCourseDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsCreateCourseOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestCreateCourse}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all"
              >
                Proceed to Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CREATE ASSIGNMENT MODAL --- */}
      {isCreateWorkOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <FileText className="w-5 h-5" />
                <span>Create Assignment in {selectedCourse.name}</span>
              </div>
              <button
                onClick={() => setIsCreateWorkOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Clinical Logbook Case Study 1"
                  value={newWorkTitle}
                  onChange={(e) => setNewWorkTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Max Points</label>
                  <input
                    type="number"
                    value={newWorkPoints}
                    onChange={(e) => setNewWorkPoints(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Due In (Days)</label>
                  <input
                    type="number"
                    value={newWorkDueDays}
                    onChange={(e) => setNewWorkDueDays(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Instructions / Description</label>
                <textarea
                  rows={4}
                  placeholder="Detail instructions, required reference materials, submission format..."
                  value={newWorkDesc}
                  onChange={(e) => setNewWorkDesc(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsCreateWorkOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestCreateWork}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all"
              >
                Proceed to Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- CREATE ANNOUNCEMENT MODAL --- */}
      {isCreateAnnounceOpen && selectedCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <MessageSquare className="w-5 h-5" />
                <span>Post Class Announcement</span>
              </div>
              <button
                onClick={() => setIsCreateAnnounceOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Announcement Message *</label>
                <textarea
                  rows={5}
                  placeholder="Share updates, lecture room schedule, laboratory preparation reminders..."
                  value={newAnnounceText}
                  onChange={(e) => setNewAnnounceText(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setIsCreateAnnounceOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestPostAnnouncement}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold cursor-pointer transition-all"
              >
                Proceed to Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MANDATORY WORKSPACE CONFIRMATION DIALOG --- */}
      {pendingAction && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider">
                  User Confirmation Required
                </span>
                <h3 className="text-lg font-black text-white font-display">
                  {pendingAction.title}
                </h3>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 leading-relaxed">
              {pendingAction.description}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                onClick={() => setPendingAction(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  const action = pendingAction;
                  setPendingAction(null);
                  await action.onConfirm();
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs shadow-lg shadow-emerald-950/50 transition-all cursor-pointer"
              >
                {pendingAction.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
