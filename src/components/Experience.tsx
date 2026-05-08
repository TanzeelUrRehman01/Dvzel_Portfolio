import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const education = [
  {
    type: "edu",
    title: "BS Computer Science",
    org: "Virtual University of Pakistan",
    period: "2022 — 2026",
    location: "Pakistan",
    color: "#FF6B6B",
    icon: "🎓",
    points: [
      "Comprehensive study of algorithms, data structures, software engineering, and computer networks",
      "Focus areas: Artificial Intelligence, Machine Learning, and Modern Web Technologies",
      "Parallel practical learning through real-world projects and open-source contributions",
    ],
  },
  // {
  //   type: "edu",
  //   title: "Self-Directed AI & ML Specialization",
  //   org: "Coursera, fast.ai, Kaggle & More",
  //   period: "2022 — Present",
  //   location: "Online",
  //   color: "#00D4FF",
  //   icon: "🧠",
  //   points: [
  //     "Deep Learning Specialization (Andrew Ng, deeplearning.ai)",
  //     "Machine Learning with Python, OpenCV, TensorFlow, and PyTorch",
  //     "Prompt Engineering, LLM fine-tuning, and AI application development",
  //   ],
  // },
];

const experiences = [
  {
    type: "work",
    title: "AI/ML Engineer & Full Stack Developer",
    org: "Freelance & Personal Projects",
    // period: "2022 — Present",
    // location: "Islamabad, Pakistan",
    color: "#00D4FF",
    // icon: "⚡",
    points: [
      "Built and deployed 10+ AI-powered web applications including chatbots, image generators, and prediction systems",
      "Developed real-time collaborative tools using WebSockets, React, and AI APIs (OpenAI, custom ML models)",
      "Created medical imaging ML pipeline (CSP-SegPredict) for disease prediction using TensorFlow and Scikit-Learn",
      "Integrated OpenAI APIs for chatbots, image generation, and prompt engineering across multiple live platforms",
    ],
  },
  {
    type: "work",
    title: "Flutter Mobile Developer",
    org: "Cross-Platform Projects",
    // period: "2023 — Present",
    // location: "Remote",
    color: "#00FFB3",
    // icon: "◆",
    points: [
      "Built ManoChatApp — a full cross-platform chat application with real-time messaging and Firebase integration",
      "Implemented state management with Zustand and Provider for scalable app architecture",
      "Designed pixel-perfect UI using Flutter widgets with smooth animations and transitions",
    ],
  },
  {
    type: "work",
    title: "Python Backend & AI Developer",
    org: "Project-Based Development",
    // period: "2021 — Present",
    // location: "Islamabad, Pakistan",
    color: "#7C3AED",
    // icon: "🐍",
    points: [
      "Built REST APIs using Flask and FastAPI serving ML model predictions to frontend applications",
      "Developed Streamlit dashboards for data visualization and model interaction (ChurnSight, PriceVista)",
      "Implemented customer churn prediction, house price forecasting, and medical segmentation systems",
    ],
  },
];



type TimelineItem = typeof experiences[0];

function TimelineCard({ item, index, side }: { item: TimelineItem; index: number; side: "left" | "right" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -60 : 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      style={{
        display: "flex",
        justifyContent: side === "left" ? "flex-end" : "flex-start",
        paddingLeft: side === "right" ? "52%" : 0,
        paddingRight: side === "left" ? "52%" : 0,
        position: "relative",
      }}
    >
      {/* Connector line to center */}
      <div style={{
        position: "absolute",
        top: 28,
        ...(side === "left" ? { right: "calc(48% - 1px)" } : { left: "calc(48% - 1px)" }),
        width: "calc(4% + 1px)",
        height: 1,
        background: `linear-gradient(${side === "left" ? "to left" : "to right"}, ${item.color}60, transparent)`,
      }} />

      {/* Card */}
      <motion.div
        whileHover={{ y: -4, borderColor: `${item.color}40` }}
        style={{
          width: "100%",
          padding: "24px 28px",
          borderRadius: 14,
          background: "rgba(8,15,28,0.8)",
          border: `1px solid rgba(255,255,255,0.06)`,
          backdropFilter: "blur(10px)",
          position: "relative",
          cursor: "default",
          transition: "all 0.4s ease",
        }}
      >
        {/* Top bar color */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${item.color}, transparent)`, borderRadius: "14px 14px 0 0", opacity: 0.6 }} />

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              {/* <span style={{ fontSize: "1.1rem" }}>{item.icon}</span> */}
              <span style={{
                fontFamily: "Outfit, sans-serif", fontSize: "0.68rem", fontWeight: 600,
                padding: "2px 10px", borderRadius: 100,
                background: `${item.color}12`, border: `1px solid ${item.color}25`,
                color: item.color, letterSpacing: "0.08em",
              }}>
                {item.type === "edu" ? "EDUCATION" : "EXPERIENCE"}
              </span>
            </div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 3 }}>{item.title}</div>
            <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.82rem", color: item.color, fontWeight: 500 }}>{item.org}</div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            {/* <div style={{ fontFamily: "Syncopate, sans-serif", fontSize: "0.62rem", color: "var(--accent-cyan)", letterSpacing: "0.15em", marginBottom: 4 }}>{item.period}</div> */}
            {/* <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.75rem", color: "var(--text-muted)" }}>📍 {item.location}</div> */}
          </div>
        </div>

        {/* Points */}
        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
          {item.points.map((point, i) => (
            <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: item.color, flexShrink: 0, marginTop: 7, boxShadow: `0 0 6px ${item.color}` }} />
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.84rem", color: "var(--text-muted)", lineHeight: 1.6 }}>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

const allItems = [...experiences, ...education];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" ref={ref} style={{ background: "var(--bg-primary)", overflow: "hidden", position: "relative" }}>
      {/* Background glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 800, height: 800, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.02) 0%, transparent 70%)", pointerEvents: "none" }} />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 80, textAlign: "center" }}
        >
          <p className="section-label" style={{ textAlign: "center" }}>JOURNEY</p>
          <h2 className="section-heading" style={{ textAlign: "center" }}>
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="section-divider" style={{ margin: "16px auto 0" }} />
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "var(--text-muted)", maxWidth: 500, margin: "24px auto 0", lineHeight: 1.7 }}>
            My journey in technology — from academic foundations to real-world AI and full-stack development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Center vertical line */}
          <div style={{
            position: "absolute",
            left: "50%",
            top: 0,
            bottom: 0,
            width: 1,
            background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.3) 10%, rgba(0,212,255,0.3) 90%, transparent)",
            transform: "translateX(-50%)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
            {allItems.map((item, i) => (
              <div key={i} style={{ position: "relative" }}>
                {/* Center dot */}
                <div style={{
                  position: "absolute",
                  left: "50%",
                  top: 24,
                  transform: "translate(-50%, -50%)",
                  zIndex: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: "spring", bounce: 0.5 }}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: "50%",
                      background: item.color,
                      boxShadow: `0 0 12px ${item.color}, 0 0 24px ${item.color}40`,
                      border: "2px solid var(--bg-primary)",
                    }}
                  />
                </div>

                <TimelineCard item={item} index={i} side={i % 2 === 0 ? "left" : "right"} />
              </div>
            ))}
          </div>

          {/* Bottom end marker */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }}>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Outfit", fontSize: "0.7rem", color: "var(--accent-cyan)",
                letterSpacing: "0.05em",
              }}
            >
              🚀
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile: single column */}
      <style>{`
        @media (max-width: 768px) {
          #experience .section-container > div:last-child > div > div:not(:first-child) > div:not(:last-child) {
            padding-left: 0 !important;
            padding-right: 0 !important;
            justify-content: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
