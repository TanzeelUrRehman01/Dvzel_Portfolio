import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── react-icons imports ────────────────────────────────────────────────────
// Install once:  npm install react-icons
import { FaGithub }             from "react-icons/fa";
import { FaLinkedin }           from "react-icons/fa";
import { FaInstagram }          from "react-icons/fa";
import { SiGmail }              from "react-icons/si";
import { MdLocationOn }         from "react-icons/md";
import { MdPhone }              from "react-icons/md";
import { MdEmail }              from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
// ────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
//  📧  EMAILJS CREDENTIALS
//
//  Option A — Environment variables (recommended for production):
//    Create a .env file in your project root:
//
//      VITE_EMAILJS_SERVICE_ID=service_awrtrmg
//      VITE_EMAILJS_TEMPLATE_ID=template_42sbyxo
//      VITE_EMAILJS_PUBLIC_KEY=9QYT97-XyruuMEu92
//
//    Then the constants below will pick them up automatically.
//
//  Option B — Paste directly (fine for local dev, do NOT commit to public repos):
//    Replace the import.meta.env.VITE_* values with your credential strings.
//
//  Install the SDK once:  npm install @emailjs/browser
// ─────────────────────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  ?? "service_awrtrmg";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_42sbyxo";
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  ?? "9QYT97-XyruuMEu92";

// ─────────────────────────────────────────────────────────────────────────────
//  📋  EMAILJS TEMPLATE VARIABLES
//  Your EmailJS template (template_42sbyxo) should include these variables:
//
//    {{from_name}}    ← sender's name
//    {{from_email}}   ← sender's email (use as Reply-To in your template)
//    {{message}}      ← message body
//    {{to_name}}      ← your name (set to "Tanzeel" below, change if needed)
// ─────────────────────────────────────────────────────────────────────────────

const socialLinks = [
  {
    label:  "GitHub",
    handle: "@TanzeelUrRehman01",
    href:   "https://github.com/TanzeelUrRehman01",
    icon:   <FaGithub size={22} color="#E2EBF8" />,
    color:  "#E2EBF8",
  },
  {
    label:  "LinkedIn",
    handle: "Tanzeel Ur Rehman",
    href:   "https://www.linkedin.com/feed/",
    icon:   <FaLinkedin size={22} color="#0A66C2" />,
    color:  "#0A66C2",
  },
  {
    label:  "Instagram",
    handle: "@_tanzeell__",
    href:   "https://www.instagram.com/_tanzeell__/",
    icon:   <FaInstagram size={22} color="#E1306C" />,
    color:  "#E1306C",
  },
  {
    label:  "Email",
    handle: "rtanzeel901@gmail.com",
    href:   "mailto:rtanzeel901@gmail.com",
    icon:   <SiGmail size={22} color="#EA4335" />,
    color:  "#EA4335",
  },
];

const infoItems = [
  {
    label:      "Location",
    value:      "Islamabad, Pakistan",
    icon:       <MdLocationOn size={20} color="#00D4FF" />,
    valueColor: "var(--text-primary)",
  },
  {
    label:      "Phone",
    value:      "+92 313 3333333",
    icon:       <MdPhone size={20} color="#00D4FF" />,
    valueColor: "var(--text-primary)",
  },
  {
    label:      "Email",
    value:      "rtanzeel901@gmail.com",
    icon:       <MdEmail size={20} color="#00D4FF" />,
    valueColor: "var(--text-primary)",
  },
  {
    label:      "Status",
    value:      "Open to Opportunities",
    icon:       <MdCheckCircleOutline size={20} color="#4ade80" />,
    valueColor: "#4ade80",
  },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form,   setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20) e.message = "Message must be at least 20 characters";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");

    try {
      // ── EmailJS send ────────────────────────────────────────────────────
      // The object keys must match the variables in your EmailJS template.
      // If your template uses different variable names, update the keys here.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_name:    "Tanzeel",        // ← change to your preferred name
        },
        EMAILJS_PUBLIC_KEY,
      );
      // ────────────────────────────────────────────────────────────────────

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });

      // Auto-reset button back to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);

    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");

      // Auto-reset error state after 4 seconds so user can retry
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = (field: string) => ({
    width:        "100%",
    padding:      "14px 18px",
    borderRadius: 10,
    background:   "rgba(10,20,40,0.6)",
    border:       `1px solid ${errors[field] ? "#FF6B6B40" : "rgba(0,212,255,0.12)"}`,
    color:        "var(--text-primary)",
    fontFamily:   "DM Sans, sans-serif",
    fontSize:     "0.95rem",
    outline:      "none",
    transition:   "all 0.3s",
    resize:       "none" as const,
  });

  return (
    <section
      id="contact"
      ref={ref}
      style={{ background: "var(--bg-primary)", position: "relative", overflow: "hidden" }}
    >
      {/* Background glows */}
      <div style={{ position: "absolute", top: "40%", right: -200, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", left: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="section-container">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 64 }}
        >
          <p className="section-label">GET IN TOUCH</p>
          <h2 className="section-heading">
            Let's Build Something<br /><span className="gradient-text">Extraordinary</span>
          </h2>
          <div className="section-divider" />
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.7 }}>
            Have a project in mind or want to collaborate? I'm open to exciting opportunities,
            freelance work, and AI/web projects. Let's talk.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>

          {/* ── Left: info cards + social links ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Info cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              {infoItems.map(({ label, value, icon, valueColor }) => (
                <motion.div
                  key={label}
                  whileHover={{ x: 6, borderColor: "rgba(0,212,255,0.3)" }}
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          16,
                    padding:      "16px 20px",
                    borderRadius: 12,
                    background:   "rgba(10,20,40,0.5)",
                    border:       "1px solid rgba(0,212,255,0.08)",
                    transition:   "all 0.3s",
                  }}
                >
                  <div
                    style={{
                      width:          40,
                      height:         40,
                      borderRadius:   10,
                      background:     "rgba(0,212,255,0.08)",
                      border:         "1px solid rgba(0,212,255,0.15)",
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      flexShrink:     0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.72rem", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 2 }}>
                      {label.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: valueColor }}>
                      {value}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontFamily: "Syncopate, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--text-muted)", marginBottom: 16 }}>
                CONNECT WITH ME
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {socialLinks.map(({ label, handle, href, icon, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.05 }}
                    title={`${label}: ${handle}`}
                    style={{
                      width:          50,
                      height:         50,
                      borderRadius:   12,
                      background:     "rgba(10,20,40,0.6)",
                      border:         `1px solid ${color}25`,
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      transition:     "all 0.3s",
                      boxShadow:      `0 4px 20px ${color}10`,
                    }}
                  >
                    {icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right: contact form ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass" style={{ borderRadius: 16, padding: 36, position: "relative" }}>
              {/* Corner accents */}
              {["tl", "tr", "bl", "br"].map((c) => (
                <div
                  key={c}
                  style={{
                    position:     "absolute",
                    width:        14,
                    height:       14,
                    ...(c.startsWith("t") ? { top: -1 }    : { bottom: -1 }),
                    ...(c.endsWith("l")   ? { left: -1 }   : { right: -1 }),
                    borderTop:    c.startsWith("t") ? "2px solid var(--accent-cyan)" : "none",
                    borderBottom: c.startsWith("b") ? "2px solid var(--accent-cyan)" : "none",
                    borderLeft:   c.endsWith("l")   ? "2px solid var(--accent-cyan)" : "none",
                    borderRight:  c.endsWith("r")   ? "2px solid var(--accent-cyan)" : "none",
                  }}
                />
              ))}

              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 24 }}>
                Send a Message
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Name */}
                <div>
                  <label style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
                    YOUR NAME
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    placeholder="Your full name"
                    style={inputStyle("name")}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.06)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = errors.name ? "#FF6B6B40" : "rgba(0,212,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.name && <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", color: "#FF6B6B", marginTop: 4 }}>{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    placeholder="your.email@example.com"
                    style={inputStyle("email")}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.06)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = errors.email ? "#FF6B6B40" : "rgba(0,212,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.email && <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", color: "#FF6B6B", marginTop: 4 }}>{errors.email}</p>}
                </div>

                {/* Message */}
                <div>
                  <label style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", letterSpacing: "0.1em", display: "block", marginBottom: 8 }}>
                    MESSAGE
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                    placeholder="Tell me about your project or idea..."
                    rows={5}
                    style={inputStyle("message")}
                    onFocus={(e) => { e.target.style.borderColor = "rgba(0,212,255,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.06)"; }}
                    onBlur={(e)  => { e.target.style.borderColor = errors.message ? "#FF6B6B40" : "rgba(0,212,255,0.12)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.message && <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", color: "#FF6B6B", marginTop: 4 }}>{errors.message}</p>}
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={status === "sending" || status === "sent"}
                  whileHover={status === "idle" || status === "error" ? { scale: 1.02 } : {}}
                  whileTap={status === "idle" || status === "error" ? { scale: 0.98 } : {}}
                  className="btn-primary"
                  style={{
                    width:   "100%",
                    opacity: status === "sent" ? 0.85 : 1,
                    cursor:  status === "sending" || status === "sent" ? "not-allowed" : "pointer",
                    // Error state: red tint on button border
                    ...(status === "error" ? { borderColor: "rgba(255,107,107,0.5)", color: "#FF6B6B" } : {}),
                  }}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    {status === "idle" && (
                      <>Send Message <span style={{ fontSize: "0.85em" }}>↗</span></>
                    )}
                    {status === "sending" && (
                      <>
                        {/* Minimal spinner */}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ animation: "spin 0.9s linear infinite" }}>
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" strokeDasharray="32" strokeDashoffset="12" strokeLinecap="round" />
                        </svg>
                        Sending...
                      </>
                    )}
                    {status === "sent"  && <>✓ Message Sent!</>}
                    {status === "error" && <>✕ Failed — Try Again</>}
                  </span>
                </motion.button>

                {/* Success feedback */}
                {status === "sent" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: "Outfit", fontSize: "0.85rem", color: "var(--accent-green)", textAlign: "center" }}
                  >
                    Thanks! I'll get back to you within 24 hours. 🚀
                  </motion.p>
                )}

                {/* Error feedback */}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ fontFamily: "Outfit", fontSize: "0.82rem", color: "#FF6B6B", textAlign: "center" }}
                  >
                    Something went wrong. Please try again or email me directly at{" "}
                    <a href="mailto:rtanzeel901@gmail.com" style={{ color: "#00D4FF", textDecoration: "none" }}>
                      rtanzeel901@gmail.com
                    </a>
                  </motion.p>
                )}

              </form>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contact .section-container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}