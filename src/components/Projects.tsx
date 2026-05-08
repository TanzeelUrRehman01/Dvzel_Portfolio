import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Image paths ──────────────────────────────────────────────────────────────
const BASE = "";
const img = (folder: string, n: number) => `${BASE}/projects/${folder}/${n}.png`;

const cliniSmile     = [img("CliniSmile", 1),      img("CliniSmile", 2),      img("CliniSmile", 4)];
const manoAI         = [img("Mano_ai_chatbot", 1), img("Mano_ai_chatbot", 2), img("Mano_ai_chatbot", 3)];
const virtualProctor = [img("virtual_proctor", 1), img("virtual_proctor", 2), img("virtual_proctor", 3)];
const aetherDraw     = [img("Arthrew_draw", 1),    img("Arthrew_draw", 2),    img("Arthrew_draw", 3)];
const csp            = [img("CSP", 1),             img("CSP", 2),             img("CSP", 3)];
const churnSight     = [img("ChurnSight", 1),      img("ChurnSight", 2),      img("ChurnSight", 3)];
const priceVista     = [img("PriceVista", 1),      img("PriceVista", 2),      img("PriceVista", 3)];

// ─── Data ─────────────────────────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "CliniSmile",
    shortDesc: "AI-powered dental clinic management system",
    desc: "A comprehensive AI-powered dental clinic system featuring intelligent appointment scheduling, an AI chatbot assistant for patient queries, complete electronic health records management, prescription handling, and a real-time admin dashboard with analytics — all built with a modern React frontend and Flask backend.",
    tags: ["React", "Python", "Flask", "OpenAI", "MySQL", "AI"],
    color: "#00D4FF",
    images: cliniSmile,
    github: "https://github.com/TanzeelUrRehman01",
    live: null,
    category: "AI · Healthcare",
    highlights: ["AI Chatbot", "Appointment System", "Admin Dashboard", "Health Records"],
  },
  {
    id: 2,
    title: "Mano AI ChatBot",
    shortDesc: "Multi-modal AI web app — chat, images & voice",
    desc: "Feature-rich AI web application powered by OpenAI APIs. Includes real-time AI chat with conversation history, DALL-E image generation from text prompts, browser-based voice input with speech recognition, and a polished responsive UI. Deployed live on Vercel with optimized prompt handling for faster responses.",
    tags: ["React", "OpenAI API", "Node.js", "DALL-E", "Vercel"],
    color: "#00FFB3",
    images: manoAI,
    github: "https://github.com/TanzeelUrRehman01",
    live: "https://mano-ai-chat-bot.vercel.app/",
    category: "AI · Web App",
    highlights: ["Live on Vercel", "Image Generation", "Voice Input", "OpenAI GPT"],
  },
  {
    id: 3,
    title: "Virtual Proctor",
    shortDesc: "AI exam monitoring with face & gaze tracking",
    desc: "An AI-based remote exam proctoring system using OpenCV for real-time facial detection, gaze direction analysis, and behavior monitoring. Detects suspicious activities like looking away, multiple faces, or no face present during exams. Sends alerts and logs violations with timestamp, ensuring academic integrity in online assessments.",
    tags: ["Python", "OpenCV", "Deep Learning", "Flask", "Computer Vision"],
    color: "#7C3AED",
    images: virtualProctor,
    github: "https://github.com/TanzeelUrRehman01",
    live: null,
    category: "AI · Computer Vision",
    highlights: ["Face Detection", "Gaze Tracking", "Behavior Analysis", "Real-time Alerts"],
  },
  {
    id: 4,
    title: "AetherDraw",
    shortDesc: "Real-time AI collaborative canvas with WebSockets",
    desc: "A real-time collaborative canvas application where multiple users can draw together simultaneously. Built with WebSockets for instant sync, AI-assisted drawing suggestions to help users complete shapes and compositions, rich tool palette with layers support, and session management for persistent workspaces.",
    tags: ["React", "WebSockets", "AI", "Canvas API", "Node.js"],
    color: "#FF6B6B",
    images: aetherDraw,
    github: "https://github.com/TanzeelUrRehman01",
    live: null,
    category: "Real-time · Collaboration",
    highlights: ["Multi-user Sync", "AI Assist", "Layer System", "WebSockets"],
  },
  {
    id: 5,
    title: "CSP-SegPredict",
    shortDesc: "Medical image segmentation using deep learning",
    desc: "A medical image segmentation and disease prediction platform designed to assist radiologists. Processes MRI and CT scan images using U-Net-based deep learning models with custom optimization algorithms. Provides pixel-level segmentation masks, confidence scores, and structured diagnostic reports to speed up clinical decisions.",
    tags: ["Python", "TensorFlow", "OpenCV", "Flask", "Medical AI"],
    color: "#00D4FF",
    images: csp,
    github: "https://github.com/TanzeelUrRehman01",
    live: null,
    category: "AI · Medical Imaging",
    highlights: ["U-Net Architecture", "MRI/CT Scans", "Pixel Segmentation", "Clinical Reports"],
  },
  {
    id: 6,
    title: "ChurnSight",
    shortDesc: "Customer churn prediction with analytics dashboard",
    desc: "A business intelligence platform that predicts customer churn using machine learning. Trained on telecom and e-commerce datasets, it provides churn probability scores per customer, feature importance insights, and actionable recommendations. Interactive Streamlit dashboard with charts, filters, and CSV export for business teams.",
    tags: ["Python", "Scikit-Learn", "Streamlit", "Pandas", "ML"],
    color: "#00FFB3",
    images: churnSight,
    github: "https://github.com/TanzeelUrRehman01",
    live: null,
    category: "ML · Analytics",
    highlights: ["Churn Prediction", "Streamlit Dashboard", "Feature Importance", "Business Insights"],
  },
  {
    id: 7,
    title: "PriceVista",
    shortDesc: "House price prediction with Flask API & Streamlit UI",
    desc: "A complete house price prediction system powered by ML regression models trained on real estate datasets. Features include a Flask REST API for predictions, a Streamlit interactive web UI for non-technical users, feature engineering pipeline (location encoding, size normalization), and model comparison across XGBoost, Random Forest, and Linear Regression.",
    tags: ["Python", "Flask", "Streamlit", "XGBoost", "Scikit-Learn"],
    color: "#FF6B6B",
    images: priceVista,
    github: "https://github.com/TanzeelUrRehman01",
    live: null,
    category: "ML · Real Estate",
    highlights: ["XGBoost Model", "Flask REST API", "Streamlit UI", "Feature Engineering"],
  },
];

type Project = (typeof projects)[0];

// ─── Modal ────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [activeImg, setActiveImg] = useState(0);
  const gallery = project.images;

  useEffect(() => {
    setActiveImg(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActiveImg((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft")  setActiveImg((i) => (i - 1 + gallery.length) % gallery.length);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, gallery.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.82)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        // FIX 1: explicit cursor on the backdrop so the OS cursor is never lost
        cursor: "default",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 12 }}
        transition={{ duration: 0.22, type: "spring", stiffness: 340, damping: 28 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 920,
          maxHeight: "90vh",
          overflowY: "auto",
          borderRadius: 20,
          background: "rgba(5,10,22,0.98)",
          border: `1px solid ${project.color}28`,
          boxShadow: `0 32px 96px rgba(0,0,0,0.7), 0 0 0 1px ${project.color}12`,
          // FIX 2: position:relative anchors the absolute close button to THIS
          //         card instead of the fixed overlay, eliminating the ghost hit-zone
          position: "relative",
        }}
      >
        {/* Accent bar */}
        <div style={{ height: 2, background: `linear-gradient(90deg, ${project.color}, ${project.color}50, transparent)`, borderRadius: "20px 20px 0 0" }} />

        {/* ── Body: image left / info right ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: 280,
        }}>
          {/* Left — gallery */}
          <div style={{ position: "relative", overflow: "hidden", background: `linear-gradient(135deg, #060c18, ${project.color}10)`, minHeight: 280 }}>
            {/* Subtle grid texture */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 0,
              backgroundImage: `linear-gradient(${project.color}06 1px, transparent 1px), linear-gradient(90deg, ${project.color}06 1px, transparent 1px)`,
              backgroundSize: "28px 28px",
              // FIX 3: decorative layer must never steal pointer events
              pointerEvents: "none",
            }} />

            {/* Main image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={gallery[activeImg]}
                alt={`${project.title} screenshot ${activeImg + 1}`}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  zIndex: 1,
                  // images are purely visual — let clicks pass through to nav buttons
                  pointerEvents: "none",
                }}
              />
            </AnimatePresence>

            {/* Bottom gradient overlay for thumbs */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: 80,
              background: "linear-gradient(to top, rgba(5,10,22,0.9), transparent)",
              zIndex: 2,
              pointerEvents: "none",  // FIX 4: gradient overlays must not eat clicks
            }} />

            {/* Thumbnail strip */}
            {gallery.length > 1 && (
              <div style={{
                position: "absolute", bottom: 12, left: 0, right: 0,
                display: "flex", justifyContent: "center", gap: 7, zIndex: 3,
              }}>
                {gallery.map((src, i) => (
                  <motion.button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActiveImg(i); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.94 }}
                    style={{
                      width: 44, height: 30,
                      padding: 0, background: "none",
                      borderRadius: 5, overflow: "hidden",
                      cursor: "pointer",  // explicit pointer on every interactive element
                      border: `2px solid ${i === activeImg ? project.color : "rgba(255,255,255,0.18)"}`,
                      boxShadow: i === activeImg ? `0 0 10px ${project.color}55` : "none",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                      flexShrink: 0,
                    }}
                  >
                    <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }} />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Highlight badges */}
            <div style={{
              position: "absolute", top: 12, left: 12,
              display: "flex", flexWrap: "wrap", gap: 5, zIndex: 4,
              pointerEvents: "none",  // FIX 5: badge layer must not block nav arrow clicks
            }}>
              {project.highlights.map((h) => (
                <span key={h} style={{
                  padding: "3px 9px", borderRadius: 100,
                  background: "rgba(5,10,22,0.72)",
                  border: `1px solid ${project.color}38`,
                  fontFamily: "Outfit, sans-serif", fontSize: "0.65rem", fontWeight: 600,
                  color: project.color, letterSpacing: "0.04em",
                  backdropFilter: "blur(6px)",
                }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Arrow nav */}
            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i - 1 + gallery.length) % gallery.length); }}
                  style={{
                    position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
                    zIndex: 5,  // FIX 6: raised above badge/gradient layers
                    width: 30, height: 30, borderRadius: "50%",
                    background: "rgba(5,10,22,0.65)", border: `1px solid ${project.color}30`,
                    color: project.color, fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >‹</button>
                <button
                  onClick={(e) => { e.stopPropagation(); setActiveImg((i) => (i + 1) % gallery.length); }}
                  style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    zIndex: 5,  // FIX 6: raised above badge/gradient layers
                    width: 30, height: 30, borderRadius: "50%",
                    background: "rgba(5,10,22,0.65)", border: `1px solid ${project.color}30`,
                    color: project.color, fontSize: "0.85rem",
                    cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >›</button>
              </>
            )}
          </div>

          {/* Right — Info */}
          <div style={{ padding: "36px 36px 32px 32px", display: "flex", flexDirection: "column", gap: 14, justifyContent: "center" }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.68rem", color: project.color, letterSpacing: "0.2em", marginBottom: 6, textTransform: "uppercase" }}>
                {project.category}
              </div>
              <h3 style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1, margin: "0 0 10px" }}>
                {project.title}
              </h3>
              <div style={{ width: 36, height: 2, background: project.color, borderRadius: 1 }} />
            </div>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.75, margin: 0 }}>
              {project.desc}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {project.tags.map((tag) => (
                <span key={tag} style={{
                  fontFamily: "Outfit, sans-serif", fontSize: "0.7rem", fontWeight: 600,
                  padding: "4px 11px", borderRadius: 6,
                  background: `${project.color}0a`, border: `1px solid ${project.color}22`,
                  color: project.color,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Close button — now correctly anchored to position:relative modal card */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute", top: 14, right: 14,
            width: 34, height: 34, borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)", fontSize: "0.9rem",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.15s, color 0.15s",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.85)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)";
            (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
          }}
        >
          ✕
        </button>

        {/* ── Footer ── */}
        <div style={{
          padding: "16px 36px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.28)" }}>
            ← → arrow keys to browse · <kbd style={{ fontFamily: "Outfit", fontSize: "0.7rem", padding: "1px 7px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>ESC</kbd> to close
          </span>
          <div style={{ display: "flex", gap: 10 }}>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "9px 20px", borderRadius: 8,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                fontFamily: "Outfit", fontSize: "0.8rem", fontWeight: 600,
                color: "rgba(255,255,255,0.55)", textDecoration: "none",
                cursor: "pointer",
              }}
            >
              ↗ GitHub
            </motion.a>
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: "9px 20px", borderRadius: 8,
                  background: `${project.color}12`,
                  border: `1px solid ${project.color}28`,
                  fontFamily: "Outfit", fontSize: "0.8rem", fontWeight: 600,
                  color: project.color, textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                ⚡ Live Demo
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Carousel card ────────────────────────────────────────────────────────────
function CarouselCard({ project, onSelect }: { project: Project; onSelect: (p: Project) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onSelect(project)}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        width: 290, flexShrink: 0,
        borderRadius: 13,
        background: "rgba(7,13,26,0.85)",
        border: `1px solid ${hovered ? project.color + "38" : "rgba(255,255,255,0.06)"}`,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: hovered ? `0 12px 40px ${project.color}15, 0 0 0 1px ${project.color}18` : "0 0 0 0 transparent",
        // FIX 7: isolate each card's stacking context so the carousel animation
        //         layer can never bleed above the modal's z-index
        isolation: "isolate",
      }}
    >
      {/* Preview image */}
      <div style={{ height: 152, position: "relative", overflow: "hidden", background: `linear-gradient(135deg, rgba(7,13,26,0.9), ${project.color}0d)` }}>
        {/* Grid texture */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          backgroundImage: `linear-gradient(${project.color}06 1px, transparent 1px), linear-gradient(90deg, ${project.color}06 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
          pointerEvents: "none",  // decorative — never intercept clicks
        }} />

        <motion.img
          src={project.images[0]}
          alt={`${project.title} preview`}
          animate={hovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
        />

        {/* Bottom gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 45%, rgba(7,13,26,0.5) 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }} />

        {/* Category badge */}
        <div style={{
          position: "absolute", top: 9, left: 10, zIndex: 3,
          padding: "3px 9px", borderRadius: 100,
          background: "rgba(5,10,20,0.72)", border: `1px solid ${project.color}28`,
          fontFamily: "Outfit", fontSize: "0.62rem", fontWeight: 600,
          color: project.color, letterSpacing: "0.05em",
          backdropFilter: "blur(6px)",
          pointerEvents: "none",
        }}>
          {project.category}
        </div>

        {/* Click hint */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.12 }}
          style={{
            position: "absolute", bottom: 9, right: 10, zIndex: 3,
            fontFamily: "Outfit", fontSize: "0.67rem", color: project.color,
            background: "rgba(5,10,20,0.72)", border: `1px solid ${project.color}28`,
            borderRadius: 5, padding: "2px 9px", backdropFilter: "blur(6px)",
            pointerEvents: "none",
          }}
        >
          View details ↗
        </motion.div>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 5 }}>
          {project.title}
        </div>
        <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: 11 }}>
          {project.shortDesc}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} style={{
              fontFamily: "Outfit", fontSize: "0.63rem", fontWeight: 500,
              padding: "2px 8px", borderRadius: 4,
              background: `${project.color}07`, border: `1px solid ${project.color}1a`,
              color: project.color,
            }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span style={{ fontFamily: "Outfit", fontSize: "0.63rem", color: "var(--text-muted)", padding: "2px 4px" }}>
              +{project.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, ${project.color}, transparent)`,
        opacity: hovered ? 1 : 0.15,
        transition: "opacity 0.2s",
        pointerEvents: "none",
      }} />
    </motion.div>
  );
}

// ─── Carousel row ─────────────────────────────────────────────────────────────
function CarouselTrack({
  items,
  direction,
  onSelect,
}: {
  items: Project[];
  direction: "left" | "right";
  onSelect: (p: Project) => void;
}) {
  const triple = [...items, ...items, ...items];
  const duration = items.length * 8;

  return (
    <div
      style={{
        overflow: "hidden",
        maskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
        // FIX 8: create an explicit stacking context here so that carousel
        //         z-index can never leak above the modal overlay (z-index: 9999)
        isolation: "isolate",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 18,
          width: "max-content",
          animation: `${direction === "left" ? "ticker-left" : "ticker-right"} ${duration}s linear infinite`,
        }}
      >
        {triple.map((p, i) => (
          <CarouselCard key={`${p.id}-${i}`} project={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

// ─── Section root ─────────────────────────────────────────────────────────────
export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [selected, setSelected] = useState<Project | null>(null);
  const handleSelect = useCallback((p: Project) => setSelected(p), []);
  const handleClose  = useCallback(() => setSelected(null), []);

  const row1 = projects.slice(0, 4);
  const row2 = projects.slice(3);

  return (
    <section id="projects" ref={ref} style={{ background: "var(--bg-secondary)", overflow: "hidden", position: "relative" }}>
      {/* Top line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.28), transparent)", pointerEvents: "none" }} />

      {/* Section header */}
      <div className="section-container" style={{ marginBottom: 56 }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label">PORTFOLIO</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 20 }}>
            <div>
              <h2 className="section-heading">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <div className="section-divider" style={{ marginBottom: 0 }} />
            </div>
            <motion.a
              href="https://github.com/TanzeelUrRehman01"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              className="btn-ghost"
              style={{ textDecoration: "none", display: "inline-block", cursor: "pointer" }}
            >
              GitHub ↗
            </motion.a>
          </div>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: 520, lineHeight: 1.7 }}>
            7 projects spanning AI, full-stack web, and ML.{" "}
            <strong style={{ color: "var(--accent-cyan)" }}>Click any card</strong> to see full details.
          </p>
        </motion.div>
      </div>

      {/* Carousel rows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.28, duration: 0.55 }}
        style={{ display: "flex", flexDirection: "column", gap: 18, paddingBottom: 4 }}
      >
        <CarouselTrack items={row1} direction="left"  onSelect={handleSelect} />
        <CarouselTrack items={row2} direction="right" onSelect={handleSelect} />
      </motion.div>

      {/* GitHub CTA */}
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18 }}
          style={{ marginTop: 60, textAlign: "center" }}
        >
          <div className="glass" style={{ display: "inline-flex", alignItems: "center", gap: 28, padding: "26px 42px", borderRadius: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <div>
              <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>
                Explore More on GitHub
              </div>
              <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.83rem", color: "var(--text-muted)" }}>
                View source code, contributions & all repositories
              </div>
            </div>
            <motion.a
              href="https://github.com/TanzeelUrRehman01"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary"
              style={{ textDecoration: "none", display: "inline-block", cursor: "pointer" }}
            >
              <span>@TanzeelUrRehman01 ↗</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Single AnimatePresence — outside carousel */}
      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={handleClose} />}
      </AnimatePresence>
    </section>
  );
}