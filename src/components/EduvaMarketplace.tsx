"use client";

import React, { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Star, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Laptop, 
  Shirt, 
  Armchair, 
  Building2, 
  Check, 
  ArrowRight,
  Plus,
  ShieldCheck,
  Calculator,
  FileSpreadsheet,
  Download,
  Truck
} from "lucide-react";
import { Product } from "../types";

interface EduvaMarketplaceProps {
  products: Product[];
  onAddToCart: (p: Product) => void;
  onOpenBulkModal: () => void;
}

export const EduvaMarketplace: React.FC<EduvaMarketplaceProps> = ({
  products,
  onAddToCart,
  onOpenBulkModal,
}) => {
  const [selectedCat, setSelectedCat] = useState("All");
  const [activeTab, setActiveTab] = useState<"catalog" | "rfp">("catalog");
  
  // Bulk Calculator state
  const [bulkItem, setBulkItem] = useState("School Uniform Bundles (Blazer, Shirt, Trouser)");
  const [bulkQty, setBulkQty] = useState(250);
  const [baseUnitPrice, setBaseUnitPrice] = useState(1450);

  const categories = [
    { id: "Books", label: "Books", icon: <BookOpen className="w-5 h-5 text-blue-600" /> },
    { id: "Stationery", label: "Stationery", icon: <Sparkles className="w-5 h-5 text-amber-500" /> },
    { id: "Uniforms", label: "Uniforms", icon: <Shirt className="w-5 h-5 text-emerald-600" /> },
    { id: "Electronics", label: "Electronics", icon: <Laptop className="w-5 h-5 text-indigo-600" /> },
    { id: "Furniture", label: "Furniture", icon: <Armchair className="w-5 h-5 text-purple-600" /> },
    { id: "Institutional", label: "Institutional", icon: <Building2 className="w-5 h-5 text-cyan-600" /> },
  ];

  // Calculate volume discount
  let discountPct = 0;
  if (bulkQty >= 2000) discountPct = 35;
  else if (bulkQty >= 501) discountPct = 25;
  else if (bulkQty >= 100) discountPct = 15;

  const totalBase = bulkQty * baseUnitPrice;
  const discountAmt = Math.round((totalBase * discountPct) / 100);
  const finalPrice = totalBase - discountAmt;

  const filteredProducts =
    selectedCat === "All"
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === selectedCat.toLowerCase()
        );

  return (
    <div className="space-y-12 pb-16">
      {/* Top Banner (Matches Bottom Screen 1 Exactly) */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-100 via-sky-50 to-indigo-100 p-8 sm:p-12 border border-blue-200/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-lg z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 text-blue-800 text-xs font-semibold">
            <ShoppingBag className="w-3.5 h-3.5 text-blue-600" />
            <span>EduVyapar Certified Educational Commerce</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
            Quality Products <br />
            for a Brighter Future
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Books, stationery, uniforms and institutional hardware — verified vendors, volume discounts, and campus delivery across India.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setActiveTab("catalog");
                setSelectedCat("All");
              }}
              className="px-6 py-2.5 rounded-full bg-[#0066cc] hover:bg-[#0052ad] text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer"
            >
              Shop Catalog
            </button>
            <button
              onClick={() => setActiveTab("rfp")}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs font-semibold shadow-xs transition-all cursor-pointer"
            >
              Institutional Bulk RFP
            </button>
          </div>
        </div>

        {/* Hero Visual / Badges */}
        <div className="relative z-10 grid grid-cols-2 gap-3 w-full md:w-auto">
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs border border-white/60 shadow-xs text-center">
            <div className="text-2xl font-black text-blue-600">50K+</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Verified SKUs</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs border border-white/60 shadow-xs text-center">
            <div className="text-2xl font-black text-emerald-600">Up to 35%</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Bulk Institutional Tier</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs border border-white/60 shadow-xs text-center">
            <div className="text-2xl font-black text-purple-600">GST Invoice</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Input Tax Credit Ready</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-xs border border-white/60 shadow-xs text-center">
            <div className="text-2xl font-black text-amber-600">30-Day PO</div>
            <div className="text-[11px] text-slate-500 mt-0.5">School Credit Terms</div>
          </div>
        </div>
      </div>

      {/* Tab Switcher: Retail Marketplace vs Institutional Bulk RFQ */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("catalog")}
          className={`pb-2 text-sm font-bold transition-colors cursor-pointer relative ${
            activeTab === "catalog"
              ? "text-[#0066cc] after:content-[''] after:absolute after:bottom-[-13px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#0066cc]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          Retail Educational Catalog ({products.length} Items)
        </button>
        <button
          onClick={() => setActiveTab("rfp")}
          className={`pb-2 text-sm font-bold transition-colors cursor-pointer relative flex items-center gap-1.5 ${
            activeTab === "rfp"
              ? "text-[#0066cc] after:content-[''] after:absolute after:bottom-[-13px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#0066cc]"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Institutional Bulk Procurement & Tier Discounts</span>
          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
            B2B RFQ
          </span>
        </button>
      </div>

      {/* ======================================================================= */}
      {/* VIEW 1: RETAIL STORE / CATEGORIES & CARDS                               */}
      {/* ======================================================================= */}
      {activeTab === "catalog" && (
        <div className="space-y-8">
          {/* Categories Grid (Matches Bottom Screen 1) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {categories.map((c) => {
              const isSelected = selectedCat === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCat(isSelected ? "All" : c.id)}
                  className={`p-4 rounded-2xl border text-center flex flex-col items-center justify-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-blue-50 border-blue-400 shadow-xs"
                      : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    {c.icon}
                  </div>
                  <span className="text-xs font-semibold text-slate-800">
                    {c.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Products Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCat === "All" ? "Featured Educational Supplies" : `${selectedCat} Collection`}
                </h2>
                <p className="text-xs text-slate-500">Verified products with quality warranty and direct campus shipping</p>
              </div>
              <span className="text-xs font-medium text-slate-400">
                Showing {filteredProducts.length} items
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  className="eduva-card p-4 flex flex-col justify-between space-y-3 border border-slate-200/80 hover:border-blue-400 transition-all shadow-xs"
                >
                  <div className="h-44 rounded-xl overflow-hidden bg-slate-100 relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-2 left-2 text-[10px] font-bold bg-white/95 px-2.5 py-0.5 rounded-md shadow-xs">
                      {p.category}
                    </span>
                    {p.rating && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-white/95 text-amber-500 px-2 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-500" />
                        {p.rating}
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 text-xs line-clamp-2 leading-snug">
                      {p.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <span className="text-sm font-black text-slate-900">
                        ₹{p.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <Truck className="w-3 h-3" />
                        Free Delivery
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(p)}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0066cc] hover:text-white text-slate-700 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================================= */}
      {/* VIEW 2: INSTITUTIONAL BULK PROCUREMENT & TIERED DISCOUNT CALCULATOR      */}
      {/* ======================================================================= */}
      {activeTab === "rfp" && (
        <div className="space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                    Volume Tier Matrix
                  </span>
                  <span className="text-xs text-slate-500">Institution & Trust Direct Procurement</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Institutional Bulk RFP & Pro-Forma Calculator
                </h2>
                <p className="text-xs text-slate-500">
                  Pre-negotiated volume discount tiers for schools, colleges and universities across uniforms, textbooks, desks & smart lab hardware.
                </p>
              </div>

              <button
                onClick={onOpenBulkModal}
                className="px-5 py-2.5 rounded-xl bg-[#0066cc] hover:bg-[#0052ad] text-white text-xs font-bold shadow-sm transition-transform hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                Submit Custom RFQ
              </button>
            </div>

            {/* Volume Tier Table */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className={`p-4 rounded-2xl border transition-all ${bulkQty >= 100 && bulkQty < 501 ? "border-blue-500 bg-blue-50/50 shadow-xs" : "border-slate-200 bg-slate-50"}`}>
                <div className="text-xs font-bold text-slate-500">Tier 1 &bull; 100 - 500 Units</div>
                <div className="text-2xl font-black text-blue-600 mt-1">15% OFF</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Suitable for single-grade or class batch</div>
              </div>
              <div className={`p-4 rounded-2xl border transition-all ${bulkQty >= 501 && bulkQty < 2000 ? "border-blue-500 bg-blue-50/50 shadow-xs" : "border-slate-200 bg-slate-50"}`}>
                <div className="text-xs font-bold text-slate-500">Tier 2 &bull; 501 - 2,000 Units</div>
                <div className="text-2xl font-black text-emerald-600 mt-1">25% OFF</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Suitable for whole-school session replenishment</div>
              </div>
              <div className={`p-4 rounded-2xl border transition-all ${bulkQty >= 2000 ? "border-blue-500 bg-blue-50/50 shadow-xs" : "border-slate-200 bg-slate-50"}`}>
                <div className="text-xs font-bold text-slate-500">Tier 3 &bull; 2,000+ Units</div>
                <div className="text-2xl font-black text-purple-600 mt-1">35% OFF + Net 30 PO</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Suitable for university chains & trust boards</div>
              </div>
            </div>

            {/* Interactive Calculator Box */}
            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-5">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Live Pro-Forma Quote Estimator</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Select Item Category</label>
                  <select
                    value={bulkItem}
                    onChange={(e) => {
                      setBulkItem(e.target.value);
                      if (e.target.value.includes("Uniform")) setBaseUnitPrice(1450);
                      if (e.target.value.includes("Desks")) setBaseUnitPrice(3800);
                      if (e.target.value.includes("Textbook")) setBaseUnitPrice(420);
                      if (e.target.value.includes("Tablets")) setBaseUnitPrice(12500);
                    }}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="School Uniform Bundles (Blazer, Shirt, Trouser)">School Uniform Bundles (₹1,450/set)</option>
                    <option value="Ergonomic Classroom Desks & Benches">Ergonomic Classroom Desks & Benches (₹3,800/unit)</option>
                    <option value="Annual CBSE Curriculum Textbook Kits">Annual CBSE Curriculum Textbook Kits (₹420/subject)</option>
                    <option value="Interactive Smart Learning Tablets">Interactive Smart Learning Tablets (₹12,500/unit)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Quantity (Units)</label>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={bulkQty}
                    onChange={(e) => setBulkQty(Math.max(50, parseInt(e.target.value) || 50))}
                    className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                  <div className="text-[10px] text-amber-400 mt-1">
                    {discountPct > 0 ? `Qualifies for Tier Discount: ${discountPct}% OFF` : "Add 100+ units for Tier 1 Discount"}
                  </div>
                </div>

                <div className="bg-slate-800/90 p-3.5 rounded-xl border border-slate-700 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Pro-Forma Quotation</span>
                    <div className="text-xl font-black text-emerald-400">
                      ₹{finalPrice.toLocaleString()}
                    </div>
                    {discountPct > 0 && (
                      <div className="text-[10px] text-slate-400 line-through">
                        MRP: ₹{totalBase.toLocaleString()} (Saved ₹{discountAmt.toLocaleString()})
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => alert(`Pro-Forma Quote #EP-2026-981 for ₹${finalPrice.toLocaleString()} generated and dispatched to your email!`)}
                    className="w-full mt-2 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download Pro-Forma PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Vendor Quality Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Direct Factory Inspection</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Every batch tested for fabric durability, non-toxic ink and BIS child safety standards.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <FileSpreadsheet className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Credit Invoicing (Net 30)</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Verified institutions receive 30-day payment flexibility against approved Purchase Orders.</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                <Truck className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900">Direct Campus Offloading</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">Palletized warehouse logistics with door-to-door transit insurance and batch tracking.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
