"use client";

import React, { useState } from "react";
import { UserRole, Product, CartItem, JobPosting, JobApplication, AdmissionNotification, AdmissionApplication, VideoContent, SocialPost, BusSharingRequest, NotificationItem } from "../types";
import { 
  INITIAL_PRODUCTS, 
  INITIAL_JOBS, 
  INITIAL_APPLICATIONS, 
  INITIAL_ADMISSIONS, 
  INITIAL_ADMISSION_APPLICATIONS, 
  INITIAL_VIDEOS, 
  INITIAL_POSTS, 
  INITIAL_BUS_REQUESTS, 
  INITIAL_NOTIFICATIONS 
} from "../data/mockData";
import { EduvaHeader } from "../components/EduvaHeader";
import { EduvaLanding } from "../components/EduvaLanding";
import { EduvaDashboard } from "../components/EduvaDashboard";
import { EduvaMarketplace } from "../components/EduvaMarketplace";
import { EduvaAdmissions } from "../components/EduvaAdmissions";
import { EduvaJobs } from "../components/EduvaJobs";
import { EduvaLearn } from "../components/EduvaLearn";
import { StudentParentPortal } from "../components/StudentParentPortal";
import { CommunicationTemplatesModal } from "../components/CommunicationTemplatesModal";
import { BusSharingSection } from "../components/BusSharingSection";
import { RoleDashboards } from "../components/RoleDashboards";
import { LiveChatDrawer } from "../components/LiveChatDrawer";
import { EduvaFooter } from "../components/EduvaFooter";
import { EcommerceSection } from "../components/EcommerceSection";
import { Sparkles, X, CheckCircle2, Smartphone, MessageSquare } from "lucide-react";

export default function Home() {
  const [currentRole, setCurrentRole] = useState<UserRole>("student");
  const [activeTab, setActiveTab] = useState<string>("home");

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isCommModalOpen, setIsCommModalOpen] = useState(false);

  const [jobs, setJobs] = useState<JobPosting[]>(INITIAL_JOBS);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(INITIAL_APPLICATIONS);

  const [admissions, setAdmissions] = useState<AdmissionNotification[]>(INITIAL_ADMISSIONS);
  const [admissionApplications, setAdmissionApplications] = useState<AdmissionApplication[]>(INITIAL_ADMISSION_APPLICATIONS);

  const [videos, setVideos] = useState<VideoContent[]>(INITIAL_VIDEOS);
  const [posts, setPosts] = useState<SocialPost[]>(INITIAL_POSTS);
  const [busRequests, setBusRequests] = useState<BusSharingRequest[]>(INITIAL_BUS_REQUESTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    showToast(`Added "${product.name.slice(0, 30)}..." to your cart!`);
  };

  const handleSimulateAutoSubmit = () => {
    let count = 0;
    setAdmissionApplications((prev) =>
      prev.map((app) => {
        if (app.isPreAdmission && app.status === "Pending") {
          count++;
          return { ...app, status: "Auto-Submitted" };
        }
        return app;
      })
    );
    showToast(`🚀 Simulation: Admissions window opened! ${count || 1} pre-application(s) auto-submitted.`);
  };

  const handleToggleShisya = (vidId: string) => {
    showToast("You are now following Dr. Ananya Rao as a Shisya disciple!");
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Floating SMS / WhatsApp Templates Button */}
      <button
        onClick={() => setIsCommModalOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-white/95 hover:bg-white text-slate-800 border border-slate-200/90 px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
        title="Preview live SMS, WhatsApp, and Email notification templates from BRD"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <Smartphone className="w-3.5 h-3.5 text-blue-600" />
        <span>SMS / WhatsApp Templates</span>
      </button>

      {/* Eduva Header */}
      {activeTab !== 'home' && (
        <EduvaHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          currentRole={currentRole}
          onRoleChange={setCurrentRole}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          onOpenChat={() => setIsChatOpen(true)}
          onOpenCommTemplates={() => setIsCommModalOpen(true)}
          notifications={notifications}
        />
      )}

      {/* Main Dynamic View Area (Full-bleed for Home Hero) */}
      <main className="flex-1 w-full">
        {/* 1. HOME / LANDING SCREEN (Full-width edge-to-edge as in 01_homepage_full) */}
        {activeTab === "home" && (
          <EduvaLanding
            onNavigate={setActiveTab}
            products={products}
            jobs={jobs}
            admissions={admissions}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* OTHER TABS: Boxed container */}
        {activeTab !== "home" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* 2. DASHBOARD */}
            {activeTab === "dashboard" && (
              <EduvaDashboard
                onNavigateTab={setActiveTab}
                admissionApplications={admissionApplications}
                jobApplications={jobApplications}
                videos={videos}
              />
            )}

            {/* 3. STUDENT & PARENT OPERATIONAL PORTAL (From EduVyapar SOP PDF) */}
            {activeTab === "portal" && (
              <StudentParentPortal
                initialRole={currentRole === "parent" ? "parent" : "student"}
                onNavigateTab={setActiveTab}
                onAddToCart={handleAddToCart}
              />
            )}

            {/* 4. MARKETPLACE (Retail Catalog + Bulk Procurement RFP) */}
            {activeTab === "marketplace" && (
              <EduvaMarketplace
                products={products}
                onAddToCart={handleAddToCart}
                onOpenBulkModal={() => setIsBulkModalOpen(true)}
              />
            )}

            {/* 5. ADMISSIONS (DigiLocker + Pre-Admissions Queue + Alternative Recommender) */}
            {activeTab === "admissions" && (
              <EduvaAdmissions
                admissions={admissions}
                applications={admissionApplications}
                onApply={(adm, isPre) => {
                  showToast(isPre ? "Pre-admission application queued!" : "Admission application sent!");
                }}
                onSimulateAutoSubmit={handleSimulateAutoSubmit}
              />
            )}

            {/* 6. JOBS (All 8 Role Families + Institutional Pricing Plans) */}
            {activeTab === "jobs" && (
              <EduvaJobs
                jobs={jobs}
                applications={jobApplications}
                onApply={(job) => {
                  showToast(`Applied for ${job.title}!`);
                }}
                onOpenPipeline={() => setActiveTab("dashboard")}
              />
            )}

            {/* 7. LEARN (Social & Shisya Mentorship Feed) */}
            {activeTab === "learn" && (
              <EduvaLearn
                videos={videos}
                posts={posts}
                onToggleShisya={handleToggleShisya}
                onLikePost={() => showToast("Liked video post!")}
                onAddComment={() => showToast("Comment posted!")}
              />
            )}

            {/* 8. INSTITUTES & BUS SHARING POOL (BRD Feature) */}
            {activeTab === "institutes" && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Inter-Institutional Campus Collaboration</h2>
                    <p className="text-xs text-slate-500 mt-1">Resource sharing, campus transport pool, and verified institutional directory</p>
                  </div>
                </div>

                <BusSharingSection
                  busRequests={busRequests}
                  currentRole={currentRole}
                  onRaiseRequest={(req) => showToast("Bus request broadcasted to nearby institutes!")}
                  onAcceptBid={() => showToast("Fleet tender accepted!")}
                  onSubmitBid={() => showToast("Fleet quote tendered!")}
                />
              </div>
            )}
          </div>
        )}
      </main>

      {/* Cart Modal / Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-base">Your Cart ({totalCartCount})</h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 max-h-[450px] overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate">{item.product.name}</div>
                      <div className="text-[11px] text-slate-500">₹{item.product.price} &times; {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex justify-between text-sm font-bold text-slate-900">
                <span>Subtotal</span>
                <span>₹{cart.reduce((a, b) => a + b.product.price * b.quantity, 0).toLocaleString()}</span>
              </div>
              <button
                onClick={() => {
                  setCart([]);
                  setIsCartOpen(false);
                  showToast("Order confirmed! Tracking dispatched.");
                }}
                className="w-full py-3 rounded-full bg-[#0066cc] text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                Checkout & Pay via UPI / Cards
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Quote RFQ Modal */}
      {isBulkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base">Institutional Bulk Procurement</h3>
              <button onClick={() => setIsBulkModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Request pro-forma pricing for campus-wide uniforms, textbooks, or smart classroom hardware.
            </p>
            <div className="space-y-3">
              <input type="text" placeholder="Institution Name" className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              <input type="number" placeholder="Estimated Quantity (Min 50 units)" className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              <textarea placeholder="Delivery details & specifications..." rows={3} className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl" />
              <button
                onClick={() => {
                  setIsBulkModalOpen(false);
                  showToast("Bulk inquiry dispatched to verified vendors!");
                }}
                className="w-full py-2.5 rounded-full bg-[#0066cc] text-white text-xs font-bold cursor-pointer"
              >
                Submit Official RFQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Channel Communication Templates Engine Modal */}
      <CommunicationTemplatesModal
        isOpen={isCommModalOpen}
        onClose={() => setIsCommModalOpen(false)}
      />

      {/* Live Chat Drawer */}
      <LiveChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Enterprise Multi-Column Footer */}
      <EduvaFooter
        onNavigateTab={setActiveTab}
        onOpenCommTemplates={() => setIsCommModalOpen(true)}
      />
    </div>
  );
}