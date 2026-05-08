import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiDart,
  SiMysql,
  SiHtml5,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiNodedotjs,
  SiFlask,
  SiStreamlit,
  SiTailwindcss,
  SiVercel,
  SiTensorflow,
  SiOpencv,
  SiPandas,
  SiGit,
  SiGithub,
  SiFirebase,
  SiDocker,
  SiFigma,
  SiPostman,
} from "react-icons/si";

import { TbBrandOpenai } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { FaCss3Alt } from "react-icons/fa";

const skillCategories = [
  {
    label: "Development Stack",
    color: "#00D4FF",
    skills: [
      { name: "Python", icon: <SiPython /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "React", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Flutter", icon: <SiFlutter /> },
      { name: "Dart", icon: <SiDart /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "HTML5", icon: <SiHtml5 /> },
      { name: "CSS3", icon: <FaCss3Alt /> },
      { name: "Flask", icon: <SiFlask /> },
      { name: "Streamlit", icon: <SiStreamlit /> },
      { name: "MySQL", icon: <SiMysql /> },
      { name: "Vercel", icon: <SiVercel /> },
    ],
  },
  {
    label: "AI • Tools • Cloud",
    color: "#7C3AED",
    skills: [
      { name: "TensorFlow", icon: <SiTensorflow /> },
      { name: "OpenCV", icon: <SiOpencv /> },
      { name: "Pandas", icon: <SiPandas /> },
      { name: "OpenAI API", icon: <TbBrandOpenai /> },
      { name: "Git", icon: <SiGit /> },
      { name: "GitHub", icon: <SiGithub /> },
      { name: "Firebase", icon: <SiFirebase /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "VS Code", icon: <VscVscode /> },
      { name: "Postman", icon: <SiPostman /> },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);

  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        background: "var(--bg-primary)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          left: -200,
          top: "50%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,212,255,0.03) 0%, transparent 70%)",
          transform: "translateY(-50%)",
        }}
      />

      {/* Header */}
      <div className="section-container" style={{ marginBottom: 60 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">EXPERTISE</p>

          <h2 className="section-heading">Skills & Technologies</h2>

          <div className="section-divider" />
        </motion.div>
      </div>

      {/* Tickers */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.15,
            }}
          >
            {/* Label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                marginBottom: 14,
                padding: "0 40px",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: cat.color,
                  boxShadow: `0 0 12px ${cat.color}`,
                }}
              />

              <span
                style={{
                  fontFamily: "Syncopate, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.28em",
                  color: cat.color,
                  opacity: 0.9,
                }}
              >
                {cat.label.toUpperCase()}
              </span>

              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: `linear-gradient(90deg, ${cat.color}40, transparent)`,
                }}
              />
            </div>

            {/* Moving Skills */}
            <div
              style={{
                overflow: "hidden",
                maskImage:
                  "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  width: "max-content",
                  animation: `${
                    i % 2 === 0 ? "ticker-left" : "ticker-right"
                  } ${cat.skills.length * 2.8}s linear infinite`,
                }}
              >
                {[...cat.skills, ...cat.skills, ...cat.skills].map(
                  (skill, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.08, y: -4 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 20px",
                        borderRadius: 14,
                        background:
                          "linear-gradient(135deg, rgba(15,25,45,0.9), rgba(10,18,35,0.75))",
                        border: `1px solid ${cat.color}20`,
                        boxShadow: `0 0 20px ${cat.color}10`,
                        backdropFilter: "blur(12px)",
                        cursor: "default",
                        whiteSpace: "nowrap",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* Glow */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: `linear-gradient(135deg, ${cat.color}08, transparent 70%)`,
                          pointerEvents: "none",
                        }}
                      />

                      {/* Icon */}
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `${cat.color}10`,
                          border: `1px solid ${cat.color}25`,
                          color: cat.color,
                          fontSize: "1rem",
                          boxShadow: `0 0 12px ${cat.color}20`,
                          flexShrink: 0,
                        }}
                      >
                        {skill.icon}
                      </div>

                      {/* Name */}
                      <span
                        style={{
                          fontFamily: "Outfit, sans-serif",
                          fontSize: "0.86rem",
                          fontWeight: 500,
                          color: "var(--text-primary)",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {skill.name}
                      </span>
                    </motion.div>
                  )
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom Cards */}
      <div className="section-container" style={{ marginTop: 80 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}
        >
          {[
            {
              icon: "🧠",
              title: "AI & Machine Learning",
              desc: "Building intelligent systems with ML, DL, OpenCV, and OpenAI APIs. From prediction models to AI-powered chatbots.",
              color: "#FF6B6B",
            },
            {
              icon: "⚛",
              title: "Full Stack Web",
              desc: "React, Next.js, Node.js, Flask. Building scalable frontends and robust backends with modern architectures.",
              color: "#00D4FF",
            },
            {
              icon: "◆",
              title: "Mobile Development",
              desc: "Cross-platform apps with Flutter & Dart. Clean UIs and smooth performance on iOS and Android.",
              color: "#00FFB3",
            },
            {
              icon: "⚙",
              title: "DevOps & Tools",
              desc: "Git, Docker, Firebase, Vercel, REST APIs, WebSockets. From development to deployment.",
              color: "#7C3AED",
            },
          ].map(({ icon, title, desc, color }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              whileHover={{
                y: -6,
                borderColor: `${color}40`,
              }}
              style={{
                padding: 28,
                borderRadius: 14,
                background: "rgba(10,20,40,0.5)",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "default",
                transition: "all 0.4s",
              }}
            >
              <div
                style={{
                  fontSize: "1.8rem",
                  marginBottom: 14,
                }}
              >
                {icon}
              </div>

              <div
                style={{
                  fontFamily: "Outfit, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: 10,
                }}
              >
                {title}
              </div>

              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {desc}
              </div>

              <div
                style={{
                  marginTop: 16,
                  width: 32,
                  height: 2,
                  background: color,
                  borderRadius: 1,
                  boxShadow: `0 0 8px ${color}`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes ticker-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.33%);
          }
        }

        @keyframes ticker-right {
          from {
            transform: translateX(-33.33%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}