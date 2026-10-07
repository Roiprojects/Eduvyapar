"use client";

import React, { useState } from "react";
import { Product, CartItem, UserRole } from "../types";
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  Star, 
  CheckCircle, 
  Building2, 
  ShieldCheck, 
  Package, 
  X, 
  Plus, 
  Minus, 
  ArrowRight, 
  CreditCard, 
  Check, 
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";

interface EcommerceSectionProps {
  products: Product[];
  currentRole: UserRole;
  cart: CartItem[];
  onAddToCart: (product: Product, quantity?: number) => void;
  onUpdateCartQuantity: (productId: string, delta: number) => void;
  onRemoveFromCart: (productId: string) => void;
  isCartOpen: boolean;
  onCloseCart: () => void;
  onOrderPlaced: (orderId: string, total: number) => void;
}

export const EcommerceSection: React.FC<EcommerceSectionProps> = ({
  products,
  currentRole,
  cart,
  onAddToCart,
  onUpdateCartQuantity,
  onRemoveFromCart,
  isCartOpen,
  onCloseCart,
  onOrderPlaced,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bulkModalProduct, setBulkModalProduct] = useState<Product | null>(null);
  const [bulkQuantity, setBulkQuantity] = useState<number>(50);
  const [bulkNotes, setBulkNotes] = useState<string>("");
  const [isBulkSuccess, setIsBulkSuccess] = useState<boolean>(false);

  // Checkout flow state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [shippingAddress, setShippingAddress] = useState<string>("Delhi Public International School, Sector 4, Whitefield, Bengaluru - 560066");
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);

  const categories = [
    "All",
    "Books & Curriculum",
    "Smart Electronics",
    "Uniforms & Apparel",
    "Stationery & Art",
    "Campus Furniture",
    "Lab & Science Equipment",
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gstAmount = Math.round(cartSubtotal * 0.18);
  const shippingFee = cartSubtotal > 2000 || cartSubtotal === 0 ? 0 : 150;
  const orderTotal = cartSubtotal + gstAmount + shippingFee;

  const handleExecuteCheckout = () => {
    setIsProcessingOrder(true);
    setTimeout(() => {
      setIsProcessingOrder(false);
      setIsCheckoutOpen(false);
      onCloseCart();
      const generatedOrderId = "GEP-" + Math.floor(100000 + Math.random() * 900000);
      onOrderPlaced(generatedOrderId, orderTotal);
    }, 1200);
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBulkSuccess(true);
    setTimeout(() => {
      setIsBulkSuccess(false);
      setBulkModalProduct(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Category Pills & Search */}
      <div className="bg-slate-900/60 p-4 sm:p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-indigo-400" />
              <span>Certified Educational Supplies & Hardware</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Direct marketplace connecting schools, students, and verified educational manufacturers
            </p>
          </div>

          {/* Quick Institutional Bulk Banner */}
          {(currentRole === "institute" || currentRole === "admin") && (
            <div className="px-4 py-2 rounded-2xl bg-indigo-950/60 border border-indigo-700/50 flex items-center gap-2.5 text-xs text-indigo-300">
              <Building2 className="w-4 h-4 text-indigo-400" />
              <span>Institutional Procurement Mode Active: Bulk Tier Discounts Unlocked</span>
            </div>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => {
          const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          return (
            <div
              key={product.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col group"
            >
              {/* Product Image & Badges */}
              <div className="relative h-52 overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-600/90 text-white backdrop-blur-md">
                    {product.category}
                  </span>
                  {product.isBulkEligible && (
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/90 text-white backdrop-blur-md">
                      Bulk Tier Eligible
                    </span>
                  )}
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-black bg-rose-500/90 text-white shadow">
                    {discountPercent}% OFF
                  </span>
                </div>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  {/* Vendor & Rating */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1 text-[11px] text-slate-300 font-medium">
                      {product.vendorName}
                      {product.vendorVerified && (
                        <CheckCircle className="w-3.5 h-3.5 text-blue-400 inline" />
                      )}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-slate-500 text-[10px]">({product.reviewsCount})</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setSelectedProduct(product)}
                    className="text-sm font-bold text-white line-clamp-2 hover:text-indigo-400 cursor-pointer transition-colors"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & Stock */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-xl font-extrabold text-white">₹{product.price.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    <span className="text-[10px] text-emerald-400 font-medium ml-auto">
                      {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                    </span>
                  </div>

                  {product.bulkDiscountTier && (
                    <div className="text-[10px] text-indigo-300 bg-indigo-950/40 p-2 rounded-xl border border-indigo-900/40 mb-3">
                      💡 {product.bulkDiscountTier}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onAddToCart(product, 1)}
                      className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/20"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={() => setBulkModalProduct(product)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Bulk Quote</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl space-y-5">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-64 object-cover rounded-2xl border border-slate-800"
              />

              <div className="space-y-4">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
                  {selectedProduct.category}
                </span>

                <h3 className="text-lg font-bold text-white leading-snug">
                  {selectedProduct.name}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">₹{selectedProduct.price.toLocaleString()}</span>
                  <span className="text-sm text-slate-500 line-through">₹{selectedProduct.originalPrice.toLocaleString()}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-slate-100">Vendor Verification</div>
                  <div className="text-[11px] text-slate-400">Sold by {selectedProduct.vendorName} (Authorized Institutional Supplier)</div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      onAddToCart(selectedProduct, 1);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                  >
                    Add to Cart Now
                  </button>
                  <button
                    onClick={() => {
                      setBulkModalProduct(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700"
                  >
                    Bulk Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Institutional Bulk Quote Modal (BR-24) */}
      {bulkModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setBulkModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Institutional Bulk Quotation</h3>
                <p className="text-xs text-slate-400">Submit request for high-volume delivery & custom batch billing</p>
              </div>
            </div>

            {isBulkSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-sm">Quotation Request Dispatched!</div>
                <p className="text-xs text-emerald-300">
                  {bulkModalProduct.vendorName} will send an official pro-forma invoice to your institutional inbox within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBulkSubmit} className="space-y-4">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-xs">
                  <span className="text-slate-400">Target Item:</span>{" "}
                  <span className="text-slate-100 font-semibold">{bulkModalProduct.name}</span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Units Required (Min 25 units)
                  </label>
                  <input
                    type="number"
                    min="25"
                    max="10000"
                    value={bulkQuantity}
                    onChange={(e) => setBulkQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                  <span className="text-[11px] text-indigo-300 mt-1 block">
                    Estimated bulk unit rate: ₹{Math.round(bulkModalProduct.price * 0.82)} / unit (18% institutional rebate)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Institution Details & Delivery Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={bulkNotes}
                    onChange={(e) => setBulkNotes(e.target.value)}
                    placeholder="Enter Institution Name, GSTIN number, and required delivery timeline..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Generate Official RFQ Tender
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
              {/* Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <ShoppingCart className="w-5 h-5 text-indigo-400" />
                  <span>Your Academic Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                </div>
                <button
                  onClick={onCloseCart}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto" />
                    <div className="text-sm font-semibold text-slate-300">Your cart is empty</div>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto">
                      Explore the marketplace to purchase curriculum textbooks, lab kits, or uniform sets.
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center gap-3"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          ₹{item.product.price} each
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateCartQuantity(item.product.id, -1)}
                            className="w-6 h-6 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-xs"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateCartQuantity(item.product.id, 1)}
                            className="w-6 h-6 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center text-xs"
                          >
                            <Plus className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => onRemoveFromCart(item.product.id)}
                            className="ml-auto text-[11px] text-rose-400 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-slate-800 bg-slate-950/70 space-y-3">
                  <div className="space-y-1.5 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-white font-medium">₹{cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18% Educational Goods)</span>
                      <span className="text-white font-medium">₹{gstAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Standard Courier Delivery</span>
                      <span className="text-emerald-400 font-medium">
                        {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                      </span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-black text-white">
                      <span>Grand Total</span>
                      <span className="text-indigo-400">₹{orderTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Secure Gateway</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout & Payment Gateway Modal (BR-18, BR-19) */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Unified Payment Gateway</h3>
                <p className="text-xs text-slate-400">PCI-DSS Compliant 256-bit Encrypted Checkout</p>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Delivery Destination
                </label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "upi", label: "UPI / QR", icon: "⚡" },
                    { id: "card", label: "Cards / Visa", icon: "💳" },
                    { id: "netbanking", label: "NetBanking", icon: "🏛️" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-xl border text-center text-xs transition-all ${
                        paymentMethod === m.id
                          ? "bg-indigo-600/30 border-indigo-500 text-white font-bold"
                          : "bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-lg mb-1">{m.icon}</div>
                      <div>{m.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Total display */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-400">Amount Payable:</span>
                <span className="text-lg font-black text-indigo-400">₹{orderTotal.toLocaleString()}</span>
              </div>

              <button
                onClick={handleExecuteCheckout}
                disabled={isProcessingOrder}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                {isProcessingOrder ? (
                  <span className="animate-pulse">Authorizing Transaction...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{orderTotal.toLocaleString()} & Generate Confirmation</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
