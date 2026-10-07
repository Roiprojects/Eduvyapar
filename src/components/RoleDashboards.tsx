"use client";

import React from "react";
import { UserRole } from "../types";
import { 
  User, 
  Users, 
  BookOpen, 
  Building2, 
  Store, 
  ShieldCheck, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Package, 
  Bus, 
  GraduationCap, 
  Activity,
  FileText,
  Lock,
  ArrowRight
} from "lucide-react";

interface RoleDashboardsProps {
  currentRole: UserRole;
  onNavigateTab: (tab: string) => void;
}

export const RoleDashboards: React.FC<RoleDashboardsProps> = ({
  currentRole,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-8 pb-16">
      {/* Role Header Banner */}
      <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            {currentRole === "student" && <User className="w-7 h-7" />}
            {currentRole === "parent" && <Users className="w-7 h-7" />}
            {currentRole === "teacher" && <BookOpen className="w-7 h-7" />}
            {currentRole === "institute" && <Building2 className="w-7 h-7" />}
            {currentRole === "vendor" && <Store className="w-7 h-7" />}
            {currentRole === "admin" && <ShieldCheck className="w-7 h-7" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Active RBAC Session
              </span>
              <span className="text-xs text-slate-500">BR-80 & BR-81 Compliant</span>
            </div>
            <h2 className="text-xl font-black text-white capitalize mt-0.5">
              {currentRole} Role Command Center
            </h2>
            <p className="text-xs text-slate-400">
              Personalized dashboards, permission-scoped actions, and metrics tailored for your workflow
            </p>
          </div>
        </div>
      </div>

      {/* Role 1: Student Dashboard */}
      {currentRole === "student" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Pre-Admission Queue</div>
              <div className="text-2xl font-black text-amber-400">1 Active</div>
              <div className="text-[11px] text-slate-500">Auto-submits to St. Xavier STEM</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Faculty Mentors (Shisya)</div>
              <div className="text-2xl font-black text-indigo-400">3 Subscriptions</div>
              <div className="text-[11px] text-slate-500">Chemistry & Higher Mathematics</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Study Material Dispatched</div>
              <div className="text-2xl font-black text-emerald-400">2 Packages</div>
              <div className="text-[11px] text-slate-500">CBSE Class 12 Master Bundle</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Quick Academic Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => onNavigateTab("admissions")}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left space-y-1 transition-all"
              >
                <GraduationCap className="w-5 h-5 text-indigo-400 mb-2" />
                <div className="font-bold text-white text-xs">Track Admission Applications</div>
                <div className="text-[11px] text-slate-400">View real-time status and cutoff recommendations</div>
              </button>
              <button
                onClick={() => onNavigateTab("social")}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left space-y-1 transition-all"
              >
                <BookOpen className="w-5 h-5 text-amber-400 mb-2" />
                <div className="font-bold text-white text-xs">Watch Shisya Masterclasses</div>
                <div className="text-[11px] text-slate-400">Continue watching video lectures</div>
              </button>
              <button
                onClick={() => onNavigateTab("ecommerce")}
                className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left space-y-1 transition-all"
              >
                <Package className="w-5 h-5 text-emerald-400 mb-2" />
                <div className="font-bold text-white text-xs">Procure Textbooks & Lab Kits</div>
                <div className="text-[11px] text-slate-400">Certified educational store</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role 2: Parent Dashboard */}
      {currentRole === "parent" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Dependent Ward</div>
              <div className="text-xl font-black text-white">Aarav Kulkarni</div>
              <div className="text-[11px] text-emerald-400">Class 10th (Score: 92.5%)</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Admission Applications</div>
              <div className="text-2xl font-black text-indigo-400">2 Submitted</div>
              <div className="text-[11px] text-slate-500">St. Xavier & Greenwood High</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Transport Security</div>
              <div className="text-xl font-black text-emerald-400">Bus Pool Verified</div>
              <div className="text-[11px] text-slate-500">GPS live tracking enabled</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Parent Oversight Portal</h3>
            <p className="text-xs text-slate-400">
              Review institutional application dossiers, verify uniform and book procurements, and supervise campus admissions.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigateTab("admissions")}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
              >
                Inspect Applications
              </button>
              <button
                onClick={() => onNavigateTab("ecommerce")}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
              >
                Order Uniforms & Supplies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role 3: Teacher / Faculty Dashboard */}
      {currentRole === "teacher" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Shisya Follower Base</div>
              <div className="text-2xl font-black text-amber-400">14,200</div>
              <div className="text-[11px] text-slate-500">+480 this week</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Lecture Video Views</div>
              <div className="text-2xl font-black text-indigo-400">89,500</div>
              <div className="text-[11px] text-slate-500">Organic Chemistry Masterclass</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Job Applications</div>
              <div className="text-2xl font-black text-emerald-400">1 Shortlisted</div>
              <div className="text-[11px] text-slate-500">Delhi Public School Whitefield</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Offline Interview</div>
              <div className="text-sm font-black text-emerald-400">15-Apr 11:00 AM</div>
              <div className="text-[11px] text-slate-500">Campus Conf Room 2A</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-base">Faculty Studio Actions</h3>
            <div className="flex gap-3">
              <button
                onClick={() => onNavigateTab("social")}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs"
              >
                Upload New Video Masterclass
              </button>
              <button
                onClick={() => onNavigateTab("recruitment")}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700"
              >
                Explore Senior Academic Openings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role 4: Institute Admin Dashboard */}
      {currentRole === "institute" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Admission Applications</div>
              <div className="text-2xl font-black text-indigo-400">180 / 240</div>
              <div className="text-[11px] text-slate-500">75% Intake Capacity filled</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Job Candidates</div>
              <div className="text-2xl font-black text-emerald-400">27 Resumes</div>
              <div className="text-[11px] text-slate-500">PGT Physics & STEAM Labs</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Bus Fleet Pool</div>
              <div className="text-2xl font-black text-amber-400">3 Buses Req</div>
              <div className="text-[11px] text-slate-500">2 Nearby Tenders Received</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Bulk Procurement</div>
              <div className="text-2xl font-black text-cyan-400">₹1,85,000</div>
              <div className="text-[11px] text-slate-500">Classroom Desks RFQ Active</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigateTab("recruitment")}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-left space-y-1 transition-all"
            >
              <div className="font-bold text-white text-sm">Hiring Pipeline</div>
              <div className="text-xs text-slate-400">Review candidate resumes and schedule offline interviews</div>
            </button>
            <button
              onClick={() => onNavigateTab("bus-sharing")}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-left space-y-1 transition-all"
            >
              <div className="font-bold text-white text-sm">Bus Fleet Dispatch</div>
              <div className="text-xs text-slate-400">Allocate campus transport and review bids</div>
            </button>
            <button
              onClick={() => onNavigateTab("admissions")}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-left space-y-1 transition-all"
            >
              <div className="font-bold text-white text-sm">Admissions Registry</div>
              <div className="text-xs text-slate-400">Manage enrollment quotas and eligibility cutoffs</div>
            </button>
          </div>
        </div>
      )}

      {/* Role 5: Vendor Dashboard */}
      {currentRole === "vendor" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Active Listed Products</div>
              <div className="text-2xl font-black text-white">6 Verified SKUs</div>
              <div className="text-[11px] text-emerald-400">KYC Compliant & Approved</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Monthly Dispatched Revenue</div>
              <div className="text-2xl font-black text-emerald-400">₹8,45,200</div>
              <div className="text-[11px] text-slate-500">98.4% Fulfillment Success</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Pending Bulk Quotes (RFQ)</div>
              <div className="text-2xl font-black text-amber-400">3 Pending</div>
              <div className="text-[11px] text-slate-500">Institutional buyers awaiting pricing</div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-3">
            <h3 className="font-bold text-white text-base">Vendor Fulfillment Actions</h3>
            <p className="text-xs text-slate-400">
              Update inventory counts, manage order dispatch tracking numbers, and respond to school bulk purchase tenders.
            </p>
            <button
              onClick={() => onNavigateTab("ecommerce")}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs"
            >
              Open Catalog & Inventory Manager
            </button>
          </div>
        </div>
      )}

      {/* Role 6: Super Admin Command Center (BR-88 to BR-92) */}
      {currentRole === "admin" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Scale: Active Students</div>
              <div className="text-2xl font-black text-emerald-400">50,42,890</div>
              <div className="text-[11px] text-slate-500">Target 50L+ Benchmark Met</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Verified Institutions</div>
              <div className="text-2xl font-black text-indigo-400">5,14,320</div>
              <div className="text-[11px] text-slate-500">Target 5L+ Benchmark Met</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Platform Uptime</div>
              <div className="text-2xl font-black text-cyan-400">99.98%</div>
              <div className="text-[11px] text-slate-500">Multi-region cloud cluster</div>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400">Pending Approvals</div>
              <div className="text-2xl font-black text-amber-400">8 KYC Tenders</div>
              <div className="text-[11px] text-slate-500">6 Vendors &bull; 2 Schools</div>
            </div>
          </div>

          {/* System Audit Trail (BR-91) */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-rose-400" />
                <h3 className="font-bold text-white text-sm">System Governance & Immutable Audit Logs (BR-91)</h3>
              </div>
              <span className="text-[10px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full border border-rose-500/30">
                Audit Trail Active
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              {[
                { time: "10:24:18", event: "Vendor OmniTech Solutions KYC documents verified by Admin #04", type: "Security" },
                { time: "10:19:02", event: "Auto-submission trigger armed for 20-Apr-2026 for 12,400 queued applicants", type: "Admission Engine" },
                { time: "10:14:55", event: "National Hill View Public School transport request #bus-req-1 broadcast to 15km perimeter", type: "Bus Sharing" },
                { time: "10:02:11", event: "Encrypted payment confirmation #GEP-8921 logged via Razorpay Gateway", type: "E-Commerce" },
              ].map((log, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between gap-4 font-mono text-[11px]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-slate-500">{log.time}</span>
                    <span className="text-slate-300">{log.event}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-700 text-indigo-300 text-[10px]">
                    {log.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
