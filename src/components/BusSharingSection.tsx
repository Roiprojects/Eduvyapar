"use client";

import React, { useState } from "react";
import { BusSharingRequest, UserRole } from "../types";
import { 
  Bus, 
  MapPin, 
  Calendar, 
  Users, 
  Plus, 
  X, 
  Check, 
  AlertCircle, 
  FileText, 
  ShieldCheck, 
  Clock, 
  Building2,
  DollarSign
} from "lucide-react";

interface BusSharingSectionProps {
  busRequests: BusSharingRequest[];
  currentRole: UserRole;
  onRaiseRequest: (request: Omit<BusSharingRequest, "id" | "status" | "bidsReceived">) => void;
  onAcceptBid: (requestId: string, bidId: string) => void;
  onSubmitBid: (requestId: string, bid: { providingInstitute: string; busesOffered: number; quoteAmount: number; driverDetailsIncluded: boolean; fuelPolicy: string }) => void;
}

export const BusSharingSection: React.FC<BusSharingSectionProps> = ({
  busRequests,
  currentRole,
  onRaiseRequest,
  onAcceptBid,
  onSubmitBid,
}) => {
  const [isRaiseModalOpen, setIsRaiseModalOpen] = useState<boolean>(false);
  const [biddingRequest, setBiddingRequest] = useState<BusSharingRequest | null>(null);

  // Raise Request Form state
  const [requestingInstitute, setRequestingInstitute] = useState<string>("National Hill View Public School");
  const [contactPerson, setContactPerson] = useState<string>("Capt. Vijay Rathore (Transport In-Charge)");
  const [contactPhone, setContactPhone] = useState<string>("+91 94480 33211");
  const [requiredDate, setRequiredDate] = useState<string>("2026-04-24");
  const [passengersCount, setPassengersCount] = useState<number>(140);
  const [busesNeeded, setBusesNeeded] = useState<number>(3);
  const [seatingCapacityType, setSeatingCapacityType] = useState<BusSharingRequest["seatingCapacityType"]>("45 Seater");
  const [pickupLocation, setPickupLocation] = useState<string>("Rajajinagar Campus Gate 3, Bengaluru");
  const [destinationLocation, setDestinationLocation] = useState<string>("Kanteerava Indoor Stadium, Bengaluru");
  const [eventPurpose, setEventPurpose] = useState<string>("Inter-School State Athletics Championship transport for students & coaches");
  const [isRaiseSuccess, setIsRaiseSuccess] = useState<boolean>(false);

  // Submit Bid Form state (for nearby institute)
  const [providingInstitute, setProvidingInstitute] = useState<string>("Vidyaniketan Public School");
  const [busesOffered, setBusesOffered] = useState<number>(2);
  const [quoteAmount, setQuoteAmount] = useState<number>(8000);
  const [fuelPolicy, setFuelPolicy] = useState<string>("Inclusive of 80km running + verified commercial RTO driver");
  const [isBidSuccess, setIsBidSuccess] = useState<boolean>(false);

  const handleRaiseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRaiseRequest({
      requestingInstitute,
      contactPerson,
      contactPhone,
      requiredDate,
      passengersCount,
      busesNeeded,
      seatingCapacityType,
      pickupLocation,
      destinationLocation,
      eventPurpose,
    });

    setIsRaiseSuccess(true);
    setTimeout(() => {
      setIsRaiseSuccess(false);
      setIsRaiseModalOpen(false);
    }, 1500);
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingRequest) return;

    onSubmitBid(biddingRequest.id, {
      providingInstitute,
      busesOffered,
      quoteAmount,
      driverDetailsIncluded: true,
      fuelPolicy,
    });

    setIsBidSuccess(true);
    setTimeout(() => {
      setIsBidSuccess(false);
      setBiddingRequest(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Top Banner */}
      <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30">
              Institutional Asset Optimization (BR-83 to BR-87)
            </span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bus className="w-5 h-5 text-indigo-400" />
            <span>Inter-Institutional School Bus Sharing Pool</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enables nearby educational institutions to pool idle bus fleets for sports meets, science field trips, and academic olympiads, drastically minimizing rental overheads.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsRaiseModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Raise New Bus Pool Request</span>
        </button>
      </div>

      {/* Fleet Requests Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Active Regional Transportation Requisitions</span>
          <span>Geographic Proximity Matching Radius: 15 km</span>
        </div>

        <div className="space-y-6">
          {busRequests.map((req) => (
            <div
              key={req.id}
              className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-xl space-y-5"
            >
              {/* Header & Status */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      req.status === "Open for Bids"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse"
                        : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    }`}>
                      {req.status}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Req ID: <strong className="text-slate-200">{req.id}</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {req.requestingInstitute}
                  </h3>

                  <div className="text-xs text-slate-300">
                    Event: <span className="text-slate-100 font-medium">{req.eventPurpose}</span>
                  </div>
                </div>

                <div className="text-right sm:self-start">
                  <div className="text-sm font-black text-indigo-400">
                    {req.busesNeeded} &times; {req.seatingCapacityType}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {req.passengersCount} Students & Faculty
                  </div>
                </div>
              </div>

              {/* Route & Timing Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-800/60 rounded-2xl border border-slate-700/60 text-xs">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Required Date</div>
                    <div className="text-slate-200 font-medium">{req.requiredDate}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Pickup Point</div>
                    <div className="text-slate-200 font-medium truncate">{req.pickupLocation}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-rose-400" />
                  <div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Drop Destination</div>
                    <div className="text-slate-200 font-medium truncate">{req.destinationLocation}</div>
                  </div>
                </div>
              </div>

              {/* Bids Received Section (BR-85, BR-86, BR-87) */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white">
                    Nearby Institute Tenders Received ({req.bidsReceived.length})
                  </span>
                  {req.status === "Open for Bids" && (
                    <button
                      onClick={() => setBiddingRequest(req)}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Submit Fleet Quote as Nearby Institute</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {req.bidsReceived.map((bid) => (
                    <div
                      key={bid.id}
                      className={`p-3.5 rounded-2xl border text-xs space-y-2 transition-all ${
                        bid.status === "Accepted"
                          ? "bg-emerald-950/30 border-emerald-500/40"
                          : "bg-slate-800/50 border-slate-700/50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-bold text-white">{bid.providingInstitute}</div>
                          <div className="text-[11px] text-slate-400">
                            Offering {bid.busesOffered} Buses &bull; {bid.fuelPolicy}
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-black text-emerald-400 text-sm">
                            ₹{bid.quoteAmount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400">
                          {bid.driverDetailsIncluded ? "✓ Verified RTO Driver Included" : "Self-driven"}
                        </span>

                        {bid.status === "Accepted" ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold text-[10px] border border-emerald-500/30">
                            ✓ Fleet Allocated
                          </span>
                        ) : req.status === "Open for Bids" ? (
                          <button
                            onClick={() => onAcceptBid(req.id, bid.id)}
                            className="px-3 py-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-[11px] shadow"
                          >
                            Accept & Allocate Fleet
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-500">Not selected</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raise Bus Request Modal */}
      {isRaiseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setIsRaiseModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Raise Fleet Sharing Request</h3>
                <p className="text-xs text-slate-400">Broadcast transport needs to registered institutions within 15 km</p>
              </div>
            </div>

            {isRaiseSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-sm">Transport Broadcast Active!</div>
                <p className="text-xs text-emerald-300">
                  Notification dispatched to 14 verified nearby institutions. You will receive quotes directly in this portal.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRaiseSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Requesting Educational Institute
                  </label>
                  <input
                    type="text"
                    value={requestingInstitute}
                    onChange={(e) => setRequestingInstitute(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Required Date
                    </label>
                    <input
                      type="date"
                      value={requiredDate}
                      onChange={(e) => setRequiredDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Seating Capacity Tier
                    </label>
                    <select
                      value={seatingCapacityType}
                      onChange={(e) => setSeatingCapacityType(e.target.value as any)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="32 Seater">32 Seater Standard</option>
                      <option value="45 Seater">45 Seater Medium</option>
                      <option value="60 Seater High Capacity">60 Seater High Capacity</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Buses Needed
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={busesNeeded}
                      onChange={(e) => setBusesNeeded(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Total Passengers
                    </label>
                    <input
                      type="number"
                      min="10"
                      max="1500"
                      value={passengersCount}
                      onChange={(e) => setPassengersCount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Destination Location
                  </label>
                  <input
                    type="text"
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Event Purpose / Academic Reason
                  </label>
                  <input
                    type="text"
                    value={eventPurpose}
                    onChange={(e) => setEventPurpose(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Broadcast Requisition to Nearby Institutes
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Submit Bid Modal */}
      {biddingRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setBiddingRequest(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Submit Fleet Bid</h3>
                <p className="text-xs text-slate-400">Tendering buses to {biddingRequest.requestingInstitute}</p>
              </div>
            </div>

            {isBidSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-sm">Quote Submitted!</div>
                <p className="text-xs text-emerald-300">
                  Your tender offer has been submitted for review.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBidSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Institute Name
                  </label>
                  <input
                    type="text"
                    value={providingInstitute}
                    onChange={(e) => setProvidingInstitute(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Buses You Can Offer
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={biddingRequest.busesNeeded}
                      value={busesOffered}
                      onChange={(e) => setBusesOffered(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Total Quotation (₹)
                    </label>
                    <input
                      type="number"
                      value={quoteAmount}
                      onChange={(e) => setQuoteAmount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Fuel & Driver Policy
                  </label>
                  <input
                    type="text"
                    value={fuelPolicy}
                    onChange={(e) => setFuelPolicy(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30"
                >
                  Submit Official Inter-Institutional Tender
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
