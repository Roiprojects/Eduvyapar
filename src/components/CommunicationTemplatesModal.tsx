"use client";

import React, { useState } from "react";
import { 
  Bell, 
  Smartphone, 
  Mail, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  X, 
  Send,
  AlertCircle,
  Copy,
  Check
} from "lucide-react";

interface CommunicationTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommunicationTemplatesModal: React.FC<CommunicationTemplatesModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("admissions");
  const [activeChannel, setActiveChannel] = useState<"sms" | "whatsapp" | "email">("whatsapp");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = [
    { id: "auth", label: "Registration & OTP" },
    { id: "admissions", label: "Admissions & Pre-Admission" },
    { id: "ecommerce", label: "Orders & Shipping" },
    { id: "recruitment", label: "Recruitment & Interviews" },
    { id: "bus", label: "Bus Sharing Fleet" },
    { id: "social", label: "Content & Shisya" },
  ];

  const templates: Record<string, Record<"sms" | "whatsapp" | "email", { subject?: string; body: string }>> = {
    auth: {
      sms: {
        body: "Welcome to EduVyapar. Your OTP for account verification is: 482910. Valid for 10 minutes. Do not share this OTP with anyone. - Team EduVyapar",
      },
      whatsapp: {
        body: "Hello Rahul Sharma,\n\nWelcome to EduVyapar — The Unified Ecosystem for Students, Parents, Teachers, Institutions and Vendors.\n\nYour OTP for account verification is: *482910*\n\nThis OTP is valid for 10 minutes.\n\nThank you,\nEduVyapar Support Team",
      },
      email: {
        subject: "Welcome to EduVyapar — Verify Your Account",
        body: "Dear Rahul Sharma,\n\nThank you for registering with EduVyapar.\n\nYour verification code is: 482910\n\nThis code is valid for 10 minutes. Please enter this OTP to activate your unified student portal.\n\nIf you did not initiate this request, please contact security@eduvyapar.com immediately.\n\nWarm regards,\nEduVyapar Security Team",
      },
    },
    admissions: {
      sms: {
        body: "Your admission application for Delhi Public School has been submitted successfully. Application ID: DPS-2026-8842. Track status on EduVyapar.",
      },
      whatsapp: {
        body: "Hello Rahul Sharma,\n\nYour admission application has been successfully submitted!\n\n🏛️ *Institution:* Delhi Public School\n📋 *Application ID:* DPS-2026-8842\n📅 *Submission Date:* 07-Oct-2026\n⏳ *Status:* Pre-Admission Staged (Auto-submits on official opening date: 15-Nov-2026)\n\nYou will receive real-time updates as your document verification proceeds.\n\nRegards,\nEduVyapar Admissions Desk",
      },
      email: {
        subject: "Admission Application Received — Delhi Public School (DPS-2026-8842)",
        body: "Dear Rahul Sharma,\n\nYour application for admission to Delhi Public School (Grade 11 - Science CBSE) has been recorded in the EduVyapar central admissions engine.\n\nApplication Details:\n- Application ID: DPS-2026-8842\n- Target Course: Senior Secondary Science (PCM + CS)\n- Eligibility Verification: 94.6% Grade 10 Score Verified\n- Pre-Admission Auto-Submit: Enabled\n\nIf the application requires alternative placement upon review, our intelligent rule-based engine will immediately suggest 3 accredited matching partner institutions.\n\nWarm regards,\nDirector of Admissions\nDelhi Public School & EduVyapar Central Portal",
      },
    },
    ecommerce: {
      sms: {
        body: "Your EduVyapar order #EV-99214 has been placed successfully. Total Amount: Rs 3,450. Track your delivery on the platform.",
      },
      whatsapp: {
        body: "Hello Rahul Sharma,\n\nThank you for shopping with EduVyapar! 🛍️\n\n📦 *Order ID:* #EV-99214\n💰 *Amount:* ₹3,450\n📚 *Items:* NCERT Class 11 Complete Set (Physics, Chemistry, Maths) + Oxford School Uniform Blazer\n🚚 *Estimated Delivery:* 10-Oct-2026\n\nYour order is currently being packed by Certified Vendor: *Scholars Book Depot*.\n\nTrack order live on your EduVyapar Student Portal.",
      },
      email: {
        subject: "Order Confirmation — #EV-99214 (EduVyapar Store)",
        body: "Dear Rahul Sharma,\n\nThank you for your order on the EduVyapar Education Marketplace.\n\nOrder Summary:\n- Order ID: #EV-99214\n- Date: 07-Oct-2026\n- Payment Method: Online UPI / NetBanking (Verified)\n- Total Amount Paid: ₹3,450 (Tax Invoice Attached)\n\nItems Dispatched:\n1. NCERT Class 11 Science Bundle — Qty: 1 — ₹1,850\n2. Official Campus Uniform Blazer (Size 38) — Qty: 1 — ₹1,600\n\nDelivery Address:\nRahul Sharma, 42 Heritage Park, Vasant Kunj, New Delhi - 110070\n\nRegards,\nEduVyapar Fulfillment Services",
      },
    },
    recruitment: {
      sms: {
        body: "Interview Scheduled: Delhi Public School for Senior Physics Faculty on 14-Oct-2026 at 10:30 AM. Reporting venue: Main Campus. EduVyapar Careers.",
      },
      whatsapp: {
        body: "Dear Dr. Ananya Rao,\n\nCongratulations! 🎓\n\nYour profile has been *shortlisted* by *Delhi Public School* for the position of:\n📌 *Role:* Senior PGT Physics & STEM Lead\n💼 *Application Ref:* REC-DPS-4412\n🗓️ *Interview Date:* 14-Oct-2026 at 10:30 AM\n📍 *Mode:* In-Person Offline Interview at Senior Wing Board Room\n\nPlease carry your original academic credentials and demo lesson outline.\n\nBest wishes,\nRecruitment Cell, EduVyapar",
      },
      email: {
        subject: "Interview Invitation — Senior PGT Physics at Delhi Public School",
        body: "Dear Dr. Ananya Rao,\n\nWe are pleased to invite you for the face-to-face interview round for the Senior PGT Physics Faculty position at Delhi Public School, R.K. Puram.\n\nInterview Schedule:\n- Date: Tuesday, 14-Oct-2026\n- Time: 10:30 AM IST\n- Panel: Principal, HOD Sciences, and Managing Committee\n- Venue: Principal's Conference Hall, Main Campus, Sector 12, R.K. Puram\n\nIn accordance with EduVyapar Phase-1 specifications, interview evaluations and document verification will be conducted offline at the campus, and your final status will be updated on your EduVyapar Teacher Dashboard.\n\nWarm regards,\nHuman Resources & Faculty Selection Board\nDelhi Public School",
      },
    },
    bus: {
      sms: {
        body: "Bus Sharing Request #BUS-881 Confirmed: 2 Buses allocated from St. Mary's School to DPS for Annual Athletic Meet on 18-Oct-2026. EduVyapar Fleet.",
      },
      whatsapp: {
        body: "🚌 *Inter-Institutional Bus Fleet Sharing Notification*\n\nTo: *Delhi Public School Transport Desk*\nFrom: *St. Mary's Academy Transport Fleet*\n\n✅ *Status:* Request Approved & Allocated\n📋 *Request ID:* #BUS-881\n📅 *Event Date:* 18-Oct-2026\n🚌 *Buses Allocated:* 2 Luxury 42-Seater Coaches (DL-1P-9921, DL-1P-9922)\n🗺️ *Route:* R.K. Puram ↔ Jawaharlal Nehru Stadium\n⛽ *Cost Sharing Rate:* ₹42/km (Shared Fuel & Driver Allowance)\n\nAllocation is recorded in the EduVyapar Institutional Transport Ledger.",
      },
      email: {
        subject: "Bus Sharing Allocation Confirmed — Request #BUS-881",
        body: "Dear Transport Coordinator,\n\nYour inter-institutional bus sharing request has been accepted and confirmed by St. Mary's Academy.\n\nFleet Details:\n- Providing Institution: St. Mary's Academy, Vasant Kunj\n- Requesting Institution: Delhi Public School, R.K. Puram\n- Vehicles: 2 x Eicher 42-Seater School Buses (GPS & Speed Governor Equipped)\n- Date of Requirement: 18-Oct-2026 (07:00 AM to 05:00 PM)\n- Driver Verification: Background checked & police verified\n\nThis collaborative resource sharing eliminates third-party commercial rental markups, saving an estimated ₹28,000 for the event transit.\n\nWarm regards,\nEduVyapar Institutional Logistics Network",
      },
    },
    social: {
      sms: {
        body: "Dr. Ananya Rao published a new video lesson: 'Electromagnetic Induction Explained'. Watch free on EduVyapar Learn.",
      },
      whatsapp: {
        body: "🌟 *New Lesson from your Mentor!*\n\n*Dr. Ananya Rao* (1.5M Shisyas) just uploaded a new comprehensive masterclass:\n\n🎥 *'Electromagnetic Induction & Faraday\'s Laws — Class 12 Boards & JEE Prep'*\n⏱️ Duration: 42 mins\n📑 Includes: Free PDF Revision Notes + Interactive Practice Quiz\n\nWatch now on EduVyapar Learn and join the live doubt-clearing discussion thread with fellow Shisyas!",
      },
      email: {
        subject: "New Lecture Alert: 'Electromagnetic Induction' by Dr. Ananya Rao",
        body: "Dear Rahul,\n\nYour followed educator Dr. Ananya Rao has just published a new video lecture on EduVyapar Learn.\n\nTopic: Electromagnetic Induction & Alternating Currents\nRecommended For: CBSE Class 12 Boards, JEE Main & Advanced\nStudy Resources: Downloadable formula sheet and 25 practice questions auto-generated by the AI Learning Engine.\n\nJoin the 1.5 million Shisyas community to leave your questions and discuss with peers.\n\nKeep learning,\nEduVyapar Creator Community",
      },
    },
  };

  const currentTemplate = templates[activeCategory]?.[activeChannel] || { body: "" };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTemplate.body);
    setCopiedId(activeCategory + activeChannel);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0f2c59] to-[#0066cc] p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-xs">
              <Bell className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif-hero">
                Multi-Channel Communication Engine
              </h2>
              <p className="text-xs text-sky-100 mt-0.5">
                Powered by official EduVyapar communication templates (SMS, WhatsApp & Email)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === c.id
                    ? "bg-[#0066cc] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Channel Selector: SMS, WhatsApp, Email */}
          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveChannel("whatsapp")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeChannel === "whatsapp"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-emerald-700"
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Template</span>
              </button>

              <button
                onClick={() => setActiveChannel("sms")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeChannel === "sms"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-indigo-700"
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>SMS Alert</span>
              </button>

              <button
                onClick={() => setActiveChannel("email")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeChannel === "email"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-blue-700"
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>Official Email</span>
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
            >
              {copiedId ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Template</span>
                </>
              )}
            </button>
          </div>

          {/* Template Preview Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 space-y-4 shadow-lg">
            {activeChannel === "email" && currentTemplate.subject && (
              <div className="border-b border-slate-800 pb-3">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Subject Line
                </span>
                <span className="text-sm font-semibold text-sky-300">
                  {currentTemplate.subject}
                </span>
              </div>
            )}

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Template Body Content
              </span>
              <pre className="text-xs sm:text-sm font-mono text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
                {currentTemplate.body}
              </pre>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Status: Production Verified (BRD Spec Compliant)</span>
              </div>
              <span>Variable tokens: {`{Student Name}`}, {`{Institution Name}`}, {`{Application ID}`}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Complies with Telecom Commercial Communications Customer Preference Regulations (TCCCPR) & TRAI DLT Guidelines.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
