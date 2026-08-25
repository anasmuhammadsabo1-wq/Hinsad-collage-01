import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  UserCheck, 
  GraduationCap, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles,
  ShieldAlert,
  FileCheck2,
  Lock,
  Search,
  ExternalLink,
  BookOpen,
  LogIn,
  UserPlus,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Briefcase
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/mockData';
import { TabType } from '../types';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenApply: () => void;
  onOpenStatusCheck: () => void;
  onOpenStudentPortal: () => void;
  onOpenStaffPortal: () => void;
  onOpenResultChecker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenApply,
  onOpenStatusCheck,
  onOpenStudentPortal,
  onOpenStaffPortal,
  onOpenResultChecker,
}) => {
  const { isDay } = useTheme();
  const { user, profile, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalDropdownOpen, setPortalDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; tab: TabType; icon?: string }[] = [
    { label: 'Home', tab: 'home' },
    { label: 'About Us', tab: 'about' },
    { label: 'Academic Programs', tab: 'programs' },
    { label: 'Admissions', tab: 'admissions' },
    { label: 'Google Classroom', tab: 'classroom' },
    { label: 'Campus Life', tab: 'campus' },
    { label: 'News & Events', tab: 'news' },
    { label: 'Contact Us', tab: 'contact' },
  ];

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'admin':
        return { label: 'Administrator', bg: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-300' };
      case 'staff':
        return { label: 'Staff / Faculty', bg: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-300' };
      case 'student':
        return { label: 'Enrolled Student', bg: 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border-teal-300' };
      default:
        return { label: 'Applicant', bg: 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-300' };
    }
  };

  const roleInfo = getRoleBadge(profile?.role);


  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Quick-Link Notification & Contact Bar */}
      <div className="bg-gradient-to-r from-slate-950 via-[#07241A] to-slate-950 text-white text-xs py-2 px-4 border-b border-emerald-900/50 hidden md:block">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          {/* Location and Contact */}
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Inkil Unguwan Magaji, Gombe Road, Bauchi State</span>
            </span>
            <div className="h-3.5 w-px bg-slate-700 hidden lg:block" />
            <a 
              href={`tel:${COLLEGE_INFO.phone1}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COLLEGE_INFO.phone1} / {COLLEGE_INFO.phone2}</span>
            </a>
            <div className="h-3.5 w-px bg-slate-700 hidden lg:block" />
            <a 
              href={`mailto:${COLLEGE_INFO.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{COLLEGE_INFO.email}</span>
            </a>
          </div>

          {/* Quick Access Portal Badges + Theme Switch */}
          <div className="flex items-center gap-2">
            <ThemeToggle variant="topbar" />

            <div className="h-3.5 w-px bg-slate-700 mx-1" />

            <button
              id="top-classroom-btn"
              onClick={() => {
                setActiveTab('classroom');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-2.5 py-1 rounded bg-teal-500/20 hover:bg-teal-500/35 text-teal-200 text-xs font-bold border border-teal-400/40 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3 h-3 text-teal-300" />
              <span>Google Classroom</span>
            </button>

            <button
              id="top-check-status-btn"
              onClick={onOpenStatusCheck}
              className="px-2.5 py-1 rounded bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 text-xs font-medium border border-emerald-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Search className="w-3 h-3 text-emerald-400" />
              <span>Check Admission Status</span>
            </button>

            <button
              id="top-verify-result-btn"
              onClick={onOpenResultChecker}
              className="px-2.5 py-1 rounded bg-blue-500/15 hover:bg-blue-500/25 text-blue-300 text-xs font-medium border border-blue-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <FileCheck2 className="w-3 h-3 text-blue-400" />
              <span>Verify Results</span>
            </button>

            <div className="h-3.5 w-px bg-slate-700 mx-1" />

            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700">
                  <div className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-[10px] font-bold text-white">
                    {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="text-slate-200 text-xs font-bold truncate max-w-[120px]">
                    {profile?.displayName || user.email?.split('@')[0]}
                  </span>
                  <span className={`text-[9px] px-1 rounded font-bold ${roleInfo.bg}`}>
                    {roleInfo.label.split(' ')[0]}
                  </span>
                </div>
                <button
                  id="top-logout-btn"
                  onClick={logout}
                  className="text-slate-400 hover:text-red-400 text-xs flex items-center gap-1 cursor-pointer transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="top-login-btn"
                  onClick={() => openAuthModal('login')}
                  className="text-slate-200 hover:text-emerald-400 flex items-center gap-1 cursor-pointer font-bold transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sign In</span>
                </button>
                <span className="text-slate-600">•</span>
                <button
                  id="top-register-btn"
                  onClick={() => openAuthModal('register')}
                  className="text-emerald-300 hover:text-white flex items-center gap-1 cursor-pointer font-medium transition-colors"
                >
                  <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? isDay
            ? 'bg-[#FCFAF6]/95 backdrop-blur-md shadow-md border-b border-[#E7E0D2] py-3'
            : 'bg-[#0B1118]/95 backdrop-blur-md shadow-md border-b border-slate-800 py-3'
          : isDay
            ? 'bg-[#FAF7F2] border-b border-[#EAE4D8] py-4'
            : 'bg-[#0F172A] border-b border-slate-800 py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & College Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('home')}
          >
            {/* High-Tech Medical Emblem */}
            <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-xl bg-gradient-to-br from-[#065F46] via-[#047857] to-[#064E3B] flex items-center justify-center shadow-md shadow-emerald-900/20 text-white relative overflow-hidden group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3),transparent_70%)]" />
              <div className="flex flex-col items-center justify-center text-center leading-none">
                <GraduationCap className="w-6 h-6 text-emerald-200 drop-shadow" />
                <span className="text-[9px] font-black tracking-widest text-emerald-100 mt-0.5">HINSAD</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`font-extrabold text-base sm:text-lg tracking-tight font-display ${
                  isDay ? 'text-[#14281E]' : 'text-slate-100'
                }`}>
                  HINSAD <span className="text-[#065F46] dark:text-emerald-400 font-black">COLLEGE</span>
                </span>
                <span className={`hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                  isDay ? 'bg-[#E6F4EA] text-[#065F46] border border-[#A7F3D0]' : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                }`}>
                  Bauchi
                </span>
              </div>
              <span className={`text-[11px] sm:text-xs font-semibold line-clamp-1 ${
                isDay ? 'text-[#4B6356]' : 'text-slate-400'
              }`}>
                Health Technology &amp; General Studies
              </span>
              <span className={`text-[10px] font-medium italic ${
                isDay ? 'text-[#065F46]' : 'text-emerald-400'
              }`}>
                "{COLLEGE_INFO.motto}"
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.tab}
                id={`nav-link-${link.tab}`}
                onClick={() => {
                  setActiveTab(link.tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === link.tab
                    ? isDay
                      ? 'text-[#065F46] bg-[#ECFDF5] border border-[#A7F3D0]/60 shadow-xs font-bold'
                      : 'text-emerald-300 bg-emerald-950/70 border border-emerald-800/60 shadow-xs font-bold'
                    : isDay
                      ? 'text-[#233A2D] hover:text-[#065F46] hover:bg-[#F2ECE1]'
                      : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* E-Portal Mega Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setPortalDropdownOpen(true)}
              onMouseLeave={() => setPortalDropdownOpen(false)}
            >
              <button
                id="eportal-dropdown-btn"
                className={`px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isDay
                    ? 'text-[#233A2D] hover:text-[#065F46] hover:bg-[#F2ECE1]'
                    : 'text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-1 font-bold text-[#065F46] dark:text-emerald-400">
                  <BookOpen className="w-4 h-4" />
                  E-Portal
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#065F46] dark:text-emerald-400 transition-transform ${portalDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {portalDropdownOpen && (
                <div className={`absolute right-0 mt-1 w-64 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 border ${
                  isDay 
                    ? 'bg-[#FCFAF6] border-[#E5DED0] shadow-emerald-950/10' 
                    : 'bg-[#121A23] border-slate-700 shadow-black/50'
                }`}>
                  <div className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider ${
                    isDay ? 'text-[#637C70]' : 'text-slate-400'
                  }`}>
                    Official College Portals
                  </div>

                  <button
                    id="drop-classroom-portal"
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      setActiveTab('classroom');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer border-b ${
                      isDay
                        ? 'hover:bg-[#F3EFE6] border-[#EFE9DF]'
                        : 'hover:bg-slate-800 border-slate-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold flex items-center gap-1.5 ${
                        isDay ? 'text-[#14281E]' : 'text-slate-100'
                      }`}>
                        <span>Google Classroom</span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-teal-100 text-teal-800 font-bold rounded">Live</span>
                      </div>
                      <div className={`text-[11px] ${isDay ? 'text-[#5B7367]' : 'text-slate-400'}`}>
                        Live coursework, stream &amp; rosters
                      </div>
                    </div>
                  </button>
                  
                  <button
                    id="drop-student-portal"
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      onOpenStudentPortal();
                    }}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer border-b ${
                      isDay
                        ? 'hover:bg-[#F3EFE6] border-[#EFE9DF]'
                        : 'hover:bg-slate-800 border-slate-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                      <UserCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDay ? 'text-[#14281E]' : 'text-slate-100'}`}>
                        Student Dashboard
                      </div>
                      <div className={`text-[11px] ${isDay ? 'text-[#5B7367]' : 'text-slate-400'}`}>
                        Course reg, results &amp; fees
                      </div>
                    </div>
                  </button>

                  <button
                    id="drop-staff-portal"
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      onOpenStaffPortal();
                    }}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer border-b ${
                      isDay
                        ? 'hover:bg-[#F3EFE6] border-[#EFE9DF]'
                        : 'hover:bg-slate-800 border-slate-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDay ? 'text-[#14281E]' : 'text-slate-100'}`}>
                        Staff &amp; Lecturer Login
                      </div>
                      <div className={`text-[11px] ${isDay ? 'text-[#5B7367]' : 'text-slate-400'}`}>
                        Grades, attendance &amp; notes
                      </div>
                    </div>
                  </button>

                  <button
                    id="drop-verify-result"
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      onOpenResultChecker();
                    }}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer border-b ${
                      isDay
                        ? 'hover:bg-[#F3EFE6] border-[#EFE9DF]'
                        : 'hover:bg-slate-800 border-slate-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDay ? 'text-[#14281E]' : 'text-slate-100'}`}>
                        Verify Transcript / Result
                      </div>
                      <div className={`text-[11px] ${isDay ? 'text-[#5B7367]' : 'text-slate-400'}`}>
                        PIN verification for employers
                      </div>
                    </div>
                  </button>

                  <button
                    id="drop-check-status"
                    onClick={() => {
                      setPortalDropdownOpen(false);
                      onOpenStatusCheck();
                    }}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                      isDay ? 'hover:bg-[#F3EFE6]' : 'hover:bg-slate-800'
                    }`}
                  >
                    <div className="p-1.5 rounded-lg bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                      <Search className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-xs font-bold ${isDay ? 'text-[#14281E]' : 'text-slate-100'}`}>
                        Admission Status Checker
                      </div>
                      <div className={`text-[11px] ${isDay ? 'text-[#5B7367]' : 'text-slate-400'}`}>
                        Instant provisional letter
                      </div>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Header Action: Day/Night Theme Toggle + Auth Button + Apply Button */}
          <div className="hidden sm:flex items-center gap-3">
            <ThemeToggle variant="header" />

            {user ? (
              <div 
                className="relative"
                onMouseEnter={() => setUserDropdownOpen(true)}
                onMouseLeave={() => setUserDropdownOpen(false)}
              >
                <button
                  id="user-account-dropdown-btn"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border cursor-pointer ${
                    isDay
                      ? 'bg-[#FCFAF6] hover:bg-[#F2ECE1] border-[#E5DED0] text-[#14281E] shadow-xs'
                      : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white shadow-xs'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#065F46] to-[#059669] text-white flex items-center justify-center text-[11px] font-extrabold shadow-xs">
                    {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="text-left hidden xl:block">
                    <div className="text-xs font-bold leading-tight truncate max-w-[100px]">
                      {profile?.displayName?.split(' ')[0] || 'My Account'}
                    </div>
                    <div className={`text-[9px] font-semibold ${isDay ? 'text-[#5B7367]' : 'text-slate-400'}`}>
                      {roleInfo.label.split(' ')[0]}
                    </div>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {userDropdownOpen && (
                  <div className={`absolute right-0 mt-1 w-64 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 border ${
                    isDay 
                      ? 'bg-[#FCFAF6] border-[#E5DED0] shadow-emerald-950/10' 
                      : 'bg-[#121A23] border-slate-700 shadow-black/50'
                  }`}>
                    {/* User Profile Card in dropdown */}
                    <div className={`px-4 py-3 border-b ${isDay ? 'border-[#EFE9DF]' : 'border-slate-800'}`}>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-[#065F46] text-white flex items-center justify-center text-sm font-bold shadow-xs">
                          {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div className="overflow-hidden">
                          <div className={`text-xs font-bold truncate ${isDay ? 'text-[#14281E]' : 'text-slate-100'}`}>
                            {profile?.displayName || 'College User'}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold border ${roleInfo.bg}`}>
                          {roleInfo.label}
                        </span>
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenStudentPortal();
                        }}
                        className={`w-full px-4 py-2 text-xs font-medium flex items-center gap-2.5 text-left transition-colors cursor-pointer ${
                          isDay ? 'hover:bg-[#F3EFE6] text-[#14281E]' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <UserCheck className="w-4 h-4 text-[#065F46] dark:text-emerald-400" />
                        <span>Student Dashboard</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setActiveTab('classroom');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-full px-4 py-2 text-xs font-medium flex items-center gap-2.5 text-left transition-colors cursor-pointer ${
                          isDay ? 'hover:bg-[#F3EFE6] text-[#14281E]' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span>Google Classroom</span>
                      </button>

                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onOpenResultChecker();
                        }}
                        className={`w-full px-4 py-2 text-xs font-medium flex items-center gap-2.5 text-left transition-colors cursor-pointer ${
                          isDay ? 'hover:bg-[#F3EFE6] text-[#14281E]' : 'hover:bg-slate-800 text-slate-200'
                        }`}
                      >
                        <FileCheck2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span>Verify Credentials</span>
                      </button>
                    </div>

                    {/* Sign Out Button */}
                    <div className={`pt-1 border-t ${isDay ? 'border-[#EFE9DF]' : 'border-slate-800'}`}>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          logout();
                        }}
                        className={`w-full px-4 py-2 text-xs font-bold flex items-center gap-2.5 text-left text-red-600 dark:text-red-400 transition-colors cursor-pointer ${
                          isDay ? 'hover:bg-red-50' : 'hover:bg-red-950/40'
                        }`}
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="nav-signin-btn"
                onClick={() => openAuthModal('login')}
                className={`px-3.5 py-2.5 rounded-xl font-bold text-xs border transition-all flex items-center gap-1.5 cursor-pointer ${
                  isDay
                    ? 'bg-white hover:bg-[#F2ECE1] border-[#DCD3C5] text-[#065F46] shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-emerald-300 shadow-xs'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            <button
              id="nav-apply-now-btn"
              onClick={onOpenApply}
              className="relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#065F46] via-[#047857] to-[#059669] hover:from-[#047857] hover:to-[#059669] text-white font-bold text-sm shadow-md shadow-emerald-900/20 hover:shadow-emerald-700/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
              <span>Apply Online 2025/2026</span>
              <span className="w-2 h-2 rounded-full bg-lime-300 animate-ping" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle variant="topbar" className="!flex" />

            {user ? (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center cursor-pointer shadow-xs sm:hidden"
              >
                {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
              </button>
            ) : (
              <button
                id="mobile-signin-btn-quick"
                onClick={() => openAuthModal('login')}
                className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold sm:hidden cursor-pointer"
              >
                Sign In
              </button>
            )}

            <button
              id="mobile-apply-btn-quick"
              onClick={onOpenApply}
              className="px-3 py-1.5 rounded-lg bg-[#065F46] text-white text-xs font-bold shadow-sm sm:hidden cursor-pointer"
            >
              Apply
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg focus:outline-none cursor-pointer ${
                isDay ? 'text-[#14281E] hover:bg-[#F2ECE1]' : 'text-slate-200 hover:bg-slate-800'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className={`lg:hidden border-t px-4 pt-3 pb-6 space-y-3 shadow-xl ${
            isDay ? 'bg-[#FCFAF6] border-[#E7E0D2]' : 'bg-[#0F172A] border-slate-800'
          }`}>
            <div className="pb-2">
              <ThemeToggle variant="mobile" />
            </div>

            {/* Mobile User Profile or Login Trigger */}
            {user ? (
              <div className={`p-3 rounded-xl border flex items-center justify-between ${
                isDay ? 'bg-[#FAF7F2] border-[#EAE4D8]' : 'bg-slate-800/80 border-slate-700'
              }`}>
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <div className="w-9 h-9 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold shrink-0">
                    {profile?.displayName?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="overflow-hidden">
                    <div className={`text-xs font-bold truncate ${isDay ? 'text-[#14281E]' : 'text-slate-100'}`}>
                      {profile?.displayName || 'User'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {user.email}
                    </div>
                    <span className={`inline-block mt-0.5 text-[9px] px-1.5 py-0.2 rounded font-bold ${roleInfo.bg}`}>
                      {roleInfo.label}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pb-2">
                <button
                  id="mobile-nav-signin-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('login');
                  }}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                    isDay 
                      ? 'bg-white border-[#DCD3C5] text-[#065F46]' 
                      : 'bg-slate-800 border-slate-700 text-emerald-300'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  id="mobile-nav-register-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openAuthModal('register');
                  }}
                  className="py-2 px-3 rounded-lg bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}


            <div className={`grid grid-cols-2 gap-2 pb-3 border-b ${
              isDay ? 'border-[#EAE4D8]' : 'border-slate-800'
            }`}>
              <button
                id="mobile-nav-apply-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenApply();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-[#065F46] hover:bg-[#047857] text-white font-bold text-xs text-center flex items-center justify-center gap-1 shadow-sm cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Apply Online
              </button>
              <button
                id="mobile-nav-status-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStatusCheck();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 font-bold text-xs text-center flex items-center justify-center gap-1 shadow-sm cursor-pointer"
              >
                <Search className="w-3.5 h-3.5" />
                Check Admission
              </button>
            </div>

            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.tab}
                  onClick={() => {
                    setActiveTab(link.tab);
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                    activeTab === link.tab
                      ? isDay
                        ? 'bg-[#ECFDF5] text-[#065F46] font-bold border border-[#A7F3D0]'
                        : 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-800'
                      : isDay
                        ? 'text-[#1B3529] hover:bg-[#F2ECE1]'
                        : 'text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className={`pt-3 border-t space-y-2 ${
              isDay ? 'border-[#EAE4D8]' : 'border-slate-800'
            }`}>
              <div className={`text-xs font-bold uppercase tracking-wider px-3 ${
                isDay ? 'text-[#637C70]' : 'text-slate-400'
              }`}>
                Portals &amp; Verification
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStudentPortal();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer ${
                  isDay ? 'text-[#1B3529] hover:bg-[#F2ECE1]' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <UserCheck className="w-4 h-4 text-[#065F46] dark:text-emerald-400" />
                Student E-Portal Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStaffPortal();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer ${
                  isDay ? 'text-[#1B3529] hover:bg-[#F2ECE1]' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Staff / Lecturer Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResultChecker();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-2 cursor-pointer ${
                  isDay ? 'text-[#1B3529] hover:bg-[#F2ECE1]' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <FileCheck2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                Online Result &amp; Transcript Checker
              </button>
            </div>

            <div className={`pt-3 border-t text-xs space-y-1 ${
              isDay ? 'border-[#EAE4D8] text-[#5B7367]' : 'border-slate-800 text-slate-400'
            }`}>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#065F46] dark:text-emerald-400" />
                <span>Inkil Unguwan Magaji Gombe Road Bauchi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#065F46] dark:text-emerald-400" />
                <span>{COLLEGE_INFO.phone1} / {COLLEGE_INFO.phone2}</span>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
