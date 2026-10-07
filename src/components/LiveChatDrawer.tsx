"use client";

import React, { useState } from "react";
import { X, Send, MessageSquare, Check, User, Building, Circle } from "lucide-react";

interface LiveChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: "user" | "other";
  text: string;
  time: string;
}

export const LiveChatDrawer: React.FC<LiveChatDrawerProps> = ({ isOpen, onClose }) => {
  const [selectedContact, setSelectedContact] = useState<string>("Prof. Rajeshwar Sen");
  const [inputMessage, setInputMessage] = useState<string>("");

  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>({
    "Prof. Rajeshwar Sen": [
      { id: "1", sender: "other", text: "Namaste! Welcome to the Organic Chemistry Shisya channel. Do you have any doubts regarding the Aldol condensation mechanisms?", time: "10:05 AM" },
      { id: "2", sender: "user", text: "Sir, I had a query about cross-aldol when benzaldehyde is used. Will there be only one product?", time: "10:07 AM" },
      { id: "3", sender: "other", text: "Excellent question! Because benzaldehyde has no alpha-hydrogens, it cannot form an enolate ion itself. Hence it acts purely as the electrophilic carbonyl target, giving predominantly one crossed aldol product.", time: "10:08 AM" },
    ],
    "DPS Admission Desk": [
      { id: "4", sender: "other", text: "Greetings from Delhi Public International Admissions. How may we assist you with Grade 11 science applications?", time: "09:30 AM" },
      { id: "5", sender: "user", text: "Hi, I wanted to confirm if pre-admission applications receive priority processing when admissions officially open on 15-April?", time: "09:32 AM" },
      { id: "6", sender: "other", text: "Yes! Pre-admission applications logged on the EduPlatform system are automatically batched and submitted on opening day with zero manual delays.", time: "09:35 AM" },
    ],
    "OmniTech Support": [
      { id: "7", sender: "other", text: "Hello! This is OmniTech hardware support. Tracking for your SmartEdu Tablet order #GEP-8921 is now live via Bluedart.", time: "Yesterday" },
    ],
  });

  if (!isOpen) return null;

  const currentMessages = messages[selectedContact] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: inputMessage.trim(),
      time: "Just now",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMsg],
    }));

    setInputMessage("");

    // Simulated reply after 1 second
    setTimeout(() => {
      const autoReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: "other",
        text: `Thank you for your message regarding "${inputMessage.trim().slice(0, 30)}...". I have noted this down and will review your query promptly!`,
        time: "Just now",
      };

      setMessages((prev) => ({
        ...prev,
        [selectedContact]: [...(prev[selectedContact] || []), autoReply],
      }));
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>Real-Time Academic Chat (BR-77, BR-78)</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Contact Selectors */}
          <div className="p-2 border-b border-slate-800 bg-slate-900 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {["Prof. Rajeshwar Sen", "DPS Admission Desk", "OmniTech Support"].map((c) => (
              <button
                key={c}
                onClick={() => setSelectedContact(c)}
                className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap font-medium transition-all ${
                  selectedContact === c
                    ? "bg-indigo-600 text-white font-semibold shadow"
                    : "bg-slate-800/80 text-slate-400 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-center my-2">
              <span className="text-[10px] text-slate-500 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700/60">
                End-to-End Encrypted Academic Channel
              </span>
            </div>

            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-br-none shadow-md"
                      : "bg-slate-800 text-slate-200 border border-slate-700/80 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-slate-500 mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${selectedContact}...`}
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
