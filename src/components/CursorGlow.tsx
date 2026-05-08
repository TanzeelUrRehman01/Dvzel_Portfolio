import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 400, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 400, damping: 30 });
  const trailX = useSpring(cursorX, { stiffness: 100, damping: 20 });
  const trailY = useSpring(cursorY, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Ambient glow */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 9990,
        }}
      />
      {/* Ring cursor */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "1.5px solid var(--accent-cyan)",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference" as any,
        }}
      />
      {/* Dot cursor */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--accent-cyan)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
    </>
  );
}
