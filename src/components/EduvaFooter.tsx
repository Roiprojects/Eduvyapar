"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Sparkles,
  Smartphone,
  Bus,
  GraduationCap,
  Briefcase,
  ShoppingBag,
  BookOpen,
  Lock,
  Send
} from "lucide-react";

interface EduvaFooterProps {
  onNavigateTab: (tab: string) => void;
  onOpenCommTemplates?: () => void;
}

export const EduvaFooter: React.FC<EduvaFooterProps> = ({
  onNavigateTab,
  onOpenCommTemplates,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
      setNewsletterEmail("");
    }, 4000);
  };

  return (
    <footer className="w-full bg-[#0b1329] text-white border-t border-slate-800/80 pt-16 pb-12 transition-all">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
        {/* Top Highlight Banner: Enterprise Scale */}
        <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 p-6 sm:p-8 rounded-3xl border border-blue-900/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Enterprise Cloud Infrastructure Active
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Supporting 50+ Lakh Students & 5+ Lakh Institutions
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl">
              High-availability multi-region cluster, zero downtime deployments, and multi-channel notifications (SMS, WhatsApp, Email).
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onOpenCommTemplates && (
              <button
                onClick={onOpenCommTemplates}
                className="px-5 py-2.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
              >
                <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                <span>SMS / WhatsApp Templates</span>
              </button>
            )}
            <button
              onClick={() => onNavigateTab("institutes")}
              className="px-5 py-2.5 rounded-xl bg-[#0066cc] hover:bg-[#0052ad] text-white text-xs font-bold shadow-md cursor-pointer transition-transform hover:scale-105"
            >
              Institutional Network
            </button>
          </div>
        </div>

        {/* 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-4">
          {/* Column 1: Brand & Enterprise Profile */}
          <div className="space-y-5 lg:col-span-1">
            <div
              onClick={() => onNavigateTab("home")}
              className="cursor-pointer inline-block"
            >
              <img
                src="/assets/eduva_official_logo.png"
                alt="EDUVA"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Everything Education. One Intelligent Ecosystem. Centralized digital infrastructure for admissions, e-commerce, recruitment, and school transport pooling.
            </p>
            <div className="space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>ISO 27001 & SOC-2 Certified Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>DigiLocker Verified National Partner</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>256-Bit Financial Grade Encryption</span>
              </div>
            </div>
          </div>

          {/* Column 2: Platform Modules */}
          <div className="space-y-3.5 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[11px] text-blue-400">
              Platform Modules
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Centralized Admissions Registry
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("admissions")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pre-Admissions Auto-Submit Queue
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("marketplace")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Educational Supplies & Books
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("marketplace")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Institutional Bulk Procurement (RFP)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("jobs")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Campus Hiring (8 Role Families)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("institutes")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Inter-School Bus Sharing Pool
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("learn")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Shisya Mentorship & GyanReels
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Role Command Centers */}
          <div className="space-y-3.5 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[11px] text-emerald-400">
              Role Portals & SOPs
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab("portal")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Student Academic Command Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("portal")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Parent Portal & Live Bus GPS Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("dashboard")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Teacher Attendance & Doubt Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("dashboard")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Institute Admin & Seat Quota Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("marketplace")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Verified Vendor Dispatch Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab("dashboard")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Super Admin Governance (BR-91)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Governance & Policies */}
          <div className="space-y-3.5 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[11px] text-amber-400">
              Governance & Trust
            </h4>
            <ul className="space-y-2.5 text-slate-400">
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  24-Page BRD v1.0 Architectural Specs
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Digital Personal Data Protection (DPDP) Act
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Immutable Audit Trail (BR-91 Standard)
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  Institutional Escrow & Refund Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  SLA: 99.98% Platform Uptime Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-white transition-colors cursor-pointer block">
                  VAPS Technosoft Enterprise Security
                </span>
              </li>
            </ul>
          </div>

          {/* Column 5: Real-Time Alerts & Contact */}
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider text-[11px] text-purple-400">
              Admissions & Alerts
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Subscribe for instant cutoff alerts, pre-admission queue triggers, and tender broadcasts.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter parent or institute email..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {isSubscribed && (
                <div className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Subscribed! Notification channels armed.</span>
                </div>
              )}
            </form>

            <div className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>1800-EDU-VA-2026 (Toll-Free National)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>contact@eduvyapar.com / info@eduva.in</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>VAPS Technosoft Enterprise Campus, Bangalore, KA 560078</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <span className="font-bold text-white text-sm tracking-wide">EDUVA</span>
            <span>&bull;</span>
            <span>EduVyapar Enterprise Education Ecosystem</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Version 1.0 Compliant</span>
          </div>

          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            &copy; 2026 EDUVA Global Education Platform. All rights reserved. Powered by VAPS Technosoft.
          </div>
        </div>
      </div>
    </footer>
  );
};
