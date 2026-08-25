import React, { useState } from 'react';
import { 
  Building, 
  FlaskConical, 
  Monitor, 
  HeartPulse, 
  Pill, 
  FileSpreadsheet, 
  Sparkles, 
  CheckCircle2, 
  Maximize2,
  X,
  Stethoscope
} from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  category: string;
  tag: string;
  image: string;
  description: string;
  equipment: string[];
  capacity: string;
  practicalUse: string;
}

const FACILITIES: Facility[] = [
  {
    id: 'demo-ward',
    name: 'Clinical Skills Lab & Demonstration Ward',
    category: 'Clinical Training',
    tag: 'Hospital Simulation',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    description: 'A 24-bed clinical simulation ward modeled after federal teaching hospitals, equipped with computerized anatomical mannequins, maternal-infant birth simulators, and oxygen delivery systems.',
    equipment: [
      'Interactive Maternal & Neonatal Resuscitation Mannequins',
      'Hospital Beds with Infusion Stands & Patient Monitors',
      'Clinical Triage & Vital Signs Monitoring Stations',
      'Sterilization Autoclaves & Dressing Trays'
    ],
    capacity: '40 Students per Practical Session',
    practicalUse: 'Primary Healthcare simulations, maternal-child health clinics, wound care, catheterization, and emergency first aid drills.'
  },
  {
    id: 'pharmacy-lab',
    name: 'Pharmacy Compounding & Formulation Suite',
    category: 'Pharmaceutical Sciences',
    tag: 'PCN Regulated',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80',
    description: 'Purpose-built pharmaceutical laboratory containing sterile laminar airflow cabinets, precision analytical balances, compounding mortars, and pharmaceutical formulation testing kits.',
    equipment: [
      'Class II Laminar Flow Clean Benches',
      'Digital Analytical Micro-Balances (0.0001g)',
      'Ointment Slabs, Pill Tiles & Tablet Dissolution Baths',
      'Dispensing Counters with Simulated Retail & Hospital Software'
    ],
    capacity: '35 Students per Practical Batch',
    practicalUse: 'Extemporaneous compounding, sterile preparations, dosage calculation, pharmaceutical chemistry analysis, and patient counseling simulations.'
  },
  {
    id: 'medlab-pathology',
    name: 'Medical Diagnostics & Pathology Laboratory',
    category: 'Medical Diagnostics',
    tag: 'MLSCN Standard',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80',
    description: 'Advanced diagnostic pathology lab fitted with binocular compound microscopes, hematology analyzers, clinical centrifuges, and biochemical test reagents.',
    equipment: [
      'Olympus Binocular Compound Microscopes',
      'Automated Hematocrit & Clinical Centrifuges',
      'Spectrophotometers & Colorimeters for Biochemistry',
      'Biosafety Cabinets & Culture Incubators'
    ],
    capacity: '50 Students per Session',
    practicalUse: 'Parasitology, clinical hematology, urinalysis, stool examination, blood group typing, bacterial staining, and diagnostic biochemical assays.'
  },
  {
    id: 'ict-cbt',
    name: 'Digital Library & CBT Examination Center',
    category: 'Digital Learning',
    tag: 'High-Speed Fiber',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    description: 'Air-conditioned modern computing center with 150+ high-performance workstations connected to dedicated solar power and uninterrupted Starlink broadband.',
    equipment: [
      '150+ Core i5 Desktop Computer Workstations',
      'Dedicated Starlink Satellite High-Speed Internet',
      'Online Medical Journals & WHO E-Library Access',
      'Automated CBT Examination & Mock Testing Server'
    ],
    capacity: '150 Students Simultaneously',
    practicalUse: 'National board mock exams (CHPRBN / PCN), biostatistics analysis, computer applications in healthcare, and health informatics.'
  },
  {
    id: 'him-lab',
    name: 'Health Information & Medical Records Suite',
    category: 'Health Informatics',
    tag: 'HRORBN Compliant',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    description: 'Hands-on training unit for physical and electronic medical record management, disease indexing, ICD-10 clinical coding, and biometric patient registration.',
    equipment: [
      'OpenMRS & Electronic Medical Records (EMR) Testbed',
      'ICD-10 & ICPC-2 Diagnostic Coding Manuals & Terminals',
      'Physical Terminal Digit Medical Records Filing Units',
      'Biometric Patient Archiving & Card Printers'
    ],
    capacity: '40 Students per Batch',
    practicalUse: 'Health data classification, statistical epidemiologic charts, disease surveillance reporting, and clinical audit processes.'
  },
  {
    id: 'anatomy-theatre',
    name: 'Human Anatomy & Physiology Science Theatre',
    category: 'Basic Medical Science',
    tag: '3D Anatomical Models',
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
    description: 'Specialized demonstration theatre showcasing articulated human skeleton models, muscular and nervous system torso models, and organ dissection apparatus.',
    equipment: [
      'Life-Size Articulated Human Skeletons',
      'Dissectible Dual-Sex Torso & Organ System Models',
      'Physiological ECG & Blood Pressure Demonstration Systems',
      'High-Definition Projectors for 3D Histology Slides'
    ],
    capacity: '60 Students per Session',
    practicalUse: 'Comprehensive macroscopic and microscopic structural human anatomy, cardiovascular physiology, and biomechanics demonstrations.'
  }
];

export const CampusFacilitiesShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState(FACILITIES[0].id);
  const [enlargedImage, setEnlargedImage] = useState<Facility | null>(null);

  const currentFacility = FACILITIES.find(f => f.id === activeTab) || FACILITIES[0];

  return (
    <section className="w-full py-14 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Infrastructure &amp; Laboratory Excellence</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
            Explore Our World-Class Practical Training Facilities
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            HINSAD College bridges academic theory with clinical mastery through 6 dedicated specialized laboratories and clinical simulation suites.
          </p>
        </div>

        {/* Tab Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin mb-8">
          {FACILITIES.map((fac) => (
            <button
              key={fac.id}
              onClick={() => setActiveTab(fac.id)}
              className={`px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2.5 cursor-pointer border ${
                activeTab === fac.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-400/50 shadow-lg shadow-emerald-950/50 scale-102'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border-slate-800'
              }`}
            >
              <FlaskConical className={`w-4 h-4 ${activeTab === fac.id ? 'text-white' : 'text-emerald-400'}`} />
              <span>{fac.name.split(' ')[0]} {fac.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        {/* Selected Facility Display Bento Card */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Image with Zoom overlay */}
            <div className="lg:col-span-6 relative rounded-2xl overflow-hidden group shadow-xl">
              <img
                src={currentFacility.image}
                alt={currentFacility.name}
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.9]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>{currentFacility.tag}</span>
              </div>

              <button
                onClick={() => setEnlargedImage(currentFacility)}
                className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-slate-950/80 hover:bg-emerald-600 text-white backdrop-blur-md transition-colors cursor-pointer"
                title="Enlarge facility photo"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 text-xs font-semibold text-slate-300">
                <span>Capacity: <strong>{currentFacility.capacity}</strong></span>
              </div>
            </div>

            {/* Right: Technical Specs & Equipment */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider font-mono">
                  {currentFacility.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display mt-1">
                  {currentFacility.name}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed font-normal">
                  {currentFacility.description}
                </p>
              </div>

              {/* Practical Use Case */}
              <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-xs font-bold text-emerald-400 block uppercase tracking-wider mb-1">
                  Hands-On Clinical Curriculum Application:
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-normal">
                  {currentFacility.practicalUse}
                </p>
              </div>

              {/* Equipment List */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                  Key Lab Equipment &amp; Features:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {currentFacility.equipment.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-2 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Enlarged Modal View */}
      {enlargedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={enlargedImage.image}
              alt={enlargedImage.name}
              className="w-full max-h-[70vh] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 text-white">
              <h4 className="text-lg font-bold font-display">{enlargedImage.name}</h4>
              <p className="text-xs text-slate-400 mt-1">{enlargedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
