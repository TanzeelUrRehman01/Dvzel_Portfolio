import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "5+", label: "AI Models Deployed" },
  { value: "3+", label: "Years Learning" },
  { value: "∞", label: "Lines of Code" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} style={{ background: "var(--bg-secondary)", position: "relative", overflow: "hidden" }}>
      {/* Decorative */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }} />
      <div style={{ position: "absolute", right: -200, top: "50%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 70%)", transform: "translateY(-50%)", pointerEvents: "none" }} />

      <div className="section-container">
        <div style={{ display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }}>

          {/* Left — Visual card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ flex: "0 0 auto" }}
          >
            <div style={{ position: "relative", width: 320 }}>
              {/* Profile card */}
              <div
                className="glass"
                style={{ borderRadius: 16, padding: 32, textAlign: "center", position: "relative", overflow: "hidden" }}
              >
                {/* Scan line */}
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: 16, pointerEvents: "none" }}>
                  <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.4), transparent)", animation: "scan 4s linear infinite" }} />
                </div>

                {/* Avatar circle */}
                <div
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginBottom: 20,
                  }}
                >
                  {/* Outer glow ring */}
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.35 }}
                    style={{
                      position: "relative",
                      width: 132,
                      height: 132,
                      borderRadius: "50%",
                      padding: 3,
                      background:
                        "linear-gradient(135deg, rgba(0,212,255,0.9), rgba(124,58,237,0.9))",
                      boxShadow:
                        "0 0 25px rgba(0,212,255,0.35), 0 0 50px rgba(124,58,237,0.18)",
                      animation: "glow-pulse 3s ease-in-out infinite",
                    }}
                  >
                    {/* Inner image container */}
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        overflow: "hidden",
                        position: "relative",
                        background:
                          "linear-gradient(135deg, rgba(0,212,255,0.08), rgba(124,58,237,0.08))",
                        border: "2px solid rgba(255,255,255,0.08)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      {/* Profile Image */}
                      <img
                        src="../assets/profile_image.png" // replace with your actual image path
                        alt="Tanzeel Ur Rehman"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center top",
                          transform: "scale(1.08)",
                          transition: "transform 0.4s ease",
                        }}
                      />

                      {/* Overlay glow */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.15), rgba(0,212,255,0.05))",
                          pointerEvents: "none",
                        }}
                      />

                      {/* Animated shine */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-30%",
                          left: "-40%",
                          width: "60%",
                          height: "160%",
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
                          transform: "rotate(20deg)",
                          animation: "avatar-shine 5s linear infinite",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Status dot */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 10,
                      right: 10,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "var(--accent-green)",
                      border: "2px solid var(--bg-secondary)",
                      boxShadow: "0 0 12px var(--accent-green)",
                      zIndex: 5,
                    }}
                  />
                </div>

                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 4 }}>Tanzeel Ur Rehman</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", color: "var(--accent-cyan)", letterSpacing: "0.1em", marginBottom: 20 }}>AI Engineer · Full Stack Dev</div>

                {/* Info rows */}
                {[
                  {text : "Islamabad, Pakistan" },
                  { text: "BS Computer Science, VU" },
                  { text: "rtanzeel901@gmail.com" },
                ].map(({  text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, padding: "8px 12px", borderRadius: 8, background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.08)" }}>
                    <span style={{ fontSize: "0.9rem" }}></span>
                    <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.8rem", color: "var(--text-muted)" }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* Decorative corners */}
              {["top-left", "top-right", "bottom-left", "bottom-right"].map((pos) => (
                <div key={pos} style={{
                  position: "absolute",
                  width: 16, height: 16,
                  ...(pos.includes("top") ? { top: -1 } : { bottom: -1 }),
                  ...(pos.includes("left") ? { left: -1 } : { right: -1 }),
                  borderTop: pos.includes("top") ? "2px solid var(--accent-cyan)" : "none",
                  borderBottom: pos.includes("bottom") ? "2px solid var(--accent-cyan)" : "none",
                  borderLeft: pos.includes("left") ? "2px solid var(--accent-cyan)" : "none",
                  borderRight: pos.includes("right") ? "2px solid var(--accent-cyan)" : "none",
                }} />
              ))}
            </div>
          </motion.div>

          {/* Right — Bio content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            style={{ flex: "1 1 400px" }}
          >
            <p className="section-label">WHO I AM</p>
            <h2 className="section-heading">
              Crafting the Future with<br />
              <span className="gradient-text">Code & Intelligence</span>
            </h2>
            <div className="section-divider" />

            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                I'm an <span style={{ color: "var(--accent-cyan)" }}>AI Engineer and Full Stack Developer</span> based in Islamabad with a passion for building intelligent, scalable, and visually stunning applications. My expertise spans machine learning pipelines, modern web architectures, and AI-powered systems.
              </p>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.8 }}>
                From crafting <span style={{ color: "var(--accent-green)" }}>real-time collaborative tools</span> to deploying medical imaging ML models, I bridge the gap between complex AI research and production-ready software. I believe every line of code is an opportunity to create something extraordinary.
              </p>
              
            </div>

            {/* Stats grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {stats.map(({ value, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  style={{
                    padding: "20px 16px",
                    borderRadius: 12,
                    background: "rgba(0,212,255,0.04)",
                    border: "1px solid rgba(0,212,255,0.1)",
                    textAlign: "center",
                    cursor: "default",
                    transition: "all 0.3s",
                  }}
                  whileHover={{ borderColor: "rgba(0,212,255,0.4)", background: "rgba(0,212,255,0.08)", scale: 1.02 }}
                >
                  <div className="gradient-text" style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.7rem", color: "var(--text-muted)", marginTop: 6, letterSpacing: "0.05em" }}>{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0,212,255,0.2); }
          50% { box-shadow: 0 0 40px rgba(0,212,255,0.5), 0 0 80px rgba(0,212,255,0.1); }
        }
      `}</style>
    </section>
  );
}
