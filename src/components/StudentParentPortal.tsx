"use client";

import React, { useState } from "react";
import { 
  User, 
  Users, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  Download, 
  FileText, 
  GraduationCap, 
  Send, 
  Calendar, 
  Bus, 
  QrCode, 
  BookOpen, 
  Award,
  ChevronRight,
  TrendingUp,
  MessageSquare
} from "lucide-react";

interface StudentParentPortalProps {
  initialRole?: "student" | "parent";
  onAddToCart?: (item: any) => void;
  onNavigateTab?: (tab: string) => void;
}

export const StudentParentPortal: React.FC<StudentParentPortalProps> = ({
  initialRole = "student",
  onNavigateTab,
}) => {
  const [activePortal, setActivePortal] = useState<"student" | "parent">(initialRole);
  const [selectedChild, setSelectedChild] = useState<"aarav" | "ananya">("aarav");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [feePaid, setFeePaid] = useState(false);
  const [busStatus, setBusStatus] = useState({
    busNo: "KA-04-EB-2024 (Bus #12)",
    driver: "Ramesh Babu",
    phone: "+91 98450 88219",
    speed: 34,
    eta: "14 mins",
    currentLocation: "100ft Road, Indiranagar Junction",
    geofence: "Crossed School Perimeter at 3:15 PM",
    destination: "Prestige Ozone Stop, Whitefield"
  });

  const handleAskAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setTimeout(() => {
      setAiAnswer(
        `AI Tutor Solution for: "${aiQuestion}"\n\n1. Fundamental Principle: According to Newton's Second Law & Conservation of Momentum, the rate of change of momentum is directly proportional to the applied force.\n\n2. Step-by-Step Derivation:\n   F = dp/dt = d(mv)/dt = m(dv/dt) = m*a (when mass is constant).\n\n3. Practical Example: When a cricket player catches a ball, he pulls his hands backward to increase the time (dt), thereby reducing the impact force (F).`
      );
      setIsAiLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header with Switcher */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              SOP v1.0 Compliant
            </span>
            <span className="text-xs text-slate-500">EduVyapar Student & Parent Portal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            {activePortal === "student" ? "Student Academic Command Center" : "Parent Comprehensive Dashboard"}
          </h1>
          <p className="text-xs text-slate-500">
            {activePortal === "student"
              ? "Track attendance, AI tutor doubt solver, digital marksheets, fee receipts & exam timetable"
              : "Live school bus GPS tracking, multi-child monitor, instant fee payments & teacher direct messaging"}
          </p>
        </div>

        {/* Portal Switcher Buttons */}
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setActivePortal("student")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePortal === "student"
                ? "bg-white text-blue-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>
          <button
            onClick={() => setActivePortal("parent")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activePortal === "parent"
                ? "bg-white text-blue-600 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Parent Portal</span>
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 1. STUDENT PORTAL (From EduVyapar-Student-and-Parent-Portal.pdf)      */}
      {/* ===================================================================== */}
      {activePortal === "student" && (
        <div className="space-y-8">
          {/* Top Row: Digital ID Card + AI Tutor Quick Solvers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Digital Student ID Card (4 cols) */}
            <div className="lg:col-span-4 bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-md space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-blue-300 font-bold">Digital Student ID</span>
                  <div className="text-xs text-slate-300 font-semibold">Delhi Public School (DPS)</div>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-blue-300" />
                </div>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
                  alt="Student"
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-md"
                />
                <div>
                  <h3 className="font-bold text-base text-white">Rahul Sharma</h3>
                  <div className="text-xs text-blue-200">Roll No: 18 &bull; Class 12-A</div>
                  <div className="text-[10px] text-slate-400 mt-1">ID: EDU-STU-2026-8942</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Blood Group</span>
                  <span className="font-bold text-slate-200">O +ve</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Valid Thru</span>
                  <span className="font-bold text-slate-200">May 2027</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DigiLocker Verified</span>
                </div>
                <QrCode className="w-6 h-6 text-white/80" />
              </div>
            </div>

            {/* AI Tutor & Homework Helper (8 cols) */}
            <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">AI Tutor & Concept Explainer</h3>
                    <p className="text-[11px] text-slate-500">Ask any question across CBSE, ICSE, JEE, NEET syllabus for instant step-by-step guidance</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2.5 py-0.5 rounded-full">
                  AI v2.0
                </span>
              </div>

              <form onSubmit={handleAskAi} className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="e.g. Derive Newton's Second Law or explain Photosynthesis Dark Reaction..."
                    className="w-full pl-4 pr-24 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  />
                  <button
                    type="submit"
                    disabled={isAiLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                  >
                    {isAiLoading ? "Solving..." : "Ask AI"}
                  </button>
                </div>
              </form>

              {aiAnswer ? (
                <div className="p-4 bg-purple-50/70 border border-purple-100 rounded-2xl text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                  {aiAnswer}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {[
                    "Explain Optical Fiber Total Internal Reflection",
                    "How to balance Redox Reactions in acidic medium",
                    "Difference between Mitosis and Meiosis"
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setAiQuestion(preset);
                        setIsAiLoading(true);
                        setTimeout(() => {
                          setAiAnswer(`AI Explanation for: "${preset}"\n\nVerified curriculum explanation with diagrams and memory mnemonics loaded.`);
                          setIsAiLoading(false);
                        }, 500);
                      }}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-purple-50 hover:border-purple-200 border border-slate-100 text-left text-[11px] text-slate-600 transition-colors"
                    >
                      &ldquo;{preset}&rdquo;
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Subject-Wise Attendance Tracker & Warning Badge */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Subject-Wise Attendance Matrix</h3>
                <p className="text-[11px] text-slate-500">Board mandatory requirement: Minimum 75% attendance to sit for Term-End Examinations</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-700">Overall: 88.4%</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  Eligible for Exams
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { subject: "Physics", attended: 42, total: 46, pct: 91.3, status: "safe" },
                { subject: "Chemistry", attended: 33, total: 45, pct: 73.3, status: "warning" },
                { subject: "Mathematics", attended: 47, total: 50, pct: 94.0, status: "safe" },
                { subject: "Computer Science", attended: 38, total: 40, pct: 95.0, status: "safe" },
              ].map((sub, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-800">{sub.subject}</span>
                    {sub.status === "warning" ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                        <AlertTriangle className="w-3 h-3" />
                        <span>Below 75%</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {sub.pct}%
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${sub.status === "warning" ? "bg-rose-500" : "bg-blue-600"}`}
                      style={{ width: `${sub.pct}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between">
                    <span>{sub.attended} / {sub.total} Classes</span>
                    {sub.status === "warning" && (
                      <span className="text-rose-600 font-semibold">Attend next 2 classes</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fee Payment & Digital Marksheets */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fee Payment Ledger */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Fee Breakdown & Online Dues</h3>
                </div>
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                  Term 2 (2026-27)
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                  <span className="text-slate-600">Tuition Fee (Quarter 2)</span>
                  <span className="font-bold text-slate-900">₹28,500 <span className="text-emerald-600 font-normal">(Paid)</span></span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-slate-50">
                  <span className="text-slate-600">Science Lab & STEM Kits</span>
                  <span className="font-bold text-slate-900">₹4,200 <span className="text-emerald-600 font-normal">(Paid)</span></span>
                </div>
                <div className="flex justify-between p-2.5 rounded-xl bg-amber-50/60 border border-amber-100">
                  <span className="text-slate-700 font-medium">Campus Transport (Bus Route #12)</span>
                  <span className="font-bold text-amber-700">{feePaid ? "₹0 (Paid)" : "₹5,400 (Due 15 Oct)"}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 block">Total Outstanding Balance</span>
                  <span className="text-base font-black text-slate-900">{feePaid ? "₹0.00" : "₹5,400.00"}</span>
                </div>
                <button
                  disabled={feePaid}
                  onClick={() => setFeePaid(true)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    feePaid
                      ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                      : "bg-[#0066cc] hover:bg-[#0052ad] text-white shadow-sm"
                  }`}
                >
                  {feePaid ? "Payment Verified ✓" : "Pay via UPI / Cards"}
                </button>
              </div>
            </div>

            {/* Digital Marksheets & Report Cards */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <h3 className="font-bold text-slate-900 text-sm">Academic Performance & Marksheets</h3>
                </div>
                <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full">
                  CGPA: 9.4 / 10
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { exam: "Class 12 Mid-Term Examination", date: "Sept 2026", marks: "94.2%", rank: "Rank 3 / 140" },
                  { exam: "Class 11 CBSE Annual Board Result", date: "March 2026", marks: "92.8%", rank: "Rank 5 / 140" },
                  { exam: "All-India Olympiad Physics Round 1", date: "July 2026", marks: "Gold Medal", rank: "State Top 10" },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{item.exam}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.date} &bull; {item.rank}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-blue-600 block">{item.marks}</span>
                      <button className="text-[10px] text-slate-500 hover:text-blue-600 inline-flex items-center gap-0.5 mt-0.5 cursor-pointer">
                        <Download className="w-2.5 h-2.5" />
                        <span>PDF Report</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. PARENT PORTAL (From EduVyapar-Student-and-Parent-Portal.pdf)        */}
      {/* ===================================================================== */}
      {activePortal === "parent" && (
        <div className="space-y-8">
          {/* Child Selector Tabs */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-700">Select Enrolled Child:</span>
            <button
              onClick={() => setSelectedChild("aarav")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedChild === "aarav"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Aarav Sharma (Grade 10 - DPS)</span>
            </button>
            <button
              onClick={() => setSelectedChild("ananya")}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                selectedChild === "ananya"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Ananya Sharma (Grade 6 - Ryan Intl)</span>
            </button>
          </div>

          {/* Real-time School Bus GPS Tracking (Key BRD & Parent Portal Requirement) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base">Live School Bus GPS Tracking & Geofence</h3>
                    <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 animate-pulse">
                      ● Live Satellite Feed
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Route #12 &bull; ETA to Home Stop: <strong>{busStatus.eta}</strong></p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${busStatus.phone}`}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call Driver ({busStatus.driver})</span>
                </a>
              </div>
            </div>

            {/* Visual Bus Tracking Map Simulation Card */}
            <div className="relative rounded-2xl bg-slate-900 text-white p-6 overflow-hidden min-h-[220px] flex flex-col justify-between">
              {/* Map background grid pattern */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
              
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">ACTIVE BUS TELEMATICS</span>
                  <div className="text-lg font-bold text-white mt-0.5">{busStatus.busNo}</div>
                  <div className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Current: {busStatus.currentLocation}</span>
                  </div>
                </div>

                <div className="bg-slate-800/80 backdrop-blur-xs px-4 py-2 rounded-xl border border-slate-700 text-right">
                  <div className="text-[10px] text-slate-400">Current Velocity</div>
                  <div className="text-xl font-black text-amber-400">{busStatus.speed} km/h</div>
                  <div className="text-[10px] text-emerald-400">Within Speed Limit (40 km/h)</div>
                </div>
              </div>

              {/* Waypoint Path Bar */}
              <div className="relative z-10 space-y-2 pt-6">
                <div className="flex justify-between text-[11px] text-slate-300 font-medium">
                  <span>School Campus (3:15 PM)</span>
                  <span className="text-amber-400 font-bold">100ft Road (Now)</span>
                  <span>Indiranagar Metro (3:32 PM)</span>
                  <span className="text-blue-400 font-bold">Prestige Ozone (3:45 PM ETA)</span>
                </div>
                <div className="w-full bg-slate-700 h-2.5 rounded-full overflow-hidden relative">
                  <div className="bg-gradient-to-r from-emerald-500 via-amber-400 to-blue-500 h-full w-[65%] rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{busStatus.geofence}</span>
                  <span className="text-emerald-400 font-semibold">Safe Driving Corridor Active</span>
                </div>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Today's Campus Attendance</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">Present (In Class 10-A)</span>
                <span className="text-[10px] text-emerald-600">Punched in at 08:12 AM</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Class Teacher</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">Mrs. Shalini Verma</span>
                <span className="text-[10px] text-blue-600">Mathematics Dept</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 block">Next PTM Appointment</span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">Saturday, 18 Oct 2026</span>
                <span className="text-[10px] text-purple-600">Slot: 10:30 AM - 10:45 AM</span>
              </div>
            </div>
          </div>

          {/* Teacher-Parent Direct Messenger & Gate Pass Request */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Direct Teacher Communication</h3>
                </div>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full">
                  Official Communication Channel
                </span>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Mrs. Shalini Verma (Class Teacher)</span>
                    <span className="text-[10px] text-slate-400 font-normal">Yesterday 4:20 PM</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Dear Parent, Aarav has performed exceptionally well in the Mathematics Quiz today (Rank 1). Please ensure he completes the Trigonometry worksheet by Monday.
                  </p>
                </div>
                <div className="p-3 bg-blue-50/60 rounded-2xl text-xs space-y-1">
                  <div className="flex justify-between font-bold text-blue-900">
                    <span>You (Parent Response)</span>
                    <span className="text-[10px] text-blue-400 font-normal">Yesterday 5:10 PM</span>
                  </div>
                  <p className="text-blue-800 text-[11px] leading-relaxed">
                    Thank you Mrs. Verma! We are monitoring his study hours. We will also attend the upcoming PTM on 18th Oct.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Send a private note to class teacher..."
                  className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="px-4 py-2 rounded-xl bg-[#0066cc] text-white text-xs font-bold hover:bg-[#0052ad] transition-colors cursor-pointer">
                  Send
                </button>
              </div>
            </div>

            {/* Instant Gate Pass & Leave Authorization */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-bold text-slate-900 text-sm">Emergency Gate Pass & Leave Request</h3>
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-0.5 rounded-full">
                  OTP Verified
                </span>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Need to authorize an early pickup or medical leave? Submit an official gate pass authenticated via Aadhaar/OTP to the campus security desk instantly.
              </p>

              <div className="space-y-2.5">
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700">
                  <option>Medical Appointment / Health Checkup</option>
                  <option>Family Emergency</option>
                  <option>Inter-School Sports / Competition</option>
                </select>
                <input
                  type="text"
                  placeholder="Authorized Pickup Person Name & Mobile Number"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700"
                />
                <button
                  onClick={() => alert("Digital Gate Pass generated! QR code dispatched to school security desk & parent mobile via SMS.")}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Generate Digital Gate Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
