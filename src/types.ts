export type TabType = 
  | 'home' 
  | 'about' 
  | 'programs' 
  | 'admissions' 
  | 'portal' 
  | 'classroom'
  | 'campus' 
  | 'news' 
  | 'contact';

export type ThemeMode = 'day' | 'night';

export interface Program {
  id: string;
  name: string;
  code: string;
  school: 'Health Technology' | 'Community Health' | 'Environmental & Public Health' | 'Diagnostic & Pharmacy' | 'General Studies & Basic Academy';
  duration: string;
  credential: string;
  overview: string;
  requirements: string[];
  careerProspects: string[];
  board: string;
  curriculum: {
    semester: string;
    courses: { code: string; title: string; units: number }[];
  }[];
  featured?: boolean;
  iconName: string;
  image: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Admissions' | 'Academic' | 'Events' | 'Campus Life' | 'Accreditation';
  date: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  pinned?: boolean;
}

export interface StudentResult {
  matricNo: string;
  studentName: string;
  department: string;
  program: string;
  level: string;
  session: string;
  semester: string;
  cgpa: number;
  gpa: number;
  courses: {
    code: string;
    title: string;
    unit: number;
    score: number;
    grade: string;
    status: 'Pass' | 'Fail';
  }[];
  remarks: string;
  qrVerified: boolean;
}

export interface AdmissionCandidate {
  appNumber: string;
  fullName: string;
  program: string;
  status: 'Admitted' | 'Under Review' | 'Screening Scheduled' | 'Not Admitted';
  dateApplied: string;
  screeningScore?: number;
  admissionBatch?: string;
  acceptanceFeeStatus: 'Paid' | 'Pending';
  remarks: string;
}

export interface ApplicationFormData {
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
  olevelSubjects: { subject: string; grade: string }[];
  uploadedFiles: {
    passport?: string;
    ssceResult?: string;
    birthCert?: string;
    lgaIndigene?: string;
  };
  paymentMethod: string;
  paymentRef?: string;
}

export type UserRole = 'applicant' | 'student' | 'staff' | 'admin';

export interface AuthUserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role: UserRole;
  phone?: string;
  studentId?: string;
  applicationNumber?: string;
  department?: string;
  createdAt?: string;
}

