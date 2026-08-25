import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot 
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from './firebase';
import { ApplicationFormData, AdmissionCandidate } from '../types';

export interface FirestoreApplication {
  id: string;
  applicantUid?: string;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  dateOfBirth: string;
  stateOfOrigin: string;
  lga: string;
  address: string;
  programChoice1: string;
  programChoice2: string;
  entryQualification: string;
  olevelExam: string;
  olevelYear: string;
  olevelRegNo: string;
  status: 'submitted' | 'under_review' | 'admitted' | 'declined';
  paymentStatus: 'paid' | 'pending';
  paymentReference?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface FirestoreInquiry {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  createdAt: string;
}

export interface FirestoreAnnouncement {
  id: string;
  title: string;
  category: string;
  content: string;
  author: string;
  isPublished: boolean;
  createdAt: string;
}

/**
 * Submit a student admission application to Firestore
 */
export async function saveApplicationToFirestore(
  appId: string, 
  formData: ApplicationFormData
): Promise<FirestoreApplication> {
  const path = `applications/${appId}`;
  try {
    const newApp: FirestoreApplication = {
      id: appId,
      applicantUid: auth.currentUser?.uid || undefined,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      stateOfOrigin: formData.stateOfOrigin,
      lga: formData.lga,
      address: formData.address,
      programChoice1: formData.programChoice1,
      programChoice2: formData.programChoice2,
      entryQualification: formData.entryQualification,
      olevelExam: formData.olevelExam,
      olevelYear: formData.olevelYear,
      olevelRegNo: formData.olevelRegNo,
      status: 'submitted',
      paymentStatus: 'paid',
      paymentReference: `HIN-PAY-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'applications', appId), newApp);
    return newApp;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

/**
 * Fetch an application by ID (e.g. for status checker)
 */
export async function getApplicationFromFirestore(appId: string): Promise<FirestoreApplication | null> {
  const path = `applications/${appId}`;
  try {
    const docRef = doc(db, 'applications', appId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as FirestoreApplication;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

/**
 * Submit a contact / admissions inquiry
 */
export async function submitInquiryToFirestore(inquiry: Omit<FirestoreInquiry, 'createdAt'>): Promise<void> {
  const inqId = `inq-${Date.now()}`;
  const path = `inquiries/${inqId}`;
  try {
    await setDoc(doc(db, 'inquiries', inqId), {
      ...inquiry,
      id: inqId,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export interface UserProfileData {
  uid: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role?: string;
  phone?: string;
}

/**
 * Sync user profile on login or registration
 */
export async function syncUserProfile(user: UserProfileData): Promise<void> {
  if (!user.uid || !user.email) return;
  const path = `users/${user.uid}`;
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    const defaultRole = user.role || (user.email === 'ANASMUHAMMADSABO1@gmail.com' ? 'admin' : 'applicant');

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || '',
        role: defaultRole,
        phone: user.phone || '',
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString(),
      });
    } else {
      await setDoc(userRef, {
        displayName: user.displayName || userSnap.data().displayName || '',
        photoURL: user.photoURL || userSnap.data().photoURL || '',
        ...(user.role ? { role: user.role } : {}),
        ...(user.phone ? { phone: user.phone } : {}),
        lastLoginAt: new Date().toISOString(),
      }, { merge: true });
    }

    // Attempt non-blocking backend sync to Cloud SQL
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const token = await currentUser.getIdToken();
        fetch('/api/auth/sync', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            displayName: user.displayName || user.email.split('@')[0],
            role: defaultRole,
          })
        }).catch(() => {});
      }
    } catch {
      // Non-blocking
    }
  } catch (error) {
    // Non-blocking for auth flow
    console.warn('Could not sync user profile to Firestore:', error);
  }
}

