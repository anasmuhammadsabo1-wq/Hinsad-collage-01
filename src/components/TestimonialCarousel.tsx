import React, { useState, useEffect } from 'react';
import { 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Award, 
  Hospital, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  Building2
} from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  program: string;
  gradYear: string;
  workplace: string;
  image: string;
  quote: string;
  licensingScore: string;
  highlight: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aisha Mohammed Garba",
    role: "Licensed Community Health Officer (CHEW)",
    program: "Community Health Extension Worker (CHEW ND)",
    gradYear: "Class of 2023",
    workplace: "Bauchi State Primary Health Care Development Agency (BSPHCDA)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    quote: "The hands-on clinical postings at HINSAD gave me real hospital competence before I graduated. I passed the CHPRBN National Licensing Exam with distinctions on my very first attempt!",
    licensingScore: "Distinction in CHPRBN Boards",
    highlight: "Now managing a rural maternal clinic"
  },
  {
    name: "Pharm. Tech. Usman Ibrahim Bello",
    role: "Hospital Pharmacy Technician",
    program: "Pharmacy Technician Studies",
    gradYear: "Class of 2022",
    workplace: "Abubakar Tafawa Balewa University Teaching Hospital (ATBUTH), Bauchi",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    quote: "The pharmacy compounding lab at HINSAD is equipped exactly like a federal teaching hospital pharmacy. My transition into ATBUTH hospital pharmacy was completely seamless.",
    licensingScore: "Certified by Pharmacy Council (PCN)",
    highlight: "Specialist in extemporaneous compounding"
  },
  {
    name: "Fatima Danladi",
    role: "Certified Medical Laboratory Technician",
    program: "Medical Laboratory Technician (MLT ND)",
    gradYear: "Class of 2024",
    workplace: "State Specialist Hospital Bauchi, Pathology Department",
    image: "https://images.unsplash.com/photo-1594824813533-4506e44b82d4?auto=format&fit=crop&w=600&q=80",
    quote: "Our diagnostic lecturers were clinicians from tertiary hospitals who mentored us through every blood chemistry assay, parasitology slide, and biosafety protocol. HINSAD is truly exceptional.",
    licensingScore: "Licensed by MLSCN Nigeria",
    highlight: "100% Diagnostic Accuracy Record"
  },
  {
    name: "Haruna Shehu",
    role: "Health Informatics & EMR Officer",
    program: "Health Information Management (HIM ND)",
    gradYear: "Class of 2023",
    workplace: "General Hospital Toro & UNICEF Field Project",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    quote: "Learning ICD-10 medical coding and OpenMRS software in HINSAD's CBT ICT Center gave me a huge technological edge in the healthcare labor market.",
    licensingScore: "HRORBN Indexed & Certified",
    highlight: "Health Data Analyst & Researcher"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
    }, 7500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="w-full py-14 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>Alumni Impact &amp; Career Outcomes</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white font-display">
            Proud HINSAD Diplomates Serving Across Nigeria
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Hear from licensed healthcare practitioners who launched their clinical careers through our accredited diplomas.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto bg-slate-800/90 rounded-3xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Avatar & Badges */}
            <div className="md:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden ring-4 ring-emerald-500/40 shadow-xl">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md">
                  <Award className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white font-display">{current.name}</h3>
                <p className="text-xs text-emerald-400 font-semibold">{current.program}</p>
                <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">{current.gradYear}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/20 text-blue-300 text-[11px] font-bold">
                <CheckCircle2 className="w-3 h-3 text-blue-400" />
                <span>{current.licensingScore}</span>
              </div>
            </div>

            {/* Right: Quote & Workplace */}
            <div className="md:col-span-8 space-y-6">
              <div className="relative">
                <Quote className="w-10 h-10 text-emerald-500/20 absolute -top-4 -left-2 pointer-events-none" />
                <p className="text-base sm:text-lg text-slate-200 italic font-medium leading-relaxed relative z-10 pl-4 border-l-2 border-emerald-500/50">
                  &quot;{current.quote}&quot;
                </p>
              </div>

              {/* Current Workplace Card */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-blue-900/40 text-blue-400 border border-blue-500/20 shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-slate-400 block font-semibold uppercase tracking-wider">Current Clinical Workplace</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">{current.workplace}</span>
                  <span className="text-xs text-emerald-400 font-medium mt-0.5 block">✓ {current.highlight}</span>
                </div>
              </div>

              {/* Rating stars */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-400 ml-2">5.0 Clinical Training Rating</span>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="p-2 rounded-xl bg-slate-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono text-slate-400 px-1">
                    {currentIndex + 1} / {TESTIMONIALS.length}
                  </span>
                  <button
                    onClick={handleNext}
                    className="p-2 rounded-xl bg-slate-700 hover:bg-emerald-600 text-white transition-colors cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
