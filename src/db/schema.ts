import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

// Users table with Firebase UID
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  displayName: text('display_name'),
  role: text('role').default('applicant'), // applicant, student, staff, admin
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Admission Applications table
export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  applicationNumber: text('application_number').notNull().unique(),
  userId: integer('user_id').references(() => users.id),
  applicantName: text('applicant_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  dateOfBirth: text('date_of_birth'),
  gender: text('gender'),
  stateOfOrigin: text('state_of_origin'),
  lga: text('lga'),
  programChoice: text('program_choice').notNull(),
  sittings: text('sittings').default('1'),
  olevelGrades: jsonb('olevel_grades'),
  examCenter: text('exam_center').default('Inkil Main Campus, Bauchi'),
  status: text('status').default('Submitted'), // Submitted, Under Review, Admitted, Rejected
  admissionBatch: text('admission_batch').default('2025/2026 Batch A'),
  remarks: text('remarks'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Contact & Admission Inquiries
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').default('Pending'), // Pending, Responded, Resolved
  createdAt: timestamp('created_at').defaultNow(),
});

// News & College Announcements
export const announcements = pgTable('announcements', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  category: text('category').notNull(), // Admissions, Academic, Campus, Examination
  content: text('content').notNull(),
  date: text('date').notNull(),
  author: text('author').default('Registrar Office'),
  isImportant: boolean('is_important').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Verified Student Examination Results & Transcripts
export const studentResults = pgTable('student_results', {
  id: serial('id').primaryKey(),
  registrationNumber: text('registration_number').notNull().unique(),
  studentName: text('student_name').notNull(),
  program: text('program').notNull(),
  level: text('level').notNull(), // Year 1, Year 2, Year 3
  semester: text('semester').notNull(), // First Semester, Second Semester
  session: text('session').notNull(), // 2024/2025
  cgpa: text('cgpa').notNull(),
  standing: text('standing').default('Pass in Good Standing'),
  grades: jsonb('grades'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  applications: many(applications),
}));

export const applicationsRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.userId],
    references: [users.id],
  }),
}));
