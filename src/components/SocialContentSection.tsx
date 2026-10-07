"use client";

import React, { useState } from "react";
import { VideoContent, SocialPost, UserRole } from "../types";
import { 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  Upload, 
  UserCheck, 
  UserPlus, 
  BookOpen, 
  Tag, 
  X, 
  Check, 
  Sparkles, 
  Video,
  Send,
  Eye,
  Clock
} from "lucide-react";

interface SocialContentSectionProps {
  videos: VideoContent[];
  posts: SocialPost[];
  currentRole: UserRole;
  onToggleShisya: (videoId: string) => void;
  onToggleLikePost: (postId: string) => void;
  onAddComment: (postId: string, commentText: string) => void;
  onUploadVideo: (video: Omit<VideoContent, "id" | "views" | "likes" | "publishedTime" | "shisyaCount">) => void;
}

export const SocialContentSection: React.FC<SocialContentSectionProps> = ({
  videos,
  posts,
  currentRole,
  onToggleShisya,
  onToggleLikePost,
  onAddComment,
  onUploadVideo,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoContent | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  // Video Upload modal form state (BR-66, BR-67, BR-68)
  const [newTitle, setNewTitle] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("Physics / Advanced Mechanics");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newTags, setNewTags] = useState<string>("Physics, JEE Advanced, IIT, Mechanics");
  const [newDuration, setNewDuration] = useState<string>("32:15");
  const [isUploadSuccess, setIsUploadSuccess] = useState<boolean>(false);

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUploadVideo({
      title: newTitle,
      creatorName: "Prof. Rajeshwar Sen",
      creatorRole: "Senior Academic Faculty",
      creatorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      instituteAffiliation: "Apex STEM Academy",
      category: newCategory,
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
      duration: newDuration,
      description: newDescription,
      tags: newTags.split(",").map((t) => t.trim()),
    });

    setIsUploadSuccess(true);
    setTimeout(() => {
      setIsUploadSuccess(false);
      setIsUploadModalOpen(false);
      setNewTitle("");
      setNewDescription("");
    }, 1500);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Top Banner with Shisya Concept */}
      <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
              Shisya Tradition Digitalized
            </span>
          </div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Educational Video Repository & Knowledge Commons</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Curated masterclasses by distinguished faculties. Become a &ldquo;Shisya&rdquo; (devoted student) to receive instant syllabus broadcasts.
          </p>
        </div>

        {/* Upload Button for Faculty / Institute */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center gap-2 flex-shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Publish Masterclass Video</span>
        </button>
      </div>

      {/* Video Masterclasses Carousel/Grid (BR-66 to BR-73) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-white text-sm">Featured Faculty Masterclasses</span>
          <span>Verified Curriculum Standards</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl overflow-hidden hover:border-slate-700 transition-all shadow-lg flex flex-col group"
            >
              {/* Thumbnail with duration */}
              <div 
                onClick={() => setSelectedVideo(vid)}
                className="relative h-48 bg-slate-950 overflow-hidden cursor-pointer"
              >
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xl">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{vid.duration}</span>
                </div>

                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-indigo-600/90 text-[10px] font-bold text-white backdrop-blur-sm">
                  {vid.category}
                </div>
              </div>

              {/* Video Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 text-slate-300">
                      <Eye className="w-3.5 h-3.5 text-slate-500" />
                      {vid.views.toLocaleString()} views
                    </span>
                    <span>{vid.publishedTime}</span>
                  </div>

                  <h3 
                    onClick={() => setSelectedVideo(vid)}
                    className="text-sm font-bold text-white hover:text-indigo-400 cursor-pointer line-clamp-2 leading-snug"
                  >
                    {vid.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {vid.description}
                  </p>
                </div>

                {/* Creator & Shisya Follower Button (BR-72, BR-73) */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={vid.creatorAvatar}
                      alt={vid.creatorName}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{vid.creatorName}</div>
                      <div className="text-[10px] text-indigo-400 truncate">{vid.shisyaCount.toLocaleString()} Shisyas</div>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleShisya(vid.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                      vid.isFollowedByCurrentUser
                        ? "bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20"
                    }`}
                  >
                    {vid.isFollowedByCurrentUser ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Shisya Joined</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Become Shisya</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Newsfeed with Posts, Likes & Comments (BR-74 to BR-76) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-white text-sm">Academic Community Feed</span>
          <span>Faculty Articles & Announcements</span>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4"
            >
              {/* Author Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-11 h-11 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{post.authorName}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                        {post.authorRole}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {post.institute} &bull; {post.timestamp}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Body */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {post.content}
              </p>

              {/* Optional Post Image */}
              {post.image && (
                <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-96">
                  <img
                    src={post.image}
                    alt="Post visual"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Action Buttons: Like, Comment, Share */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onToggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      post.hasLiked ? "text-rose-500 font-bold" : "hover:text-white"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.hasLiked ? "fill-rose-500" : ""}`} />
                    <span>{post.likes} Likes</span>
                  </button>

                  <button
                    onClick={() =>
                      setExpandedComments((prev) => ({ ...prev, [post.id]: !prev[post.id] }))
                    }
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{post.shares} Shares</span>
                </div>
              </div>

              {/* Comment Thread (Expandable) */}
              {expandedComments[post.id] && (
                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  <div className="space-y-2.5">
                    {post.comments.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-2xl bg-slate-800/50 border border-slate-700/50 flex items-start gap-2.5 text-xs"
                      >
                        <img
                          src={c.avatar}
                          alt={c.author}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white text-[11px]">{c.author}</span>
                            <span className="text-[10px] text-slate-500">{c.time}</span>
                          </div>
                          <p className="text-slate-300 mt-0.5 leading-snug">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment input */}
                  <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ""}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      placeholder="Add an academic question or feedback..."
                      className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Video Player Canvas */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
              <img
                src={selectedVideo.thumbnail}
                alt={selectedVideo.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-2xl mx-auto animate-pulse">
                  <Play className="w-7 h-7 fill-white ml-1" />
                </div>
                <div className="text-xs text-slate-300 font-semibold">Playing Masterclass Stream (1080p 60fps)</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600/30 text-indigo-400 border border-indigo-500/30">
                  {selectedVideo.category}
                </span>
                <span className="text-xs text-slate-400">&bull; {selectedVideo.views.toLocaleString()} views</span>
              </div>

              <h3 className="text-lg font-bold text-white">{selectedVideo.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedVideo.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedVideo.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg text-[10px] bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5 text-indigo-400" />
                  <span>#{tag}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Faculty Creator Video Upload Modal (BR-66, BR-67) */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 relative shadow-2xl space-y-4">
            <button
              onClick={() => setIsUploadModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Creator Studio &bull; Publish Lesson</h3>
                <p className="text-xs text-slate-400">Distribute high-definition syllabus lectures to Shisya disciples</p>
              </div>
            </div>

            {isUploadSuccess ? (
              <div className="p-6 text-center space-y-2 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <div className="font-bold text-white text-sm">Video Published Successfully!</div>
                <p className="text-xs text-emerald-300">
                  Instant push notification dispatched to 14,200 registered Shisyas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleUploadSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Lesson Title
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Masterclass: Thermodynamics & Statistical Physics"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Academic Subject
                    </label>
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Syllabus Overview & Description
                  </label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Key concepts covered, board examination references, revision formulas..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Comma-separated Tags
                  </label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30"
                >
                  Upload & Broadcast to Shisyas
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
