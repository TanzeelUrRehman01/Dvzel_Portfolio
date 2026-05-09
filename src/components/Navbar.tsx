import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map(l => ({ id: l.id, el: document.getElementById(l.id) }));
      for (const s of sections.reverse()) {
        if (s.el && s.el.getBoundingClientRect().top <= 120) {
          setActive(links.find(l => l.id === s.id)?.label || "Home");
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string, label: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActive(label);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? "10px 40px" : "18px 40px",
        transition: "all 0.4s ease",
        background: scrolled ? "rgba(3,8,16,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,255,0.07)" : "none",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.04 }} style={{ cursor: "pointer" }} onClick={() => scrollTo("hero", "Home")}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* D logo — hexagon frame with stylised D */}
            <svg width="30" height="34" viewBox="0 0 80 90">
              <defs>
                <linearGradient id="dLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00D4FF" />
                  <stop offset="100%" stopColor="#8A2BE2" />
                </linearGradient>
              </defs>
              <polygon
                points="40,2 78,22 78,68 40,88 2,68 2,22"
                fill="none"
                stroke="url(#dLogoGrad)"
                strokeWidth="1.5"
                style={{ filter: "drop-shadow(0 0 6px #00D4FF)" }}
              />
              {/* D shape: vertical bar + curved right side */}
              <line x1="28" y1="28" x2="28" y2="62" stroke="url(#dLogoGrad)" strokeWidth="5" strokeLinecap="round" style={{ filter: "drop-shadow(0 0 4px #00D4FF)" }} />
              <path
                d="M28 28 Q62 28 62 45 Q62 62 28 62"
                fill="none"
                stroke="url(#dLogoGrad)"
                strokeWidth="5"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 4px #8A2BE2)" }}
              />
            </svg>

            <div>
              <div style={{ fontFamily: "Syncopate, sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.15em" }}>DEVZEL</div>
              {/* <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.55rem", color: "var(--accent-cyan)", letterSpacing: "0.2em", opacity: 0.7 }}>AI · FULL STACK</div> */}
            </div>
          </div>
        </motion.div>

        {/* Desktop nav */}
        <div className="desktop-nav" style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {links.map(({ label, id }) => (
            <motion.button
              key={label}
              onClick={() => scrollTo(id, label)}
              whileHover={{ y: -2 }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "Outfit, sans-serif", fontSize: "0.8rem", fontWeight: 500,
                letterSpacing: "0.05em",
                color: active === label ? "var(--accent-cyan)" : "var(--text-muted)",
                padding: "6px 14px", position: "relative", transition: "color 0.3s",
              }}
            >
              {label}
              {active === label && (
                <motion.div
                  layoutId="nav-active"
                  style={{ position: "absolute", bottom: 0, left: "50%", width: 4, height: 4, borderRadius: "50%", background: "var(--accent-cyan)", translateX: "-50%", boxShadow: "0 0 8px var(--accent-cyan)" }}
                />
              )}
            </motion.button>
          ))}

          <motion.a
            href="public\resume\Tanzeel_Ur_Rehman.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0,212,255,0.25)" }}
            whileTap={{ scale: 0.96 }}
            style={{
              marginLeft: 10, padding: "8px 20px",
              background: "rgba(0,212,255,0.06)",
              border: "1px solid rgba(0,212,255,0.4)",
              borderRadius: 6, color: "var(--accent-cyan)",
              fontFamily: "Outfit, sans-serif", fontSize: "0.75rem", fontWeight: 700,
              letterSpacing: "0.12em", textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 6,
              transition: "all 0.3s",
            }}
          >
            <span style={{ fontSize: "0.7rem" }}>↗</span> RESUME
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none", flexDirection: "column", gap: 5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={menuOpen ? (i === 0 ? { rotate: 45, y: 7 } : i === 1 ? { opacity: 0 } : { rotate: -45, y: -7 }) : { rotate: 0, y: 0, opacity: 1 }}
              style={{ width: 22, height: 2, background: "var(--accent-cyan)", borderRadius: 2 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ background: "rgba(3,8,16,0.98)", borderTop: "1px solid rgba(0,212,255,0.1)", padding: "20px 40px", display: "flex", flexDirection: "column", gap: 4 }}
          >
            {links.map(({ label, id }) => (
              <button key={label} onClick={() => scrollTo(id, label)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Outfit", fontSize: "1rem", color: active === label ? "var(--accent-cyan)" : "var(--text-primary)", textAlign: "left", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                {label}
              </button>
            ))}
            <a href="../assets/resume/Tanzeel_Ur_Rehman.pdf" target="_blank" rel="noopener noreferrer" style={{ marginTop: 12, padding: "12px 0", textAlign: "center", background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 8, color: "var(--accent-cyan)", fontFamily: "Outfit", fontSize: "0.85rem", fontWeight: 700, textDecoration: "none" }}>↗ VIEW RESUME</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}