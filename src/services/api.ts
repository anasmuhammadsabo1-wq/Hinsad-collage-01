import { auth } from './firebase';

export async function getAuthHeaders(): Promise<HeadersInit> {
  const currentUser = auth.currentUser;
  if (currentUser) {
    const token = await currentUser.getIdToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }
  return {
    'Content-Type': 'application/json',
  };
}

export async function syncUserWithBackend(displayName?: string, role?: string) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch('/api/auth/sync', {
      method: 'POST',
      headers,
      body: JSON.stringify({ displayName, role }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Failed to sync user with backend:', error);
    return null;
  }
}

export async function submitApplicationToBackend(data: any) {
  try {
    const res = await fetch('/api/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('Failed to submit application to SQL backend:', error);
    throw error;
  }
}

export async function checkApplicationStatusFromBackend(applicationNumber: string) {
  try {
    const res = await fetch(`/api/applications/${encodeURIComponent(applicationNumber)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.application;
  } catch (error) {
    console.error('Failed to check status from backend:', error);
    return null;
  }
}

export async function verifyStudentResultFromBackend(regNumber: string) {
  try {
    const res = await fetch(`/api/results/${encodeURIComponent(regNumber)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.result;
  } catch (error) {
    console.error('Failed to verify result from backend:', error);
    return null;
  }
}

export async function fetchAnnouncementsFromBackend() {
  try {
    const res = await fetch('/api/announcements');
    if (!res.ok) return [];
    const data = await res.json();
    return data.announcements || [];
  } catch (error) {
    console.error('Failed to fetch announcements from backend:', error);
    return [];
  }
}
