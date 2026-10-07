"use client";

import React, { useState } from "react";
import { 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  Video, 
  Image as ImageIcon, 
  Send, 
  UserCheck, 
  UserPlus, 
  Sparkles 
} from "lucide-react";
import { VideoContent, SocialPost } from "../types";

interface EduvaLearnProps {
  videos: VideoContent[];
  posts: SocialPost[];
  onToggleShisya: (id: string) => void;
  onLikePost: (id: string) => void;
  onAddComment: (id: string, text: string) => void;
}

export const EduvaLearn: React.FC<EduvaLearnProps> = ({
  videos,
  posts,
  onToggleShisya,
  onLikePost,
  onAddComment,
}) => {
  const [activeFeedTab, setActiveFeedTab] = useState("For You");
  const [commentInput, setCommentInput] = useState("");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
      {/* Left Social Nav Sidebar (Matches Bottom Screen 4) */}
      <aside className="lg:col-span-3 space-y-2">
        <div className="eduva-card p-4 space-y-1">
          {["Home", "For You", "Following", "Videos", "Posts", "Messages", "Notifications"].map((item) => (
            <button
              key={item}
              onClick={() => setActiveFeedTab(item)}
              className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                activeFeedTab === item
                  ? "bg-blue-50 text-blue-600 font-bold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Social & Shisya Feed */}
      <div className="lg:col-span-9 space-y-6">
        {/* Create Post Box */}
        <div className="eduva-card p-5 space-y-3">
          <input
            type="text"
            placeholder="Share something with your community..."
            className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
          />
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-600">
              <button className="flex items-center gap-1.5 hover:text-blue-600">
                <Video className="w-4 h-4 text-blue-600" />
                <span>Video</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-emerald-600">
                <ImageIcon className="w-4 h-4 text-emerald-600" />
                <span>Image</span>
              </button>
            </div>
            <button className="px-5 py-2 rounded-full bg-[#0066cc] hover:bg-[#0052ad] text-white text-xs font-bold">
              Post
            </button>
          </div>
        </div>

        {/* Featured Video Post: Dr. Ananya Rao (Matches Image Exactly) */}
        <div className="eduva-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
                alt="Dr. Ananya Rao"
                className="w-11 h-11 rounded-full object-cover border border-slate-200"
              />
              <div>
                <div className="font-bold text-slate-900 text-sm">Dr. Ananya Rao</div>
                <div className="text-[11px] text-slate-500">
                  Physics &bull; Bengaluru &bull; 1.5M Shisyas
                </div>
              </div>
            </div>

            <button
              onClick={() => onToggleShisya(videos[0]?.id || "vid-1")}
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 transition-colors"
            >
              + Follow
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
            Why does light bend? Let&apos;s explore the science behind it! 🔬
          </p>

          {/* Educational Video Card with Teacher & Chalkboard Physics Equations */}
          <div className="rounded-2xl overflow-hidden bg-slate-900 relative aspect-video shadow-md group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80"
              alt="Physics lecture"
              className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 fill-white ml-0.5" />
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-0.5 rounded text-[10px] text-white font-bold">
              12:45
            </div>
          </div>

          {/* Reactions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1.5 hover:text-rose-500">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>2.4k</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-blue-600">
                <MessageCircle className="w-4 h-4" />
                <span>184</span>
              </button>
            </div>
            <button className="flex items-center gap-1 hover:text-slate-900">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
