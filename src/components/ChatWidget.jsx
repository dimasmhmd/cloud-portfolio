import React, { useState, useEffect, useRef } from 'react';
import { X, MessageSquare, Send, User, Maximize2, Minimize2 } from 'lucide-react';

// PASTIKAN URL INI MENGARAH KE BACKEND FASTAPI ANDA YANG ONLINE (misal Hugging Face / VPS)
const API_BASE_URL = "https://dimasmhmd-intikom-backend.hf.space/api"; 

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const storedSession = localStorage.getItem('rag_session_id');
    if (storedSession) {
      setSessionId(storedSession);
    } else {
      const newSession = 'sess_' + Math.random().toString(36).substring(2, 15);
      localStorage.setItem('rag_session_id', newSession);
      setSessionId(newSession);
    }
    setMessages([
      { role: 'ai', text: 'Halo! Saya asisten virtual Intikom (Powered by Azure). Ada yang bisa saya bantu hari ini?' }
    ]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping, isExpanded]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: userMsg })
      });
      
      const data = await response.json();
      if (response.ok) {
        setMessages(prev => [...prev, { role: 'ai', text: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "Maaf, terjadi kesalahan pada server Azure." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Koneksi terputus. Pastikan server backend Anda menyala." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Fungsi khusus untuk merapikan format teks output dari AI (Tebal & List)
  const formatAIMessage = (text) => {
    if (!text) return null;
    
    // 1. Pre-processing: Deteksi list yang menyambung di satu baris dan paksa turun baris
    let processedText = text.replace(/(\S)\s+(?=\d+\.\s|- \s|\* \s)/g, "$1\n");
    
    // 2. Pisahkan teks menjadi array baris berdasarkan enter (\n)
    return processedText.split('\n').map((line, i) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        return <div key={i} className="h-2"></div>;
      }
      
      // Deteksi apakah baris ini adalah list item
      const listMatch = trimmedLine.match(/^(\d+\.|-|\*)\s/);
      const isList = !!listMatch;
      
      // Pisahkan teks untuk mencari format Bold (**teks**)
      const parts = trimmedLine.split(/(\*\*.*?\*\*)/g);
      
      return (
        <div key={i} className={`mb-2 leading-relaxed ${isList ? 'pl-6 relative' : ''}`}>
          {isList && (
            <span className="absolute left-1 top-0 font-bold text-[#14429A] tracking-tighter">
              {listMatch[0]}
            </span>
          )}
          
          <span className="text-gray-800 text-[14px]">
            {parts.map((part, j) => {
              let textPart = part;
              if (isList && j === 0) {
                textPart = textPart.replace(/^(\d+\.|-|\*)\s/, '');
              }
              if (textPart.startsWith('**') && textPart.endsWith('**')) {
                return <strong key={j} className="font-semibold text-gray-900">{textPart.slice(2, -2)}</strong>;
              }
              return <span key={j}>{textPart}</span>;
            })}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 left-6 z-50 font-sans flex flex-col items-end pointer-events-none">
      {isOpen && (
        <div className={`pointer-events-auto bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right rounded-2xl mb-6 ${isExpanded ? 'w-full h-[calc(100vh-8rem)] z-[100]' : 'w-[340px] sm:w-[400px] h-[550px] max-h-[calc(100vh-8rem)] z-50'}`}>
          
          <div className="bg-[#14429A] p-4 text-white flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden shadow-sm">
                <img src="/image_69e9c5.png" alt="Bot" className="w-full h-full object-contain" onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/24?text=Bot' }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm tracking-wide">Intikom Support</h3>
                <p className="text-[11px] text-blue-100 flex items-center gap-1.5 opacity-90">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"></span> Azure RAG Active
                </p>
              </div>
            </div>
            <div className="flex gap-1 items-center">
              <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-white/20 rounded-md transition duration-200" title={isExpanded ? "Perkecil" : "Perbesar"}>
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} className="p-1.5 hover:bg-white/20 rounded-md transition duration-200" title="Tutup Chat">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-5 bg-[#f8fafc]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden shadow-sm ${msg.role === 'user' ? 'bg-gray-200 text-gray-500' : 'bg-white border border-gray-100'}`}>
                    {msg.role === 'user' ? <User size={15} /> : <img src="/image_69e9c5.png" alt="Bot" className="w-full h-full object-contain p-1" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-[14.5px] shadow-sm ${msg.role === 'user' ? 'bg-[#14429A] text-white rounded-tr-sm whitespace-pre-wrap' : 'bg-white text-gray-700 rounded-tl-sm border border-gray-100'}`}>
                    {msg.role === 'ai' ? formatAIMessage(msg.text) : msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center mt-1 overflow-hidden"><img src="/image_69e9c5.png" alt="Bot" className="w-full h-full object-contain p-1" /></div>
                  <div className="p-4 px-5 rounded-2xl bg-white text-gray-800 rounded-tl-sm border border-gray-100 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span><span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Tanya seputar Intikom..."
                className="w-full pl-4 pr-12 py-3 bg-gray-100/80 border border-transparent rounded-full focus:outline-none focus:ring-1 focus:ring-[#14429A]/30 focus:bg-white text-gray-900 placeholder-gray-500 text-[14px] transition-all"
                disabled={isTyping}
              />
              <button
                type="submit" disabled={!input.trim() || isTyping}
                className="absolute right-1.5 w-9 h-9 bg-[#E01E26] text-white rounded-full flex items-center justify-center hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95 shadow-sm"
              >
                <Send size={16} className="ml-0.5" />
              </button>
            </form>
            <div className="text-center mt-2 text-[10px] text-gray-400">Ditenagai oleh Intikom AI Support</div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all duration-300 z-50 hover:scale-105 active:scale-95 ${isOpen ? 'bg-[#E01E26] rotate-90' : 'bg-[#14429A] rotate-0'}`}
      >
        {isOpen ? <X className="text-white" size={28} /> : <MessageSquare className="text-white" size={26} />}
      </button>
    </div>
  );
}