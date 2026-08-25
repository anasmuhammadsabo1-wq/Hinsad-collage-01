import { Program, NewsItem, StudentResult, AdmissionCandidate } from '../types';

export const COLLEGE_INFO = {
  name: "HINSAD College of Health Technology & General Studies",
  shortName: "HINSAD CollTech",
  motto: "Health is Wealth",
  address: "Inkil Unguwan Magaji, Gombe Road, Bauchi, Bauchi State, Nigeria",
  phone1: "07038057065",
  phone2: "08060951190",
  email: "hinsadcolltech@gmail.com",
  portalUrl: "portal.hinsad.edu.ng",
  established: "2018",
  accreditationSummary: "Approved & Regulated by State Ministry of Health & National Regulatory Health Professional Boards",
  socials: {
    facebook: "https://facebook.com/hinsadcolltech",
    twitter: "https://twitter.com/hinsadcolltech",
    whatsapp: "https://wa.me/2347038057065",
    instagram: "https://instagram.com/hinsadcolltech"
  }
};

export const COLLEGE_STATS = [
  { label: "Accredited Programs", value: "14+", icon: "GraduationCap", desc: "Approved National & Professional Diplomas" },
  { label: "Expert Lecturers & Clinicians", value: "85+", icon: "Users", desc: "Seasoned healthcare educators and practitioners" },
  { label: "Graduated Health Workers", value: "4,500+", icon: "Award", desc: "Serving across tertiary & primary health centers" },
  { label: "Modern Training Labs", value: "6", icon: "FlaskConical", desc: "Fully equipped diagnostic & simulation centers" },
  { label: "Clinical Placement Rate", value: "98%", icon: "TrendingUp", desc: "Direct hospital postings across Bauchi & beyond" }
];

export const PROGRAMS: Program[] = [
  {
    id: "chew",
    name: "Community Health Extension Worker (CHEW)",
    code: "CHEW-ND",
    school: "Community Health",
    duration: "3 Years",
    credential: "National Diploma & Professional License",
    board: "Community Health Practitioners Registration Board of Nigeria (CHPRBN)",
    overview: "Equips students with comprehensive preventive, curative, and rehabilitative primary healthcare skills for rural, urban, and clinical hospital postings.",
    requirements: [
      "5 O'Level credits in WAEC/NECO/NABTEB in not more than two sittings",
      "Compulsory subjects: English Language, Mathematics, Biology/Health Science, Chemistry, Physics",
      "Valid HINSAD entrance screening score"
    ],
    careerProspects: [
      "Primary Health Care (PHC) Clinical Officer",
      "Community Health Outreach Supervisor",
      "Maternal & Child Health Specialist",
      "State Epidemiological & Immunization Officer",
      "NGO & WHO Field Health Officer"
    ],
    curriculum: [
      {
        semester: "Year 1 - First Semester",
        courses: [
          { code: "CHE 111", title: "Anatomy & Physiology for Health Workers I", units: 3 },
          { code: "CHE 112", title: "Primary Health Care Principles & Practice", units: 3 },
          { code: "CHE 113", title: "Community Diagnosis & Health Planning", units: 2 },
          { code: "GNS 101", title: "Use of English & Communication Skills", units: 2 },
          { code: "CHE 114", title: "Microbiology & Parasitology", units: 3 }
        ]
      },
      {
        semester: "Year 1 - Second Semester",
        courses: [
          { code: "CHE 121", title: "Maternal & Child Health / Family Planning", units: 4 },
          { code: "CHE 122", title: "Pharmacology & Dispensing in PHC", units: 3 },
          { code: "CHE 123", title: "Clinical Skills & Practical Posting I", units: 3 },
          { code: "GNS 102", title: "Computer Applications in Healthcare", units: 2 }
        ]
      }
    ],
    featured: true,
    iconName: "Stethoscope",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "jchew",
    name: "Junior Community Health Extension Worker (JCHEW)",
    code: "JCHEW-CERT",
    school: "Community Health",
    duration: "2 Years",
    credential: "Certificate & Professional License",
    board: "Community Health Practitioners Registration Board of Nigeria (CHPRBN)",
    overview: "Foundational training designed to produce frontline grassroots health assistants adept in primary health mobilization, home visits, and first aid.",
    requirements: [
      "Minimum 3-5 O'Level passes/credits in relevant science and arts subjects including English and Biology",
      "Aptitude for community-based healthcare support"
    ],
    careerProspects: [
      "PHC Health Assistant",
      "Immunization Field Mobilizer",
      "Rural Clinic Assistant",
      "School Health Assistant"
    ],
    curriculum: [
      {
        semester: "Year 1 - First Semester",
        courses: [
          { code: "JCH 111", title: "Basic Human Anatomy & First Aid", units: 3 },
          { code: "JCH 112", title: "Community Mobilization & Health Education", units: 3 },
          { code: "JCH 113", title: "Nutrition & Environmental Hygiene", units: 2 }
        ]
      }
    ],
    featured: false,
    iconName: "Activity",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pharm-tech",
    name: "Pharmacy Technician (Pharm Tech)",
    code: "PT-DIP",
    school: "Diagnostic & Pharmacy",
    duration: "3 Years",
    credential: "National Diploma & Pharmacy Technician Permit",
    board: "Pharmacy Council of Nigeria (PCN)",
    overview: "In-depth pharmacology, drug compounding, dispensary management, and pharmaceutical storage under registered pharmacy practice guidelines.",
    requirements: [
      "5 O'Level credits in English, Mathematics, Chemistry, Biology, and Physics (WAEC/NECO/NABTEB)",
      "Maximum of 2 sittings"
    ],
    careerProspects: [
      "Hospital Dispensary Technician",
      "Community Pharmacy Practice Manager",
      "Pharmaceutical Sales & Quality Inspector",
      "National Health Insurance Scheme (NHIS) Dispenser"
    ],
    curriculum: [
      {
        semester: "Year 1 - First Semester",
        courses: [
          { code: "PHT 111", title: "General & Inorganic Chemistry for Pharmacy", units: 3 },
          { code: "PHT 112", title: "Pharmaceutics & Dispensing Calculation I", units: 3 },
          { code: "PHT 113", title: "Anatomy & Physiology", units: 3 },
          { code: "PHT 114", title: "Introduction to Pharmacology & Therapeutics", units: 3 }
        ]
      }
    ],
    featured: true,
    iconName: "Pill",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "med-lab",
    name: "Medical Laboratory Technician (MLT)",
    code: "MLT-DIP",
    school: "Diagnostic & Pharmacy",
    duration: "3 Years",
    credential: "National Diploma & MLSCN License",
    board: "Medical Laboratory Science Council of Nigeria (MLSCN)",
    overview: "Trains students in clinical pathology, hematology, medical microbiology, histotechnology, and chemical pathology utilizing state-of-the-art laboratory analyzers.",
    requirements: [
      "5 O'Level credits in English Language, Mathematics, Chemistry, Biology, and Physics",
      "Completed in not more than two sittings"
    ],
    careerProspects: [
      "Clinical Pathology Laboratory Technician",
      "Blood Bank Specialist",
      "Diagnostic Research Center Officer",
      "Public Health Surveillance Laboratory Scientist"
    ],
    curriculum: [
      {
        semester: "Year 1 - First Semester",
        courses: [
          { code: "MLT 111", title: "Clinical Hematology & Blood Transfusion I", units: 3 },
          { code: "MLT 112", title: "Medical Microbiology & Mycology", units: 3 },
          { code: "MLT 113", title: "Clinical Chemistry & Enzymology", units: 3 },
          { code: "MLT 114", title: "Laboratory Safety, Quality Control & Instrumentation", units: 2 }
        ]
      }
    ],
    featured: true,
    iconName: "Microscope",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "env-health",
    name: "Environmental Health Technology / Officer (EVT/EHO)",
    code: "EHT-ND",
    school: "Environmental & Public Health",
    duration: "2-3 Years",
    credential: "National Diploma (ND) / Higher National Diploma (HND)",
    board: "Environmental Health Officers Registration Council of Nigeria (EHORECON) & WAHEB",
    overview: "Focuses on environmental sanitation, waste management, occupational safety, pollution control, food hygiene, and water safety inspection.",
    requirements: [
      "5 O'Level credits including English, Mathematics, Biology, Chemistry, and Physics or Geography"
    ],
    careerProspects: [
      "State Environmental Protection Agency Officer (BASEPA)",
      "Municipal Sanitation & Waste Management Director",
      "Occupational Health & Safety (HSE) Inspector",
      "Port Health & Quarantine Officer"
    ],
    curriculum: [
      {
        semester: "Year 1 - First Semester",
        courses: [
          { code: "EHT 111", title: "Environmental Ecology & Ecosystem Dynamics", units: 3 },
          { code: "EHT 112", title: "Water Supply, Treatment & Quality Testing", units: 3 },
          { code: "EHT 113", title: "Food Safety, Meat & Abattoir Inspection", units: 3 },
          { code: "EHT 114", title: "Solid & Hazardous Waste Management", units: 3 }
        ]
      }
    ],
    featured: true,
    iconName: "ShieldCheck",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "health-info",
    name: "Health Information Management (HIM / Medical Records)",
    code: "HIM-ND",
    school: "Health Technology",
    duration: "2-3 Years",
    credential: "National Diploma & HRORBN License",
    board: "Health Records Officers Registration Board of Nigeria (HRORBN)",
    overview: "Prepares health informatics professionals in electronic medical record (EMR) systems, clinical coding (ICD-11), biometric health data, and hospital stats.",
    requirements: [
      "5 O'Level credits including English, Mathematics, Biology, and any two other science/social science subjects"
    ],
    careerProspects: [
      "Hospital Electronic Medical Records Manager",
      "Health Data Analyst & Biostatistician",
      "Clinical Coding & Medical Billing Specialist",
      "Hospital Informatics Administrator"
    ],
    curriculum: [
      {
        semester: "Year 1 - First Semester",
        courses: [
          { code: "HIM 111", title: "Health Records Principles & Legal Aspects", units: 3 },
          { code: "HIM 112", title: "International Classification of Diseases (ICD)", units: 3 },
          { code: "HIM 113", title: "Health Informatics & Database Management", units: 3 }
        ]
      }
    ],
    featured: false,
    iconName: "Database",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "public-health-nursing",
    name: "Public Health Nursing & Nutrition",
    code: "PHN-DIP",
    school: "Environmental & Public Health",
    duration: "2 Years",
    credential: "Professional Higher Diploma",
    board: "Public Health Nursing Council & Ministry of Health",
    overview: "Specialized clinical and field leadership in disease surveillance, immunization strategies, family reproductive health, and community nutrition.",
    requirements: [
      "Registered Nurse (RN) / Registered Midwife (RM) or CHEW qualification with 5 O'Level credits"
    ],
    careerProspects: [
      "Public Health Nurse Supervisor",
      "Nutrition & Dietetic Field Officer",
      "School Health Director",
      "International Health Agency Consultant"
    ],
    curriculum: [
      {
        semester: "Year 1 - First Semester",
        courses: [
          { code: "PHN 111", title: "Advanced Public Health Nursing & Epidemiology", units: 4 },
          { code: "PHN 112", title: "Applied Clinical Nutrition & Dietetics", units: 3 },
          { code: "PHN 113", title: "Family Planning & Reproductive Health", units: 3 }
        ]
      }
    ],
    featured: false,
    iconName: "HeartPulse",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "general-studies-academy",
    name: "General Studies & Basic Education Arm (Nursery, Primary & Secondary)",
    code: "GNS-ACAD",
    school: "General Studies & Basic Academy",
    duration: "Full Academic Sessions",
    credential: "SSCE / BECE & Foundational Certificate",
    board: "Ministry of Education & National Examination Bodies",
    overview: "The comprehensive secondary, primary, and nursery academic wing of HINSAD, providing top-tier STEM, arts, and foundational learning.",
    requirements: [
      "Direct admission based on entrance screening and transfer transcripts"
    ],
    careerProspects: [
      "Direct transition to HINSAD Health Technology College",
      "JAMB / UTME top ranking admission to medical & health faculties",
      "STEM & Academic Leadership"
    ],
    curriculum: [
      {
        semester: "Term 1 - Term 3",
        courses: [
          { code: "SCI 001", title: "Basic Science & Technology", units: 3 },
          { code: "MTH 001", title: "General Mathematics", units: 3 },
          { code: "ENG 001", title: "English Language & Literature", units: 3 },
          { code: "BIO 001", title: "Introductory Biology & Health Science", units: 3 }
        ]
      }
    ],
    featured: false,
    iconName: "BookOpen",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
  }
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "Sale of Application Forms for 2025/2026 Academic Session Now Open",
    category: "Admissions",
    date: "August 15, 2025",
    author: "Admissions Office",
    excerpt: "Applications are officially invited from suitably qualified candidates for admission into CHEW, MLT, Pharmacy Tech, and Environmental Health.",
    content: "The management of HINSAD College of Health Technology & General Studies Bauchi is pleased to announce the commencement of online and on-campus application form sales for the 2025/2026 academic session. Prospective applicants can complete their registration on this official web portal. Ensure you have your O'Level results and passport photograph ready before starting your submission.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    pinned: true
  },
  {
    id: "news-2",
    title: "Commissioning of Ultra-Modern Molecular Diagnostic Laboratory",
    category: "Academic",
    date: "July 28, 2025",
    author: "Provost Office",
    excerpt: "New clinical diagnostic equipment installed to boost hands-on practical training for Medical Laboratory and Pharmacy Technician students.",
    content: "In line with our commitment to academic excellence and modern medical tech, HINSAD has unveiled its new state-of-the-art laboratory suite featuring automated hematology analyzers, spectrophotometers, digital microbiology culture stations, and sterile pharmacy compounding hoods.",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "news-3",
    title: "Schedule for 5th Matriculation & White Coat Induction Ceremony",
    category: "Events",
    date: "June 10, 2025",
    author: "Registrar",
    excerpt: "Notice to all newly admitted students, parents, and clinical preceptors regarding the official oath-taking and gown collection schedule.",
    content: "All newly admitted students across CHEW, Pharmacy Tech, MLT, and Environmental Health are hereby notified that the official 2025 Induction & White Coat ceremony will hold at the College Main Auditorium, Inkil Gombe Road Campus.",
    image: "https://images.unsplash.com/photo-1627556704290-2b1f5853ff78?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "news-4",
    title: "Bauchi State Specialist Hospital Partnership Renewed for Clinical Postings",
    category: "Accreditation",
    date: "May 22, 2025",
    author: "Director of Clinicals",
    excerpt: "HINSAD students continue to enjoy priority hands-on rotations across general hospitals, maternal health centers, and rural health clinics.",
    content: "The Ministry of Health and Bauchi State Hospital Management Board have officially affirmed their long-standing partnership with HINSAD College, ensuring seamless hospital clinical posting for our second and final year students.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
  }
];

export const MOCK_STUDENTS: StudentResult[] = [
  {
    matricNo: "HIN/CHEW/2023/042",
    studentName: "Fatima Abubakar Garba",
    department: "Community Health Science",
    program: "Community Health Extension Worker (CHEW)",
    level: "300 Level (Final Year)",
    session: "2024/2025 Academic Session",
    semester: "Second Semester",
    cgpa: 3.82,
    gpa: 4.00,
    courses: [
      { code: "CHE 321", title: "Maternal Health & Advanced Obstetric Care", unit: 4, score: 82, grade: "A", status: "Pass" },
      { code: "CHE 322", title: "Epidemiological Surveillance & Disease Outbreak", unit: 3, score: 76, grade: "A", status: "Pass" },
      { code: "CHE 323", title: "PHC Administration & Personnel Supervision", unit: 2, score: 71, grade: "A", status: "Pass" },
      { code: "CHE 324", title: "Comprehensive Clinical Practicum & Rural Posting", unit: 6, score: 88, grade: "A", status: "Pass" },
      { code: "CHE 325", title: "Health Research Project & Community Defense", unit: 4, score: 79, grade: "A", status: "Pass" }
    ],
    remarks: "Distinction Standing (First Class Equivalent) - Eligible for National Board Licensing Exam",
    qrVerified: true
  },
  {
    matricNo: "HIN/MLT/2023/118",
    studentName: "Ibrahim Sani Mohammed",
    department: "Medical Laboratory Science",
    program: "Medical Laboratory Technician (MLT)",
    level: "200 Level",
    session: "2024/2025 Academic Session",
    semester: "Second Semester",
    cgpa: 3.45,
    gpa: 3.50,
    courses: [
      { code: "MLT 221", title: "Clinical Chemistry & Blood Gas Analysis", unit: 3, score: 72, grade: "A", status: "Pass" },
      { code: "MLT 222", title: "Diagnostic Microbiology & Antimicrobial Sensitivity", unit: 3, score: 68, grade: "B", status: "Pass" },
      { code: "MLT 223", title: "Histotechnology & Tissue Processing", unit: 2, score: 65, grade: "B", status: "Pass" },
      { code: "MLT 224", title: "Hospital Laboratory Bench Rotation", unit: 4, score: 75, grade: "A", status: "Pass" }
    ],
    remarks: "Upper Credit Standing - Good Academic Standing",
    qrVerified: true
  },
  {
    matricNo: "HIN/PT/2024/009",
    studentName: "Amina Usman Bello",
    department: "Pharmaceutical Technology",
    program: "Pharmacy Technician (Pharm Tech)",
    level: "100 Level",
    session: "2024/2025 Academic Session",
    semester: "First Semester",
    cgpa: 3.65,
    gpa: 3.65,
    courses: [
      { code: "PHT 111", title: "General & Inorganic Chemistry", unit: 3, score: 74, grade: "A", status: "Pass" },
      { code: "PHT 112", title: "Pharmaceutics & Dispensing Calculations", unit: 3, score: 78, grade: "A", status: "Pass" },
      { code: "PHT 113", title: "Basic Human Physiology", unit: 3, score: 69, grade: "B", status: "Pass" },
      { code: "GNS 101", title: "Use of English & Medical Terminology", unit: 2, score: 77, grade: "A", status: "Pass" }
    ],
    remarks: "Upper Credit Standing",
    qrVerified: true
  }
];

export const MOCK_ADMISSION_CANDIDATES: AdmissionCandidate[] = [
  {
    appNumber: "HIN/2025/0842",
    fullName: "Ahmad Musa Suleiman",
    program: "Community Health Extension Worker (CHEW)",
    status: "Admitted",
    dateApplied: "July 14, 2025",
    screeningScore: 84,
    admissionBatch: "Batch 1 (Merit List)",
    acceptanceFeeStatus: "Paid",
    remarks: "Congratulations! You have been offered provisional admission. Report to Inkil Campus for physical credential screening and uniform measurement."
  },
  {
    appNumber: "HIN/2025/1109",
    fullName: "Zainab Kabir Aliyu",
    program: "Medical Laboratory Technician (MLT)",
    status: "Admitted",
    dateApplied: "July 20, 2025",
    screeningScore: 78,
    admissionBatch: "Batch 1 (Merit List)",
    acceptanceFeeStatus: "Pending",
    remarks: "Offered Provisional Admission into 3-Year National Diploma MLT. Please proceed to pay acceptance fee of N15,000 on or before September 15, 2025."
  },
  {
    appNumber: "HIN/2025/1420",
    fullName: "Yusuf Yakubu Daniel",
    program: "Pharmacy Technician (Pharm Tech)",
    status: "Screening Scheduled",
    dateApplied: "August 02, 2025",
    screeningScore: undefined,
    admissionBatch: "Batch 2 (Screening in Progress)",
    acceptanceFeeStatus: "Pending",
    remarks: "Your application has been received. Your physical screening & oral aptitude test is scheduled for Tuesday, 26th August 2025 at College CBT Center (8:00 AM)."
  },
  {
    appNumber: "HIN/2025/1805",
    fullName: "Hauwa Idris Mohammed",
    program: "Environmental Health Technology (EHT)",
    status: "Under Review",
    dateApplied: "August 10, 2025",
    screeningScore: undefined,
    admissionBatch: "Batch 2",
    acceptanceFeeStatus: "Pending",
    remarks: "O'Level subject verification ongoing. Ensure your uploaded WAEC/NECO scratch pin details are clear."
  }
];

export const WHY_CHOOSE_US = [
  {
    title: "100% Accredited Curriculum",
    description: "All programs conform with regulatory standards from CHPRBN, PCN, MLSCN, EHORECON, and WAHEB for guaranteed licensure.",
    icon: "ShieldCheck",
    color: "emerald"
  },
  {
    title: "Modern Hands-On Laboratories",
    description: "Fully equipped anatomy models, pathology analyzers, microbiology suites, and pharmacy compounding dispensaries.",
    icon: "FlaskConical",
    color: "blue"
  },
  {
    title: "Guaranteed Hospital Postings",
    description: "Active clinical rotations at Bauchi State Specialist Hospital, Abubakar Tafawa Balewa University Teaching Hospital (ATBUTH), and PHCs.",
    icon: "Hospital",
    color: "emerald"
  },
  {
    title: "Flexible Tuition Installments",
    description: "Student-friendly semester-by-semester payment schedules designed to support families without disrupting academic progress.",
    icon: "CreditCard",
    color: "blue"
  },
  {
    title: "Conducive Serene Campus",
    description: "Gated security, digital e-library, uninterrupted power support, hostel accommodation, and accessible transport along Inkil Gombe Road.",
    icon: "Building2",
    color: "emerald"
  },
  {
    title: "High Employment & Licensure Pass",
    description: "Over 95% pass rate in national professional licensing examinations, making our graduates top picks for state and international health jobs.",
    icon: "TrendingUp",
    color: "blue"
  }
];

export const ADMISSION_ROADMAP = [
  {
    step: "01",
    title: "Check Requirements",
    description: "Verify that you possess at least 5 O'Level credits (English, Maths, Biology, Chemistry, Physics) in WAEC/NECO/NABTEB.",
    badge: "5 Credits Req."
  },
  {
    step: "02",
    title: "Complete Online Application",
    description: "Fill the interactive multi-step admission form, upload your passport photograph and credentials, and generate your application invoice.",
    badge: "Online Portal"
  },
  {
    step: "03",
    title: "CBT Screening & Interview",
    description: "Attend the computer-based entrance screening and oral interview held at our ICT Centre, Inkil Unguwan Magaji Campus.",
    badge: "Aptitude Test"
  },
  {
    step: "04",
    title: "Admission Letter & Clearance",
    description: "Check your admission status online, print your official provisional offer letter, pay acceptance fee, and begin departmental registration.",
    badge: "Instant Offer Letter"
  }
];

export const CAMPUS_FACILITIES = [
  {
    title: "Clinical Simulation & Skills Lab",
    category: "Academic",
    description: "Realistic hospital ward simulation with patient mannequins, vital sign monitors, and emergency primary care gear.",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Molecular & Microbiology Laboratory",
    category: "Diagnostic",
    description: "Modern automated microscopes, incubators, centrifuges, and sterile culture hoods for hematology and pathology practicals.",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "E-Library & Digital Resource Center",
    category: "Research",
    description: "50+ high-speed workstations with 24/7 access to medical journals, WHO publications, and health textbooks.",
    image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Model Pharmacy & Compounding Unit",
    category: "Pharmaceutical",
    description: "Practical dispensing counter, tablet formulation equipment, and medicine storage simulation for Pharmacy Tech students.",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "College ICT Center & CBT Hall",
    category: "Technology",
    description: "Air-conditioned 120-seater examination hall for digital course registration, computer training, and electronic testing.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Sports Complex & Student Pavilion",
    category: "Recreation",
    description: "Football pitch, volleyball court, badminton, and outdoor relaxation areas promoting active physical wellness.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80"
  }
];

export const TESTIMONIALS = [
  {
    name: "Hajiya Maryam S. Bello",
    role: "Senior CHEW, Bauchi Urban Primary Health Center",
    gradYear: "Class of 2021",
    quote: "HINSAD prepared me thoroughly for the practical realities of community health. The clinical postings at Bauchi Specialist Hospital gave me hands-on confidence from day one.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Pharm. Tech Emmanuel Danladi",
    role: "Dispensary Lead, Standard Pharmacy Bauchi",
    gradYear: "Class of 2022",
    quote: "The pharmacy compounding labs and seasoned tutors at HINSAD are top notch. I passed my Pharmacy Council exams on the first attempt with flying colors.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    name: "Aliyu Mohammed Garba",
    role: "Environmental Health Officer, BASEPA",
    gradYear: "Class of 2023",
    quote: "The practical sanitation and waste management projects during our course set HINSAD graduates apart. We were ready for field deployment immediately after graduation.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export const FAQ_ITEMS = [
  {
    q: "Is HINSAD College of Health Technology accredited?",
    a: "Yes! All our health technology diploma and certificate programs are fully approved and aligned with national professional regulatory bodies including CHPRBN, PCN, MLSCN, EHORECON, and WAHEB."
  },
  {
    q: "What are the basic admission requirements for CHEW and Pharmacy Tech?",
    a: "Candidates must have at least 5 O'Level credits (WAEC/NECO/NABTEB) in English Language, Mathematics, Biology, Chemistry, and Physics in not more than two sittings."
  },
  {
    q: "Where is the campus located in Bauchi?",
    a: "The permanent college campus is located at Inkil Unguwan Magaji, along Gombe Road, Bauchi, Bauchi State, Nigeria. It is easily accessible via public and private transport."
  },
  {
    q: "Can I pay my tuition in installments?",
    a: "Yes. HINSAD provides flexible semester payment plans to make quality health education accessible without financial strain."
  },
  {
    q: "How do I check my semester results or verify transcripts?",
    a: "Students can log in to the Student E-Portal using their Matriculation Number. Employers or screening committees can also use our online Result Verifier with the student PIN."
  }
];
