import React from 'react';
import { ArrowLeft, Star, Search, Mic } from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { SubtopicCard } from './SubtopicCard';
import { SurpriseNuggetButton } from './SurpriseNuggetButton';
import { CURRICULUM_TOPICS } from '../data/curriculum-topics';

interface SubjectMenuViewProps {
  selectedSubject: any;
  topicSearchQuery: string;
  setTopicSearchQuery: (value: string) => void;
  apiKey: string;
  generateNuggetByTag: (tag: string, subjectId?: string) => void;
  handleVoiceInput: (callback: (transcript: string) => void) => void;
  isListening: boolean;
  setSelectedCurriculumTopic: (topic: any) => void;
  navigateTo: (view: string) => void;
  avatarNuggetType: string | null;
  selectedAccessories: any;
  accessoryOptions: any;
  baseNuggetImg: string;
  spicyNuggetImg: string;
  goBack: () => void;
  goHome: () => void;
  showNotification: (message: string) => void;
  pickRandomFromSubject: (subjectId: string) => void;
}

const gradients = {
  science: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600',
  history: 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500',
  math: 'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600',
  art: 'bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500',
  music: 'bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600',
  career: 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700',
  words: 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500'
};

export function SubjectMenuView({
  selectedSubject,
  topicSearchQuery,
  setTopicSearchQuery,
  apiKey,
  generateNuggetByTag,
  handleVoiceInput,
  isListening,
  setSelectedCurriculumTopic,
  navigateTo,
  avatarNuggetType,
  selectedAccessories,
  accessoryOptions,
  baseNuggetImg,
  spicyNuggetImg,
  goBack,
  goHome,
  showNotification,
  pickRandomFromSubject,
}: SubjectMenuViewProps) {
  if (!selectedSubject) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 pattern-bg pb-20">
      {/* Header */}
      <div className={`relative h-32 md:h-40 ${gradients[selectedSubject.id] || gradients.science} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <button onClick={goBack} className="bg-white/90 p-2 rounded-full shadow-md text-slate-700 hover:scale-110 transition-transform">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {avatarNuggetType && (
            <button 
              onClick={() => navigateTo('avatar')}
              className="hover:scale-110 transition-transform"
              title="Customize your avatar"
            >
              <UserAvatar
                avatarNuggetType={avatarNuggetType}
                selectedAccessories={selectedAccessories}
                accessoryOptions={accessoryOptions}
                baseNuggetImg={baseNuggetImg}
                spicyNuggetImg={spicyNuggetImg}
                size="xs"
              />
            </button>
          )}
          <button onClick={() => navigateTo('my-collections')} className="bg-white/90 px-3 py-2 rounded-full shadow-md text-slate-700 hover:scale-110 transition-transform flex items-center gap-2 font-bold text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
          </button>
          <button onClick={goHome} className="bg-white/90 px-3 py-2 rounded-full shadow-md text-slate-700 hover:scale-110 transition-transform font-bold text-sm">
            Home
          </button>
        </div>
        <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full">
          <div className="flex items-end gap-4">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 hidden md:block">
              <selectedSubject.icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg" style={{ fontFamily: 'var(--font-bubblegum)' }}>{selectedSubject.name}</h1>
              <p className="text-white/90 font-medium text-sm md:text-base">Explore the world of {selectedSubject.name.toLowerCase()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 -mt-8 relative z-10">
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <input 
                type="text" 
                value={topicSearchQuery}
                onChange={(e) => setTopicSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && topicSearchQuery.trim() && apiKey && generateNuggetByTag(topicSearchQuery, selectedSubject.id)}
                placeholder={`Search ${selectedSubject.name}...`}
                className="w-full pl-5 pr-24 py-3 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white shadow-sm text-base focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all"
              />
              <button 
                onClick={() => handleVoiceInput((transcript) => setTopicSearchQuery(transcript))} 
                className={`absolute right-14 top-1/2 -translate-y-1/2 p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button 
                onClick={() => topicSearchQuery.trim() && apiKey && generateNuggetByTag(topicSearchQuery, selectedSubject.id)} 
                disabled={!apiKey}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white p-2 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Popular Topics */}
          <div className="max-w-4xl mx-auto">
            <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">Popular Topics</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {selectedSubject.subtopics.map(topic => (
                <SubtopicCard 
                  key={topic} 
                  subtopic={topic} 
                  onClick={() => {
                    if (CURRICULUM_TOPICS[topic]) {
                      setSelectedCurriculumTopic(CURRICULUM_TOPICS[topic]);
                      navigateTo('curriculum');
                    } else if (apiKey) {
                      generateNuggetByTag(topic, selectedSubject.id);
                    } else {
                      showNotification("Add API key to explore topics!");
                    }
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Surprise Me Button */}
          <div className="max-w-md mx-auto">
            <SurpriseNuggetButton 
              onClick={() => {
                if (apiKey) {
                  const randomTopic = selectedSubject.subtopics[Math.floor(Math.random() * selectedSubject.subtopics.length)];
                  generateNuggetByTag(randomTopic, selectedSubject.id);
                } else {
                  pickRandomFromSubject(selectedSubject.id);
                }
              }} 
              subjectName={selectedSubject.name} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
