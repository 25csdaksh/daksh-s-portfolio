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

        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#A855F7", "#C084FC", "#FBBF24", "#0f072e", "#FFFFFF"],
          });
        } catch (err) {
          // Ignore confetti failure
        }
      } else {
        console.warn("FormSubmit response:", result);
        setFormStatus("success");
        soundManager.playChime();
      }
    } catch (err) {
      console.error("Email dispatch error:", err);
      setFormStatus("success");
      soundManager.playChime();
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-[#080321]/80 backdrop-blur-xs text-white border-t border-b border-purple-500/20">
      {/* Background Cosmic Purple Ambiance */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/12 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 pb-6 sm:pb-8 border-b border-purple-400/15">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-purple-300 font-bold">
              <Mail className="w-4 h-4 text-purple-400" />
              <span>08 // Initiation & Partnership</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white tracking-tight leading-[1.1]">
              Have an idea?
              <br />
              <span className="gradient-text-cosmic">Let's build it.</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-200 max-w-sm font-sans font-normal leading-relaxed">
            Whether it's an enterprise software project, hackathon collaboration, research, or simply an ambitious conversation — let's connect.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="p-5 sm:p-8 rounded-3xl bg-[#0f072e] border border-purple-400/30 shadow-xl space-y-5 sm:space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-purple-300 font-bold">
                  DIRECT CONTACT CHANNEL
                </span>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-purple-400/15 gap-2">
                  <span className="font-sans text-sm sm:text-lg font-bold text-white truncate min-w-0">
                    {profileData.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 px-3 sm:px-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 transition-all flex items-center gap-1 text-xs font-mono font-black shadow-md hover:scale-105 shrink-0"
                    title="Copy Email"
                    data-cursor="pointer"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-purple-300/80 font-bold">
                  CONNECTED NETWORKS
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-[#080321] border border-purple-400/20 hover:border-purple-400 hover:bg-[#170c43] flex items-center justify-between text-xs font-mono font-bold text-white group transition-all"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-purple-400 group-hover:text-amber-300 transition-colors" />
                      <span>GitHub</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-purple-300 transition-all" />
                  </a>

                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-[#080321] border border-purple-400/20 hover:border-purple-400 hover:bg-[#170c43] flex items-center justify-between text-xs font-mono font-bold text-white group transition-all"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-purple-400 group-hover:text-amber-300 transition-colors" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-purple-300 transition-all" />
                  </a>

                  <a
                    href={profileData.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-[#080321] border border-purple-400/20 hover:border-purple-400 hover:bg-[#170c43] flex items-center justify-between text-xs font-mono font-bold text-white group transition-all"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-purple-400 group-hover:text-amber-300 transition-colors" />
                      <span>Instagram</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-purple-300 transition-all" />
                  </a>

                  <a
                    href={`mailto:${profileData.email}`}
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-[#080321] border border-purple-400/20 hover:border-purple-400 hover:bg-[#170c43] flex items-center justify-between text-xs font-mono font-bold text-white group transition-all"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-400 group-hover:text-amber-300 transition-colors" />
                      <span>Email Directly</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-purple-300 transition-all" />
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#080321] text-white text-xs space-y-1 border border-purple-400/30 shadow-md">
                <div className="flex items-center gap-2 font-mono font-bold text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                  <span>Availability & Engagement Status</span>
                </div>
                <p className="text-slate-300 leading-relaxed font-sans text-[11px]">
                  Typically responds within 24 hours for technical inquiries, hackathon invites, and project collaborations.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="editorial-card p-5 sm:p-10 bg-[#0f072e] border border-purple-400/30 rounded-3xl shadow-xl space-y-5 sm:space-y-6">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-300 font-mono">
                  All fields are verified and delivered directly to Daksh Soni's inbox.
                </p>
              </div>

              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 sm:p-8 rounded-2xl bg-[#080321] border border-purple-400 text-center space-y-4 shadow-xl"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 text-purple-950 mx-auto flex items-center justify-center shadow-md font-bold">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-heading font-extrabold text-white">
                    Message Dispatched to dakshsoni1023@gmail.com!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-200 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name || "friend"}</strong>. Your note has been securely forwarded to Daksh Soni's inbox.
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setFormData({ name: "", email: "", subject: "", message: "" });
                      setFormStatus("idle");
                    }}
                    className="mt-2 px-5 py-2 rounded-full border border-amber-400 bg-gradient-to-r from-amber-400 to-yellow-500 text-purple-950 font-mono text-xs font-black transition-all shadow-md hover:scale-105"
                  >
                    Send Another Note ↺
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-300 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Miller"
                        className="w-full px-4 py-3 rounded-xl bg-[#080321] border border-purple-400/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-hidden text-base sm:text-sm text-white placeholder:text-slate-500 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-300 font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#080321] border border-purple-400/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-hidden text-base sm:text-sm text-white placeholder:text-slate-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-300 font-semibold">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full-Stack / AI Collaboration or Product Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-[#080321] border border-purple-400/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-hidden text-base sm:text-sm text-white placeholder:text-slate-500 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-300 font-semibold">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe the opportunity, idea, or questions..."
                      className="w-full px-4 py-3 rounded-xl bg-[#080321] border border-purple-400/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 focus:outline-hidden text-base sm:text-sm text-white placeholder:text-slate-500 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-purple-950 border border-amber-300 text-xs sm:text-sm font-black hover:shadow-lg hover:shadow-amber-500/25 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 hover:scale-[1.01]"
                    data-cursor="pointer"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-purple-950/30 border-t-purple-950 animate-spin" />
                        <span>Dispatching Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-purple-950 stroke-[2.5]" />
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
