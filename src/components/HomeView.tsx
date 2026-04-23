import React from 'react';
import {
  Rocket, Star, BookOpen, Settings, Search, Mic, Loader,
  ShoppingBag, Drumstick, User
} from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { SUBJECTS } from '../data/subjects';

interface HomeViewProps {
  navigateTo: (view: string) => void;
  setSelectedSubject: (sub: any) => void;
  avatarNuggetType: string | null;
  selectedAccessories: any;
  accessoryOptions: any;
  baseNuggetImg: string;
  spicyNuggetImg: string;
  crumbs: number;
  isSaving: boolean;
  user: any;
  darkMode: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  generateNuggetByTag: (tag: string, subject?: string) => void;
  handleVoiceInput: (callback: (transcript: string) => void) => void;
  isListening: boolean;
  aiLoading: boolean;
  collection: any[];
  wordCollection: any[];
  activityCollection: any[];
  selectedGuide: string | null;
  setSelectedGuide: (guide: string | null) => void;
  handleGuideSelection: (guide: string) => void;
  openGuideChat: () => void;
  setGuideChatMessages: (msgs: any[]) => void;
  saveData: (data: any) => void;
  spaceNuggetImg: string;
  skyNuggetImg: string;
  mathNuggetImg: string;
  musicNuggetImg: string;
  artNuggetImg: string;
  wordsNuggetImg: string;
  scienceNuggetImg: string;
  historyNuggetImg: string;
}

export function HomeView({
  navigateTo,
  setSelectedSubject,
  avatarNuggetType,
  selectedAccessories,
  accessoryOptions,
  baseNuggetImg,
  spicyNuggetImg,
  crumbs,
  isSaving,
  user,
  darkMode,
  searchQuery,
  setSearchQuery,
  generateNuggetByTag,
  handleVoiceInput,
  isListening,
  aiLoading,
  collection,
  wordCollection,
  activityCollection,
  selectedGuide,
  setSelectedGuide,
  handleGuideSelection,
  openGuideChat,
  setGuideChatMessages,
  saveData,
  spaceNuggetImg,
  skyNuggetImg,
  mathNuggetImg,
  musicNuggetImg,
  artNuggetImg,
  wordsNuggetImg,
  scienceNuggetImg,
  historyNuggetImg,
}: HomeViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 pattern-bg overflow-x-hidden transition-colors duration-500">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-panel border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-2xl" style={{ fontFamily: 'var(--font-bubblegum)' }}>Nugget School</div>
        </div>
        <div className="flex items-center gap-2">
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
                size="sm"
              />
            </button>
          )}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
            <span className="font-bold text-slate-700 dark:text-white">{crumbs}</span>
            <Drumstick className="w-4 h-4 text-orange-400 fill-orange-400" />
          </div>
          <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-yellow-400 animate-pulse' : !user ? 'bg-slate-300' : 'bg-green-400'}`} title={isSaving ? "Saving..." : !user ? "Guest (Not Saved)" : "Synced to Cloud"} />
          <button onClick={() => navigateTo('settings')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Main Headline */}
        <div className="text-center py-8 md:py-12 animate-pop">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-800 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-bubblegum)' }}>
            Welcome to<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400">Nugget School!</span>
          </h1>
        </div>

        {/* Mobile: Grid Layout */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-8">
          {SUBJECTS.map((sub) => (
            <button 
              key={sub.id} 
              onClick={() => { setSelectedSubject(sub); navigateTo('subject-menu'); }}
              className={`relative p-4 rounded-2xl border-2 ${sub.border} ${sub.color.replace('text', 'bg').replace('100', '50').replace('/50', '/10')} flex flex-col items-center justify-center gap-3 ${(sub.id === 'music' || sub.id === 'art' || sub.id === 'words' || sub.id === 'science' || sub.id === 'history') ? 'h-36' : 'h-32'} active:scale-95 transition-transform shadow-sm overflow-visible`}
            >
              {sub.id === 'math' ? (
                <div className="w-28 h-28 flex items-center justify-center">
                  <img src={mathNuggetImg} alt="Math Nugget" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              ) : sub.id === 'music' ? (
                <div className="w-28 h-28 flex items-center justify-center absolute top-2">
                  <img src={musicNuggetImg} alt="Music Nugget" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              ) : sub.id === 'art' ? (
                <div className="w-28 h-28 flex items-center justify-center absolute top-2">
                  <img src={artNuggetImg} alt="Art Nugget" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              ) : sub.id === 'words' ? (
                <div className="w-28 h-28 flex items-center justify-center absolute top-2">
                  <img src={wordsNuggetImg} alt="Words Nugget" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              ) : sub.id === 'science' ? (
                <div className="w-28 h-28 flex items-center justify-center absolute top-2">
                  <img src={scienceNuggetImg} alt="Science Nugget" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              ) : sub.id === 'history' ? (
                <div className="w-28 h-28 flex items-center justify-center absolute top-2">
                  <img src={historyNuggetImg} alt="History Nugget" className="w-full h-full object-contain drop-shadow-lg" />
                </div>
              ) : (
                <div className={`w-12 h-12 rounded-full ${sub.color} flex items-center justify-center shadow-inner`}>
                  <sub.icon className="w-6 h-6" />
                </div>
              )}
              <span className="font-bold text-slate-800 dark:text-white text-sm">{sub.name}</span>
            </button>
          ))}
        </div>

        {/* Desktop: Orbit Layout */}
        <div className="hidden md:block relative h-[500px] w-full bg-transparent rounded-[3rem] border-0 overflow-visible mb-32 group">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 pointer-events-none">
            <div className="font-bold text-slate-500 dark:text-slate-400 text-2xl text-center leading-tight" style={{ fontFamily: 'var(--font-bubblegum)' }}>
              Select<br />a Class
            </div>
          </div>

          {SUBJECTS.filter(sub => sub.id !== 'career').map((sub, index) => {
            const total = SUBJECTS.filter(sub => sub.id !== 'career').length;
            const angle = (index * 360) / total - 90;
            const radiusX = 35;
            const radiusY = 42;
            const x = 50 + radiusX * Math.cos(angle * Math.PI / 180);
            const y = 50 + radiusY * Math.sin(angle * Math.PI / 180);

            const hasNuggetImg = ['math', 'music', 'art', 'words', 'science', 'history'].includes(sub.id);
            const nuggetImgMap: Record<string, { src: string; alt: string }> = {
              math: { src: mathNuggetImg, alt: 'Math Nugget' },
              music: { src: musicNuggetImg, alt: 'Music Nugget' },
              art: { src: artNuggetImg, alt: 'Art Nugget' },
              words: { src: wordsNuggetImg, alt: 'Words Nugget' },
              science: { src: scienceNuggetImg, alt: 'Science Nugget' },
              history: { src: historyNuggetImg, alt: 'History Nugget' },
            };

            return (
              <button
                key={sub.id}
                onClick={() => { setSelectedSubject(sub); navigateTo('subject-menu'); }}
                className={`absolute ${hasNuggetImg ? 'w-40 h-40 -ml-20 -mt-20 bg-transparent border-0 shadow-none' : 'w-20 h-20 -ml-10 -mt-10 rounded-full bg-white dark:bg-slate-800 border-4 shadow-xl'} flex items-center justify-center hover:scale-125 transition-all duration-300 z-10 group/planet`}
                style={{ left: `${x}%`, top: `${y}%`, borderColor: hasNuggetImg ? 'transparent' : 'currentColor' }}
              >
                {nuggetImgMap[sub.id] ? (
                  <img src={nuggetImgMap[sub.id].src} alt={nuggetImgMap[sub.id].alt} className="w-full h-full object-contain drop-shadow-lg scale-110" />
                ) : (
                  <div className="text-slate-400 group-hover/planet:text-blue-500 transition-colors">
                    <sub.icon className="w-8 h-8" />
                  </div>
                )}
                <span className="absolute top-full mt-2 font-bold text-xs bg-slate-900 text-white px-2 py-1 rounded opacity-0 group-hover/planet:opacity-100 transition-opacity whitespace-nowrap z-20">
                  {sub.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Section */}
        <div className="text-center mb-8 mt-8 animate-pop">
          <div className="relative max-w-lg mx-auto group">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && generateNuggetByTag(searchQuery)}
              placeholder="What do you want to discover?"
              className="w-full pl-6 pr-24 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white shadow-lg text-lg focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
            <div className="absolute right-2 top-2 bottom-2 flex gap-1">
              <button 
                onClick={() => handleVoiceInput((transcript) => {
                  setSearchQuery(transcript);
                  generateNuggetByTag(transcript);
                })} 
                disabled={aiLoading || isListening}
                className={`${isListening ? 'bg-red-500 animate-pulse' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'} disabled:bg-slate-300 text-slate-700 dark:text-white px-4 rounded-full font-bold transition-colors flex items-center justify-center`}
              >
                <Mic className="w-5 h-5" />
              </button>
              <button onClick={() => searchQuery.trim() && generateNuggetByTag(searchQuery)} disabled={aiLoading} className="bg-blue-500 hover:bg-blue-600 disabled:bg-slate-300 text-white px-6 rounded-full font-bold transition-colors flex items-center justify-center">
                {aiLoading ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <button onClick={() => navigateTo('collection')} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-yellow-400 dark:hover:border-yellow-500 transition-colors flex flex-col items-center gap-2 group">
            <Star className="w-8 h-8 text-yellow-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xl text-slate-700 dark:text-slate-200" style={{ fontFamily: 'var(--font-bubblegum)' }}>Nuggets</span>
            <span className="text-xs text-slate-400">{collection.length} nuggets</span>
          </button>
          <button onClick={() => navigateTo('word-bank')} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors flex flex-col items-center gap-2 group">
            <BookOpen className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span className="text-xl text-slate-700 dark:text-slate-200" style={{ fontFamily: 'var(--font-bubblegum)' }}>Words</span>
            <span className="text-xs text-slate-400">{wordCollection.length} words</span>
          </button>
          <button onClick={() => navigateTo('activities')} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500 transition-colors flex flex-col items-center gap-2 group">
            <Rocket className="w-8 h-8 text-orange-400 group-hover:rotate-12 transition-transform" />
            <span className="text-xl text-slate-700 dark:text-slate-200" style={{ fontFamily: 'var(--font-bubblegum)' }}>Missions</span>
            <span className="text-xs text-slate-400">{activityCollection.length} missions</span>
          </button>
          <button onClick={() => navigateTo('shop')} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors flex flex-col items-center gap-2 group">
            <ShoppingBag className="w-8 h-8 text-purple-400 group-hover:-translate-y-1 transition-transform" />
            <span className="text-xl text-slate-700 dark:text-slate-200" style={{ fontFamily: 'var(--font-bubblegum)' }}>Shop</span>
          </button>
          <button 
            onClick={() => navigateTo('avatar')} 
            className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors flex flex-col items-center gap-2 group"
          >
            <User className="w-8 h-8 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="text-xl text-slate-700 dark:text-slate-200" style={{ fontFamily: 'var(--font-bubblegum)' }}>Avatar</span>
          </button>
        </div>

        {/* Mascot Guide Selection */}
        <div className="mt-8 bg-gradient-to-r from-yellow-100 via-orange-100 to-yellow-100 dark:from-yellow-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 rounded-3xl p-6 border-2 border-orange-200 dark:border-orange-800 shadow-lg animate-pop hover:shadow-2xl transition-shadow">
          {!selectedGuide ? (
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                  Pick a Guide!
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Choose a friend to help you explore 🌟
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <button 
                  onClick={() => handleGuideSelection('space')}
                  className="flex flex-col items-center gap-3 animate-bounce hover:scale-110 transition-transform group"
                  style={{ animationDuration: '3s' }}
                >
                  <img src={spaceNuggetImg} alt="Space Nugget" className="w-32 h-32 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all" />
                  <div className="bg-purple-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-md relative group-hover:bg-purple-600 transition-colors">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-purple-500"></div>
                    Space Nugget 🌙⭐
                  </div>
                </button>

                <button 
                  onClick={() => handleGuideSelection('sky')}
                  className="flex flex-col items-center gap-3 animate-bounce hover:scale-110 transition-transform group"
                  style={{ animationDuration: '3s', animationDelay: '0.5s' }}
                >
                  <img src={skyNuggetImg} alt="Sky Nugget" className="w-32 h-32 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all" />
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-md relative group-hover:bg-blue-600 transition-colors">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-500"></div>
                    Sky Nugget ☀️☁️
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={openGuideChat}
                className="flex flex-col items-center gap-3 animate-bounce hover:scale-110 transition-transform group"
                style={{ animationDuration: '3s' }}
              >
                <img 
                  src={selectedGuide === 'space' ? spaceNuggetImg : skyNuggetImg}
                  alt={selectedGuide === 'space' ? 'Space Nugget' : 'Sky Nugget'}
                  className="w-32 h-32 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
                />
                <div className={`${selectedGuide === 'space' ? 'bg-purple-500 group-hover:bg-purple-600' : 'bg-blue-500 group-hover:bg-blue-600'} text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-md relative transition-colors`}>
                  <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent ${selectedGuide === 'space' ? 'border-b-purple-500' : 'border-b-blue-500'}`}></div>
                  I'm here to help! Click me! 💬
                </div>
              </button>

              <div className="text-center px-4">
                <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                  {user ? `Welcome Back, ${user.user_metadata?.name?.split(' ')[0] || 'Explorer'}!` : 'Welcome, Explorer!'}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 font-semibold">
                  {selectedGuide === 'space' ? 'Space Nugget' : 'Sky Nugget'} is ready to help you! 🌟
                </p>
                <button 
                  onClick={() => { setSelectedGuide(null); setGuideChatMessages([]); saveData({ selectedGuide: null }); }}
                  className="mt-2 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 underline"
                >
                  Change guide
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
