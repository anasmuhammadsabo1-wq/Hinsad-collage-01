import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

export async function getOrCreateUser(uid: string, email: string, displayName?: string, role?: string) {
  try {
    const result = await db.insert(users)
      .values({
        uid,
        email,
        displayName: displayName || null,
        role: role || 'applicant',
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email,
          ...(displayName ? { displayName } : {}),
          ...(role ? { role } : {}),
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database query failed in getOrCreateUser:", error);
    throw new Error("Failed to synchronize user account. Please try again.", { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const userRecords = await db.select().from(users).where(eq(users.uid, uid));
    return userRecords[0] || null;
  } catch (error) {
    console.error("Database query failed in getUserByUid:", error);
    throw new Error("Failed to fetch user. Please try again.", { cause: error });
  }
}

export async function getUsers() {
  try {
    return await db.select().from(users);
  } catch (error) {
    console.error("Database query failed in getUsers:", error);
    throw new Error("Failed to fetch users list.", { cause: error });
  }
}
