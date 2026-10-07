"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserRole, NotificationItem } from "../types";
import { 
  GraduationCap, 
  ShoppingCart, 
  Bell, 
  MessageSquare, 
  Search, 
  ShieldCheck, 
  User, 
  Building2, 
  Store, 
  BookOpen, 
  Bus, 
  Users,
  CheckCircle2,
  ChevronDown,
  Sparkles
} from "lucide-react";

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenChat: () => void;
  notifications: NotificationItem[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  onTabChange,
  cartCount,
  onOpenCart,
  onOpenChat,
  notifications,
  searchQuery,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleMeta: Record<UserRole, { label: string; icon: React.ReactNode; color: string; badge: string }> = {
    student: { label: "Student Portal", icon: <User className="w-4 h-4" />, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", badge: "Class XII Science" },
    parent: { label: "Parent Portal", icon: <Users className="w-4 h-4" />, color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30", badge: "Guardian Mode" },
    teacher: { label: "Teacher / Faculty", icon: <BookOpen className="w-4 h-4" />, color: "bg-amber-500/10 text-amber-400 border-amber-500/30", badge: "Senior Lecturer" },
    institute: { label: "Institute Admin", icon: <Building2 className="w-4 h-4" />, color: "bg-blue-500/10 text-blue-400 border-blue-500/30", badge: "DPS International" },
    vendor: { label: "Certified Vendor", icon: <Store className="w-4 h-4" />, color: "bg-purple-500/10 text-purple-400 border-purple-500/30", badge: "OmniTech Solutions" },
    admin: { label: "Platform Super Admin", icon: <ShieldCheck className="w-4 h-4" />, color: "bg-rose-500/10 text-rose-400 border-rose-500/30", badge: "System Governance" },
  };

  const navItems = [
    { id: "ecommerce", label: "E-Commerce Marketplace", icon: <Store className="w-4 h-4" /> },
    { id: "recruitment", label: "Recruitment & Jobs", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "admissions", label: "Admissions & Pre-Apply", icon: <Building2 className="w-4 h-4" /> },
    { id: "social", label: "Knowledge & Shisya Feed", icon: <BookOpen className="w-4 h-4" /> },
    { id: "bus-sharing", label: "Inter-Institute Bus Pool", icon: <Bus className="w-4 h-4" /> },
    { id: "dashboard", label: "Role Dashboard", icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/90 text-white shadow-2xl transition-all">
      {/* Top Banner / Role Switcher Bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/70 px-4 lg:px-8 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-slate-400">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            BRD Ver 1.0 Production
          </span>
          <span className="hidden sm:inline">High-scale platform supporting 50L+ Students & 5L+ Institutions</span>
        </div>

        {/* Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium transition-all ${roleMeta[currentRole].color}`}
          >
            {roleMeta[currentRole].icon}
            <span className="font-semibold">Role: {roleMeta[currentRole].label}</span>
            <span className="hidden md:inline text-[10px] opacity-75">({roleMeta[currentRole].badge})</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </button>

          <AnimatePresence>
            {showRoleMenu && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl"
              >
                <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  Select Active Persona (RBAC Simulation)
                </div>
                <div className="space-y-1 mt-1">
                  {(Object.keys(roleMeta) as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        onRoleChange(r);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-all ${
                        currentRole === r
                          ? "bg-indigo-600 text-white font-medium shadow-md"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {roleMeta[r].icon}
                        <div>
                          <div className="font-medium leading-none">{roleMeta[r].label}</div>
                          <div className="text-[10px] opacity-70 mt-1">{roleMeta[r].badge}</div>
                        </div>
                      </div>
                      {currentRole === r && <CheckCircle2 className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onTabChange("ecommerce")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
              EduPlatform
            </div>
            <div className="text-[10px] text-cyan-400 font-medium tracking-wider uppercase -mt-0.5">
              Global Unified Ecosystem
            </div>
          </div>
        </motion.div>

        {/* Global Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search books, jobs, admissions, video masterclasses..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Action Buttons: Cart, Chat, Notifications */}
        <div className="flex items-center gap-2">
          {/* Real-time Chat Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenChat}
            className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/80 transition-all"
            title="Open Student-Faculty Live Chat"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </motion.button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/80 transition-all"
              title="Platform Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-4 z-50 backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                    <div className="font-semibold text-sm text-white">Universal Notifications</div>
                    <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                      {unreadCount} New
                    </span>
                  </div>
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-xl border text-xs transition-all ${
                          n.read
                            ? "bg-slate-950/40 border-slate-800 text-slate-400"
                            : "bg-indigo-950/30 border-indigo-800/40 text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-100">{n.title}</span>
                          <span className="text-[10px] text-slate-500">{n.timestamp}</span>
                        </div>
                        <p className="text-xs leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenCart}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/25 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 text-[11px] font-black flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Navigation Pills with Animated Layout Indicator */}
      <nav className="border-t border-slate-800/80 bg-slate-900/60 px-4 lg:px-8 py-2 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-max">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-indigo-600/30"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
