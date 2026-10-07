"use client";

import React, { useState } from "react";
import { 
  Building2, 
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Filter,
  Check,
  FileText,
  ShieldCheck,
  Compass,
  AlertCircle,
  GraduationCap
} from "lucide-react";
import { AdmissionNotification, AdmissionApplication } from "../types";

interface EduvaAdmissionsProps {
  admissions: AdmissionNotification[];
  applications: AdmissionApplication[];
  onApply: (adm: AdmissionNotification, isPreApply: boolean) => void;
  onSimulateAutoSubmit: () => void;
}

export const EduvaAdmissions: React.FC<EduvaAdmissionsProps> = ({
  admissions,
  applications,
  onApply,
  onSimulateAutoSubmit,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [activeTab, setActiveTab] = useState<"catalog" | "queue" | "recommender">("catalog");
  const [studentScore, setStudentScore] = useState(86);

  const filterPills = ["All", "CBSE Schools", "ICSE / IB", "Engineering & Tech", "Medical & Sciences", "Pre-Admissions Open"];

  const filteredAdmissions = admissions.filter((adm) => {
    const matchesSearch =
      adm.instituteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adm.courses.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === "All") return matchesSearch;
    if (selectedFilter === "Pre-Admissions Open") return matchesSearch && adm.isPreAdmissionAvailable;
    return matchesSearch;
  });

  // Alternative Institutions recommendations for BRD specification
  const alternativeInstitutes = [
    {
      name: "Cambridge International Academy",
      location: "Bangalore East (12 km away)",
      cutoff: 82,
      matchRate: "98% Match for your 86% score",
      seatsLeft: 18,
      affiliation: "IB / Cambridge IGCSE",
      rating: 4.8
    },
    {
      name: "Ryan Global School",
      location: "Whitefield, Bangalore (8 km away)",
      cutoff: 84,
      matchRate: "95% Match for your 86% score",
      seatsLeft: 24,
      affiliation: "CBSE & Cambridge",
      rating: 4.7
    },
    {
      name: "St. Thomas Residential Academy",
      location: "Koramangala, Bangalore (15 km away)",
      cutoff: 80,
      matchRate: "100% Guaranteed Eligibility",
      seatsLeft: 35,
      affiliation: "ICSE",
      rating: 4.6
    }
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Top Banner (Matches Bottom Screen 2 Exactly) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 sm:p-12 text-white shadow-sm flex flex-col justify-center items-center text-center space-y-6">
        <div className="max-w-2xl space-y-3 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5 text-blue-400" />
            <span>EduVyapar Centralized Admissions Registry</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
            Find Your Perfect Institution
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
            Explore top schools, colleges and universities across India with automated eligibility checks, pre-admission queues and instant DigiLocker verification.
          </p>

          {/* Search Pill */}
          <div className="pt-2 max-w-xl mx-auto w-full">
            <div className="flex items-center bg-white rounded-full p-2 pl-5 shadow-lg text-slate-800">
              <Search className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by location, course, or school name (e.g. DPS, STEM, Bangalore)..."
                className="w-full text-xs sm:text-sm focus:outline-none bg-transparent placeholder-slate-400"
              />
              <button className="px-5 py-2 rounded-full bg-[#0066cc] text-white text-xs font-semibold hover:bg-[#0052ad] transition-colors cursor-pointer">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl pt-2 z-10 text-center">
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="text-xl font-bold text-white">5,000+</div>
            <div className="text-[10px] text-blue-200">Verified Campuses</div>
          </div>
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="text-xl font-bold text-emerald-400">DigiLocker</div>
            <div className="text-[10px] text-blue-200">Auto Credential Check</div>
          </div>
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="text-xl font-bold text-amber-400">Pre-Admission</div>
            <div className="text-[10px] text-blue-200">Automated Submission</div>
          </div>
          <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="text-xl font-bold text-cyan-300">Alternate Match</div>
            <div className="text-[10px] text-blue-200">Zero Rejection Guarantee</div>
          </div>
        </div>
      </div>

      {/* Tabs: Admissions Directory, Pre-Admission Engine, Alternative Recommender */}
      <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`pb-2 text-sm font-bold transition-colors cursor-pointer relative ${
            activeTab === "catalog"
              ? "text-[#0066cc] after:content-[''] after:absolute after:bottom-[-13px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#0066cc]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          All Admissions Openings ({filteredAdmissions.length})
        </button>
        <button
          onClick={() => setActiveTab("queue")}
          className={`pb-2 text-sm font-bold transition-colors cursor-pointer relative flex items-center gap-1.5 ${
            activeTab === "queue"
              ? "text-[#0066cc] after:content-[''] after:absolute after:bottom-[-13px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#0066cc]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Clock className="w-4 h-4 text-amber-500" />
          <span>Pre-Admissions Auto-Submit Queue</span>
          <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
            BR-24 Engine
          </span>
        </button>
        <button
          onClick={() => setActiveTab("recommender")}
          className={`pb-2 text-sm font-bold transition-colors cursor-pointer relative flex items-center gap-1.5 ${
            activeTab === "recommender"
              ? "text-[#0066cc] after:content-[''] after:absolute after:bottom-[-13px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#0066cc]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Compass className="w-4 h-4 text-purple-600" />
          <span>Rule-Based Alternative Recommender</span>
          <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
            Smart Advisor
          </span>
        </button>
      </div>

      {/* ======================================================================= */}
      {/* VIEW 1: CATALOG OF INSTITUTIONS                                         */}
      {/* ======================================================================= */}
      {activeTab === "catalog" && (
        <div className="space-y-6">
          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterPills.map((pill, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedFilter(pill)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedFilter === pill
                    ? "bg-[#0066cc] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdmissions.map((adm) => (
              <div
                key={adm.id}
                className="eduva-card p-5 flex flex-col justify-between space-y-4 border border-slate-200/80 hover:border-blue-400 transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-100 relative">
                    <img
                      src={adm.instituteLogo}
                      alt={adm.instituteName}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-white/95 px-2.5 py-0.5 rounded-md shadow-xs">
                      {adm.status}
                    </span>
                    {adm.isPreAdmissionAvailable && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-amber-500 text-white px-2.5 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Pre-Admissions Open
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-1">
                      {adm.instituteName}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span>{adm.location}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-1 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Course / Grade:</span>
                      <span className="font-semibold text-slate-800">{adm.courses.join(', ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Eligibility Cutoff:</span>
                      <span className="font-bold text-blue-600">{adm.eligibilityCutoff}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Intake Capacity:</span>
                      <span className="font-semibold text-emerald-600">450 / 500 Seats Filled</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Application Deadline:</span>
                      <span className="font-semibold text-slate-800">{adm.closingDate}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onApply(adm, false)}
                    className="flex-1 py-2.5 rounded-xl bg-[#0066cc] hover:bg-[#0052ad] text-white text-xs font-bold transition-transform hover:scale-105 cursor-pointer shadow-xs text-center"
                  >
                    Direct Apply
                  </button>
                  {adm.isPreAdmissionAvailable && (
                    <button
                      onClick={() => onApply(adm, true)}
                      className="px-3.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold transition-colors cursor-pointer"
                      title="Queue for Auto-Submission when official window opens"
                    >
                      Pre-Queue
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* VIEW 2: PRE-ADMISSION QUEUE AUTO-SUBMIT SIMULATOR (BR-24 to BR-28)     */}
      {/* ======================================================================= */}
      {activeTab === "queue" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  Autonomous Queue
                </span>
                <span className="text-xs text-slate-500">Zero Server-Crash Guarantee</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Pre-Admissions Auto-Submission Engine
              </h2>
              <p className="text-xs text-slate-500">
                Pre-fill documentation, verify credentials with DigiLocker, and let the system trigger your application the exact millisecond the official admissions portal opens.
              </p>
            </div>

            <button
              onClick={onSimulateAutoSubmit}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-transform hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Simulate Window Opening (Auto-Submit)</span>
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Your Queued Applications</h3>
            <div className="space-y-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm">{app.instituteName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${app.status === "Auto-Submitted" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-800"}`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="text-slate-500">Course: {app.courseSelected} &bull; Applied: {app.appliedDate}</div>
                    <div className="flex items-center gap-1.5 text-emerald-600 font-semibold text-[11px] pt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>DigiLocker Marksheets & Aadhaar Auto-Verified</span>
                    </div>
                  </div>

                  <div className="text-right sm:text-right">
                    <div className="text-slate-400 text-[11px]">System Priority</div>
                    <div className="font-bold text-slate-800">Queue #004 / Batch 1</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* VIEW 3: RULE-BASED ALTERNATIVE RECOMMENDER (BR-29 Specification)         */}
      {/* ======================================================================= */}
      {activeTab === "recommender" && (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                  AI Matching Algorithm
                </span>
                <span className="text-xs text-slate-500">BRD Section 3.3.4 (Alternative Pathfinding)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Rule-Based Alternative Institution Advisor
              </h2>
              <p className="text-xs text-slate-500">
                If an applicant falls short of a prestigious cutoff (e.g. 92% at DPS), the system dynamically suggests accredited peer institutions within a 15km perimeter with matching cutoff thresholds.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-700">Your Academic Score:</span>
              <input
                type="number"
                min="50"
                max="100"
                value={studentScore}
                onChange={(e) => setStudentScore(parseInt(e.target.value) || 86)}
                className="w-16 p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-center text-blue-600"
              />
              <span className="text-xs font-bold text-slate-700">%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alternativeInstitutes.map((inst, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 border border-purple-100/80 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                      {inst.matchRate}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-500" />
                      {inst.rating}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{inst.name}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{inst.location}</span>
                  </div>

                  <div className="pt-2 text-xs space-y-1 text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Board Affiliation:</span>
                      <span className="font-medium text-slate-800">{inst.affiliation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Required Cutoff:</span>
                      <span className="font-bold text-purple-700">{inst.cutoff}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Available Seats:</span>
                      <span className="font-bold text-emerald-600">{inst.seatsLeft} Open</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Applied to alternate recommendation: ${inst.name}!`)}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer text-center"
                >
                  Direct 1-Click Alternate Apply
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
