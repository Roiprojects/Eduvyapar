"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export const CursorGlow: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const springX = useSpring(0, { damping: 28, stiffness: 220 });
  const springY = useSpring(0, { damping: 28, stiffness: 220 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      springX.set(e.clientX);
      springY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [springX, springY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed pointer-events-none z-40 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-cyan-500/10 to-transparent blur-3xl opacity-70 transition-opacity duration-300"
    />
  );
};
