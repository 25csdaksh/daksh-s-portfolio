import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [cursorState, setCursorState] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring physics for natural fluid trailing
  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handlePointerOver = (e) => {
      const target = e.target;
      const projectEl = target.closest("[data-cursor='project']");
      const linkEl = target.closest("a, button, [data-cursor='pointer']");
      const textEl = target.closest("[data-cursor='text']");

      if (projectEl) {
        setCursorState("project");
        setCursorText(projectEl.getAttribute("data-cursor-text") || "VIEW PROJECT →");
      } else if (linkEl) {
        setCursorState("pointer");
        setCursorText("");
      } else if (textEl) {
        setCursorState("text");
        setCursorText("");
      } else {
        setCursorState("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", handlePointerOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Central crisp dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#123C2F]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: cursorState === "project" ? 0 : 6,
          height: cursorState === "project" ? 0 : 6,
          opacity: cursorState === "project" ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Trailing interactive ring / capsule */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center font-mono text-[11px] tracking-wider uppercase font-semibold text-[#F7F7F3] shadow-lg"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width:
            cursorState === "project"
              ? 140
              : cursorState === "pointer"
              ? 44
              : 28,
          height:
            cursorState === "project"
              ? 38
              : cursorState === "pointer"
              ? 44
              : 28,
          backgroundColor:
            cursorState === "project"
              ? "#123C2F"
              : cursorState === "pointer"
              ? "rgba(18, 60, 47, 0.12)"
              : "rgba(18, 60, 47, 0.04)",
          borderColor:
            cursorState === "project"
              ? "#D4AF37"
              : cursorState === "pointer"
              ? "#123C2F"
              : "rgba(18, 60, 47, 0.25)",
          borderRadius: cursorState === "project" ? "9999px" : "50%",
          borderWidth: cursorState === "project" ? "1px" : "1.5px",
          scale: 1,
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 300,
        }}
      >
        {cursorState === "project" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] tracking-widest text-[#F7F7F3] whitespace-nowrap font-sans px-2 flex items-center gap-1 font-medium"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
