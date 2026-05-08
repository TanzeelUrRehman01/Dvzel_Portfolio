import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + Math.random() * 8 + 2;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const p = Math.min(100, Math.round(progress));

  return (
    <motion.div
      key="loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{
        position: "fixed",
        inset: 0,
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999,
      }}
    >
      {/* Animated grid background */}
      <div className="grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.4 }} />

      {/* Deep space radial glow */}
      <div style={{
        position: "absolute",
        width: 700,
        height: 700,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(138,43,226,0.07) 0%, rgba(0,212,255,0.04) 40%, transparent 70%)",
        animation: "pulse-ring 4s ease-in-out infinite",
      }} />

      {/* Saturn System */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 48,
          zIndex: 1,
        }}
      >
        {/* Outer slow orbit ring (distant moon trail) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            border: "1px dashed rgba(138,43,226,0.15)",
          }}
        />

        {/* Distant orbiting moon */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
          }}
        >
          <div style={{
            position: "absolute",
            top: "4px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "rgba(138,43,226,0.7)",
            boxShadow: "0 0 8px rgba(138,43,226,0.9)",
          }} />
        </motion.div>

        {/* Saturn planet body */}
        <div style={{
          position: "relative",
          width: 110,
          height: 110,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at 35% 35%, rgba(180,140,255,0.95) 0%, rgba(100,60,200,0.9) 35%, rgba(30,10,80,0.95) 75%, rgba(10,2,30,1) 100%)",
          boxShadow: `
            0 0 30px rgba(138,43,226,0.5),
            0 0 60px rgba(138,43,226,0.25),
            0 0 100px rgba(0,212,255,0.1),
            inset -15px -10px 30px rgba(0,0,0,0.6),
            inset 8px 6px 20px rgba(180,140,255,0.2)
          `,
          zIndex: 3,
        }}>
          {/* Surface band 1 */}
          <div style={{
            position: "absolute",
            top: "28%",
            left: "8%",
            right: "8%",
            height: "10%",
            borderRadius: "50%",
            background: "rgba(200,160,255,0.12)",
          }} />
          {/* Surface band 2 */}
          <div style={{
            position: "absolute",
            top: "48%",
            left: "5%",
            right: "5%",
            height: "8%",
            borderRadius: "50%",
            background: "rgba(0,212,255,0.08)",
          }} />
          {/* Surface highlight */}
          <div style={{
            position: "absolute",
            top: "14%",
            left: "18%",
            width: "30%",
            height: "18%",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(220,200,255,0.35) 0%, transparent 70%)",
          }} />
        </div>

        {/* ── Saturn rings (layered ellipses) ── */}
        {/* Ring shadow behind planet (rear) */}
        <div style={{
          position: "absolute",
          width: 260,
          height: 50,
          borderRadius: "50%",
          border: "none",
          background: "transparent",
          zIndex: 2,
          overflow: "hidden",
          pointerEvents: "none",
        }}>
          {/* rear ring segments rendered via SVG for proper perspective */}
        </div>

        {/* Ring layer – rear arc (behind planet) */}
        <svg
          style={{ position: "absolute", zIndex: 2, overflow: "visible" }}
          width="280"
          height="60"
          viewBox="0 0 280 60"
        >
          <defs>
            <linearGradient id="ringGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,212,255,0)" />
              <stop offset="20%" stopColor="rgba(0,212,255,0.55)" />
              <stop offset="50%" stopColor="rgba(138,43,226,0.4)" />
              <stop offset="80%" stopColor="rgba(0,212,255,0.55)" />
              <stop offset="100%" stopColor="rgba(0,212,255,0)" />
            </linearGradient>
            <linearGradient id="ringGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(138,43,226,0)" />
              <stop offset="25%" stopColor="rgba(180,100,255,0.35)" />
              <stop offset="50%" stopColor="rgba(0,212,255,0.25)" />
              <stop offset="75%" stopColor="rgba(180,100,255,0.35)" />
              <stop offset="100%" stopColor="rgba(138,43,226,0)" />
            </linearGradient>
            <linearGradient id="ringGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(0,212,255,0)" />
              <stop offset="30%" stopColor="rgba(0,212,255,0.2)" />
              <stop offset="70%" stopColor="rgba(0,212,255,0.2)" />
              <stop offset="100%" stopColor="rgba(0,212,255,0)" />
            </linearGradient>
            <clipPath id="rearClip">
              <rect x="0" y="0" width="280" height="30" />
            </clipPath>
          </defs>
          {/* Main bright ring – rear half */}
          <ellipse cx="140" cy="30" rx="130" ry="18" fill="none" stroke="url(#ringGrad1)" strokeWidth="9" clipPath="url(#rearClip)" />
          {/* Middle ring – rear half */}
          <ellipse cx="140" cy="30" rx="115" ry="15" fill="none" stroke="url(#ringGrad2)" strokeWidth="6" clipPath="url(#rearClip)" />
          {/* Outer faint ring – rear half */}
          <ellipse cx="140" cy="30" rx="128" ry="17" fill="none" stroke="url(#ringGrad3)" strokeWidth="3" clipPath="url(#rearClip)" opacity="0.5" />
        </svg>

        {/* Ring layer – front arc (in front of planet) */}
        <svg
          style={{ position: "absolute", zIndex: 4, overflow: "visible" }}
          width="280"
          height="60"
          viewBox="0 0 280 60"
        >
          <defs>
            <clipPath id="frontClip">
              <rect x="0" y="30" width="280" height="30" />
            </clipPath>
          </defs>
          {/* Main bright ring – front half */}
          <ellipse cx="140" cy="30" rx="130" ry="18" fill="none" stroke="url(#ringGrad1)" strokeWidth="9" clipPath="url(#frontClip)" />
          {/* Middle ring – front half */}
          <ellipse cx="140" cy="30" rx="115" ry="15" fill="none" stroke="url(#ringGrad2)" strokeWidth="6" clipPath="url(#frontClip)" />
          {/* Outer faint ring – front half */}
          <ellipse cx="140" cy="30" rx="128" ry="17" fill="none" stroke="url(#ringGrad3)" strokeWidth="3" clipPath="url(#frontClip)" opacity="0.5" />
        </svg>

        {/* Ring shimmer animation */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", zIndex: 5, width: 280, height: 60, pointerEvents: "none" }}
        />

        {/* Inner orbiting particle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: 180,
            height: 36,
            zIndex: 6,
          }}
        >
          <div style={{
            position: "absolute",
            top: "-3px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#00D4FF",
            boxShadow: "0 0 12px #00D4FF, 0 0 4px rgba(0,212,255,0.8)",
          }} />
        </motion.div>

        {/* Second orbiting particle (counter) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{
            position: "absolute",
            width: 220,
            height: 44,
            zIndex: 6,
          }}
        >
          <div style={{
            position: "absolute",
            bottom: "-3px",
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "rgba(180,100,255,0.9)",
            boxShadow: "0 0 10px rgba(180,100,255,0.9)",
          }} />
        </motion.div>
      </motion.div>

      {/* Branding */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        style={{ textAlign: "center", zIndex: 1 }}
      >
        <div style={{
          fontFamily: "Syncopate, sans-serif",
          fontSize: "1.5rem",
          fontWeight: 700,
          letterSpacing: "0.45em",
          color: "var(--text-primary)",
          marginBottom: 6,
        }}>
          DEVZEL
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 0.8 }}
          style={{
            fontFamily: "Outfit, sans-serif",
            fontSize: "0.72rem",
            letterSpacing: "0.3em",
            color: "var(--accent-cyan)",
            marginBottom: 44,
          }}
        >
          AI ENGINEER · FULL STACK DEVELOPER
        </motion.div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{ width: 280, margin: "0 auto" }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 8,
            fontFamily: "Outfit, sans-serif",
            fontSize: "0.72rem",
            color: "var(--text-muted)",
          }}>
            <span style={{ letterSpacing: "0.2em" }}>
              {p < 40 ? "LOADING ASSETS..." : p < 75 ? "BUILDING EXPERIENCE..." : "INITIALIZING..."}
            </span>
            <span style={{ color: "var(--accent-cyan)" }}>{p}%</span>
          </div>
          <div style={{
            width: "100%",
            height: 2,
            background: "rgba(0,212,255,0.1)",
            borderRadius: 2,
            overflow: "hidden",
          }}>
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(90deg, var(--accent-cyan), rgba(138,43,226,0.9), var(--accent-cyan))",
                backgroundSize: "200% 100%",
                borderRadius: 2,
                boxShadow: "0 0 10px var(--accent-cyan)",
              }}
              animate={{
                width: `${p}%`,
                backgroundPosition: ["0% 0%", "100% 0%"],
              }}
              transition={{ ease: "linear", backgroundPosition: { duration: 2, repeat: Infinity } }}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}