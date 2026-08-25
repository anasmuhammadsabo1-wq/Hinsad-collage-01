import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { 
  auth, 
  db, 
  emailSignIn, 
  emailRegister, 
  googleSignIn, 
  googleSignOut, 
  sendPasswordReset, 
  formatAuthErrorMessage 
} from '../services/firebaseAuth';
import { AuthUserProfile, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  profile: AuthUserProfile | null;
  loading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  roleHint: UserRole;
  openAuthModal: (mode?: 'login' | 'register' | 'forgot', roleHint?: UserRole) => void;
  closeAuthModal: () => void;
  setAuthModalMode: (mode: 'login' | 'register' | 'forgot') => void;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, fullName: string, role?: UserRole, phone?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<AuthUserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [roleHint, setRoleHint] = useState<UserRole>('applicant');

  // Listen to Firebase Auth state
  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Fallback default profile
        const defaultRole: UserRole = currentUser.email === 'ANASMUHAMMADSABO1@gmail.com' ? 'admin' : 'applicant';
        setProfile({
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
          photoURL: currentUser.photoURL,
          role: defaultRole,
        });

        // Listen in real-time to Firestore user profile
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          unsubscribeFirestore = onSnapshot(userDocRef, (snap) => {
            if (snap.exists()) {
              const data = snap.data();
              setProfile({
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: data.displayName || currentUser.displayName || currentUser.email?.split('@')[0] || 'User',
                photoURL: data.photoURL || currentUser.photoURL,
                role: (data.role as UserRole) || defaultRole,
                phone: data.phone,
                studentId: data.studentId,
                applicationNumber: data.applicationNumber,
                department: data.department,
                createdAt: data.createdAt,
              });
            }
          }, (err) => {
            console.warn('Firestore user profile snapshot subscription notice:', err);
          });
        } catch (e) {
          console.warn('Profile sync initialization warning:', e);
        }
      } else {
        setProfile(null);
        if (unsubscribeFirestore) {
          unsubscribeFirestore();
          unsubscribeFirestore = null;
        }
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) {
        unsubscribeFirestore();
      }
    };
  }, []);

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login', role: UserRole = 'applicant') => {
    setAuthModalMode(mode);
    setRoleHint(role);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    await emailSignIn(email, pass);
    setIsAuthModalOpen(false);
  };

  const registerWithEmail = async (
    email: string, 
    pass: string, 
    fullName: string, 
    role: UserRole = 'applicant', 
    phone?: string
  ) => {
    await emailRegister(email, pass, fullName, role, phone);
    setIsAuthModalOpen(false);
  };

  const loginWithGoogle = async () => {
    await googleSignIn();
    setIsAuthModalOpen(false);
  };

  const logout = async () => {
    await googleSignOut();
    setUser(null);
    setProfile(null);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordReset(email);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthModalOpen,
        authModalMode,
        roleHint,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        logout,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
