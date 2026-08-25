export interface ClassroomCourse {
  id: string;
  name: string;
  section?: string;
  descriptionHeading?: string;
  description?: string;
  room?: string;
  ownerId?: string;
  creationTime?: string;
  updateTime?: string;
  enrollmentCode?: string;
  courseState?: 'ACTIVE' | 'ARCHIVED' | 'PROVISIONED' | 'DECLINED' | 'SUSPENDED';
  alternateLink?: string;
  teacherGroupEmail?: string;
  courseGroupEmail?: string;
  guardiansEnabled?: boolean;
}

export interface ClassroomCourseWork {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  materials?: any[];
  state?: 'PUBLISHED' | 'DRAFT' | 'DELETED';
  alternateLink?: string;
  creationTime?: string;
  updateTime?: string;
  dueDate?: { year: number; month: number; day: number };
  dueTime?: { hours: number; minutes: number; seconds?: number };
  maxPoints?: number;
  workType?: 'ASSIGNMENT' | 'SHORT_ANSWER_QUESTION' | 'MULTIPLE_CHOICE_QUESTION';
  submissionModificationMode?: string;
  creatorUserId?: string;
  topicId?: string;
}

export interface ClassroomAnnouncement {
  id: string;
  courseId: string;
  text: string;
  materials?: any[];
  state?: 'PUBLISHED' | 'DRAFT' | 'DELETED';
  alternateLink?: string;
  creationTime?: string;
  updateTime?: string;
  creatorUserId?: string;
}

export interface ClassroomUserProfile {
  id: string;
  name?: {
    givenName?: string;
    familyName?: string;
    fullName?: string;
  };
  emailAddress?: string;
  photoUrl?: string;
}

export interface ClassroomTeacher {
  courseId: string;
  userId: string;
  profile?: ClassroomUserProfile;
}

export interface ClassroomStudent {
  courseId: string;
  userId: string;
  profile?: ClassroomUserProfile;
  studentWorkFolder?: {
    id: string;
    title: string;
    alternateLink: string;
  };
}

export interface ClassroomTopic {
  courseId: string;
  topicId: string;
  name: string;
  updateTime?: string;
}

export interface ClassroomStudentSubmission {
  id: string;
  courseId: string;
  courseWorkId: string;
  userId: string;
  creationTime?: string;
  updateTime?: string;
  state?: 'NEW' | 'CREATED' | 'TURNED_IN' | 'RETURNED' | 'RECLAIMED_BY_STUDENT';
  late?: boolean;
  assignedGrade?: number;
  draftGrade?: number;
  alternateLink?: string;
}

const API_BASE = 'https://classroom.googleapis.com/v1';

const getHeaders = (token: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

// 1. List Courses
export const fetchClassroomCourses = async (token: string): Promise<ClassroomCourse[]> => {
  const res = await fetch(`${API_BASE}/courses?courseStates=ACTIVE`, {
    headers: getHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch Google Classroom courses (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.courses || [];
};

// 2. Create Course (Requires Teacher permission in Google Workspace domain)
export const createClassroomCourse = async (
  token: string, 
  courseData: { name: string; section?: string; description?: string; room?: string }
): Promise<ClassroomCourse> => {
  const res = await fetch(`${API_BASE}/courses`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({
      name: courseData.name,
      section: courseData.section || '2025/2026 Academic Session',
      descriptionHeading: 'HINSAD College Academic Course',
      description: courseData.description,
      room: courseData.room || 'Inkil Campus, Bauchi',
      ownerId: 'me',
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create Classroom course (HTTP ${res.status})`);
  }

  return await res.json();
};

// 3. Fetch CourseWork (Assignments & Tasks)
export const fetchClassroomCourseWork = async (token: string, courseId: string): Promise<ClassroomCourseWork[]> => {
  const res = await fetch(`${API_BASE}/courses/${courseId}/courseWork`, {
    headers: getHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch Coursework (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.courseWork || [];
};

// 4. Create CourseWork (Assignment)
export const createClassroomAssignment = async (
  token: string,
  courseId: string,
  assignmentData: {
    title: string;
    description: string;
    maxPoints?: number;
    dueDate?: { year: number; month: number; day: number };
  }
): Promise<ClassroomCourseWork> => {
  const body: any = {
    title: assignmentData.title,
    description: assignmentData.description,
    maxPoints: assignmentData.maxPoints ?? 100,
    workType: 'ASSIGNMENT',
    state: 'PUBLISHED',
  };

  if (assignmentData.dueDate) {
    body.dueDate = assignmentData.dueDate;
    body.dueTime = { hours: 23, minutes: 59 };
  }

  const res = await fetch(`${API_BASE}/courses/${courseId}/courseWork`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create assignment in Classroom (HTTP ${res.status})`);
  }

  return await res.json();
};

// 5. Fetch Announcements
export const fetchClassroomAnnouncements = async (token: string, courseId: string): Promise<ClassroomAnnouncement[]> => {
  const res = await fetch(`${API_BASE}/courses/${courseId}/announcements`, {
    headers: getHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to fetch announcements (HTTP ${res.status})`);
  }

  const data = await res.json();
  return data.announcements || [];
};

// 6. Post Announcement
export const postClassroomAnnouncement = async (
  token: string,
  courseId: string,
  text: string
): Promise<ClassroomAnnouncement> => {
  const res = await fetch(`${API_BASE}/courses/${courseId}/announcements`, {
    method: 'POST',
    headers: getHeaders(token),
    body: JSON.stringify({
      text,
      state: 'PUBLISHED',
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to post announcement (HTTP ${res.status})`);
  }

  return await res.json();
};

// 7. Fetch Teachers
export const fetchClassroomTeachers = async (token: string, courseId: string): Promise<ClassroomTeacher[]> => {
  const res = await fetch(`${API_BASE}/courses/${courseId}/teachers`, {
    headers: getHeaders(token),
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.teachers || [];
};

// 8. Fetch Students
export const fetchClassroomStudents = async (token: string, courseId: string): Promise<ClassroomStudent[]> => {
  const res = await fetch(`${API_BASE}/courses/${courseId}/students`, {
    headers: getHeaders(token),
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.students || [];
};

// 9. Fetch Topics
export const fetchClassroomTopics = async (token: string, courseId: string): Promise<ClassroomTopic[]> => {
  const res = await fetch(`${API_BASE}/courses/${courseId}/topics`, {
    headers: getHeaders(token),
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.topic || [];
};

// 10. Fetch Student Submissions
export const fetchStudentSubmissions = async (
  token: string,
  courseId: string,
  courseWorkId: string
): Promise<ClassroomStudentSubmission[]> => {
  const res = await fetch(`${API_BASE}/courses/${courseId}/courseWork/${courseWorkId}/studentSubmissions`, {
    headers: getHeaders(token),
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data.studentSubmissions || [];
};
