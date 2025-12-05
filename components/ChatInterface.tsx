import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, User, Radio } from 'lucide-react';
import { sendMessageToCasTo } from '../services/geminiService';
import { ChatMessage } from '../types';
import { INITIAL_CHAT_MESSAGE } from '../constants';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: INITIAL_CHAT_MESSAGE, timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Format history for API
    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    try {
      const responseText = await sendMessageToCasTo(userMsg.text, history);
      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border-l border-fuchsia-500/30 flex flex-col h-full shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/95">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-fuchsia-600 to-cyan-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                  <Radio className="w-5 h-5 text-fuchsia-400" />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-lg font-orbitron text-white">Ask CasTo</h3>
              <p className="text-xs text-fuchsia-300/80 uppercase tracking-widest">Live Uplink</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[85%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-fuchsia-600/20 border border-fuchsia-500/30 text-white rounded-br-sm' 
                    : 'bg-slate-800 border border-cyan-500/20 text-slate-200 rounded-bl-sm'
                }`}
              >
                {msg.role === 'model' && (
                  <div className="text-xs font-bold text-cyan-400 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> CasTo AI
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-slate-800 border border-cyan-500/20 p-4 rounded-2xl rounded-bl-sm flex items-center gap-2">
                 <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></span>
                 <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-200"></span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-slate-900">
          <form onSubmit={handleSend} className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Transmit your query..."
              className="w-full bg-slate-800 text-white placeholder-slate-500 rounded-xl py-4 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 border border-white/5"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-fuchsia-600 rounded-lg text-white hover:bg-fuchsia-500 disabled:opacity-50 disabled:hover:bg-fuchsia-600 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;