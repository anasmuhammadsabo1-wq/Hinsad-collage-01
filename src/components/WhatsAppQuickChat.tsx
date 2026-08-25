import React, { useState } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Phone, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { COLLEGE_INFO } from '../data/mockData';

export const WhatsAppQuickChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const PRESETS = [
    "Hello Admissions Office, I would like to inquire about 2025/2026 admission screening and cut-off marks.",
    "Hello, I want to confirm if my O'Level results qualify for CHEW / Pharmacy Technician.",
    "Hello, I need help checking my admission status / downloading my admission letter.",
    "Hello, I would like to schedule a campus visit to Inkil Unguwan Magaji Gombe Road Campus."
  ];

  const handleSendWhatsApp = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/2347038057065?text=${encoded}`, '_blank');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Pulsing Help Tooltip if closed */}
        {!isOpen && (
          <div 
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-slate-900/90 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full border border-emerald-500/40 shadow-xl backdrop-blur-md cursor-pointer hover:bg-slate-800 transition-all hover:scale-105"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Need Help? Chat on WhatsApp</span>
          </div>
        )}

        <button
          id="floating-whatsapp-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-green-500 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 text-white flex items-center justify-center shadow-2xl shadow-emerald-950/60 hover:scale-110 active:scale-95 transition-all cursor-pointer border-2 border-white/40 group relative"
          aria-label="WhatsApp Admission Chat"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <>
              <MessageCircle className="w-7 h-7 group-hover:rotate-12 transition-transform drop-shadow" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-lime-400 border-2 border-slate-900 animate-pulse" />
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Chat Popup Box */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden text-white animate-in fade-in slide-in-from-bottom-4">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 p-4 sm:p-5 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-bold text-base shadow">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm font-display leading-tight">HINSAD Admissions Desk</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                  <span>Online &amp; Answering Inquiries</span>
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full bg-black/20 hover:bg-black/30 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Greeting card */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200 leading-relaxed">
              <span className="font-bold text-emerald-400 block mb-1">
                👋 Welcome to HINSAD College Helpdesk!
              </span>
              How can our admissions counselors assist you today? Click any quick question below or type your custom message to chat directly on WhatsApp.
            </div>

            {/* Quick Questions */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Suggested Quick Inquiries:
              </span>
              {PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendWhatsApp(preset)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-800 hover:bg-emerald-950/60 border border-slate-700 hover:border-emerald-500/50 text-xs text-slate-200 hover:text-emerald-300 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <span className="line-clamp-1">{preset}</span>
                  <Send className="w-3.5 h-3.5 text-emerald-400 opacity-60 group-hover:opacity-100 shrink-0 ml-2" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                Or Type Custom Question:
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type your message here..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && customMsg.trim()) {
                      handleSendWhatsApp(customMsg.trim());
                      setCustomMsg('');
                    }
                  }}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <button
                  onClick={() => {
                    if (customMsg.trim()) {
                      handleSendWhatsApp(customMsg.trim());
                      setCustomMsg('');
                    }
                  }}
                  className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer transition-colors shadow"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Phone numbers fallback */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-semibold text-slate-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Helpline:</span>
              </span>
              <div className="flex items-center gap-2">
                <a href={`tel:${COLLEGE_INFO.phone1}`} className="text-emerald-400 hover:underline font-mono text-[11px]">
                  {COLLEGE_INFO.phone1}
                </a>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
