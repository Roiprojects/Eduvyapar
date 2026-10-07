"use client";

import React, { useState } from "react";
import { JobPosting, JobApplication, UserRole } from "../types";
import { 
  GraduationCap, 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Upload, 
  UserCheck, 
  X, 
  Filter, 
  Search,
  Building,
  AlertCircle
} from "lucide-react";

interface RecruitmentSectionProps {
  jobs: JobPosting[];
  applications: JobApplication[];
  currentRole: UserRole;
  onApplyJob: (application: Omit<JobApplication, "id" | "appliedDate" | "status">) => void;
  onUpdateAppStatus: (appId: string, status: JobApplication["status"], interviewDetails?: JobApplication["interviewDetails"]) => void;
}

export const RecruitmentSection: React.FC<RecruitmentSectionProps> = ({
  jobs,
  applications,
  currentRole,
  onApplyJob,
  onUpdateAppStatus,
}) => {
  const [activeTab, setActiveTab] = useState<"All" | "Teaching" | "Non-Teaching">("All");
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [applyingJob, setApplyingJob] = useState<JobPosting | null>(null);

  // Application form state
  const [applicantName, setApplicantName] = useState<string>("Dr. Rameshwar Sharma");
  const [applicantEmail, setApplicantEmail] = useState<string>("rameshwar.phy@gmail.com");
  const [applicantPhone, setApplicantPhone] = useState<string>("+91 98450 11234");
  const [experienceYears, setExperienceYears] = useState<number>(6);
  const [resumeFileName, setResumeFileName] = useState<string>("Rameshwar_Sharma_CV_Physics.pdf");
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean>(false);

  // Offline Interview Scheduling modal state (BR-44, BR-45)
  const [schedulingApp, setSchedulingApp] = useState<JobApplication | null>(null);
  const [interviewDate, setInterviewDate] = useState<string>("2026-04-18");
  const [interviewTime, setInterviewTime] = useState<string>("10:30 AM");
  const [interviewVenue, setInterviewVenue] = useState<string>("Main Campus Academic Block - Conference Room 3B");
  const [interviewCoordinator, setInterviewCoordinator] = useState<string>("Dr. Sunita Deshpande (Dean of Faculty Selection)");
  const [coordinatorContact, setCoordinatorContact] = useState<string>("+91 98450 77123");

  const filteredJobs = jobs.filter((j) => {
    if (activeTab === "All") return true;
    return j.type === activeTab;
  });

  const handleApplicationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    onApplyJob({
      jobId: applyingJob.id,
      jobTitle: applyingJob.title,
      instituteName: applyingJob.instituteName,
      applicantName,
      applicantEmail,
      applicantPhone,
      experienceYears,
      resumeFileName,
    });

    setIsSubmitSuccess(true);
    setTimeout(() => {
      setIsSubmitSuccess(false);
      setApplyingJob(null);
    }, 1500);
  };

  const handleScheduleInterviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedulingApp) return;

    onUpdateAppStatus(schedulingApp.id, "Interview Scheduled", {
      date: interviewDate,
      time: interviewTime,
      venue: interviewVenue,
      coordinator: interviewCoordinator,
      contactNumber: coordinatorContact,
      mode: "Offline Campus Visit",
    });

    setSchedulingApp(null);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner & Mode Toggle */}
      <div className="bg-slate-900/60 p-4 sm:p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span>Academic Staff & Institutional Recruitment Hub</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Standardized hiring portal for Teaching Professors, Lecturers, and Campus Operations Staff (BR-28 to BR-46)
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-800/80 rounded-2xl border border-slate-700/80">
          {(["All", "Teaching", "Non-Teaching"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "All" ? "All Openings" : `${tab} Vacancies`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Job Board + Institute HR Applicant Tracking Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Job Postings List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>Showing {filteredJobs.length} active verified institutional vacancies</span>
            <span>Refreshed hourly</span>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all shadow-lg hover:shadow-indigo-500/5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        job.type === "Teaching"
                          ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                      }`}>
                        {job.type} Role
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300">
                        {job.employmentType}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Dept: <strong className="text-slate-200">{job.subjectOrDept}</strong>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white leading-snug">
                      {job.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium">
                      <Building className="w-3.5 h-3.5" />
                      <span>{job.instituteName}</span>
                    </div>
                  </div>

                  <div className="text-right sm:self-start">
                    <div className="text-sm font-black text-emerald-400">{job.salaryRange}</div>
                    <div className="text-[11px] text-slate-500">Exp: {job.experienceRequired}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Tags & Action Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {job.instituteLocation}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      Apply before: {job.deadline}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJob(job)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => setApplyingJob(job)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 transition-all"
                    >
                      Apply Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Institute HR Candidate Pipeline (BR-40 to BR-45) */}
        <div className="space-y-4">
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-400" />
                <h3 className="font-bold text-white text-sm">Hiring Pipeline (HR View)</h3>
              </div>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">
                {applications.length} Active Applicants
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Real-time candidate review, resume verification, and offline campus interview coordination.
            </p>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2.5 text-xs"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-white">{app.applicantName}</div>
                      <div className="text-[11px] text-slate-400">{app.jobTitle}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                      app.status === "Shortlisted"
                        ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                        : app.status === "Interview Scheduled"
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : app.status === "Rejected"
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                        : "bg-slate-700 text-slate-300"
                    }`}>
                      {app.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="truncate">{app.resumeFileName} ({app.experienceYears}y exp)</span>
                  </div>

                  {/* If Interview Scheduled, show captured offline details (BR-45) */}
                  {app.interviewDetails && (
                    <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] space-y-1 text-emerald-200">
                      <div className="font-bold flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>Offline Campus Interview: {app.interviewDetails.date} @ {app.interviewDetails.time}</span>
                      </div>
                      <div className="text-[10px] text-emerald-300/80">
                        Venue: {app.interviewDetails.venue}
                      </div>
                      <div className="text-[10px] text-emerald-300/80">
                        Coordinator: {app.interviewDetails.coordinator}
                      </div>
                    </div>
                  )}

                  {/* HR Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {app.status === "Applied" && (
                      <button
                        onClick={() => onUpdateAppStatus(app.id, "Shortlisted")}
                        className="py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[11px] transition-all"
                      >
                        Shortlist Candidate
                      </button>
                    )}

                    {(app.status === "Applied" || app.status === "Shortlisted") && (
                      <button
                        onClick={() => setSchedulingApp(app)}
                        className="py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] transition-all"
                      >
                        Schedule Offline Visit
                      </button>
                    )}

                    {app.status !== "Rejected" && (
                      <button
                        onClick={() => onUpdateAppStatus(app.id, "Rejected")}
                        className="py-1.5 rounded-lg bg-slate-700 hover:bg-rose-900/60 text-slate-300 hover:text-rose-200 font-semibold text-[11px] transition-all"
                      >
                        Decline
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Candidate Apply Modal with Resume Upload (BR-37, BR-38) */}
      {applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setApplyingJob(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Submit Job Application</h3>
                <p className="text-xs text-slate-400">Applying for {applyingJob.title}</p>
              </div>
            </div>

            {isSubmitSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-sm">Application Successfully Registered!</div>
                <p className="text-xs text-emerald-300">
                  Your profile and verified credentials have been transmitted to {applyingJob.instituteName}&#39;s HR screening committee.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Candidate Full Name
                  </label>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Relevant Teaching / Academic Experience (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                {/* Resume Upload Box (BR-37) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Upload Resume (PDF, DOCX)
                  </label>
                  <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-800/40">
                    <Upload className="w-6 h-6 text-indigo-400 mx-auto mb-1" />
                    <span className="text-xs text-slate-300 font-medium block">
                      {resumeFileName}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      File verified (640 KB) &bull; Click to replace
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Confirm & Transmit Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Schedule Offline Interview Modal (BR-44, BR-45) */}
      {schedulingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setSchedulingApp(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Schedule Offline Campus Interview</h3>
                <p className="text-xs text-slate-400">Candidate: {schedulingApp.applicantName} ({schedulingApp.jobTitle})</p>
              </div>
            </div>

            <form onSubmit={handleScheduleInterviewSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Interview Date
                  </label>
                  <input
                    type="date"
                    value={interviewDate}
                    onChange={(e) => setInterviewDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Interview Time
                  </label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    placeholder="e.g. 11:00 AM"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Offline Campus Venue / Room Location (BR-44)
                </label>
                <input
                  type="text"
                  value={interviewVenue}
                  onChange={(e) => setInterviewVenue(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Faculty Coordinator
                  </label>
                  <input
                    type="text"
                    value={interviewCoordinator}
                    onChange={(e) => setInterviewCoordinator(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={coordinatorContact}
                    onChange={(e) => setCoordinatorContact(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
              >
                Confirm Offline Schedule & Notify Candidate
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
                {selectedJob.type} Opening
              </span>
              <h3 className="text-lg font-bold text-white">{selectedJob.title}</h3>
              <p className="text-xs text-indigo-400">{selectedJob.instituteName} &bull; {selectedJob.instituteLocation}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2 text-xs">
              <div className="font-semibold text-white">Role Overview & Responsibilities:</div>
              <p className="text-slate-300 leading-relaxed">{selectedJob.description}</p>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-semibold text-white">Mandatory Qualifications:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {selectedJob.qualifications.map((q, idx) => (
                  <li key={idx}>{q}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => {
                  setApplyingJob(selectedJob);
                  setSelectedJob(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
              >
                Apply for this Position
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
