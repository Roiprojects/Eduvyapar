"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  Search, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Users,
  Check,
  Building2,
  DollarSign,
  GraduationCap,
  ShieldCheck,
  Star,
  Sparkles,
  PhoneCall,
  UserCheck
} from "lucide-react";
import { JobPosting, JobApplication } from "../types";

interface EduvaJobsProps {
  jobs: JobPosting[];
  applications: JobApplication[];
  onApply: (job: JobPosting) => void;
  onOpenPipeline: () => void;
}

export const EduvaJobs: React.FC<EduvaJobsProps> = ({
  jobs,
  applications,
  onApply,
  onOpenPipeline,
}) => {
  const [activeFamily, setActiveFamily] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  // 8 Role Families from EduVyapar Brochure v1.0
  const roleFamilies = [
    { id: "All", label: "All Roles", count: 24 },
    { id: "Leadership", label: "Leadership & Management", count: 4 },
    { id: "Academic", label: "Academic & Teaching", count: 6 },
    { id: "CoCurricular", label: "Co-Curricular & Special", count: 3 },
    { id: "StudentSupport", label: "Student Support & Counselors", count: 3 },
    { id: "AdminOffice", label: "Administrative & Office", count: 3 },
    { id: "SalesMarketing", label: "Sales & Marketing", count: 2 },
    { id: "FacilityOps", label: "Facility & Operations", count: 2 },
    { id: "SupportStaff", label: "Support Staff & Drivers", count: 2 },
  ];

  // Extended jobs catalog covering all 8 families
  const allCampusJobs = [
    // 1. Leadership
    {
      id: "job-lead-1",
      title: "Vice Principal (Academic & Administration)",
      instituteName: "Delhi Public School (DPS)",
      location: "Bangalore, Karnataka",
      experienceRequired: "10+ Years in CBSE Senior Secondary",
      salaryRange: "₹18,00,000 - ₹24,00,000 P.A.",
      postedDate: "2 days ago",
      family: "Leadership",
      tags: ["CBSE", "Post-Graduate", "Leadership", "Full-Time"],
      verified: true,
      urgent: true
    },
    {
      id: "job-lead-2",
      title: "Head of Department (Mathematics & STEM)",
      instituteName: "The Heritage School",
      location: "Gurgaon, Haryana",
      experienceRequired: "8+ Years Teaching & Curriculum Planning",
      salaryRange: "₹12,00,000 - ₹16,00,000 P.A.",
      postedDate: "1 day ago",
      family: "Leadership",
      tags: ["HOD", "ICSE / IB", "STEM Lead"],
      verified: true
    },
    // 2. Academic & Teaching
    {
      id: "job-acad-1",
      title: "PGT Physics (Class 11 & 12 / JEE Advanced)",
      instituteName: "St. Xavier's Senior School",
      location: "Mumbai, Maharashtra",
      experienceRequired: "5+ Years M.Sc Physics + B.Ed",
      salaryRange: "₹9,50,000 - ₹13,00,000 P.A.",
      postedDate: "Just now",
      family: "Academic",
      tags: ["PGT", "JEE Prep", "Physics", "CBSE"],
      verified: true,
      urgent: true
    },
    {
      id: "job-acad-2",
      title: "Assistant Professor - Artificial Intelligence",
      instituteName: "RV College of Engineering",
      location: "Bangalore, Karnataka",
      experienceRequired: "Ph.D or M.Tech in AI/ML with research publications",
      salaryRange: "₹14,00,000 - ₹18,50,000 P.A.",
      postedDate: "3 days ago",
      family: "Academic",
      tags: ["Professor", "AI / ML", "Higher Ed"],
      verified: true
    },
    // 3. Co-Curricular & Specialized
    {
      id: "job-cocurr-1",
      title: "Director of Physical Education & Sports (PET)",
      instituteName: "Bishop Cotton Boys' School",
      location: "Bangalore, Karnataka",
      experienceRequired: "B.P.Ed / M.P.Ed with National Tournament coaching",
      salaryRange: "₹7,50,000 - ₹10,50,000 P.A.",
      postedDate: "4 days ago",
      family: "CoCurricular",
      tags: ["Sports Director", "Athletics", "Football Coach"],
      verified: true
    },
    {
      id: "job-cocurr-2",
      title: "Performing Arts & Hindustani Classical Music Teacher",
      instituteName: "National Public School (NPS)",
      location: "Indiranagar, Bangalore",
      experienceRequired: "Sangeet Visharad / Degree in Music",
      salaryRange: "₹6,00,000 - ₹8,50,000 P.A.",
      postedDate: "2 days ago",
      family: "CoCurricular",
      tags: ["Music", "Vocals & Instruments", "Cultural Head"],
      verified: true
    },
    // 4. Student Support & Counselors
    {
      id: "job-supp-1",
      title: "Senior Child & Career Counselor",
      instituteName: "Greenwood High International",
      location: "Sarjapur, Bangalore",
      experienceRequired: "M.A / M.Sc Psychology + 4 yrs counseling",
      salaryRange: "₹8,00,000 - ₹11,00,000 P.A.",
      postedDate: "Just now",
      family: "StudentSupport",
      tags: ["Psychology", "Career Guidance", "Adolescent Care"],
      verified: true,
      urgent: true
    },
    {
      id: "job-supp-2",
      title: "Chief Digital Librarian & Information Officer",
      instituteName: "Loyola College",
      location: "Chennai, Tamil Nadu",
      experienceRequired: "M.Lib.Sc with KOHA / DSpace expertise",
      salaryRange: "₹6,50,000 - ₹9,00,000 P.A.",
      postedDate: "1 week ago",
      family: "StudentSupport",
      tags: ["Librarian", "Digital Archives", "KOHA"],
      verified: true
    },
    // 5. Administrative & Office
    {
      id: "job-admin-1",
      title: "Senior School Accountant & Tally ERP Lead",
      instituteName: "Ryan International Group",
      location: "Noida, UP",
      experienceRequired: "B.Com / M.Com + 5 yrs School Fee Audit",
      salaryRange: "₹6,00,000 - ₹8,00,000 P.A.",
      postedDate: "3 days ago",
      family: "AdminOffice",
      tags: ["Accounts", "Fee Management", "GST & Payroll"],
      verified: true
    },
    {
      id: "job-admin-2",
      title: "Campus Front-Office & Admissions Receptionist",
      instituteName: "Silver Oaks International",
      location: "Hyderabad, Telangana",
      experienceRequired: "Graduate with fluent English & CRM skills",
      salaryRange: "₹4,00,000 - ₹5,50,000 P.A.",
      postedDate: "5 days ago",
      family: "AdminOffice",
      tags: ["Reception", "Visitor Desk", "Admissions Help"],
      verified: true
    },
    // 6. Sales & Marketing
    {
      id: "job-sales-1",
      title: "Head of Student Admissions & Outreach Marketing",
      instituteName: "Amity University Campus",
      location: "Noida / Delhi NCR",
      experienceRequired: "MBA Marketing + 6 yrs EdTech / Higher Ed intake",
      salaryRange: "₹15,00,000 - ₹20,00,000 P.A.",
      postedDate: "2 days ago",
      family: "SalesMarketing",
      tags: ["Admissions Head", "Outreach", "Enrollment Growth"],
      verified: true
    },
    // 7. Facility & Operations
    {
      id: "job-ops-1",
      title: "Campus Facility & Health Safety Manager",
      instituteName: "Oakridge International School",
      location: "Gachibowli, Hyderabad",
      experienceRequired: "Diploma / Degree in Facility Mgmt + Fire Safety",
      salaryRange: "₹7,00,000 - ₹9,50,000 P.A.",
      postedDate: "4 days ago",
      family: "FacilityOps",
      tags: ["Facility Manager", "Safety Officer", "Campus Infrastructure"],
      verified: true
    },
    // 8. Support Staff & Drivers
    {
      id: "job-driver-1",
      title: "Heavy Vehicle School Bus Driver (Route #14)",
      instituteName: "National Hill View Public School",
      location: "Rajarajeshwari Nagar, Bangalore",
      experienceRequired: "Valid Heavy Passenger Commercial License + 5 yrs clean record",
      salaryRange: "₹3,60,000 - ₹4,80,000 P.A. + Provident Fund",
      postedDate: "Yesterday",
      family: "SupportStaff",
      tags: ["Bus Driver", "Commercial Badge", "Background Verified"],
      verified: true,
      urgent: true
    },
    {
      id: "job-driver-2",
      title: "Senior Laboratory Attendant (Chemistry & Bio)",
      instituteName: "St. Joseph's Boys' High School",
      location: "Museum Road, Bangalore",
      experienceRequired: "10+2 / Science Diploma + Lab Apparatus Maintenance",
      salaryRange: "₹3,00,000 - ₹4,20,000 P.A.",
      postedDate: "3 days ago",
      family: "SupportStaff",
      tags: ["Lab Attendant", "Safety Chemical Handling", "Support"],
      verified: true
    }
  ];

  const filteredJobs = allCampusJobs.filter((job) => {
    const matchesFamily = activeFamily === "All" || job.family === activeFamily;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.instituteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFamily && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Top Banner (Faithful to EduVyapar Copy & Aesthetics) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-12 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>EduVyapar Campus Hiring Ecosystem</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
            One place to hire for every role in your institution.
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            EduVyapar connects schools, colleges, and universities with verified candidates across all 8 role families — from boardroom principals and PGT professors to campus accountants and bus drivers.
          </p>

          {/* Search Box */}
          <div className="pt-2">
            <div className="flex items-center bg-white rounded-full p-2 pl-5 shadow-lg text-slate-800">
              <Search className="w-4 h-4 text-slate-400 mr-2.5 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search role, subject, or school name (e.g. Physics, Principal, Bus Driver)..."
                className="w-full text-xs sm:text-sm focus:outline-none bg-transparent placeholder-slate-400"
              />
              <button className="px-5 py-2 rounded-full bg-[#0066cc] text-white text-xs font-semibold hover:bg-[#0052ad] transition-colors cursor-pointer">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right Stats & Highlights */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto z-10">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
            <div className="text-2xl font-black text-white">8 Families</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Every Campus Role</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
            <div className="text-2xl font-black text-emerald-400">100%</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Verified Profiles</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
            <div className="text-2xl font-black text-amber-400">&lt; 2 Weeks</div>
            <div className="text-[11px] text-blue-200 mt-0.5">Average Time to Hire</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
            <div className="text-2xl font-black text-cyan-300">0% Cut</div>
            <div className="text-[11px] text-blue-200 mt-0.5">No Middle Agency Fees</div>
          </div>
        </div>
      </div>

      {/* 8 Role Families Filter Tabs (From EduTech Brochure) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Browse by Campus Role Family</h2>
            <p className="text-xs text-slate-500">Every role covered: Teaching, non-teaching, facility and support staff</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">Showing {filteredJobs.length} Verified Openings</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {roleFamilies.map((fam) => {
            const isActive = activeFamily === fam.id;
            return (
              <button
                key={fam.id}
                onClick={() => setActiveFamily(fam.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#0066cc] text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <span>{fam.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                  {fam.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="eduva-card p-6 flex flex-col justify-between space-y-4 border border-slate-200/80 hover:border-blue-400 transition-all shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    {job.family}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                    {job.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-700 mt-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{job.instituteName}</span>
                  </div>
                </div>
                {job.verified && (
                  <span className="p-1 rounded-full bg-emerald-50 text-emerald-600" title="Verified Institution">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>

              <div className="space-y-1.5 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{job.experienceRequired}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-900 font-semibold">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{job.salaryRange}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">{job.postedDate}</span>
              <button
                onClick={() => onApply(job as any)}
                className="px-4 py-2 rounded-xl bg-[#0066cc] hover:bg-[#0052ad] text-white text-xs font-bold transition-transform hover:scale-105 cursor-pointer shadow-xs"
              >
                1-Click Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Institutional Pricing Plans (From Website Content Page 4) */}
      <div className="bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
            Institutional Packages
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Plans for institutions of every size
          </h2>
          <p className="text-xs text-slate-500">
            Pick a plan based on how much you hire through the year. Transparent, agency-free pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* Starter Plan */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Starter Plan</h3>
                <p className="text-xs text-slate-500 mt-0.5">Best for a single school or coaching institute</p>
              </div>
              <div className="text-2xl font-black text-slate-900">
                ₹4,999 <span className="text-xs font-normal text-slate-400">/ quarter</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Up to 3 Active Job Posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Applicant Filtering</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Standard Application Tracking</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>Email Support (24h SLA)</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => alert("Starter plan selected! Institutional onboarding initiated.")}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Choose Starter
            </button>
          </div>

          {/* Professional Plan (Highlighted) */}
          <div className="bg-white p-6 rounded-3xl border-2 border-[#0066cc] shadow-md space-y-5 flex flex-col justify-between relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0066cc] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Professional Plan</h3>
                <p className="text-xs text-slate-500 mt-0.5">Best for growing academic groups & academies</p>
              </div>
              <div className="text-2xl font-black text-slate-900">
                ₹14,999 <span className="text-xs font-normal text-slate-400">/ quarter</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Up to 15 Active Job Posts</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Featured & Priority Listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Talent Database Access (1,000 resumes)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Priority Phone & WhatsApp Support</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => alert("Professional plan selected! Institutional account upgraded.")}
              className="w-full py-2.5 rounded-xl bg-[#0066cc] text-white text-xs font-bold hover:bg-[#0052ad] shadow-sm cursor-pointer"
            >
              Choose Professional
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Enterprise Chain</h3>
                <p className="text-xs text-slate-500 mt-0.5">For large chains, trust boards & universities</p>
              </div>
              <div className="text-2xl font-black text-slate-900">
                Custom <span className="text-xs font-normal text-slate-400">/ annual contract</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unlimited Campus Job Postings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Full National Talent Database Access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Custom Branded Employer Pages</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dedicated Key Account Manager</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => alert("Enterprise consultation booked! Our campus advisor will contact you within 2 hours.")}
              className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 cursor-pointer"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
