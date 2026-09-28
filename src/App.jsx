import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { CelestialBackground } from "./components/CelestialBackground";
import { useCelestialTheme } from "./hooks/useCelestialTheme";
import { ProjectModal } from "./components/ProjectModal";
import { BlogModal } from "./components/BlogModal";
import { ResumeModal } from "./components/ResumeModal";
import { LearningModal } from "./components/LearningModal";
import { GiftForCodersModal } from "./components/GiftForCodersModal";

import { HeroSection } from "./sections/HeroSection";
import { AboutSection } from "./sections/AboutSection";
import { CertificatesSection } from "./sections/CertificatesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { HackathonsSection } from "./sections/HackathonsSection";
import { GiftForCodersSection } from "./sections/GiftForCodersSection";
import { BlogSection } from "./sections/BlogSection";
import { GithubSection } from "./sections/GithubSection";
import { ResumeSection } from "./sections/ResumeSection";
import { ContactSection } from "./sections/ContactSection";

export default function App() {
  const celestialTheme = useCelestialTheme();

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [learningOpen, setLearningOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [selectedGiftNoteId, setSelectedGiftNoteId] = useState("c-lang");
  const lenisRef = useRef(null);

  const handleOpenGift = (noteId = "c-lang") => {
    setSelectedGiftNoteId(noteId);
    setGiftOpen(true);
  };

  // Check URL hash for direct links like #gift or #gift-for-coders
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#gift" || hash === "#gift-for-coders" || hash === "#gifts") {
        const noteParam = new URLSearchParams(window.location.search).get("note");
        handleOpenGift(noteParam || "c-lang");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  // Initialize smooth scroll using Lenis
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    try {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });

      lenisRef.current = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    } catch (err) {
      // Fallback to browser smooth scrolling
    }

    return () => {
      if (lenisRef.current) lenisRef.current.destroy();
    };
  }, []);

  // Pause background smooth scroll when any modal is open
  useEffect(() => {
    const isAnyModalOpen = Boolean(selectedProject || selectedPost || resumeOpen || learningOpen || giftOpen);
    if (lenisRef.current) {
      if (isAnyModalOpen) {
        lenisRef.current.stop();
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      } else {
        lenisRef.current.start();
        document.body.style.overflow = "unset";
        document.documentElement.style.overflow = "unset";
      }
    }
  }, [selectedProject, selectedPost, resumeOpen, learningOpen, giftOpen]);

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 selection:bg-[#A855F7] selection:text-white ${
        celestialTheme.isLight ? "bg-[#F8FAFC] text-[#0F172A]" : "bg-[#030014] text-white"
      }`}
    >
      {/* Real-time India IST Sun & Moon Celestial Canvas Background */}
      <CelestialBackground
        effectiveTheme={celestialTheme.effectiveTheme}
        activeBody={celestialTheme.activeBody}
        celestialX={celestialTheme.x}
        celestialY={celestialTheme.y}
        progress={celestialTheme.progress}
        phase={celestialTheme.phase}
      />

      {/* Floating Header / Navbar with Indian Time Sun/Moon Theme Engine */}
      <Navbar
        onOpenResume={() => setResumeOpen(true)}
        onOpenLearning={() => setLearningOpen(true)}
        onOpenGift={handleOpenGift}
        {...celestialTheme}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection
          onOpenResume={() => setResumeOpen(true)}
          onOpenLearning={() => setLearningOpen(true)}
        />
        <AboutSection />
        <CertificatesSection onOpenLearning={() => setLearningOpen(true)} />
        <ProjectsSection onSelectProject={(p) => setSelectedProject(p)} />
        <HackathonsSection onSelectProject={(p) => setSelectedProject(p)} />
        <GiftForCodersSection onOpenGiftModal={handleOpenGift} />
        <BlogSection onSelectPost={(post) => setSelectedPost(post)} />
        <GithubSection />
        <ResumeSection onOpenResume={() => setResumeOpen(true)} />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenLearning={() => setLearningOpen(true)}
        onOpenGift={handleOpenGift}
      />

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

      {/* Dedicated Gift for Coders Interactive Modal */}
      <GiftForCodersModal
        isOpen={giftOpen}
        initialNoteId={selectedGiftNoteId}
        onClose={() => setGiftOpen(false)}
      />
    </div>
  );
}
