"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck, Users, Building, ShoppingBag, Truck, Zap, Globe2 } from "lucide-react";

interface HeroBannerProps {
  onExplore: (tab: string) => void;
}

// Interactive 3D Tilt Card Component
const TiltCard: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}> = ({ title, subtitle, icon, gradient, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["14deg", "-14deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-14deg", "14deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative p-6 rounded-3xl glass-card cursor-pointer transition-all duration-300 group overflow-hidden"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-purple-500/20 rounded-3xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 space-y-2 text-center">
        <div className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent tracking-tight`}>
          {title}
        </div>
        <div className="text-xs text-slate-300 font-medium flex items-center justify-center gap-1.5">
          {icon}
          <span>{subtitle}</span>
        </div>
      </div>
    </motion.div>
  );
};

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <div className="relative overflow-hidden py-16 px-4 lg:px-8 border-b border-slate-800/80">
      {/* Dynamic Glowing Ambient Blobs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Animated Top Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/40 text-indigo-300 text-xs font-semibold shadow-lg glow-pill backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Next-Gen Unified Education Platform &bull; BRD Ver 1.0 Production</span>
          </motion.div>

          {/* Staggered Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]"
          >
            Empowering the World&apos;s Largest{" "}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Education Ecosystem
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            A high-performance digital infrastructure integrating educational supply commerce, faculty recruitment, pre-admission auto-submissions, Shisya masterclasses, and regional inter-institutional bus fleet sharing.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onExplore("admissions")}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-2xl shadow-indigo-500/30 flex items-center gap-2 group transition-all"
            >
              <Zap className="w-4 h-4 text-cyan-200 fill-cyan-200" />
              <span>Explore Pre-Admission Engine</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onExplore("ecommerce")}
              className="px-7 py-3.5 rounded-2xl glass-panel hover:bg-slate-800/80 text-slate-200 font-semibold text-xs transition-all flex items-center gap-2 border border-slate-700/80"
            >
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span>Certified Supplies Store</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onExplore("bus-sharing")}
              className="px-7 py-3.5 rounded-2xl glass-panel hover:bg-slate-800/80 text-slate-200 font-semibold text-xs transition-all flex items-center gap-2 border border-slate-700/80"
            >
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Inter-Institute Bus Pool</span>
            </motion.button>
          </motion.div>
        </div>

        {/* 4 3D Tilt Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-16 pt-8 border-t border-slate-800/80">
          <TiltCard
            title="50+ Lakh"
            subtitle="Students & Guardians"
            icon={<Users className="w-4 h-4 text-emerald-400" />}
            gradient="from-emerald-400 to-teal-300"
            delay={0.2}
          />
          <TiltCard
            title="5+ Lakh"
            subtitle="Verified Institutions"
            icon={<Building className="w-4 h-4 text-blue-400" />}
            gradient="from-blue-400 to-indigo-300"
            delay={0.3}
          />
          <TiltCard
            title="100% Auto"
            subtitle="Pre-Admission Triggers"
            icon={<Sparkles className="w-4 h-4 text-indigo-400" />}
            gradient="from-indigo-400 to-purple-300"
            delay={0.4}
          />
          <TiltCard
            title="ISO & RBAC"
            subtitle="6 Persona Control Centers"
            icon={<ShieldCheck className="w-4 h-4 text-amber-400" />}
            gradient="from-amber-400 to-orange-300"
            delay={0.5}
          />
        </div>
      </div>
    </div>
  );
};
