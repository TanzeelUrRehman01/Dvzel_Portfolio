import { motion } from "framer-motion";

// ─── react-icons imports ────────────────────────────────────────────────────
// Install once:  npm install react-icons
import { FaGithub }    from "react-icons/fa";
import { FaLinkedin }  from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
// ────────────────────────────────────────────────────────────────────────────

const navLinks = ["About", "Skills", "Projects", "Experience", "Contact"];

const socialLinks = [
  { label: "GitHub",    href: "https://github.com/TanzeelUrRehman01",        icon: <FaGithub size={16} />,    color: "#E2EBF8" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/feed/",               icon: <FaLinkedin size={16} />,  color: "#0A66C2" },
  { label: "Instagram", href: "https://www.instagram.com/_tanzeell__/",       icon: <FaInstagram size={16} />, color: "#E1306C" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "var(--bg-secondary)", borderTop: "1px solid rgba(0,212,255,0.07)", padding: "56px 0 32px" }}>
      <div className="section-container">

        {/* ── Top row ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "start", gap: 40, marginBottom: 48 }}>

          {/* Brand — Devzel logo (matches Navbar) */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <svg width="30" height="34" viewBox="0 0 80 90">
                <defs>
                  <linearGradient id="footerLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#8A2BE2" />
                  </linearGradient>
                </defs>
                <polygon
                  points="40,2 78,22 78,68 40,88 2,68 2,22"
                  fill="none"
                  stroke="url(#footerLogoGrad)"
                  strokeWidth="1.5"
                  style={{ filter: "drop-shadow(0 0 6px #00D4FF)" }}
                />
                {/* D shape: vertical bar + curved right side */}
                <line
                  x1="28" y1="28" x2="28" y2="62"
                  stroke="url(#footerLogoGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 4px #00D4FF)" }}
                />
                <path
                  d="M28 28 Q62 28 62 45 Q62 62 28 62"
                  fill="none"
                  stroke="url(#footerLogoGrad)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  style={{ filter: "drop-shadow(0 0 4px #8A2BE2)" }}
                />
              </svg>

              <div>
                <div style={{ fontFamily: "Syncopate, sans-serif", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.15em" }}>DEVZEL</div>
                <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.6rem", color: "var(--accent-cyan)", letterSpacing: "0.15em", opacity: 0.7 }}>AI ENGINEER · FULL STACK DEVELOPER</div>
              </div>
            </div>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.6, maxWidth: 280 }}>
              Building intelligent systems and stunning web experiences from Islamabad, Pakistan. Open to exciting opportunities.
            </p>
          </div>

          {/* Quick links */}
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {navLinks.map((link) => (
                <motion.button
                  key={link}
                  onClick={() => scrollTo(link)}
                  whileHover={{ x: 4, color: "var(--accent-cyan)" }}
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontSize: "0.85rem", color: "var(--text-muted)", textAlign: "center", transition: "color 0.3s" }}
                >
                  {link}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Connect — text links */}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "Syncopate, sans-serif", fontSize: "0.58rem", letterSpacing: "0.3em", color: "var(--text-muted)", marginBottom: 16 }}>CONNECT</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end" }}>
              {[
                { label: "GitHub",               href: "https://github.com/TanzeelUrRehman01" },
                { label: "LinkedIn",             href: "https://www.linkedin.com/feed/" },
                { label: "Instagram",            href: "https://www.instagram.com/_tanzeell__/" },
                { label: "rtanzeel901@gmail.com",href: "mailto:rtanzeel901@gmail.com" },
              ].map(({ label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ x: -4, color: "var(--accent-cyan)" }}
                  style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.82rem", color: "var(--text-muted)", textDecoration: "none", transition: "color 0.3s" }}
                >
                  {label}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Divider ── */}
        <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.2), transparent)", marginBottom: 28 }} />

        {/* ── Bottom row ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)" }}>
            © {year} Tanzeel Ur Rehman. All rights reserved.
          </p>

          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "0.78rem", color: "var(--text-muted)" }} />

          {/* Social icon buttons — official brand icons via react-icons */}
          <div style={{ display: "flex", gap: 10 }}>
            {socialLinks.map(({ label, href, icon, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                whileHover={{ y: -3, borderColor: `${color}80` }}
                style={{
                  width:          34,
                  height:         34,
                  borderRadius:   8,
                  background:     "rgba(0,212,255,0.04)",
                  border:         "1px solid rgba(0,212,255,0.1)",
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  color,
                  textDecoration: "none",
                  transition:     "all 0.3s",
                }}
              >
                {icon}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}