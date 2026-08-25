import { db } from './index.ts';
import { applications, inquiries, announcements, studentResults, users } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function createApplication(data: {
  applicationNumber: string;
  applicantName: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
  gender?: string;
  stateOfOrigin?: string;
  lga?: string;
  programChoice: string;
  sittings?: string;
  olevelGrades?: any;
  examCenter?: string;
  remarks?: string;
}) {
  try {
    const result = await db.insert(applications).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("Database query failed in createApplication:", error);
    throw new Error("Failed to submit application to database.", { cause: error });
  }
}

export async function getApplicationByNumber(applicationNumber: string) {
  try {
    const result = await db.select().from(applications).where(eq(applications.applicationNumber, applicationNumber));
    return result[0] || null;
  } catch (error) {
    console.error("Database query failed in getApplicationByNumber:", error);
    throw new Error("Failed to fetch application.", { cause: error });
  }
}

export async function getAllApplications() {
  try {
    return await db.select().from(applications).orderBy(desc(applications.createdAt));
  } catch (error) {
    console.error("Database query failed in getAllApplications:", error);
    throw new Error("Failed to fetch applications.", { cause: error });
  }
}

export async function createInquiry(data: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  try {
    const result = await db.insert(inquiries).values(data).returning();
    return result[0];
  } catch (error) {
    console.error("Database query failed in createInquiry:", error);
    throw new Error("Failed to submit inquiry to database.", { cause: error });
  }
}

export async function getAllInquiries() {
  try {
    return await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  } catch (error) {
    console.error("Database query failed in getAllInquiries:", error);
    throw new Error("Failed to fetch inquiries.", { cause: error });
  }
}

export async function getAllAnnouncements() {
  try {
    return await db.select().from(announcements).orderBy(desc(announcements.createdAt));
  } catch (error) {
    console.error("Database query failed in getAllAnnouncements:", error);
    throw new Error("Failed to fetch announcements.", { cause: error });
  }
}

export async function getStudentResultByReg(registrationNumber: string) {
  try {
    const result = await db.select().from(studentResults).where(eq(studentResults.registrationNumber, registrationNumber));
    return result[0] || null;
  } catch (error) {
    console.error("Database query failed in getStudentResultByReg:", error);
    throw new Error("Failed to verify student result in database.", { cause: error });
  }
}
