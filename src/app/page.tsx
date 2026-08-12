"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CertificationsAndPatents from "@/components/CertificationsAndPatents";
import ResumeSection from "@/components/ResumeSection";
import ContactSection from "@/components/ContactSection";
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal";
import CursorGlow from "@/components/CursorGlow";
import Footer from "@/components/Footer";

export default function Home() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#080808] text-[#F5F5F5] relative overflow-hidden">
      {/* Subtle cursor spotlight effect for desktop */}
      <CursorGlow />

      {/* Fixed Navigation Header */}
      <Navbar onOpenScheduleModal={() => setScheduleModalOpen(true)} />

      {/* Hero Section with Interactive CLI Terminal */}
      <Hero onOpenScheduleModal={() => setScheduleModalOpen(true)} />

      {/* Section 01: About & Visual Engineering Pillars */}
      <About />

      {/* Section 02: Experience (Klinn AI) */}
      <Experience />

      {/* Section 03: Grouped Tech Stack Competencies */}
      <Skills />

      {/* Section 04: Projects & System Architecture Modals */}
      <Projects />

      {/* Section 05: Registered Patent & Accredited Certifications */}
      <CertificationsAndPatents />

      {/* Resume Section */}
      <ResumeSection />

      {/* Section 06: Contact & Direct Messaging */}
      <ContactSection onOpenScheduleModal={() => setScheduleModalOpen(true)} />

      {/* Footer */}
      <Footer />

      {/* Interactive Google Meet Scheduling Engine Modal */}
      <ScheduleMeetingModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
      />
    </main>
  );
}
