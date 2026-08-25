import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { AccreditationRibbon } from './components/AccreditationRibbon';
import { CourseFinder } from './components/CourseFinder';
import { AdmissionEligibilityChecker } from './components/AdmissionEligibilityChecker';
import { CampusFacilitiesShowcase } from './components/CampusFacilitiesShowcase';
import { TestimonialCarousel } from './components/TestimonialCarousel';
import { FastAccessDownloads } from './components/FastAccessDownloads';
import { WhatsAppQuickChat } from './components/WhatsAppQuickChat';
import { StatsCounter } from './components/StatsCounter';
import { ProgramsGrid } from './components/ProgramsGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { AdmissionRoadmap } from './components/AdmissionRoadmap';
import { CampusLife } from './components/CampusLife';
import { NewsAndEvents } from './components/NewsAndEvents';
import { LocationMap } from './components/LocationMap';
import { Footer } from './components/Footer';
import { AboutSection } from './components/AboutSection';
import { AdmissionsSection } from './components/AdmissionsSection';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Modals
import { ApplyModal } from './components/ApplyModal';
import { AdmissionStatusModal } from './components/AdmissionStatusModal';
import { StudentPortalModal } from './components/StudentPortalModal';
import { StaffPortalModal } from './components/StaffPortalModal';
import { ResultCheckerModal } from './components/ResultCheckerModal';
import { ProgramDetailModal } from './components/ProgramDetailModal';
import { GoogleClassroomPortal } from './components/GoogleClassroomPortal';
import { AuthModal } from './components/AuthModal';


import { TabType, Program } from './types';
import { GraduationCap, Sparkles, ArrowRight, Bell, Calendar, Download } from 'lucide-react';
import { COLLEGE_INFO } from './data/mockData';

function MainApp() {
  const { isDay } = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('home');

  // Modal States
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [selectedProgramForApply, setSelectedProgramForApply] = useState<string | undefined>(undefined);

  const [isStatusCheckOpen, setIsStatusCheckOpen] = useState(false);
  const [statusCheckQuery, setStatusCheckQuery] = useState('');

  const [isStudentPortalOpen, setIsStudentPortalOpen] = useState(false);
  const [isStaffPortalOpen, setIsStaffPortalOpen] = useState(false);
  const [isResultCheckerOpen, setIsResultCheckerOpen] = useState(false);

  const [selectedProgramForDetail, setSelectedProgramForDetail] = useState<Program | null>(null);

  // Handlers
  const handleOpenApply = (programName?: string) => {
    setSelectedProgramForApply(programName);
    setIsApplyOpen(true);
  };

  const handleOpenStatusCheck = (query?: string) => {
    setStatusCheckQuery(query || '');
    setIsStatusCheckOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-[#065F46] selection:text-white transition-colors duration-300 ${
      isDay ? 'bg-[#FAF7F2] text-[#14281E]' : 'bg-[#0A1017] text-[#F1F5F9]'
    }`}>
      {/* Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenApply={() => handleOpenApply()}
        onOpenStatusCheck={() => handleOpenStatusCheck()}
        onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
        onOpenStaffPortal={() => setIsStaffPortalOpen(true)}
        onOpenResultChecker={() => setIsResultCheckerOpen(true)}
      />

      {/* Clean Top Admissions Announcement Ribbon */}
      <div className={`text-white text-xs py-2 px-4 border-b shadow-xs transition-colors duration-300 ${
        isDay 
          ? 'bg-gradient-to-r from-[#044E3B] via-[#065F46] to-[#047857] border-emerald-800'
          : 'bg-gradient-to-r from-slate-950 via-[#07241A] to-slate-950 border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-400"></span>
            </span>
            <span className="font-bold tracking-wide">
              2025/2026 Academic Session Admissions Active:
            </span>
            <span className="hidden sm:inline text-emerald-100">
              Applications are ongoing for CHEW, MLT, Pharmacy Tech, HIM &amp; Environmental Health.
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenApply()}
              className="px-3 py-1 rounded-full bg-white text-[#065F46] hover:bg-emerald-50 font-bold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Apply Online</span>
              <ArrowRight className="w-3 h-3 text-[#065F46]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Dynamic Content Area based on activeTab */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div>
            {/* 1. Hero Section */}
            <HeroSlider
              onOpenApply={() => handleOpenApply()}
              onOpenStatusCheck={(q) => handleOpenStatusCheck(q)}
              onExplorePrograms={() => {
                const el = document.getElementById('course-finder-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else setActiveTab('programs');
              }}
            />

            {/* 2. Regulatory Health Boards & Accreditation Ribbon */}
            <AccreditationRibbon />

            {/* 3. Interactive Course Finder & Department Filter */}
            <div id="course-finder-section">
              <CourseFinder
                onSelectProgram={(program) => setSelectedProgramForDetail(program)}
                onApply={(programName) => handleOpenApply(programName)}
              />
            </div>

            {/* 4. Interactive Admission Requirements & O'Level Evaluation Checker */}
            <AdmissionEligibilityChecker
              onApply={(programName) => handleOpenApply(programName)}
            />

            {/* 5. Statistics Counter */}
            <StatsCounter />

            {/* 6. Campus Laboratory & Facilities Showcase */}
            <CampusFacilitiesShowcase />

            {/* 7. Comprehensive Academic Programs Grid */}
            <ProgramsGrid
              onSelectProgram={(program) => setSelectedProgramForDetail(program)}
              onApply={(programName) => handleOpenApply(programName)}
            />

            {/* 8. Institutional Highlights & Why Choose Us */}
            <WhyChooseUs onOpenApply={() => handleOpenApply()} />

            {/* 9. Admission Roadmap */}
            <AdmissionRoadmap
              onOpenApply={() => handleOpenApply()}
              onOpenStatusCheck={() => handleOpenStatusCheck()}
            />

            {/* 10. Student & Alumni Success Stories Carousel */}
            <TestimonialCarousel />

            {/* 11. Fast-Access Downloads & PDF Resources */}
            <FastAccessDownloads />

            {/* 12. Campus Life */}
            <CampusLife />

            {/* 13. News & Events */}
            <NewsAndEvents onOpenApply={() => handleOpenApply()} />

            {/* 14. Location & Campus Directions */}
            <LocationMap />
          </div>
        )}

        {activeTab === 'about' && (
          <div>
            <AboutSection onOpenApply={() => handleOpenApply()} />
            <AccreditationRibbon />
            <CampusFacilitiesShowcase />
            <WhyChooseUs onOpenApply={() => handleOpenApply()} />
            <CampusLife />
            <LocationMap />
          </div>
        )}

        {activeTab === 'programs' && (
          <div className="py-6 bg-slate-900">
            <CourseFinder
              onSelectProgram={(program) => setSelectedProgramForDetail(program)}
              onApply={(programName) => handleOpenApply(programName)}
            />
            <div className="bg-white py-12">
              <ProgramsGrid
                onSelectProgram={(program) => setSelectedProgramForDetail(program)}
                onApply={(programName) => handleOpenApply(programName)}
              />
            </div>
            <AccreditationRibbon />
            <AdmissionEligibilityChecker
              onApply={(programName) => handleOpenApply(programName)}
            />
          </div>
        )}

        {activeTab === 'admissions' && (
          <div>
            <AdmissionsSection
              onOpenApply={() => handleOpenApply()}
              onOpenStatusCheck={() => handleOpenStatusCheck()}
            />
            <AdmissionEligibilityChecker
              onApply={(programName) => handleOpenApply(programName)}
            />
            <FastAccessDownloads />
            <AdmissionRoadmap
              onOpenApply={() => handleOpenApply()}
              onOpenStatusCheck={() => handleOpenStatusCheck()}
            />
          </div>
        )}

        {activeTab === 'classroom' && (
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <GoogleClassroomPortal />
          </div>
        )}

        {activeTab === 'campus' && (
          <div className="py-6 bg-slate-950">
            <CampusFacilitiesShowcase />
            <div className="bg-slate-50 py-12">
              <CampusLife />
              <WhyChooseUs onOpenApply={() => handleOpenApply()} />
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="py-12 bg-white">
            <NewsAndEvents onOpenApply={() => handleOpenApply()} />
            <FastAccessDownloads />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="py-12 bg-slate-50">
            <LocationMap />
            <FastAccessDownloads />
          </div>
        )}
      </main>

      {/* Floating Day/Night Mode Switcher Button */}
      <ThemeToggle variant="floating" />

      {/* Global WhatsApp Quick-Chat Floating Widget */}
      <WhatsAppQuickChat />

      {/* Global Modals */}
      <ApplyModal
        isOpen={isApplyOpen}
        onClose={() => setIsApplyOpen(false)}
        defaultProgramName={selectedProgramForApply}
      />

      <AdmissionStatusModal
        isOpen={isStatusCheckOpen}
        onClose={() => setIsStatusCheckOpen(false)}
        initialQuery={statusCheckQuery}
        onOpenApply={() => {
          setIsStatusCheckOpen(false);
          handleOpenApply();
        }}
      />

      <StudentPortalModal
        isOpen={isStudentPortalOpen}
        onClose={() => setIsStudentPortalOpen(false)}
        onOpenClassroom={() => setActiveTab('classroom')}
      />

      <StaffPortalModal
        isOpen={isStaffPortalOpen}
        onClose={() => setIsStaffPortalOpen(false)}
        onOpenClassroom={() => setActiveTab('classroom')}
      />

      <ResultCheckerModal
        isOpen={isResultCheckerOpen}
        onClose={() => setIsResultCheckerOpen(false)}
      />

      <ProgramDetailModal
        program={selectedProgramForDetail}
        onClose={() => setSelectedProgramForDetail(null)}
        onApply={(programName) => handleOpenApply(programName)}
      />

      {/* Global Authentication Modal (Login / Register / Forgot Password) */}
      <AuthModal />

      {/* Global Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenApply={() => handleOpenApply()}
        onOpenStatusCheck={() => handleOpenStatusCheck()}
        onOpenStudentPortal={() => setIsStudentPortalOpen(true)}
        onOpenStaffPortal={() => setIsStaffPortalOpen(true)}
        onOpenResultChecker={() => setIsResultCheckerOpen(true)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}


