import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  GraduationCap, 
  UserCheck, 
  Briefcase, 
  LogIn, 
  UserPlus, 
  KeyRound,
  Check,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { UserRole } from '../types';
import { COLLEGE_INFO } from '../data/mockData';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    setAuthModalMode, 
    roleHint,
    loginWithEmail, 
    registerWithEmail, 
    loginWithGoogle,
    resetPassword 
  } = useAuth();
  const { isDay } = useTheme();

  // Mode: 'login' | 'register' | 'forgot'
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(authModalMode);
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form States
  const [registerFullName, setRegisterFullName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>(roleHint || 'applicant');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Status & Error
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Keep internal mode in sync with context
  useEffect(() => {
    setMode(authModalMode);
    setErrorMessage(null);
    setSuccessMessage(null);
    setForgotSuccess(false);
  }, [authModalMode, isAuthModalOpen]);

  useEffect(() => {
    if (roleHint) {
      setRegisterRole(roleHint);
    }
  }, [roleHint]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  // Password strength calculation
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1: return { score: 1, label: 'Weak', color: 'bg-red-500' };
      case 2: return { score: 2, label: 'Fair', color: 'bg-amber-500' };
      case 3: return { score: 3, label: 'Good', color: 'bg-emerald-500' };
      case 4: return { score: 4, label: 'Strong', color: 'bg-emerald-600' };
      default: return { score: 0, label: 'Weak', color: 'bg-red-400' };
    }
  };

  const strength = calculatePasswordStrength(registerPassword);

  // Handle Login Submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!loginPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    try {
      setLoading(true);
      await loginWithEmail(loginEmail, loginPassword);
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Register Submit
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!registerFullName.trim()) {
      setErrorMessage('Please enter your full name as it appears on official credentials.');
      return;
    }
    if (!registerEmail.trim()) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (registerPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (registerPassword !== registerConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }
    if (!agreeTerms) {
      setErrorMessage('Please accept the College Terms of Service & Privacy Policy.');
      return;
    }

    try {
      setLoading(true);
      await registerWithEmail(
        registerEmail, 
        registerPassword, 
        registerFullName, 
        registerRole, 
        registerPhone
      );
    } catch (err: any) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Auth
  const handleGoogleAuth = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      setGoogleLoading(true);
      await loginWithGoogle();
    } catch (err: any) {
      if (err.message && !err.message.includes('closed')) {
        setErrorMessage(err.message || 'Google authentication failed.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // Handle Password Reset Submit
  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!forgotEmail.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(forgotEmail);
      setForgotSuccess(true);
      setSuccessMessage(`Password reset link has been dispatched to ${forgotEmail}. Please check your inbox.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send reset link. Please verify your email.');
    } finally {
      setLoading(false);
    }
  };

  // Quick Demo Account Auto-Fill
  const handleDemoFill = (email: string, pass: string) => {
    setLoginEmail(email);
    setLoginPassword(pass);
    setErrorMessage(null);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeAuthModal();
      }}
    >
      <div 
        className={`w-full max-w-lg rounded-2xl shadow-2xl border overflow-hidden flex flex-col relative my-auto transition-all duration-300 ${
          isDay 
            ? 'bg-[#FFFDF9] border-[#E8E0D5] text-[#14281E]' 
            : 'bg-[#0F172A] border-slate-800 text-slate-100'
        }`}
      >
        {/* Modal Top Banner */}
        <div className={`p-6 pb-5 relative border-b flex items-start justify-between ${
          isDay 
            ? 'bg-gradient-to-r from-[#FAF7F2] via-[#F2ECE1] to-[#FAF7F2] border-[#E8E0D5]' 
            : 'bg-gradient-to-r from-slate-900 via-[#0C1B16] to-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#065F46] to-[#047857] p-2 flex items-center justify-center shadow-md text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                  isDay 
                    ? 'bg-[#EBF7EE] border-[#BCE4C9] text-[#065F46]' 
                    : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
                }`}>
                  HINSAD Portal
                </span>
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h2 className="text-lg sm:text-xl font-black font-display tracking-tight mt-0.5">
                {mode === 'login' && 'Sign In to Your Account'}
                {mode === 'register' && 'Create College Account'}
                {mode === 'forgot' && 'Reset Portal Password'}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-auth-modal"
            onClick={closeAuthModal}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              isDay 
                ? 'hover:bg-[#E8E0D2] text-[#4A5D50]' 
                : 'hover:bg-slate-800 text-slate-400 hover:text-white'
            }`}
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher (Login / Register) */}
        {mode !== 'forgot' && (
          <div className={`p-2 px-6 border-b flex gap-2 ${
            isDay ? 'bg-[#FAF7F2] border-[#E8E0D5]' : 'bg-slate-900/60 border-slate-800'
          }`}>
            <button
              id="tab-btn-signin"
              onClick={() => {
                setMode('login');
                setAuthModalMode('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'login'
                  ? isDay
                    ? 'bg-[#065F46] text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                  : isDay
                    ? 'text-[#4A5D50] hover:bg-[#F2ECE1]'
                    : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              id="tab-btn-register"
              onClick={() => {
                setMode('register');
                setAuthModalMode('register');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'register'
                  ? isDay
                    ? 'bg-[#065F46] text-white shadow-xs'
                    : 'bg-emerald-600 text-white shadow-xs'
                  : isDay
                    ? 'text-[#4A5D50] hover:bg-[#F2ECE1]'
                    : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>
        )}

        {/* Modal Body Container */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {/* Alerts / Error Messages */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start gap-2.5 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="font-medium leading-relaxed">{errorMessage}</div>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <div className="font-medium leading-relaxed">{successMessage}</div>
            </div>
          )}

          {/* GOOGLE SIGN IN BUTTON */}
          {mode !== 'forgot' && (
            <div className="mb-5">
              <button
                id="btn-google-auth"
                type="button"
                onClick={handleGoogleAuth}
                disabled={googleLoading || loading}
                className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-xs ${
                  isDay 
                    ? 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-slate-200/50' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-white shadow-black/40'
                }`}
              >
                {/* SVG Google Logo */}
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>
                  {googleLoading 
                    ? 'Connecting to Google...' 
                    : mode === 'login' 
                      ? 'Sign In with Google Account' 
                      : 'Sign Up with Google Account'
                  }
                </span>
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDay ? 'border-[#E8E0D5]' : 'border-slate-800'}`} />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase">
                  <span className={`px-2 font-bold tracking-wider ${
                    isDay ? 'bg-[#FFFDF9] text-[#7B9585]' : 'bg-[#0F172A] text-slate-500'
                  }`}>
                    Or continue with email
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 1. SIGN IN FORM */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${
                  isDay ? 'text-[#14281E]' : 'text-slate-200'
                }`}>
                  Email Address or Portal ID
                </label>
                <div className="relative">
                  <input
                    id="input-login-email"
                    type="email"
                    required
                    placeholder="e.g. candidate@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                      isDay 
                        ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                        : 'bg-slate-800/80 border-slate-700 text-white focus:ring-emerald-500'
                    }`}
                  />
                  <Mail className={`w-4 h-4 absolute left-3 top-3 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={`text-xs font-bold ${
                    isDay ? 'text-[#14281E]' : 'text-slate-200'
                  }`}>
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setAuthModalMode('forgot');
                      setErrorMessage(null);
                    }}
                    className={`text-[11px] font-semibold hover:underline cursor-pointer ${
                      isDay ? 'text-[#065F46]' : 'text-emerald-400'
                    }`}
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    id="input-login-password"
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your secret password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={`w-full pl-9 pr-10 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                      isDay 
                        ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                        : 'bg-slate-800/80 border-slate-700 text-white focus:ring-emerald-500'
                    }`}
                  />
                  <Lock className={`w-4 h-4 absolute left-3 top-3 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className={`absolute right-3 top-3 cursor-pointer ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    id="chk-remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#065F46] focus:ring-[#065F46] accent-[#065F46]"
                  />
                  <span className={isDay ? 'text-[#4A5D50]' : 'text-slate-400'}>
                    Keep me signed in on this device
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                id="btn-submit-signin"
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#065F46] via-[#047857] to-[#059669] hover:from-[#047857] hover:to-[#065F46] text-white font-bold text-xs shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing in to portal...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Demo Account Switchers */}
              <div className={`mt-6 pt-4 border-t ${isDay ? 'border-[#E8E0D5]' : 'border-slate-800'}`}>
                <div className={`text-[11px] font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5 ${
                  isDay ? 'text-[#7B9585]' : 'text-slate-400'
                }`}>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Instant Test Accounts (Click to load):</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleDemoFill('candidate.amina@hinsad.edu.ng', 'Pass123456')}
                    className={`p-2 rounded-lg text-left text-[11px] border transition-all cursor-pointer ${
                      isDay 
                        ? 'bg-[#FAF7F2] hover:bg-[#F2ECE1] border-[#E8E0D5]' 
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                      <GraduationCap className="w-3 h-3" />
                      <span>Applicant</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">candidate.amina@...</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoFill('student.ibrahim@hinsad.edu.ng', 'Pass123456')}
                    className={`p-2 rounded-lg text-left text-[11px] border transition-all cursor-pointer ${
                      isDay 
                        ? 'bg-[#FAF7F2] hover:bg-[#F2ECE1] border-[#E8E0D5]' 
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1 text-teal-600 dark:text-teal-400">
                      <UserCheck className="w-3 h-3" />
                      <span>Enrolled Student</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">student.ibrahim@...</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoFill('lecturer.dr.kabiru@hinsad.edu.ng', 'Pass123456')}
                    className={`p-2 rounded-lg text-left text-[11px] border transition-all cursor-pointer ${
                      isDay 
                        ? 'bg-[#FAF7F2] hover:bg-[#F2ECE1] border-[#E8E0D5]' 
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1 text-blue-600 dark:text-blue-400">
                      <Briefcase className="w-3 h-3" />
                      <span>Staff / Lecturer</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">lecturer.kabiru@...</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDemoFill('ANASMUHAMMADSABO1@gmail.com', 'Pass123456')}
                    className={`p-2 rounded-lg text-left text-[11px] border transition-all cursor-pointer ${
                      isDay 
                        ? 'bg-[#FAF7F2] hover:bg-[#F2ECE1] border-[#E8E0D5]' 
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1 text-purple-600 dark:text-purple-400">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Admin Officer</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">ANASMUHAMMAD...</div>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${
                  isDay ? 'text-[#14281E]' : 'text-slate-200'
                }`}>
                  Full Legal Name (Surname, First &amp; Middle)
                </label>
                <div className="relative">
                  <input
                    id="input-register-fullname"
                    type="text"
                    required
                    placeholder="e.g. Fatima Bello Mohammed"
                    value={registerFullName}
                    onChange={(e) => setRegisterFullName(e.target.value)}
                    className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                      isDay 
                        ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                        : 'bg-slate-800/80 border-slate-700 text-white focus:ring-emerald-500'
                    }`}
                  />
                  <User className={`w-4 h-4 absolute left-3 top-3 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDay ? 'text-[#14281E]' : 'text-slate-200'
                  }`}>
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="input-register-email"
                      type="email"
                      required
                      placeholder="e.g. fatima@gmail.com"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                        isDay 
                          ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                          : 'bg-slate-800/80 border-slate-700 text-white focus:ring-emerald-500'
                      }`}
                    />
                    <Mail className={`w-4 h-4 absolute left-3 top-3 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDay ? 'text-[#14281E]' : 'text-slate-200'
                  }`}>
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      id="input-register-phone"
                      type="tel"
                      placeholder="e.g. 0803 123 4567"
                      value={registerPhone}
                      onChange={(e) => setRegisterPhone(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                        isDay 
                          ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                          : 'bg-slate-800/80 border-slate-700 text-white focus:ring-emerald-500'
                      }`}
                    />
                    <Phone className={`w-4 h-4 absolute left-3 top-3 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
                  </div>
                </div>
              </div>

              {/* Account Type / Role Selector */}
              <div>
                <label className={`block text-xs font-bold mb-1.5 ${
                  isDay ? 'text-[#14281E]' : 'text-slate-200'
                }`}>
                  Select Your Account Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setRegisterRole('applicant')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      registerRole === 'applicant'
                        ? isDay
                          ? 'bg-[#EBF7EE] border-[#065F46] text-[#065F46] ring-1 ring-[#065F46]'
                          : 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : isDay
                          ? 'bg-[#FAF7F2] border-[#E8E0D5] text-[#33463B] hover:bg-[#F2ECE1]'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <GraduationCap className="w-4 h-4 mb-1 text-emerald-600" />
                    <div className="text-xs font-bold">Applicant</div>
                    <div className="text-[10px] opacity-75">Prospective</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegisterRole('student')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      registerRole === 'student'
                        ? isDay
                          ? 'bg-[#EBF7EE] border-[#065F46] text-[#065F46] ring-1 ring-[#065F46]'
                          : 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : isDay
                          ? 'bg-[#FAF7F2] border-[#E8E0D5] text-[#33463B] hover:bg-[#F2ECE1]'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <UserCheck className="w-4 h-4 mb-1 text-teal-600" />
                    <div className="text-xs font-bold">Student</div>
                    <div className="text-[10px] opacity-75">Enrolled</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegisterRole('staff')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      registerRole === 'staff'
                        ? isDay
                          ? 'bg-[#EBF7EE] border-[#065F46] text-[#065F46] ring-1 ring-[#065F46]'
                          : 'bg-emerald-950/60 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500'
                        : isDay
                          ? 'bg-[#FAF7F2] border-[#E8E0D5] text-[#33463B] hover:bg-[#F2ECE1]'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Briefcase className="w-4 h-4 mb-1 text-blue-600" />
                    <div className="text-xs font-bold">Staff / Faculty</div>
                    <div className="text-[10px] opacity-75">Lecturer</div>
                  </button>
                </div>
              </div>

              {/* Password and Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDay ? 'text-[#14281E]' : 'text-slate-200'
                  }`}>
                    Create Password
                  </label>
                  <div className="relative">
                    <input
                      id="input-register-password"
                      type={showRegisterPassword ? 'text' : 'password'}
                      required
                      placeholder="Min 6 characters"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      className={`w-full pl-9 pr-10 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                        isDay 
                          ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                          : 'bg-slate-800/80 border-slate-700 text-white focus:ring-emerald-500'
                      }`}
                    />
                    <Lock className={`w-4 h-4 absolute left-3 top-3 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className={`absolute right-3 top-3 cursor-pointer ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`}
                    >
                      {showRegisterPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className={`block text-xs font-bold mb-1.5 ${
                    isDay ? 'text-[#14281E]' : 'text-slate-200'
                  }`}>
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="input-register-confirm-password"
                      type={showRegisterPassword ? 'text' : 'password'}
                      required
                      placeholder="Re-enter password"
                      value={registerConfirmPassword}
                      onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                      className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                        isDay 
                          ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                          : 'bg-slate-800/80 border-slate-700 text-white focus:ring-emerald-500'
                      }`}
                    />
                    <Lock className={`w-4 h-4 absolute left-3 top-3 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
                  </div>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {registerPassword && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className={isDay ? 'text-[#5B7367]' : 'text-slate-400'}>
                      Password Strength:
                    </span>
                    <span className="font-bold">{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 1 ? strength.color : 'bg-transparent'} w-1/4`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 2 ? strength.color : 'bg-transparent'} w-1/4`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 3 ? strength.color : 'bg-transparent'} w-1/4`} />
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.score >= 4 ? strength.color : 'bg-transparent'} w-1/4`} />
                  </div>
                </div>
              )}

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-xs">
                  <input
                    id="chk-agree-terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#065F46] focus:ring-[#065F46] accent-[#065F46] shrink-0"
                  />
                  <span className={`leading-relaxed ${isDay ? 'text-[#4A5D50]' : 'text-slate-400'}`}>
                    I agree to the HINSAD College Admissions Code of Conduct, Academic Regulations, and Data Privacy Policy.
                  </span>
                </label>
              </div>

              {/* Submit Register Button */}
              <button
                id="btn-submit-register"
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#065F46] via-[#047857] to-[#059669] hover:from-[#047857] hover:to-[#065F46] text-white font-bold text-xs shadow-md shadow-emerald-950/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Creating account...</span>
                  </div>
                ) : (
                  <>
                    <span>Create Account &amp; Proceed</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* 3. FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              <p className={`text-xs leading-relaxed ${isDay ? 'text-[#4A5D50]' : 'text-slate-400'}`}>
                Enter your registered email address below. We will send a secure password reset link directly to your inbox.
              </p>

              {!forgotSuccess ? (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-xs font-bold mb-1.5 ${
                      isDay ? 'text-[#14281E]' : 'text-slate-200'
                    }`}>
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <input
                        id="input-forgot-email"
                        type="email"
                        required
                        placeholder="e.g. yourname@example.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 border transition-all ${
                          isDay 
                            ? 'bg-[#FAF7F2] border-[#E2DAD0] text-[#14281E] focus:ring-[#065F46]' 
                            : 'bg-slate-800/80 border-slate-700 text-white focus:ring-emerald-500'
                        }`}
                      />
                      <Mail className={`w-4 h-4 absolute left-3 top-3 ${isDay ? 'text-[#7B9585]' : 'text-slate-400'}`} />
                    </div>
                  </div>

                  <button
                    id="btn-submit-forgot"
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-xl bg-[#065F46] hover:bg-[#047857] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending recovery link...</span>
                      </div>
                    ) : (
                      <>
                        <KeyRound className="w-4 h-4" />
                        <span>Send Password Reset Link</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className={`p-4 rounded-xl border text-center space-y-3 ${
                  isDay ? 'bg-[#EBF7EE] border-[#BCE4C9]' : 'bg-emerald-950/40 border-emerald-500/30'
                }`}>
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="text-sm font-bold">Email Dispatched!</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Follow the link inside the email to choose a new password. You can then return here to sign in.
                  </p>
                </div>
              )}

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setAuthModalMode('login');
                    setErrorMessage(null);
                  }}
                  className={`text-xs font-bold hover:underline cursor-pointer ${
                    isDay ? 'text-[#065F46]' : 'text-emerald-400'
                  }`}
                >
                  ← Return to Sign In
                </button>
              </div>
            </div>
          )}

          {/* Bottom Security Assurance */}
          <div className={`mt-6 pt-4 border-t flex items-center justify-center gap-2 text-[11px] ${
            isDay ? 'border-[#E8E0D5] text-[#5B7367]' : 'border-slate-800 text-slate-400'
          }`}>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted &amp; NBTE/MOH Accredited ICT Portal</span>
          </div>
        </div>
      </div>
    </div>
  );
};
