"use client";

import React from "react";
import { UserRole, NotificationItem } from "../types";
import { Search, Bell, MessageSquare, Sparkles, Smartphone } from "lucide-react";

interface EduvaHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
  onOpenCommTemplates?: () => void;
  notifications: NotificationItem[];
}

export const EduvaHeader: React.FC<EduvaHeaderProps> = ({
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  onOpenChat,
  onOpenCommTemplates,
}) => {
  const navLinks = [
    { id: "home", label: "Home" },
    { id: "marketplace", label: "Marketplace" },
    { id: "admissions", label: "Admissions" },
    { id: "jobs", label: "Jobs" },
    { id: "learn", label: "Learn" },
    { id: "portal", label: "Student & Parent" },
    { id: "institutes", label: "Institutes" },
    { id: "dashboard", label: "Dashboard" },
  ];

  return (
    <header className="w-full z-30 bg-transparent py-4 px-6 sm:px-10 lg:px-14">
      <div className="max-w-[1340px] mx-auto flex items-center justify-between gap-6">
        {/* Crisp Official Vector Logo */}
        <div
          onClick={() => onTabChange("home")}
          className="flex items-center cursor-pointer select-none group flex-shrink-0"
        >
          <img
            src="/assets/eduvyapar_logo_official.png"
            alt="EduVyapar"
            className="h-8 sm:h-[38px] w-auto object-contain group-hover:scale-105 transition-transform"
          />
        </div>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13.5px]">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onTabChange(link.id)}
                className={`relative py-1 cursor-pointer font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-[#0f2c59] font-bold after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-5 after:h-[2px] after:bg-[#0066cc] after:rounded-full"
                    : "text-slate-700 hover:text-[#0066cc]"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Comm Hub | Search | Login [Sign Up] */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          {/* SMS / WhatsApp Templates Hub Trigger */}
          {onOpenCommTemplates && (
            <button
              onClick={onOpenCommTemplates}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 hover:bg-blue-100 text-[#0066cc] text-xs font-bold border border-blue-200 transition-colors cursor-pointer"
              title="View all official SMS, WhatsApp and Email templates from BRD specification"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>SMS / WhatsApp Hub</span>
            </button>
          )}

          <button
            onClick={() => onTabChange("marketplace")}
            className="text-slate-700 hover:text-[#0066cc] transition-colors cursor-pointer p-1"
            title="Search"
          >
            <Search className="w-4 h-4 stroke-[2]" />
          </button>

          <div className="h-4 w-px bg-slate-300 hidden sm:block" />

          <button
            onClick={() => onTabChange("dashboard")}
            className="text-[13.5px] font-medium text-slate-800 hover:text-[#0066cc] transition-colors cursor-pointer"
          >
            Login
          </button>

          <button
            onClick={() => onTabChange("admissions")}
            className="bg-[#0066cc] hover:bg-[#0052ad] text-white text-[13.5px] font-medium px-4 sm:px-5 py-2 rounded-full shadow-xs cursor-pointer transition-transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
};
