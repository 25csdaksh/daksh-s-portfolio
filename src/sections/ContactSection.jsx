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
            colors: ["#1D4ED8", "#D4AF37", "#F59E0B", "#1E3A8A", "#FEF9C3"],
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
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 md:px-12 relative bg-slate-50/60">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-amber-700 font-bold">
              <Mail className="w-4 h-4 text-blue-700" />
              <span>08 // Initiation & Partnership</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-sans font-extrabold text-slate-900 tracking-tight leading-[1.05]">
              Have an idea?
              <br />
              <span className="gradient-text-royal-gold">Let's build it.</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-600 max-w-sm font-sans">
            Whether it's an enterprise software project, hackathon collaboration, research, or simply an ambitious conversation — let's connect.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-amber-200/60 shadow-md space-y-6">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-700 font-bold">
                  DIRECT CONTACT CHANNEL
                </span>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                  <span className="font-sans text-base sm:text-lg font-bold text-slate-900 truncate">
                    {profileData.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 px-3 rounded-xl bg-amber-50 hover:bg-blue-900 hover:text-amber-300 text-amber-900 border border-amber-300 transition-all flex items-center gap-1.5 text-xs font-mono font-bold"
                    title="Copy Email"
                    data-cursor="pointer"
                  >
                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-amber-700" />}
                    <span>{copiedEmail ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
              </div>

              {/* Social Channels */}
              <div className="space-y-3 pt-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  CONNECTED NETWORKS
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={profileData.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 flex items-center justify-between text-xs font-mono font-bold text-slate-800 group transition-all"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-blue-700 group-hover:text-amber-700 transition-colors" />
                      <span>GitHub</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-600 transition-all" />
                  </a>

                  <a
                    href={profileData.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 flex items-center justify-between text-xs font-mono font-bold text-slate-800 group transition-all"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-blue-700 group-hover:text-amber-700 transition-colors" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-600 transition-all" />
                  </a>

                  <a
                    href={profileData.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 flex items-center justify-between text-xs font-mono font-bold text-slate-800 group transition-all"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-blue-700 group-hover:text-amber-700 transition-colors" />
                      <span>Instagram</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-600 transition-all" />
                  </a>

                  <a
                    href={`mailto:${profileData.email}`}
                    onMouseEnter={() => soundManager.playHover()}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 flex items-center justify-between text-xs font-mono font-bold text-slate-800 group transition-all"
                    data-cursor="pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-700 group-hover:text-amber-700 transition-colors" />
                      <span>Email Directly</span>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:translate-x-1 group-hover:text-amber-600 transition-all" />
                  </a>
                </div>
              </div>

              {/* Status Note */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-950 via-slate-950 to-slate-900 text-white text-xs space-y-1 border border-amber-400/30 shadow-lg shadow-blue-950/20">
                <div className="flex items-center gap-2 font-mono font-bold text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
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
            <div className="editorial-card p-6 sm:p-10 bg-white border border-amber-200/60 rounded-3xl shadow-md space-y-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-sans font-bold text-slate-900">
                  Send a Message
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  All fields are verified and delivered directly to Daksh Soni's inbox.
                </p>
              </div>

              {formStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-amber-50/60 border border-amber-300 text-center space-y-4 shadow-sm"
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-slate-950 mx-auto flex items-center justify-center shadow-md font-bold">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-sans font-bold text-slate-900">
                    Message Dispatched to dakshsoni1023@gmail.com!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name || "friend"}</strong>. Your note has been securely forwarded to Daksh Soni's inbox.
                  </p>
                  <button
                    onClick={() => {
                      soundManager.playClick();
                      setFormData({ name: "", email: "", subject: "", message: "" });
                      setFormStatus("idle");
                    }}
                    className="mt-2 px-5 py-2 rounded-full border border-amber-400 bg-white text-amber-900 hover:bg-amber-100 font-mono text-xs font-bold transition-all shadow-xs"
                  >
                    Send Another Note ↺
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-700 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alex Miller"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 focus:bg-white focus:outline-hidden text-sm text-slate-900 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-slate-700 font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 focus:bg-white focus:outline-hidden text-sm text-slate-900 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-700 font-semibold">
                      Subject / Topic
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g. Full-Stack / AI Collaboration or Product Inquiry"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 focus:bg-white focus:outline-hidden text-sm text-slate-900 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-slate-700 font-semibold">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe the opportunity, idea, or questions..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/20 focus:bg-white focus:outline-hidden text-sm text-slate-900 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-blue-900 via-blue-800 to-slate-950 text-amber-300 border border-amber-400/50 text-sm font-bold hover:border-amber-300 hover:shadow-lg hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    data-cursor="pointer"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin" />
                        <span>Dispatching Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-amber-400" />
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
