# HINSAD College Firestore Security Specification

## 1. Data Invariants
- **Applications (`/applications/{applicationId}`)**:
  - Documents can be created by any visitor submitting an application with all required fields (`id`, `fullName`, `email`, `phone`, `programChoice1`, `status`, `paymentStatus`, `createdAt`).
  - The status on creation must be `'submitted'` or `'under_review'`.
  - Non-admins cannot tamper with `status` or `paymentStatus` once created; only authenticated staff or owner can read their own application.
  - Public status checks query by `id` / application number.
- **Inquiries (`/inquiries/{inquiryId}`)**:
  - Anyone can create an inquiry with string limits (`fullName` <= 120, `email` <= 120, `message` <= 1000).
  - Updating inquiries is disabled for non-admins to prevent message altering.
- **Users (`/users/{userId}`)**:
  - `userId` must match `request.auth.uid`.
  - Only the user themselves can read and write their profile.
  - Role escalation is forbidden (users cannot self-promote to `'admin'`).
- **Announcements (`/announcements/{announcementId}`)**:
  - Readable by everyone if `isPublished == true`.
  - Writable only by authenticated staff/admins.

## 2. The Dirty Dozen Payloads
1. **Unchecked Shadow Fields on Application**: Injection of `{ isAdmin: true, bypassPayment: true }` in application payload -> Rejected by strict key validation.
2. **Path Poisoning**: Passing 2KB junk character strings as `{applicationId}` -> Rejected by `isValidId()`.
3. **Impersonated User Profile**: User `UID_A` attempting to write to `/users/UID_B` -> Rejected by `request.auth.uid == userId`.
4. **Self-Promoted Admin**: User attempting to set `role: 'admin'` on profile creation -> Rejected by role constraints.
5. **Direct Status Escalation**: Student modifying status to `'admitted'` -> Rejected by update guards.
6. **Denial of Wallet Mega String**: Submitting a 5MB string in the `message` field -> Rejected by `message.size() <= 1000`.
7. **PII Scraping Attack**: Blanket listing of all student applications without specific filtering -> Rejected by Query Enforcer.
8. **Inquiry Update Tampering**: Modifying someone else's submitted inquiry -> Rejected by update disabled.
9. **Fake Email Invariant**: Submitting invalid email formatting -> Rejected by schema validations.
10. **Timestamp Manipulation**: Overwriting `createdAt` with arbitrary past date -> Protected by immutability rules.
11. **Announcement Defacement**: Unauthenticated visitor attempting to write to `/announcements` -> Rejected by write restrictions.
12. **Malformed Application ID**: Creating an application with non-alphanumeric special characters -> Rejected by ID regex validation.
