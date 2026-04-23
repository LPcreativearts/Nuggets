import React from 'react';
import { X, Loader, Mic, ArrowRight } from 'lucide-react';
import spaceNuggetImg from 'figma:asset/9bc58e8692cbac3863bf7255a7cd29b0e4334a64.png';
import skyNuggetImg from 'figma:asset/1c4420e39637b1843482bc777ba0d8c1d5156bbe.png';

interface GuideChatModalProps {
  selectedGuide: 'space' | 'sky';
  guideChatMessages: Array<{ role: string; content: string }>;
  guideChatInput: string;
  setGuideChatInput: (value: string) => void;
  guideChatLoading: boolean;
  isListening: boolean;
  sendGuideMessage: (message: string) => void;
  handleVoiceInput: (callback: (transcript: string) => void) => void;
  user: any;
  onClose: () => void;
}

export function GuideChatModal({
  selectedGuide,
  guideChatMessages,
  guideChatInput,
  setGuideChatInput,
  guideChatLoading,
  isListening,
  sendGuideMessage,
  handleVoiceInput,
  user,
  onClose,
}: GuideChatModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col animate-pop border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className={`${selectedGuide === 'space' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'} p-6 rounded-t-3xl flex items-center justify-between`}>
          <div className="flex items-center gap-4">
            <img 
              src={selectedGuide === 'space' ? spaceNuggetImg : skyNuggetImg}
              alt={selectedGuide === 'space' ? 'Space Nugget' : 'Sky Nugget'}
              className="w-16 h-16 object-contain drop-shadow-xl"
            />
            <div>
              <h2 className="text-2xl font-black text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                {selectedGuide === 'space' ? 'Space Nugget' : 'Sky Nugget'}
              </h2>
              <p className="text-sm text-white/80 font-semibold">Your Guide</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50 dark:bg-slate-900/50"
          ref={(el) => {
            if (el) el.scrollTop = el.scrollHeight;
          }}
        >
          {guideChatMessages.map((msg, idx) => (
            <div 
              key={idx}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <img 
                  src={selectedGuide === 'space' ? spaceNuggetImg : skyNuggetImg}
                  alt="Guide"
                  className="w-10 h-10 object-contain flex-shrink-0"
                />
              )}
              <div 
                className={`max-w-[75%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : selectedGuide === 'space'
                    ? 'bg-purple-100 dark:bg-purple-900/30 text-slate-800 dark:text-white'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-slate-800 dark:text-white'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {user?.user_metadata?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}
            </div>
          ))}
          
          {guideChatLoading && (
            <div className="flex gap-3 justify-start">
              <img 
                src={selectedGuide === 'space' ? spaceNuggetImg : skyNuggetImg}
                alt="Guide"
                className="w-10 h-10 object-contain flex-shrink-0"
              />
              <div className={`p-4 rounded-2xl ${selectedGuide === 'space' ? 'bg-purple-100 dark:bg-purple-900/30' : 'bg-blue-100 dark:bg-blue-900/30'}`}>
                <Loader className="w-5 h-5 animate-spin text-slate-600 dark:text-slate-300" />
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={guideChatInput}
              onChange={(e) => setGuideChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !guideChatLoading && guideChatInput.trim() && sendGuideMessage(guideChatInput)}
              placeholder="Ask me anything about the app..."
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={guideChatLoading || isListening}
            />
            <button
              onClick={() => handleVoiceInput((transcript) => {
                setGuideChatInput(transcript);
                sendGuideMessage(transcript);
              })}
              disabled={guideChatLoading || isListening}
              className={`px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-center ${
                isListening 
                  ? 'bg-red-500 animate-pulse' 
                  : selectedGuide === 'space'
                  ? 'bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-600 dark:text-purple-400'
                  : 'bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400'
              } ${isListening ? 'text-white' : ''} disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Use voice input"
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={() => guideChatInput.trim() && sendGuideMessage(guideChatInput)}
              disabled={guideChatLoading || !guideChatInput.trim() || isListening}
              className={`px-6 py-3 rounded-2xl font-bold transition-all flex items-center justify-center ${
                selectedGuide === 'space'
                  ? 'bg-purple-500 hover:bg-purple-600'
                  : 'bg-blue-500 hover:bg-blue-600'
              } text-white disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {guideChatLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowRight className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
            {isListening ? (
              <span className="text-red-500 font-bold animate-pulse">🎤 Listening... Speak now!</span>
            ) : (
              <>Try asking: "How do I collect nuggets?" or "What can I do with Crumbs?"</>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
