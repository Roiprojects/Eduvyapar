"use client";

import React, { useState } from "react";
import { 
  Search, 
  ArrowRight, 
  GraduationCap, 
  ClipboardCheck, 
  Briefcase, 
  ShoppingBag, 
  Share2, 
  ChevronRight,
  Star,
  MapPin,
  Sparkles
} from "lucide-react";
import { Product, JobPosting, AdmissionNotification } from "../types";
import { EduvaHeader } from "./EduvaHeader";

interface EduvaLandingProps {
  onNavigate: (tab: string) => void;
  products: Product[];
  jobs: JobPosting[];
  admissions: AdmissionNotification[];
  onAddToCart: (p: Product) => void;
}

export const EduvaLanding: React.FC<EduvaLandingProps> = ({
  onNavigate,
  products,
  jobs,
  admissions,
  onAddToCart,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate("marketplace");
    }
  };

  const featureCards = [
    {
      id: "learn",
      title: "Learn",
      subtitle: "Courses & Teachers",
      tab: "learn",
      icon: (
        <svg className="w-5 h-5 text-[#0066cc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
    {
      id: "apply",
      title: "Apply",
      subtitle: "Schools, Colleges & Courses",
      tab: "admissions",
      icon: (
        <svg className="w-5 h-5 text-[#0066cc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 2h6a1 1 0 0 1 1 1v2H8V3a1 1 0 0 1 1-1z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
    },
    {
      id: "work",
      title: "Work",
      subtitle: "Jobs & Career Opportunities",
      tab: "jobs",
      icon: (
        <svg className="w-5 h-5 text-[#0066cc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="3" y1="13" x2="21" y2="13" />
        </svg>
      ),
    },
    {
      id: "shop",
      title: "Shop",
      subtitle: "Books, Uniforms & More",
      tab: "marketplace",
      icon: (
        <svg className="w-5 h-5 text-[#0066cc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
    },
    {
      id: "connect",
      title: "Connect",
      subtitle: "Institutions & Resources",
      tab: "institutes",
      icon: (
        <svg className="w-5 h-5 text-[#0066cc]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
      ),
    },
  ];

  return (
    <div className="space-y-14 pb-20">
      {/* ========================================================================= */}
      {/* PURE VECTOR & ULTRA-HIGH-RESOLUTION HERO CONTAINER                        */}
      {/* ========================================================================= */}
      <section className="relative w-full max-w-[1360px] mx-auto rounded-3xl overflow-hidden bg-white shadow-sm border border-slate-100 flex flex-col justify-between min-h-[580px] lg:min-h-[620px]">
        {/* The Clean Photography Backdrop (100% Uncompressed without baked text) */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/hero_campus_student.png"
            alt="Campus Student"
            className="w-full h-full object-cover object-[78%_center]"
          />
          {/* Soft sunny white gradient wash on left for maximum contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 via-48% to-transparent pointer-events-none" />
          {/* Top sky highlight */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
        </div>

        {/* Embedded Top Navigation Bar */}
        <div className="relative z-20">
          <EduvaHeader
            activeTab="home"
            onTabChange={onNavigate}
            currentRole="student"
            onRoleChange={() => {}}
            cartCount={0}
            onOpenCart={() => {}}
            onOpenChat={() => {}}
            notifications={[]}
          />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-16 pt-8 pb-10 flex-1 flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            {/* Razor-sharp Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif-hero font-bold tracking-tight text-[#0f2c59] leading-[1.12]">
              Everything Education. <br />
              <span className="text-[#0066cc]">One Intelligent Ecosystem.</span>
            </h1>

            {/* Subtitle Paragraph */}
            <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed max-w-xl font-normal">
              From discovering the right school to finding the perfect job, accessing quality learning, and buying educational products — all in one place.
            </p>

            {/* Real Search Bar Pill */}
            <div className="relative max-w-xl pt-2">
              <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full py-2.5 px-3 pl-6 shadow-[0_12px_40px_rgba(0,102,204,0.08)] border border-slate-100">
                <Search className="w-5 h-5 text-slate-400 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search schools, courses, jobs, teachers, products..."
                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                />
                <button
                  type="submit"
                  onClick={() => onNavigate("marketplace")}
                  className="w-10 h-10 rounded-full bg-[#0066cc] hover:bg-[#0052ad] text-white flex items-center justify-center flex-shrink-0 shadow-md cursor-pointer transition-transform hover:scale-105 ml-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* 5 Floating Category Cards (Matches 01_homepage_full exactly) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 pt-3 w-full max-w-[680px]">
              {featureCards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => onNavigate(card.tab)}
                  className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl border border-white/90 shadow-[0_6px_24px_rgba(15,44,89,0.06)] hover:shadow-[0_12px_32px_rgba(15,44,89,0.12)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between min-h-[110px] sm:min-h-[118px]"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#edf6fc] flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform shadow-xs">
                    {card.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[#0f2c59] text-xs sm:text-[14px] tracking-tight group-hover:text-[#0066cc] transition-colors leading-tight">
                      {card.title}
                    </div>
                    <div className="text-[10px] sm:text-[10.5px] text-[#64748b] leading-[1.25] font-normal mt-1">
                      {card.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Script Text over Student (Right Side) */}
        <div className="absolute right-10 sm:right-16 lg:right-20 bottom-28 sm:bottom-32 lg:bottom-36 z-10 text-right pointer-events-none select-none hidden md:block">
          <div className="font-script text-2xl sm:text-3xl lg:text-[34px] text-white/95 leading-[1.12] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] transform -rotate-2">
            <div>Better</div>
            <div>Learning</div>
            <div>Brighter</div>
            <div>Future</div>
            <div className="w-20 ml-auto mt-1 border-b-2 border-white/90 shadow-sm"></div>
          </div>
        </div>

        {/* Bottom Stats & Community Bar */}
        <div className="relative z-10 w-full bg-white border-t border-slate-100 py-6 px-6 sm:px-12">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 w-full lg:w-auto">
              <div className="sm:border-r border-slate-200/80 sm:pr-8">
                <div className="text-2xl sm:text-3xl font-bold text-[#0066cc] leading-none">50L+</div>
                <div className="text-xs text-slate-500 font-medium mt-1.5">Students</div>
              </div>
              <div className="sm:border-r border-slate-200/80 sm:pr-8">
                <div className="text-2xl sm:text-3xl font-bold text-[#0066cc] leading-none">5L+</div>
                <div className="text-xs text-slate-500 font-medium mt-1.5">Institutions</div>
              </div>
              <div className="sm:border-r border-slate-200/80 sm:pr-8">
                <div className="text-2xl sm:text-3xl font-bold text-[#0066cc] leading-none">1000+</div>
                <div className="text-xs text-slate-500 font-medium mt-1.5">Education Products</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#0066cc] leading-none">2500+</div>
                <div className="text-xs text-slate-500 font-medium mt-1.5">Jobs</div>
              </div>
            </div>

            {/* Right Community Section */}
            <div 
              onClick={() => onNavigate("learn")}
              className="flex items-center gap-3.5 cursor-pointer group hover:opacity-95 transition-opacity"
            >
              <div className="flex -space-x-2">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=95" alt="Learner" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=95" alt="Educator" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs" />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=95" alt="Student" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs" />
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=95" alt="Mentor" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs" />
              </div>
              <p className="text-xs sm:text-[13px] font-medium text-slate-700 max-w-[210px] leading-tight">
                Join a global community of learners and educators
              </p>
              <div className="w-8 h-8 rounded-full border border-blue-400 text-[#0066cc] flex items-center justify-center group-hover:bg-[#0066cc] group-hover:text-white transition-all shadow-xs">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* REST OF THE 24-PAGE BRD PLATFORM MODULES (E-Commerce, Admissions, etc.)   */}
{/* REST OF THE 24-PAGE BRD PLATFORM MODULES (E-Commerce, Admissions, etc.)   */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 1. Featured Institutions Preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Featured Institutions</h2>
              <p className="text-xs text-slate-500">Explore top schools, colleges and universities with verified eligibility cutoffs</p>
            </div>
            <button
              onClick={() => onNavigate("admissions")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {admissions.slice(0, 3).map((adm) => (
              <div
                key={adm.id}
                onClick={() => onNavigate("admissions")}
                className="eduva-card p-5 cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="h-40 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={adm.instituteLogo}
                      alt={adm.instituteName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                      {adm.status}
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm mt-1.5 line-clamp-1">
                      {adm.instituteName}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>{adm.location}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-700">Cutoff: {adm.eligibilityCutoff}%</span>
                  <span className="text-xs font-bold text-blue-600 group-hover:underline">Explore &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Popular Products Preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Popular Supplies & Books</h2>
              <p className="text-xs text-slate-500">Essential products for modern classrooms and home study</p>
            </div>
            <button
              onClick={() => onNavigate("marketplace")}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
            >
              <span>View Store</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="eduva-card p-4 flex flex-col justify-between space-y-3"
              >
                <div className="h-44 rounded-xl overflow-hidden bg-slate-100 relative">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-2 left-2 text-[10px] font-bold bg-white/95 px-2 py-0.5 rounded-md shadow-xs">
                    {p.category}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs line-clamp-2">
                    {p.name}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-black text-slate-900">₹{p.price.toLocaleString()}</span>
                    <span className="text-[10px] text-amber-500 flex items-center font-bold">
                      <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                      {p.rating}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onAddToCart(p)}
                  className="w-full py-2 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 3. NEW: Student & Parent Operational Portal Showcase (From EduVyapar SOP PDF) */}
        <section className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-10 rounded-3xl space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase tracking-wider">
                Student & Parent Life-Cycle
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Student & Parent Interactive Portal
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-light">
                From live school bus GPS telematics and AI homework assistance to DigiLocker marksheets and one-click term fee settlements.
              </p>
            </div>
            <button
              onClick={() => onNavigate("portal")}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Open Student & Parent Portal &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Feature 1: Live Bus GPS */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">Live Bus Telematics</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono">
                  ACTIVE GPS
                </span>
              </div>
              <div className="text-sm font-bold text-white">Route #12 &bull; KA-04-EB-2024</div>
              <p className="text-xs text-slate-300">
                Driver Ramesh Babu &bull; Speed 34 km/h &bull; Safe corridor geofence verified.
              </p>
              <div className="pt-2 text-xs font-semibold text-blue-300">
                ETA to Home Stop: 14 mins
              </div>
            </div>

            {/* Feature 2: AI Tutor & Doubt Solver */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300">AI Concept Tutor</span>
                <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full font-mono">
                  v2.0 ENGINE
                </span>
              </div>
              <div className="text-sm font-bold text-white">Instant STEM Homework Help</div>
              <p className="text-xs text-slate-300">
                Step-by-step derivations for Physics, Chemistry, and Math aligned with CBSE/ICSE curricula.
              </p>
              <div className="pt-2 text-xs font-semibold text-purple-300">
                24/7 AI Doubt Resolution
              </div>
            </div>

            {/* Feature 3: Digital Student ID & Fees */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-300">Digital ID & Fee Ledger</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono">
                  DIGILOCKER
                </span>
              </div>
              <div className="text-sm font-bold text-white">Rahul Sharma &bull; Class 12-A</div>
              <p className="text-xs text-slate-300">
                Instant UPI fee dues payment with automatic GST input tax credit receipts.
              </p>
              <div className="pt-2 text-xs font-semibold text-emerald-300">
                Overall Attendance: 88.4%
              </div>
            </div>
          </div>
        </section>

        {/* 4. NEW: Campus Hiring & 8 Role Families (From EduTech Brochure) */}
        <section className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200 uppercase tracking-wider">
                Comprehensive Campus Hiring
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                One place to hire for every role in your institution
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
                Most job boards cover teachers. EduVyapar spans all 8 campus role families — from boardroom directors and professors to campus accountants and bus drivers.
              </p>
            </div>
            <button
              onClick={() => onNavigate("jobs")}
              className="px-6 py-2.5 rounded-full bg-[#0066cc] hover:bg-[#0052ad] text-white font-bold text-xs shadow-sm transition-transform hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              Explore 8 Role Families &rarr;
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {[
              { title: "Leadership & Management", desc: "Principals, Directors, HODs", count: "4 Openings" },
              { title: "Academic & Professors", desc: "PGT, TGT, STEM Lecturers", count: "6 Openings" },
              { title: "Administrative & Office", desc: "Accountants, Registrars, Front Desk", count: "3 Openings" },
              { title: "Support Staff & Drivers", desc: "Bus Drivers, Lab Attendants", count: "2 Openings" },
            ].map((rf, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate("jobs")}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-blue-400 cursor-pointer transition-all space-y-1"
              >
                <div className="text-xs font-bold text-slate-900">{rf.title}</div>
                <div className="text-[11px] text-slate-500">{rf.desc}</div>
                <div className="text-[10px] font-bold text-blue-600 pt-1">{rf.count}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
