import React, { useState, useEffect } from "react";
import Lenis from "lenis";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProjectModal } from "./components/ProjectModal";
import { BlogModal } from "./components/BlogModal";
import { ResumeModal } from "./components/ResumeModal";
import { LearningModal } from "./components/LearningModal";

import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { CertificatesSection } from "./sections/CertificatesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { HackathonsSection } from "./sections/HackathonsSection";
import { BlogSection } from "./sections/BlogSection";
import { GithubSection } from "./sections/GithubSection";
import { ResumeSection } from "./sections/ResumeSection";
import { ContactSection } from "./sections/ContactSection";

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);

  // Initialize smooth scroll using Lenis
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    } catch (err) {
      // Fallback to browser smooth scrolling
    }

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#F7F7F3] text-[#111111] overflow-x-hidden selection:bg-[#123C2F] selection:text-[#F7F7F3]">
      {/* Dynamic Interactive Cursor (Desktop) */}
      <CustomCursor />

      {/* Floating Header / Navbar */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenLearning={() => setLearningOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative">
        <HeroSection
          onOpenResume={() => setResumeOpen(true)}
          onOpenLearning={() => setLearningOpen(true)}
        />
        <AboutSection />
        <CertificatesSection onOpenLearning={() => setLearningOpen(true)} />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        <HackathonsSection onSelectProject={(p) => setSelectedProject(p)} />
        <BlogSection onSelectPost={(post) => setSelectedPost(post)} />
        <GithubSection />
        <ResumeSection onOpenResume={() => setResumeOpen(true)} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenLearning={() => setLearningOpen(true)} />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />

      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Dedicated Learning & Specializations Modal */}
      <LearningModal
        isOpen={learningOpen}
        onClose={() => setLearningOpen(false)}
      />
    </div>
  );
}

