import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const TITLES = ["Full Stack Developer", "AI/ML Engineer", "Python Developer"];

const TECH_ICONS = [
  { name: "React", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Python", color: "#3776AB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "TypeScript", color: "#3178C6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Node.js", color: "#5FA04E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Tailwind", color: "#38B2AC", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "MySQL", color: "#4479A1", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" },
  { name: "PyTorch", color: "#EE4C2C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "TensorFlow", color: "#FF6F00", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
];

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    type Particle = {
      x: number; y: number; vx: number; vy: number;
      size: number; opacity: number; pulse: number;
    };

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
    }));

    const onResize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.008;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particles.forEach((p) => {
        p.pulse += 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        // Mouse attraction
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.vx += dx * 0.00005;
          p.vy += dy * 0.00005;
        }

        const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - d / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}
    />
  );
}

function SaturnPlanet() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const renderRingsAndIcons = (isFront: boolean) => (
    <>
      {/* Outer Ring */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid rgba(0,212,255,0.15)",
          boxShadow: "0 0 15px rgba(0,212,255,0.2), inset 0 0 15px rgba(0,212,255,0.2)",
        }}
      />
      {/* Inner Thick Ring */}
      <motion.div
        animate={{ rotateZ: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 40,
          borderRadius: "50%",
          border: "12px solid rgba(124,58,237,0.08)",
          boxShadow: "0 0 25px rgba(124,58,237,0.15), inset 0 0 25px rgba(124,58,237,0.15)",
        }}
      />
      {/* Thin Inner Ring */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 85,
          borderRadius: "50%",
          border: "1px dashed rgba(0,212,255,0.3)",
        }}
      />

      {/* Orbiting Icons */}
      <motion.div
        animate={{ rotateZ: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
        }}
      >
        {TECH_ICONS.map((icon, i) => {
          const angle = (i / TECH_ICONS.length) * 360;
          const radius = 210;
          return (
            <motion.div
              key={icon.name + (isFront ? "_front" : "_back")}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: 44,
                height: 44,
                marginTop: -22,
                marginLeft: -22,
                transform: `rotateZ(${angle}deg) translateX(${radius}px)`,
                transformStyle: "preserve-3d",
                pointerEvents: isFront ? "auto" : "none",
              }}
            >
              <motion.div
                initial={{ rotateZ: -angle, rotateX: -72 }}
                animate={{ rotateZ: -360 - angle, rotateX: -72 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  background: `rgba(10,15,30,0.85)`,
                  border: `1px solid ${icon.color}40`,
                  borderRadius: "50%",
                  boxShadow: `0 0 15px ${icon.color}20, inset 0 0 10px ${icon.color}10`,
                  backdropFilter: "blur(4px)",
                }}
                whileHover={{ scale: 1.2, boxShadow: `0 0 25px ${icon.color}60` }}
              >
                <img src={icon.icon} alt={icon.name} style={{ width: "60%", height: "60%", objectFit: "contain", filter: `drop-shadow(0 0 4px ${icon.color}80)` }} />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );

  return (
    <motion.div
      style={{
        position: "relative",
        width: 440,
        height: 480,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformStyle: "preserve-3d",
      }}
      animate={{ rotateY: mouse.x * 20, rotateX: -mouse.y * 20 }}
      transition={{ type: "spring", stiffness: 60, damping: 20 }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute",
        width: 280,
        height: 280,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,212,255,0.2) 0%, rgba(124,58,237,0.1) 40%, transparent 70%)",
        filter: "blur(25px)",
      }} />

      {/* Back half of rings */}
      <motion.div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          transformStyle: "preserve-3d",
          transform: "rotateX(72deg)",
          zIndex: 1,
        }}
      >
        {renderRingsAndIcons(false)}
      </motion.div>

      {/* Saturn Sphere */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        style={{
          position: "absolute",
          width: 170,
          height: 170,
          borderRadius: "50%",
          background: "linear-gradient(145deg, rgba(30,40,70,0.95) 0%, rgba(5,10,25,0.95) 100%)",
          boxShadow: "inset -15px -15px 30px rgba(0,0,0,0.9), inset 10px 10px 25px rgba(0,212,255,0.25), 0 0 30px rgba(0,212,255,0.3)",
          border: "1px solid rgba(0,212,255,0.15)",
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {/* Atmosphere stripes */}
        <div style={{ position: "absolute", top: "15%", left: "-20%", width: "140%", height: "15%", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)", transform: "rotate(-20deg)", filter: "blur(4px)" }} />
        <div style={{ position: "absolute", top: "45%", left: "-20%", width: "140%", height: "25%", background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.15), transparent)", transform: "rotate(-20deg)", filter: "blur(6px)" }} />
        <div style={{ position: "absolute", top: "80%", left: "-20%", width: "140%", height: "10%", background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.1), transparent)", transform: "rotate(-20deg)", filter: "blur(4px)" }} />
      </motion.div>

      {/* Front half of rings */}
      <motion.div
        style={{
          position: "absolute",
          width: 420,
          height: 420,
          transformStyle: "preserve-3d",
          transform: "rotateX(72deg)",
          zIndex: 3,
          clipPath: "polygon(-20% 50%, 120% 50%, 120% 120%, -20% 120%)",
          pointerEvents: "none",
        }}
      >
        {renderRingsAndIcons(true)}
      </motion.div>
    </motion.div>
  );
}

function RotatingTitle() {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = TITLES[idx];
    let i = typing ? 0 : target.length;
    const interval = setInterval(() => {
      if (typing) {
        setDisplay(target.slice(0, i + 1));
        i++;
        if (i >= target.length) {
          clearInterval(interval);
          setTimeout(() => setTyping(false), 1800);
        }
      } else {
        setDisplay(target.slice(0, i - 1));
        i--;
        if (i <= 0) {
          clearInterval(interval);
          setIdx((prev) => (prev + 1) % TITLES.length);
          setTyping(true);
        }
      }
    }, typing ? 60 : 35);
    return () => clearInterval(interval);
  }, [idx, typing]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      <span className="gradient-text" style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700 }}>
        {display}
      </span>
      <span style={{ display: "inline-block", width: 3, height: "1.4em", background: "var(--accent-cyan)", borderRadius: 2, animation: "blink 0.8s ease-in-out infinite", boxShadow: "0 0 8px var(--accent-cyan)" }} />
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
    >
      {/* Backgrounds */}
      <ParticleCanvas />

      {/* Radial glow center */}
      <div style={{ position: "absolute", top: "40%", left: "30%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.04) 0%, transparent 60%)", pointerEvents: "none" }} />

      <div className="section-container" style={{ position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60, flexWrap: "wrap" }}>

          {/* LEFT — Text content */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
            style={{ flex: "1 1 400px", maxWidth: 600 }}
          >
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, padding: "6px 16px", borderRadius: 100, background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)" }}
            >
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent-green)", boxShadow: "0 0 8px var(--accent-green)", animation: "pulse-ring 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: "Outfit, sans-serif", fontSize: "0.75rem", color: "var(--accent-cyan)", letterSpacing: "0.15em" }}>AVAILABLE FOR WORK</span>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h1 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1.1, color: "var(--text-primary)", marginBottom: 8, letterSpacing: "-0.02em" }}>
                <span className="gradient-text">Devzel</span>
              </h1>
              <h2 style={{ fontFamily: "Outfit, sans-serif", fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)", fontWeight: 500, color: "var(--text-muted)", marginBottom: 24, letterSpacing: "0.02em" }}>
                Tanzeel Ur Rehman
              </h2>
            </motion.div>

            {/* Rotating title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{ marginBottom: 24, height: 44 }}
            >
              <RotatingTitle />
            </motion.div>

            {/* Bio snippet */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              style={{ fontFamily: "DM Sans, sans-serif", fontSize: "1rem", color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}
            >
              Building intelligent systems and stunning interfaces. Crafting AI-powered applications, scalable web platforms, and real-time experiences.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}
            >
              <button className="btn-primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                <span>View Projects</span>
              </button>
              <button className="btn-ghost" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Contact Me
              </button>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              style={{ display: "flex", gap: 16, marginTop: 40 }}
            >
          
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: 8 }}>
                <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.1)" }} />
                <span style={{ fontFamily: "Outfit", fontSize: "0.75rem", color: "var(--text-muted)" }}>Islamabad, PK</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — 3D Avatar */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.4 }}
            style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}
            className="hero-avatar"
          >
            <SaturnPlanet />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--accent-cyan), transparent)" }}
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-avatar { display: none; }
        }
        .social-icon-hover:hover {
          color: white !important;
          filter: drop-shadow(0 0 10px rgba(0,212,255,0.8)) !important;
        }
      `}</style>
    </section>
  );
}
