"use client";

import React, { useState } from "react";
import { 
  LayoutDashboard, 
  GraduationCap, 
  FileText, 
  ShoppingBag, 
  Package, 
  Briefcase, 
  BookOpen, 
  Users, 
  MessageSquare, 
  Bell, 
  User, 
  Settings, 
  Search, 
  ArrowRight, 
  Plus, 
  CheckCircle, 
  Play, 
  Bookmark, 
  Clock, 
  ExternalLink,
  ChevronRight
} from "lucide-react";
import { AdmissionApplication, JobApplication, VideoContent } from "../types";

interface EduvaDashboardProps {
  onNavigateTab: (tab: string) => void;
  admissionApplications: AdmissionApplication[];
  jobApplications: JobApplication[];
  videos: VideoContent[];
}

export const EduvaDashboard: React.FC<EduvaDashboardProps> = ({
  onNavigateTab,
  admissionApplications,
  jobApplications,
  videos,
}) => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("dashboard");

  const sidebarLinks = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "admissions", label: "Admissions", icon: <GraduationCap className="w-4 h-4" /> },
    { id: "my-applications", label: "My Applications", icon: <FileText className="w-4 h-4" /> },
    { id: "marketplace", label: "Marketplace", icon: <ShoppingBag className="w-4 h-4" /> },
    { id: "my-orders", label: "My Orders", icon: <Package className="w-4 h-4" /> },
    { id: "jobs", label: "Jobs", icon: <Briefcase className="w-4 h-4" /> },
    { id: "learning", label: "Learning", icon: <BookOpen className="w-4 h-4" /> },
    { id: "following", label: "Following", icon: <Users className="w-4 h-4" /> },
    { id: "messages", label: "Messages", icon: <MessageSquare className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-slate-50/70 border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[850px]">
      {/* LEFT SIDEBAR (Matches Top-Right Screen Exactly) */}
      <aside className="w-full md:w-60 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between space-y-6">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigateTab("home")}><img src="/assets/eduvyapar_logo_official.png" alt="EduVyapar" className="h-7 w-auto object-contain" /></div>

          {/* Navigation Menu */}
          <nav className="space-y-1">
            {sidebarLinks.map((item) => {
              const isActive = activeSidebarItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSidebarItem(item.id);
                    if (item.id === "marketplace") onNavigateTab("marketplace");
                    if (item.id === "admissions") onNavigateTab("admissions");
                    if (item.id === "jobs") onNavigateTab("jobs");
                    if (item.id === "learning") onNavigateTab("learn");
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span className={isActive ? "text-blue-600" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Help Card */}
        <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs space-y-2">
          <div className="font-bold text-slate-900">Need Academic Support?</div>
          <p className="text-[11px] text-slate-500">Contact institute counselors or faculty mentors.</p>
        </div>
      </aside>

      {/* MAIN DASHBOARD CONTENT AREA */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Search & Profile Bar */}
        <div className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search anything..."
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
              <MessageSquare className="w-4 h-4" />
            </button>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600" />
            </button>

            {/* Profile Avatar: Rahul Sharma */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="Rahul Sharma"
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-slate-900 leading-tight">Rahul Sharma</div>
                <div className="text-[10px] text-slate-500">Student &bull; Class XII</div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Body Grid: 2 Columns */}
        <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Left Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Greeting Header */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span>Good morning, Rahul!</span>
                <span>👋</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Here&apos;s what&apos;s happening with your education journey today.
              </p>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="eduva-card p-4 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-500">Applications</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">4 Active</div>
              </div>

              <div className="eduva-card p-4 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-500">Orders</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">2 Active</div>
              </div>

              <div className="eduva-card p-4 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                  <Bookmark className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-500">Saved Jobs</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">8</div>
              </div>

              <div className="eduva-card p-4 flex flex-col justify-between">
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-2">
                  <Play className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-500">Learning</div>
                <div className="text-lg font-black text-slate-900 mt-0.5">12 Videos</div>
              </div>
            </div>

            {/* Central Row: Your Admission Application + Continue Learning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Your Admission Application */}
              <div className="eduva-card p-5 space-y-3.5">
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span>Your Admission Application</span>
                </div>

                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">
                      Bangalore International Academy
                    </h3>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Application ID: EDU723456
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                    Under Review
                  </span>
                </div>

                <button
                  onClick={() => onNavigateTab("admissions")}
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  View Details
                </button>
              </div>

              {/* Card 2: Continue Learning */}
              <div className="eduva-card p-5 space-y-3.5">
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-purple-600" />
                  <span>Continue Learning</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-900 relative flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                      alt="Instructor"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-900 text-xs truncate">
                      Physics - Light and its Properties
                    </h4>
                    <div className="text-[11px] text-slate-500">Dr. Ananya Rao</div>
                    <button
                      onClick={() => onNavigateTab("learn")}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 mt-1 inline-flex items-center gap-1"
                    >
                      <span>Resume</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended For You Section */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-sm">Recommended for you</h3>
                <span className="text-xs text-slate-400">Curated suggestions</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  {
                    title: "Top 10 Universities in India 2026",
                    category: "Explore",
                    tab: "admissions",
                    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&auto=format&fit=crop&q=80",
                  },
                  {
                    title: "Best Study Materials for JEE",
                    category: "Explore",
                    tab: "marketplace",
                    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&auto=format&fit=crop&q=80",
                  },
                  {
                    title: "Trending Job Roles in Education",
                    category: "Explore",
                    tab: "jobs",
                    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=300&auto=format&fit=crop&q=80",
                  },
                  {
                    title: "Learn From Experts (Live Sessions)",
                    category: "Explore",
                    tab: "learn",
                    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=300&auto=format&fit=crop&q=80",
                  },
                ].map((rec, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigateTab(rec.tab)}
                    className="eduva-card p-3 cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="h-24 rounded-lg overflow-hidden bg-slate-100 mb-2">
                      <img
                        src={rec.image}
                        alt={rec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="font-bold text-slate-800 text-[11px] line-clamp-2">
                      {rec.title}
                    </div>
                    <div className="text-[10px] text-blue-600 font-semibold mt-2 group-hover:underline">
                      {rec.category} &rarr;
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions (4 Square Icons) */}
            <div className="eduva-card p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-800">Quick Actions</h3>
              <div className="grid grid-cols-4 gap-2 text-center">
                <button
                  onClick={() => onNavigateTab("admissions")}
                  className="p-3 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-semibold text-slate-700">Apply</span>
                </button>

                <button
                  onClick={() => onNavigateTab("marketplace")}
                  className="p-3 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-semibold text-slate-700">Shop</span>
                </button>

                <button
                  onClick={() => onNavigateTab("jobs")}
                  className="p-3 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-semibold text-slate-700">Jobs</span>
                </button>

                <button
                  onClick={() => onNavigateTab("institutes")}
                  className="p-3 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 flex flex-col items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-semibold text-slate-700">Connect</span>
                </button>
              </div>
            </div>

            {/* My Applications Widget */}
            <div className="eduva-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800">My Applications</h3>
                <button
                  onClick={() => onNavigateTab("admissions")}
                  className="text-[10px] text-blue-600 hover:underline font-semibold"
                >
                  View Details &rarr;
                </button>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 truncate">Bangalore International Academy</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-50 text-amber-600 border border-amber-200">
                    Under Review
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 truncate">Greenwood High International</span>
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-50 text-blue-600 border border-blue-200">
                    Applied
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Content Widget */}
            <div className="eduva-card p-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-800">Featured Content</h3>
              <div className="rounded-xl overflow-hidden bg-slate-900 relative aspect-video cursor-pointer">
                <img
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?w=400&auto=format&fit=crop&q=80"
                  alt="Featured Video"
                  className="w-full h-full object-cover opacity-85"
                />
                <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">
                  The Future of Education
                </h4>
                <div className="text-[10px] text-slate-500">Dr. Priya Menon &bull; Dean of Academics</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
