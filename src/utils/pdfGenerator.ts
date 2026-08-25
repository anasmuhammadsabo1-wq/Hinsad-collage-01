import { jsPDF } from 'jspdf';
import { AdmissionCandidate, ApplicationFormData, StudentResult, Program } from '../types';
import { COLLEGE_INFO } from '../data/mockData';

export const generateAdmissionLetterPDF = (candidate: AdmissionCandidate) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Background bar
  doc.setFillColor(0, 135, 81); // Emerald green
  doc.rect(0, 0, pageWidth, 24, 'F');

  doc.setFillColor(0, 51, 153); // Royal blue stripe
  doc.rect(0, 24, pageWidth, 4, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(COLLEGE_INFO.name.toUpperCase(), pageWidth / 2, 11, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`Motto: "${COLLEGE_INFO.motto}" | ${COLLEGE_INFO.address}`, pageWidth / 2, 18, { align: 'center' });

  // Body content
  doc.setTextColor(20, 20, 20);
  doc.setFontSize(10);
  doc.text(`Ref No: HIN/ADM/2025/${candidate.appNumber.replace(/[^0-9]/g, '') || '0842'}`, 15, 38);
  doc.text(`Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth - 15, 38, { align: 'right' });

  // Addressee
  doc.setFont('helvetica', 'bold');
  doc.text('TO:', 15, 48);
  doc.setFontSize(11);
  doc.text(candidate.fullName.toUpperCase(), 15, 54);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(`Application Reg No: ${candidate.appNumber}`, 15, 60);

  // Subject Header
  doc.setFillColor(240, 248, 245);
  doc.roundedRect(15, 66, pageWidth - 30, 14, 2, 2, 'F');
  doc.setTextColor(0, 100, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('OFFER OF PROVISIONAL ADMISSION (2025/2026 ACADEMIC SESSION)', pageWidth / 2, 75, { align: 'center' });

  // Letter Body
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const textBody = [
    `I am pleased to inform you that the Academic Board and Admissions Committee of HINSAD College of Health Technology & General Studies, Bauchi have offered you Provisional Admission into the following accredited programme:`,
    '',
    `PROGRAMME OF STUDY: ${candidate.program.toUpperCase()}`,
    `ADMISSION STATUS: ${candidate.status.toUpperCase()} (${candidate.admissionBatch || 'Merit List'})`,
    '',
    `This offer is subject to the confirmation of your minimum O'Level entry requirements (5 credits including English, Mathematics, Biology, Chemistry & Physics) during the forthcoming physical screening exercise.`,
    '',
    `ACCEPTANCE & REGISTRATION GUIDELINES:`,
    `1. Acceptance Fee: You are required to pay a non-refundable Acceptance Fee of N15,000 on or before the designated deadline to secure your slot.`,
    `2. Verification & Screening: Report to the College Academic Registry, Inkil Unguwan Magaji Gombe Road Campus with original copies of your SSCE/O'Level results, Birth Certificate, Indigene Letter, and 8 recent passport photographs.`,
    `3. Medical Fitness: You will undergo a compulsory clinical health screening at the College Medical Diagnostic Centre prior to matriculation.`,
    '',
    `Please accept our hearty congratulations on your well-deserved admission into HINSAD College.`
  ];

  let currentY = 88;
  textBody.forEach(line => {
    if (line.startsWith('PROGRAMME OF STUDY:') || line.startsWith('ADMISSION STATUS:')) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 51, 153);
    } else if (line.startsWith('ACCEPTANCE & REGISTRATION GUIDELINES:')) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 135, 81);
    } else {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
    }
    
    const splitLines = doc.splitTextToSize(line, pageWidth - 30);
    doc.text(splitLines, 15, currentY);
    currentY += (splitLines.length * 5) + (line === '' ? 2 : 0);
  });

  // Signature section
  const sigY = 240;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Yours faithfully,', 15, sigY);
  
  // Simulated signature line
  doc.setDrawColor(0, 135, 81);
  doc.setLineWidth(0.5);
  doc.line(15, sigY + 18, 65, sigY + 18);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Mallam Abubakar S. Inkil', 15, sigY + 23);
  doc.setFont('helvetica', 'normal');
  doc.text('Registrar / Secretary to Academic Board', 15, sigY + 28);
  doc.text('HINSAD College of Health Technology', 15, sigY + 33);

  // Security Verification Seal Box
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(pageWidth - 85, sigY - 2, 70, 36, 2, 2, 'F');
  doc.setDrawColor(0, 51, 153);
  doc.roundedRect(pageWidth - 85, sigY - 2, 70, 36, 2, 2, 'S');
  doc.setFontSize(8);
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('OFFICIAL VERIFICATION SEAL', pageWidth - 50, sigY + 5, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(`Digital Seal: HIN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`, pageWidth - 50, sigY + 13, { align: 'center' });
  doc.text('Verified on HINSAD E-Portal', pageWidth - 50, sigY + 19, { align: 'center' });
  doc.text('Valid only with official stamp', pageWidth - 50, sigY + 25, { align: 'center' });

  // Footer bar
  doc.setFillColor(235, 245, 240);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Helpdesk: ${COLLEGE_INFO.phone1}, ${COLLEGE_INFO.phone2} | Email: ${COLLEGE_INFO.email} | Portal: ${COLLEGE_INFO.portalUrl}`, pageWidth / 2, 292, { align: 'center' });

  doc.save(`HINSAD_Admission_Letter_${candidate.appNumber.replace(/\//g, '_')}.pdf`);
};

export const generateApplicationSlipPDF = (formData: ApplicationFormData) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Top header
  doc.setFillColor(0, 135, 81);
  doc.rect(0, 0, pageWidth, 22, 'F');
  doc.setFillColor(0, 51, 153);
  doc.rect(0, 22, pageWidth, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(COLLEGE_INFO.name.toUpperCase(), pageWidth / 2, 10, { align: 'center' });
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('ONLINE ADMISSION APPLICATION ACKNOWLEDGEMENT SLIP (2025/2026)', pageWidth / 2, 17, { align: 'center' });

  // App Reg Banner
  const appNo = formData.paymentRef ? `HIN/2025/${formData.paymentRef.slice(-4)}` : 'HIN/2025/APP-' + Math.floor(1000 + Math.random() * 9000);
  doc.setFillColor(240, 248, 245);
  doc.roundedRect(15, 30, pageWidth - 30, 12, 2, 2, 'F');
  doc.setTextColor(0, 135, 81);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`APPLICATION NUMBER: ${appNo}`, 20, 38);
  doc.text(`PAYMENT STATUS: COMPLETED & VERIFIED`, pageWidth - 20, 38, { align: 'right' });

  // Candidate Information Table
  doc.setTextColor(20, 20, 20);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('1. PERSONAL BIO-DATA', 15, 50);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  let y = 56;
  const bio = [
    ['Full Name:', formData.fullName || 'N/A', 'Gender:', formData.gender || 'N/A'],
    ['Email Address:', formData.email || 'N/A', 'Phone Number:', formData.phone || 'N/A'],
    ['State of Origin:', formData.stateOfOrigin || 'N/A', 'L.G.A:', formData.lga || 'N/A'],
    ['Contact Address:', formData.address || 'N/A', 'Date of Birth:', formData.dateOfBirth || 'N/A']
  ];

  bio.forEach(row => {
    doc.setFont('helvetica', 'bold');
    doc.text(row[0], 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(row[1], 45, y);

    doc.setFont('helvetica', 'bold');
    doc.text(row[2], 115, y);
    doc.setFont('helvetica', 'normal');
    doc.text(row[3], 145, y);
    y += 7;
  });

  // Program Choice
  y += 4;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('2. PROGRAMME SELECTION', 15, y);
  y += 6;
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text('1st Choice Programme:', 15, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(0, 51, 153);
  doc.text(formData.programChoice1 || 'Community Health Extension Worker (CHEW)', 55, y);
  y += 6;
  doc.setTextColor(20, 20, 20);
  doc.setFont('helvetica', 'bold');
  doc.text('2nd Choice Programme:', 15, y);
  doc.setFont('helvetica', 'normal');
  doc.text(formData.programChoice2 || 'Medical Laboratory Technician (MLT)', 55, y);

  // O Level Subject Grid
  y += 10;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`3. O'LEVEL CREDENTIALS (${formData.olevelExam || 'WAEC'} - Reg No: ${formData.olevelRegNo || 'N/A'})`, 15, y);
  y += 6;

  // Table header
  doc.setFillColor(230, 240, 235);
  doc.rect(15, y, pageWidth - 30, 6, 'F');
  doc.setFontSize(8.5);
  doc.text('SUBJECT', 20, y + 4.5);
  doc.text('GRADE', 140, y + 4.5);
  doc.text('REMARKS', 165, y + 4.5);
  y += 6;

  const subjects = formData.olevelSubjects?.length ? formData.olevelSubjects : [
    { subject: 'English Language', grade: 'B3' },
    { subject: 'Mathematics', grade: 'A1' },
    { subject: 'Biology', grade: 'B2' },
    { subject: 'Chemistry', grade: 'B3' },
    { subject: 'Physics', grade: 'C4' }
  ];

  subjects.forEach(sub => {
    doc.setFont('helvetica', 'normal');
    doc.text(sub.subject, 20, y + 5);
    doc.setFont('helvetica', 'bold');
    doc.text(sub.grade, 140, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(sub.grade.startsWith('F') ? 'Fail' : 'Credit / Pass', 165, y + 5);
    doc.setDrawColor(230, 230, 230);
    doc.line(15, y + 7, pageWidth - 15, y + 7);
    y += 7;
  });

  // Important Screening Instructions
  y += 6;
  doc.setFillColor(254, 249, 195); // soft yellow callout
  doc.roundedRect(15, y, pageWidth - 30, 30, 2, 2, 'F');
  doc.setTextColor(133, 77, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('IMPORTANT ENTRANCE SCREENING NOTICE:', 20, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('1. Bring this printed slip, along with original and 2 photocopies of all credentials to the College Campus.', 20, y + 12);
  doc.text('2. Venue: College CBT & Resource Centre, Inkil Unguwan Magaji, Gombe Road, Bauchi.', 20, y + 17);
  doc.text('3. You must arrive at least 30 minutes before your scheduled examination time with valid identification.', 20, y + 22);
  doc.text('4. For enquiries, contact: 07038057065, 08060951190 or email hinsadcolltech@gmail.com', 20, y + 27);

  // Footer
  doc.setFillColor(235, 245, 240);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Official Document - HINSAD College of Health Technology & General Studies, Bauchi`, pageWidth / 2, 292, { align: 'center' });

  doc.save(`HINSAD_Application_Slip_${appNo.replace(/\//g, '_')}.pdf`);
};

export const generateResultTranscriptPDF = (result: StudentResult) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Top header
  doc.setFillColor(0, 51, 153); // Royal blue
  doc.rect(0, 0, pageWidth, 22, 'F');
  doc.setFillColor(0, 135, 81); // Emerald accent
  doc.rect(0, 22, pageWidth, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(COLLEGE_INFO.name.toUpperCase(), pageWidth / 2, 10, { align: 'center' });
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL STATEMENT OF SEMESTER ACADEMIC RESULTS', pageWidth / 2, 17, { align: 'center' });

  // Student Info Header Card
  doc.setFillColor(245, 248, 252);
  doc.roundedRect(15, 30, pageWidth - 30, 32, 2, 2, 'F');

  doc.setTextColor(20, 20, 20);
  doc.setFontSize(9);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Student Name:', 20, 38);
  doc.setFont('helvetica', 'normal');
  doc.text(result.studentName.toUpperCase(), 50, 38);

  doc.setFont('helvetica', 'bold');
  doc.text('Matriculation No:', 125, 38);
  doc.setFont('helvetica', 'normal');
  doc.text(result.matricNo, 160, 38);

  doc.setFont('helvetica', 'bold');
  doc.text('Department:', 20, 46);
  doc.setFont('helvetica', 'normal');
  doc.text(result.department, 50, 46);

  doc.setFont('helvetica', 'bold');
  doc.text('Academic Level:', 125, 46);
  doc.setFont('helvetica', 'normal');
  doc.text(result.level, 160, 46);

  doc.setFont('helvetica', 'bold');
  doc.text('Programme:', 20, 54);
  doc.setFont('helvetica', 'normal');
  doc.text(result.program, 50, 54);

  doc.setFont('helvetica', 'bold');
  doc.text('Session / Term:', 125, 54);
  doc.setFont('helvetica', 'normal');
  doc.text(`${result.session} (${result.semester})`, 160, 54);

  // Table header
  let y = 68;
  doc.setFillColor(0, 51, 153);
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('COURSE CODE', 20, y + 5.5);
  doc.text('COURSE TITLE', 50, y + 5.5);
  doc.text('UNITS', 130, y + 5.5, { align: 'center' });
  doc.text('SCORE', 150, y + 5.5, { align: 'center' });
  doc.text('GRADE', 170, y + 5.5, { align: 'center' });
  doc.text('STATUS', 188, y + 5.5, { align: 'center' });
  y += 8;

  // Course rows
  result.courses.forEach((c, idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(15, y, pageWidth - 30, 7.5, 'F');
    }
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.text(c.code, 20, y + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(c.title.substring(0, 42), 50, y + 5);
    doc.text(c.unit.toString(), 130, y + 5, { align: 'center' });
    doc.text(c.score.toString(), 150, y + 5, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.text(c.grade, 170, y + 5, { align: 'center' });
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(c.status === 'Pass' ? 0 : 200, c.status === 'Pass' ? 135 : 0, c.status === 'Pass' ? 81 : 0);
    doc.text(c.status, 188, y + 5, { align: 'center' });

    doc.setDrawColor(230, 230, 235);
    doc.line(15, y + 7.5, pageWidth - 15, y + 7.5);
    y += 7.5;
  });

  // Summary box
  y += 8;
  doc.setFillColor(240, 248, 245);
  doc.roundedRect(15, y, pageWidth - 30, 24, 2, 2, 'F');
  doc.setDrawColor(0, 135, 81);
  doc.roundedRect(15, y, pageWidth - 30, 24, 2, 2, 'S');

  doc.setTextColor(0, 100, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text(`SEMESTER GPA: ${result.gpa.toFixed(2)}`, 25, y + 9);
  doc.text(`CUMULATIVE CGPA: ${result.cgpa.toFixed(2)}`, 95, y + 9);
  doc.text(`STATUS: PASSED IN GOOD STANDING`, 150, y + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(60, 60, 60);
  doc.text(`Academic Remarks: ${result.remarks}`, 25, y + 17);

  // Authentication Stamp block
  y += 34;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('Director of Academic Affairs / Examinations', 25, y + 20);
  doc.setDrawColor(100, 100, 100);
  doc.line(25, y + 15, 95, y + 15);

  // Security QR validation box
  doc.setFillColor(245, 247, 250);
  doc.roundedRect(pageWidth - 85, y, 70, 28, 2, 2, 'F');
  doc.setDrawColor(0, 51, 153);
  doc.roundedRect(pageWidth - 85, y, 70, 28, 2, 2, 'S');
  doc.setFontSize(8);
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('E-VERIFIED TRANSCRIPT', pageWidth - 50, y + 7, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text(`Verified On: ${new Date().toLocaleDateString()}`, pageWidth - 50, y + 14, { align: 'center' });
  doc.text('Official Digital Transcript Archive', pageWidth - 50, y + 21, { align: 'center' });

  // Footer
  doc.setFillColor(235, 245, 240);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`HINSAD College Result Verification Portal | Secure Academic Archive | Inkil Campus, Bauchi`, pageWidth / 2, 292, { align: 'center' });

  doc.save(`HINSAD_Transcript_${result.matricNo.replace(/\//g, '_')}.pdf`);
};

export const generateProgramProspectusPDF = (program: Program) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFillColor(0, 135, 81);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setFillColor(0, 51, 153);
  doc.rect(0, 24, pageWidth, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(COLLEGE_INFO.name.toUpperCase(), pageWidth / 2, 11, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text(`OFFICIAL ACADEMIC PROSPECTUS & SYLLABUS GUIDE`, pageWidth / 2, 18, { align: 'center' });

  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text(program.name.toUpperCase(), 15, 38);
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text(`School: ${program.school} | Duration: ${program.duration} | Award: ${program.credential}`, 15, 45);
  doc.text(`Regulatory Board: ${program.board}`, 15, 51);

  doc.setDrawColor(0, 135, 81);
  doc.line(15, 54, pageWidth - 15, 54);

  // Overview
  let y = 62;
  doc.setTextColor(0, 135, 81);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('PROGRAMME OVERVIEW', 15, y);
  y += 6;
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const overviewSplit = doc.splitTextToSize(program.overview, pageWidth - 30);
  doc.text(overviewSplit, 15, y);
  y += (overviewSplit.length * 5) + 4;

  // Entry Requirements
  doc.setTextColor(0, 135, 81);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('ADMISSION & ENTRY REQUIREMENTS', 15, y);
  y += 6;
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  program.requirements.forEach(req => {
    doc.text(`•  ${req}`, 18, y);
    y += 5;
  });
  y += 4;

  // Career Prospects
  doc.setTextColor(0, 135, 81);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('CAREER PATHWAYS & LICENSURE PROSPECTS', 15, y);
  y += 6;
  doc.setTextColor(40, 40, 40);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  program.careerProspects.forEach(cp => {
    doc.text(`✓  ${cp}`, 18, y);
    y += 5;
  });
  y += 6;

  // Curriculum breakdown
  doc.setTextColor(0, 51, 153);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('SAMPLE CORE CURRICULUM', 15, y);
  y += 6;

  program.curriculum.forEach(sem => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(0, 135, 81);
    doc.text(sem.semester, 15, y);
    y += 5;

    sem.courses.forEach(c => {
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(40, 40, 40);
      doc.text(`${c.code}: ${c.title} (${c.units} Units)`, 20, y);
      y += 4.5;
    });
    y += 3;
  });

  // Footer
  doc.setFillColor(235, 245, 240);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`HINSAD College Admissions: ${COLLEGE_INFO.phone1}, ${COLLEGE_INFO.phone2} | Website: ${COLLEGE_INFO.portalUrl}`, pageWidth / 2, 292, { align: 'center' });

  doc.save(`HINSAD_Prospectus_${program.code}.pdf`);
};

export const generateAcademicCalendarPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(0, 135, 81);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setFillColor(0, 51, 153);
  doc.rect(0, 24, pageWidth, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(COLLEGE_INFO.name.toUpperCase(), pageWidth / 2, 11, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('ACADEMIC PLANNING & CURRICULUM DIRECTORATE', pageWidth / 2, 18, { align: 'center' });

  // Title Box
  doc.setFillColor(240, 248, 245);
  doc.roundedRect(15, 33, pageWidth - 30, 14, 2, 2, 'F');
  doc.setTextColor(0, 100, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('APPROVED 2025/2026 ACADEMIC CALENDAR & SCHEDULE OF EVENTS', pageWidth / 2, 42, { align: 'center' });

  let y = 55;
  const sections = [
    {
      term: 'FIRST SEMESTER 2025/2026',
      color: [0, 135, 81] as [number, number, number],
      events: [
        { date: 'Monday, 15th September, 2025', desc: 'Resumption & Online Portal Course Registration for Fresh & Returning Students' },
        { date: 'Monday, 22nd September, 2025', desc: 'Commencement of 1st Semester Lectures & Departmental Orientations' },
        { date: 'Friday, 10th October, 2025', desc: 'Close of Normal Course Registration & Late Registration Penalty Window Begins' },
        { date: 'Thursday, 20th November, 2025', desc: 'Official Matriculation Ceremony for 2025/2026 Fresh Students' },
        { date: 'Monday, 1st - 12th Dec, 2025', desc: 'Mid-Semester Continuous Assessment (C.A.) Tests & Practical Lab Assessments' },
        { date: 'Monday, 22nd Dec - 4th Jan, 2026', desc: 'Christmas & New Year Break (Campus Closed)' },
        { date: 'Monday, 5th January, 2026', desc: 'Resumption of Lectures & Clinical Lab Simulations' },
        { date: 'Monday, 19th Jan - 6th Feb, 2026', desc: 'First Semester Examination & Practical Ospe Screening' },
        { date: 'Monday, 9th - 22nd Feb, 2026', desc: 'First Semester Break & Compilation of Results by Academic Board' }
      ]
    },
    {
      term: 'SECOND SEMESTER 2025/2026',
      color: [0, 51, 153] as [number, number, number],
      events: [
        { date: 'Monday, 23rd February, 2026', desc: 'Resumption & Portal Registration for 2nd Semester' },
        { date: 'Monday, 2nd March, 2026', desc: 'Commencement of 2nd Semester Lectures & Supervised Hospital Postings' },
        { date: 'Monday, 4th - 29th May, 2026', desc: 'Mandatory Clinical Postings (ATBUTH & State Specialist Hospitals)' },
        { date: 'Monday, 15th - 26th June, 2026', desc: 'Continuous Assessment Tests & Practical Logbook Defense' },
        { date: 'Monday, 6th - 24th July, 2026', desc: 'Second Semester Final Examinations & Board Practical Exams' },
        { date: 'Friday, 31st July, 2026', desc: 'End of 2025/2026 Session / Vacation / SIWES & Internship Commencement' }
      ]
    }
  ];

  sections.forEach(sec => {
    doc.setFillColor(sec.color[0], sec.color[1], sec.color[2]);
    doc.roundedRect(15, y, pageWidth - 30, 7, 1.5, 1.5, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(sec.term, 20, y + 5);
    y += 11;

    sec.events.forEach(evt => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(`• ${evt.date}:`, 18, y);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(71, 85, 105);
      const splitDesc = doc.splitTextToSize(evt.desc, pageWidth - 90);
      doc.text(splitDesc, 80, y);
      y += (splitDesc.length * 4.5) + 2.5;
    });
    y += 4;
  });

  // Footer notes
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(15, y, pageWidth - 30, 16, 2, 2, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(15, y, pageWidth - 30, 16, 2, 2, 'S');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Note: Dates are subject to minor adjustments as directed by National Regulatory Bodies (CHPRBN, PCN, MLSCN).', 20, y + 6);
  doc.text('Signed: Director of Academic Planning, HINSAD College of Health Technology, Bauchi State.', 20, y + 11);

  // Bottom stamp
  doc.setFillColor(235, 245, 240);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Inquiries: ${COLLEGE_INFO.phone1}, ${COLLEGE_INFO.phone2} | Website: ${COLLEGE_INFO.portalUrl}`, pageWidth / 2, 292, { align: 'center' });

  doc.save('HINSAD_Academic_Calendar_2025_2026.pdf');
};

export const generateProspectusPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(0, 135, 81);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setFillColor(0, 51, 153);
  doc.rect(0, 24, pageWidth, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(COLLEGE_INFO.name.toUpperCase(), pageWidth / 2, 11, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('OFFICIAL STUDENT INFORMATION HANDBOOK & PROSPECTUS', pageWidth / 2, 18, { align: 'center' });

  // Title Box
  doc.setFillColor(240, 248, 245);
  doc.roundedRect(15, 33, pageWidth - 30, 14, 2, 2, 'F');
  doc.setTextColor(0, 100, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('ADMISSIONS, CURRICULUM, LICENSING & GENERAL REGULATIONS', pageWidth / 2, 42, { align: 'center' });

  let y = 54;

  const sections = [
    {
      title: '1. COLLEGE PHILOSOPHY & VISION',
      content: 'HINSAD College of Health Technology was founded to bridge the critical human resource deficit in the healthcare delivery system of Bauchi State and Nigeria. Our mission is to produce highly disciplined, clinically proficient, and ethical health practitioners through rigorous competency-based training.'
    },
    {
      title: '2. SCHOOLS & DEPARTMENTS',
      content: 'The College comprises 5 Specialized Schools: School of Community Health, School of Pharmacy & Therapeutics, School of Medical Laboratory Technology, School of Health Information Management, and School of Environmental Health Sciences.'
    },
    {
      title: '3. PROFESSIONAL LICENSING & ACCREDITATION',
      content: 'All diplomates are eligible for professional index numbers and registration examinations conducted by statutory national boards including CHPRBN, PCN, MLSCN, and HRORBN upon satisfactory completion of institutional requirements.'
    },
    {
      title: '4. CLINICAL ATTACHMENTS & HOSPITAL POSTINGS',
      content: 'Students undergo mandatory clinical rotations at accredited tertiary and secondary healthcare facilities including Abubakar Tafawa Balewa University Teaching Hospital (ATBUTH) and Bauchi State Specialist Hospital.'
    },
    {
      title: '5. CODE OF CONDUCT & DRESS ETHICS',
      content: 'Clinical students are required to maintain strict decorum, wear designated clinical lab coats/scrubs, and uphold patient confidentiality and medical ethics at all times.'
    }
  ];

  sections.forEach(sec => {
    doc.setTextColor(0, 51, 153);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.text(sec.title, 15, y);
    y += 5;

    doc.setTextColor(51, 65, 85);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    const splitTxt = doc.splitTextToSize(sec.content, pageWidth - 30);
    doc.text(splitTxt, 15, y);
    y += (splitTxt.length * 4.5) + 4;
  });

  // Footer
  doc.setFillColor(235, 245, 240);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Official Document | ${COLLEGE_INFO.address} | Contact: ${COLLEGE_INFO.phone1}`, pageWidth / 2, 292, { align: 'center' });

  doc.save('HINSAD_Official_Prospectus_Handbook.pdf');
};

export const generateFeeSchedulePDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Banner
  doc.setFillColor(0, 135, 81);
  doc.rect(0, 0, pageWidth, 24, 'F');
  doc.setFillColor(0, 51, 153);
  doc.rect(0, 24, pageWidth, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(COLLEGE_INFO.name.toUpperCase(), pageWidth / 2, 11, { align: 'center' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('BURSARY & FINANCIAL SERVICES DEPARTMENT', pageWidth / 2, 18, { align: 'center' });

  // Title Box
  doc.setFillColor(240, 248, 245);
  doc.roundedRect(15, 33, pageWidth - 30, 14, 2, 2, 'F');
  doc.setTextColor(0, 100, 60);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text('2025/2026 APPROVED SCHEDULE OF FEES & PAYMENT GUIDELINES', pageWidth / 2, 42, { align: 'center' });

  let y = 55;

  const fees = [
    { item: 'Application Screening Form (Online)', indigenes: 'N7,500', nonIndigenes: 'N7,500' },
    { item: 'Acceptance Fee (Non-refundable upon Admission)', indigenes: 'N15,000', nonIndigenes: 'N15,000' },
    { item: 'Tuition Fee (Per Academic Session - CHEW / MLT / Pharm)', indigenes: 'N65,000', nonIndigenes: 'N75,000' },
    { item: 'Tuition Fee (Per Academic Session - JCHEW / Certs)', indigenes: 'N50,000', nonIndigenes: 'N60,000' },
    { item: 'Laboratory & Clinical Equipment Consumables', indigenes: 'N18,000', nonIndigenes: 'N18,000' },
    { item: 'ICT, E-Portal & Digital CBT Assessment Fee', indigenes: 'N10,000', nonIndigenes: 'N10,000' },
    { item: 'Medical Diagnostic Screening & Health Insurance', indigenes: 'N8,500', nonIndigenes: 'N8,500' },
    { item: 'Professional Board Indexing (Statutory Board Fee)', indigenes: 'N25,000', nonIndigenes: 'N25,000' },
    { item: 'Clinical Posting & Supervised Hospital Attachment', indigenes: 'N12,000', nonIndigenes: 'N12,000' }
  ];

  // Table header
  doc.setFillColor(0, 51, 153);
  doc.rect(15, y, pageWidth - 30, 8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('FEE DESCRIPTION / ITEM', 20, y + 5.5);
  doc.text('INDIGENE (NGN)', 125, y + 5.5);
  doc.text('NON-INDIGENE (NGN)', 160, y + 5.5);
  y += 8;

  fees.forEach((f, idx) => {
    doc.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 250, idx % 2 === 0 ? 255 : 252);
    doc.rect(15, y, pageWidth - 30, 7.5, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(f.item, 20, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 135, 81);
    doc.text(f.indigenes, 130, y + 5);
    doc.setTextColor(0, 51, 153);
    doc.text(f.nonIndigenes, 165, y + 5);

    doc.setDrawColor(226, 232, 240);
    doc.line(15, y + 7.5, pageWidth - 15, y + 7.5);
    y += 7.5;
  });

  y += 6;
  doc.setFillColor(254, 249, 195);
  doc.roundedRect(15, y, pageWidth - 30, 24, 2, 2, 'F');
  doc.setTextColor(133, 77, 14);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('IMPORTANT PAYMENT INSTRUCTIONS & BANK ACCOUNTS:', 20, y + 5.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text('1. All payments must be generated through the Official HINSAD College E-Portal via Remita / Interswitch.', 20, y + 11);
  doc.text('2. Never make payments to personal individual accounts or unofficial third-party agents.', 20, y + 16);
  doc.text('3. Flexible 2-installment payment option is available upon formal application to the Bursar.', 20, y + 21);

  // Footer
  doc.setFillColor(235, 245, 240);
  doc.rect(0, 285, pageWidth, 12, 'F');
  doc.setFontSize(7.5);
  doc.setTextColor(80, 80, 80);
  doc.text(`Official Bursary Schedule | ${COLLEGE_INFO.email} | Hotline: ${COLLEGE_INFO.phone1}`, pageWidth / 2, 292, { align: 'center' });

  doc.save('HINSAD_Fee_Schedule_2025_2026.pdf');
};

