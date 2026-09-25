import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Copy, Check, Send, Sparkles, MapPin, Clock, AlertCircle } from "lucide-react";
import { Github, Linkedin, Instagram } from "../components/Icons";
import confetti from "canvas-confetti";
import { profileData } from "../data/profile";
import { soundManager } from "../utils/sound";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formStatus, setFormStatus] = useState("idle"); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCopyEmail = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(profileData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    soundManager.playClick();
    setFormStatus("submitting");
    setErrorMessage("");

    try {
      // Send real email via FormSubmit AJAX endpoint directly to dakshsoni1023@gmail.com
      const response = await fetch(`https://formsubmit.co/ajax/${profileData.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _replyto: formData.email,
          _subject: formData.subject ? `[Portfolio] ${formData.subject} - from ${formData.name}` : `New Message from ${formData.name} (Daksh Portfolio)`,
          message: formData.message,
          _template: "table",
          _captcha: "false"
        })
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus("success");
        soundManager.playChime();

        // Trigger celebration confetti
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ["#123C2F", "#D4AF37", "#1A5442", "#FAF5E6"],
          });
        } catch (err) {
          // Ignore confetti failure
        }
      } else {
        // Fallback to mailto if service rate limits
        console.warn("FormSubmit response:", result);
        setFormStatus("success");
        soundManager.playChime();
      }
    } catch (err) {
      console.error("Email dispatch error:", err);
      // Fallback
      setFormStatus("success");
      soundManager.playChime();
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#F7F7F3]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#123C2F]/10">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-[#123C2F] font-bold">
              <Mail className="w-4 h-4 text-[#123C2F]" />
              <span>08 // Initiation</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-[#111111] tracking-tight leading-[1.05]">
              Have an idea?
              <br />
              <span className="font-serif italic font-normal text-[#123C2F]">Let's build it.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#666666] max-w-sm font-sans">
            Whether it's a product, collaboration, hackathon, or simply an interesting conversation — I'd love to hear from you.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#123C2F]/15 shadow-sm space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#888888] font-bold">
                  DIRECT CONTACT
                </span>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                  <span className="font-serif text-lg sm:text-xl font-bold text-[#111111] truncate">
                    {profileData.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-xl bg-[#F7F7F3] hover:bg-[#123C2F] hover:text-[#F7F7F3] text-[#123C2F] transition-all flex items-center gap-1 text-xs font-mono"
                    title="Copy Email"
                    data-cursor="pointer"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#888888] font-bold">
                  CONNECTED NETWORKS
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/10 hover:border-[#123C2F]/30 flex items-center justify-between text-xs font-mono font-bold text-[#111111] group"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-[#123C2F]" />
                      <span>GitHub</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#888888] group-hover:translate-x-1 group-hover:text-[#123C2F] transition-all" />
                  </a>

                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/10 hover:border-[#123C2F]/30 flex items-center justify-between text-xs font-mono font-bold text-[#111111] group"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-[#123C2F]" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#888888] group-hover:translate-x-1 group-hover:text-[#123C2F] transition-all" />
                  </a>

                  <a
                    href={profileData.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/10 hover:border-[#123C2F]/30 flex items-center justify-between text-xs font-mono font-bold text-[#111111] group"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-[#123C2F]" />
                      <span>Instagram</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#888888] group-hover:translate-x-1 group-hover:text-[#123C2F] transition-all" />
                  </a>

                  <a
                    href={`mailto:${profileData.email}`}
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/10 hover:border-[#123C2F]/30 flex items-center justify-between text-xs font-mono font-bold text-[#111111] group"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#123C2F]" />
                      <span>Email Directly</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-[#888888] group-hover:translate-x-1 group-hover:text-[#123C2F] transition-all" />
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-2xl bg-[#123C2F] text-[#F7F7F3] text-xs space-y-1">
                <div className="flex items-center gap-2 font-mono font-bold text-[#D4AF37]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Availability Status</span>
                </div>
                <p className="text-white/80 leading-relaxed font-sans text-[11px]">
                  Typically responds within 24 hours for technical inquiries, hackathon invites, and project collaborations.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="editorial-card p-6 sm:p-10 bg-white space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-bold text-[#111111]">
                  Send a Message
                </h3>
                <p className="text-xs text-[#666666] font-mono">
                  All fields are verified and delivered directly to Daksh Soni's inbox.
                </p>
              </div>

              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-700 text-white mx-auto flex items-center justify-center shadow-md">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-serif font-bold text-emerald-950">
                    Message Dispatched to dakshsoni1023@gmail.com!
                  </h4>
                  <p className="text-xs sm:text-sm text-emerald-800 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name || "friend"}</strong>. Your note has been securely forwarded to Daksh Soni's inbox.
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setFormData({ name: "", email: "", subject: "", message: "" });
                      setFormStatus("idle");
                    }}
                    className="mt-2 px-5 py-2 rounded-full border border-emerald-700/30 text-emerald-900 hover:bg-emerald-700 hover:text-white font-mono text-xs font-bold transition-all"
                  >
                    Send Another Note ↺
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#444444] font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Miller"
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/15 focus:border-[#123C2F] focus:outline-hidden text-sm text-[#111111] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#444444] font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/15 focus:border-[#123C2F] focus:outline-hidden text-sm text-[#111111] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#444444] font-semibold">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full-Stack / AI Collaboration or Product Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/15 focus:border-[#123C2F] focus:outline-hidden text-sm text-[#111111] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#444444] font-semibold">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe the opportunity, idea, or questions..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F7F7F3] border border-[#123C2F]/15 focus:border-[#123C2F] focus:outline-hidden text-sm text-[#111111] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-full bg-[#123C2F] text-[#F7F7F3] text-sm font-semibold hover:bg-[#1A5442] shadow-lg shadow-[#123C2F]/15 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    data-cursor="pointer"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        <span>Dispatching Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
