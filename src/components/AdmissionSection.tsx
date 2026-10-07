"use client";

import React, { useState } from "react";
import { AdmissionNotification, AdmissionApplication, UserRole } from "../types";
import { 
  Building2, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  X, 
  Compass, 
  CheckCircle2, 
  FileCheck,
  RefreshCw,
  Award,
  ExternalLink
} from "lucide-react";

interface AdmissionSectionProps {
  admissions: AdmissionNotification[];
  applications: AdmissionApplication[];
  currentRole: UserRole;
  onApplyAdmission: (app: Omit<AdmissionApplication, "id" | "appliedDate" | "status">) => void;
  onTriggerAutoSubmit: () => void;
  onReapplyAlternative: (originalAppId: string, targetAdmission: AdmissionNotification, course: string) => void;
}

export const AdmissionSection: React.FC<AdmissionSectionProps> = ({
  admissions,
  applications,
  currentRole,
  onApplyAdmission,
  onTriggerAutoSubmit,
  onReapplyAlternative,
}) => {
  const [selectedAdmission, setSelectedAdmission] = useState<AdmissionNotification | null>(null);
  const [applyingAdmission, setApplyingAdmission] = useState<AdmissionNotification | null>(null);
  const [isPreApplyMode, setIsPreApplyMode] = useState<boolean>(false);

  // Application form fields
  const [studentName, setStudentName] = useState<string>("Aarav V. Kulkarni");
  const [parentName, setParentName] = useState<string>("Venkatesh Kulkarni");
  const [courseSelected, setCourseSelected] = useState<string>("");
  const [percentageMarks, setPercentageMarks] = useState<number>(92.5);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);

  // Alternative recommendations state (BR-64, BR-65)
  const [viewingRejectedApp, setViewingRejectedApp] = useState<AdmissionApplication | null>(null);

  const handleOpenApply = (adm: AdmissionNotification, preApply: boolean) => {
    setApplyingAdmission(adm);
    setIsPreApplyMode(preApply);
    setCourseSelected(adm.courses[0] || "");
  };

  const handleSubmitAdmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingAdmission) return;

    onApplyAdmission({
      admissionId: applyingAdmission.id,
      instituteName: applyingAdmission.instituteName,
      courseSelected,
      studentName,
      parentName,
      percentageMarks,
      isPreAdmission: isPreApplyMode,
      autoSubmitDate: isPreApplyMode ? `${applyingAdmission.openingDate} 00:00:00 AM (Admissions Live Day)` : undefined,
    });

    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setApplyingAdmission(null);
    }, 1500);
  };

  // Find candidate alternatives for rejected application
  const getAlternativeInstitutes = (app: AdmissionApplication) => {
    return admissions.filter(
      (a) => a.instituteName !== app.instituteName && a.eligibilityCutoff <= app.percentageMarks
    );
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Banner with Pre-Admission Engine Highlights */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-6 rounded-3xl border border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patented Pre-Admission Auto-Submission Technology (BR-58 to BR-61)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Unified Institutional Admissions & Smart Routing
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Apply weeks before official admissions open. The system stores pre-admissions securely in an isolated queue and auto-submits them the millisecond the institution opens enrollment.
          </p>
        </div>

        {/* Live Simulation Trigger Button */}
        <div className="flex-shrink-0 text-center space-y-2">
          <button
            onClick={onTriggerAutoSubmit}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-orange-500/30 transition-all flex items-center gap-2 group cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            <span>Simulate: Trigger Admissions Opening Date</span>
          </button>
          <span className="text-[10px] text-slate-400 block">
            Fires pending pre-admissions into active review queue
          </span>
        </div>
      </div>

      {/* Main Layout: Active Admission Circulars + Applications Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Admission Circulars Directory */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Verified Institutional Admission Circulars (Academic Year 2026-2027)</span>
            <span className="text-indigo-400 font-semibold">{admissions.length} Institutions Enrolling</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {admissions.map((adm) => (
              <div
                key={adm.id}
                className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={adm.instituteLogo}
                      alt={adm.instituteName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-700"
                    />
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      adm.status === "Pre-Admission Open"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    }`}>
                      {adm.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                      {adm.instituteName}
                    </h3>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{adm.location}</span>
                    </div>
                  </div>

                  {/* Highlights Pill */}
                  <div className="p-2.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-[11px] space-y-1">
                    <div className="flex justify-between text-slate-300">
                      <span>Cutoff Criteria:</span>
                      <strong className="text-emerald-400">Min {adm.eligibilityCutoff}% Aggregate</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Intake Capacity:</span>
                      <strong className="text-slate-100">{adm.intakeCapacity} Seats</strong>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Annual Tuition:</span>
                      <strong className="text-slate-100">{adm.annualFee}</strong>
                    </div>
                  </div>

                  {/* Offered Courses list */}
                  <div className="flex flex-wrap gap-1">
                    {adm.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg text-[10px] bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Timeline & Actions */}
                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Opens: {adm.openingDate}
                    </span>
                    <span>Closes: {adm.closingDate}</span>
                  </div>

                  {adm.isPreAdmissionAvailable ? (
                    <button
                      onClick={() => handleOpenApply(adm, true)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs shadow-md shadow-orange-500/20 flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Submit Pre-Admission Application</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenApply(adm, false)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
                    >
                      <span>Apply for Admission</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Live Admission Applications Tracker (BR-57, BR-64) */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">Applications Tracker</h3>
              </div>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                {applications.length} Tracked
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Monitors active submissions, pre-admission queue countdowns, and instant alternative institute recovery.
            </p>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className={`p-3.5 rounded-2xl border text-xs space-y-2.5 transition-all ${
                    app.status === "Rejected"
                      ? "bg-rose-950/20 border-rose-800/40"
                      : app.status === "Auto-Submitted"
                      ? "bg-emerald-950/30 border-emerald-500/40"
                      : "bg-slate-800/60 border-slate-700/60"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white leading-tight">{app.instituteName}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{app.courseSelected}</div>
                      <div className="text-[10px] text-slate-500">Student: {app.studentName} ({app.percentageMarks}%)</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      app.status === "Auto-Submitted"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : app.status === "Rejected"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  {/* Pre-admission banner */}
                  {app.isPreAdmission && app.status === "Pending" && (
                    <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-300 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>Queued: Auto-submits on {app.autoSubmitDate}</span>
                    </div>
                  )}

                  {app.status === "Auto-Submitted" && (
                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[10px] text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>System auto-submitted application to institute registrar</span>
                    </div>
                  )}

                  {/* Rejection with Alternative Suggestions (BR-64, BR-65) */}
                  {app.status === "Rejected" && (
                    <div className="space-y-2 pt-1">
                      <div className="text-[11px] text-rose-300 leading-snug">
                        Reason: {app.rejectionReason}
                      </div>

                      <button
                        onClick={() => setViewingRejectedApp(app)}
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-[11px] shadow flex items-center justify-center gap-1.5"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>View Matching Alternative Institutes</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Institute Suggestions Modal (BR-64, BR-65) */}
      {viewingRejectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setViewingRejectedApp(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Alternative Institute Recommendations</h3>
                <p className="text-xs text-slate-400">
                  Target candidate score: <strong className="text-emerald-400">{viewingRejectedApp.percentageMarks}%</strong> Aggregate
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs text-slate-300">
              Notice: The application to <span className="font-semibold text-rose-300">{viewingRejectedApp.instituteName}</span> was not fulfilled. Based on your academic score and stream preferences, our intelligent routing engine has verified eligibility at the following nearby certified institutions:
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {getAlternativeInstitutes(viewingRejectedApp).map((alt) => (
                <div
                  key={alt.id}
                  className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="font-bold text-white">{alt.instituteName}</div>
                    <div className="text-[11px] text-slate-400">{alt.location} &bull; Cutoff: {alt.eligibilityCutoff}%</div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      ✓ Candidate qualifies ({viewingRejectedApp.percentageMarks}% &gt; {alt.eligibilityCutoff}%)
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onReapplyAlternative(viewingRejectedApp.id, alt, alt.courses[0]);
                      setViewingRejectedApp(null);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>1-Click Reapply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Admission / Pre-Admission Application Form Modal */}
      {applyingAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setApplyingAdmission(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isPreApplyMode
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  : "bg-blue-600/20 text-blue-400 border border-blue-500/30"
              }`}>
                {isPreApplyMode ? <Sparkles className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {isPreApplyMode ? "Submit Pre-Admission Application" : "Official Admission Application"}
                </h3>
                <p className="text-xs text-slate-400">{applyingAdmission.instituteName}</p>
              </div>
            </div>

            {isSubmitSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-sm">
                  {isPreApplyMode ? "Pre-Admission Application Queued!" : "Admission Application Registered!"}
                </div>
                <p className="text-xs text-emerald-300">
                  {isPreApplyMode
                    ? `Your registration is safely logged. Automatic submission will fire on ${applyingAdmission.openingDate}.`
                    : "Your admission dossier has been transferred to the Admissions Registrar."}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitAdmission} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Program / Course Stream
                  </label>
                  <select
                    value={courseSelected}
                    onChange={(e) => setCourseSelected(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    {applyingAdmission.courses.map((c, idx) => (
                      <option key={idx} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Student Full Name
                    </label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Parent / Guardian Name
                    </label>
                    <input
                      type="text"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Previous Grade Percentage Marks (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="35"
                    max="100"
                    value={percentageMarks}
                    onChange={(e) => setPercentageMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Institute eligibility cutoff is {applyingAdmission.eligibilityCutoff}%.
                  </span>
                </div>

                {isPreApplyMode && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300">
                    ⚡ <strong>Automated Pre-Admission Trigger Active:</strong> You do not need to log back in on opening day. Our system server triggers will process your application the exact minute admissions go live.
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-all ${
                    isPreApplyMode
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-orange-500/30"
                      : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-indigo-600/30"
                  }`}
                >
                  {isPreApplyMode ? "Queue Pre-Admission Application" : "Submit Official Admission Form"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
