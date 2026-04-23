import React from 'react';
import { 
  ArrowLeft, Star, ArrowRight, Heart, Loader, Volume2, 
  Maximize2, Brain, Rocket, Image as ImageIcon, X, Sparkles, 
  BookOpen, AlertTriangle
} from 'lucide-react';
import { UserAvatar } from './UserAvatar';
import { FormattedText } from './FormattedText';
import { CURRICULUM_TOPICS } from '../data/curriculum-topics';

interface NuggetDetailViewProps {
  currentNugget: any;
  goBack: () => void;
  goHome: () => void;
  navigateTo: (view: string) => void;
  avatarNuggetType: string | null;
  selectedAccessories: any;
  accessoryOptions: any;
  baseNuggetImg: string;
  spicyNuggetImg: string;
  imageLoading: boolean;
  nuggetImage: any;
  imageError: boolean;
  setImageError: (value: boolean) => void;
  setShowMeImages: (value: any[]) => void;
  setIsShowMeOpen: (value: boolean) => void;
  setShowMeTopic: (value: string) => void;
  isSpeaking: boolean;
  handleReadAloud: (text: string) => void;
  apiKey: string;
  generateNuggetByTag: (tag: string, subjectId?: string) => void;
  callGemini: (type: string) => void;
  aiLoading: boolean;
  learnResponse: string | null;
  setLearnResponse: (value: string | null) => void;
  activityResponse: any;
  setActivityResponse: (value: any) => void;
  activityImage: string | null;
  setActivityImage: (value: string | null) => void;
  aiResponse: any;
  setAiResponse: (value: any) => void;
  aiContentImage: string | null;
  collection: any[];
  saveCollection: (collection: any[]) => void;
  updateCrumbs: (amount: number) => void;
  showNotification: (message: string) => void;
  activityCollection: any[];
  saveActivityCollection: (collection: any[]) => void;
  setShowStardustQuiz: (value: boolean) => void;
  setStardustQuizType: (value: any) => void;
  setSelectedStardustAnswer: (value: number | null) => void;
  setWrongAnswers: (value: Set<number>) => void;
  setFreeformAnswer: (value: string) => void;
  setStardustQuestion: (value: any) => void;
  setStardustQuizSubmitted: (value: boolean) => void;
  pickRandomFromSubject: (subjectId: string) => void;
  openStoryActivity: (story: any) => void;
  handleCollectWord: (word: string, def: string) => void;
  user: any;
}

export function NuggetDetailView({
  currentNugget,
  goBack,
  goHome,
  navigateTo,
  avatarNuggetType,
  selectedAccessories,
  accessoryOptions,
  baseNuggetImg,
  spicyNuggetImg,
  imageLoading,
  nuggetImage,
  imageError,
  setImageError,
  setShowMeImages,
  setIsShowMeOpen,
  setShowMeTopic,
  isSpeaking,
  handleReadAloud,
  apiKey,
  generateNuggetByTag,
  callGemini,
  aiLoading,
  learnResponse,
  setLearnResponse,
  activityResponse,
  setActivityResponse,
  activityImage,
  setActivityImage,
  aiResponse,
  setAiResponse,
  aiContentImage,
  collection,
  saveCollection,
  updateCrumbs,
  showNotification,
  activityCollection,
  saveActivityCollection,
  setShowStardustQuiz,
  setStardustQuizType,
  setSelectedStardustAnswer,
  setWrongAnswers,
  setFreeformAnswer,
  setStardustQuestion,
  setStardustQuizSubmitted,
  pickRandomFromSubject,
  openStoryActivity,
  handleCollectWord,
  user,
}: NuggetDetailViewProps) {
  if (!currentNugget) return null;

  const subjectPlaceholders = {
    science: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
    history: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&h=600&fit=crop',
    math: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
    music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
    art: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
    words: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=600&fit=crop',
    career: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop'
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-800 flex flex-col relative">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center">
        <button onClick={goBack} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 px-4 py-2 rounded-full transition-all font-bold border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 shadow-sm hover:shadow-md">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
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
          <button onClick={() => navigateTo('my-collections')} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full transition-colors font-bold text-sm">
            <Star className="w-4 h-4" /> Collections
          </button>
          <button onClick={goHome} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full transition-colors font-bold">
            Home
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col items-center max-w-3xl mx-auto w-full">
        {/* The Flashcard */}
        <div className="w-full bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden mb-6 animate-pop relative">
          {/* Image Area */}
          <div className="relative aspect-[4/3] w-full bg-slate-100 dark:bg-slate-900 group cursor-pointer" onClick={() => { setShowMeImages([]); setIsShowMeOpen(true); setShowMeTopic(currentNugget.searchTerm || currentNugget.text); }}>
            {imageLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 animate-pulse">
                <Loader className="w-8 h-8 text-slate-400 animate-spin" />
              </div>
            ) : (nuggetImage && !imageError) ? (
              <>
                <img 
                  src={nuggetImage.url} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  alt="Nugget Visual" 
                  onError={() => setImageError(true)}
                />
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-2">
                  <Maximize2 className="w-3 h-3" /> Tap to Explore
                </div>
              </>
            ) : (
              <>
                <img 
                  src={subjectPlaceholders[currentNugget.subjectId] || subjectPlaceholders.default}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-75" 
                  alt="Category Image" 
                />
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-2">
                  <Maximize2 className="w-3 h-3" /> Tap to Explore
                </div>
              </>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 md:p-8">
            {currentNugget.storyData ? (
              <>
                {/* Story Title */}
                <div className="flex items-start gap-4 mb-4">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-tight flex-1" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                    {currentNugget.title}
                  </h2>
                  <button 
                    onClick={() => handleReadAloud(currentNugget.text)}
                    className={`flex-shrink-0 p-3 rounded-full ${isSpeaking ? 'bg-purple-500 text-white animate-pulse cursor-pointer hover:bg-purple-600' : 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'} hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all shadow-sm hover:shadow-md`}
                    title={isSpeaking ? "Click to stop reading" : "Read aloud"}
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                {/* Story Text */}
                <div className="text-base leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                  {currentNugget.text}
                </div>
                {/* Story Lesson */}
                {currentNugget.storyData.lesson && (
                  <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-4 mb-4">
                    <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Lesson:</p>
                    <p className="text-sm text-amber-900 dark:text-amber-200 italic">{currentNugget.storyData.lesson}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-start gap-4 mb-6">
                {currentNugget.isLoading ? (
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-5/6"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-4/6"></div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white leading-tight flex-1">
                      {currentNugget.text}
                    </h2>
                    <button 
                      onClick={() => handleReadAloud(currentNugget.text)}
                      className={`flex-shrink-0 p-3 rounded-full ${isSpeaking ? 'bg-purple-500 text-white animate-pulse cursor-pointer hover:bg-purple-600' : 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'} hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all shadow-sm hover:shadow-md`}
                      title={isSpeaking ? "Click to stop reading" : "Read aloud"}
                    >
                      <Volume2 className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>
            )}
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentNugget.tags.map(tag => (
                <button key={tag} onClick={() => apiKey && generateNuggetByTag(tag)} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-lg text-sm font-bold hover:bg-blue-100 transition-colors">
                  #{tag}
                </button>
              ))}
            </div>

            {/* AI Actions */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
              <button onClick={() => callGemini('learn')} disabled={aiLoading || !apiKey} className="py-3 px-2 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 font-bold text-sm hover:bg-orange-100 transition-colors flex flex-col items-center gap-1 disabled:opacity-50">
                <Brain className="w-5 h-5" /> Explain
              </button>
              <button onClick={() => callGemini('activity')} disabled={aiLoading || !apiKey} className="py-3 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold text-sm hover:bg-emerald-100 transition-colors flex flex-col items-center gap-1 disabled:opacity-50">
                <Rocket className="w-5 h-5" /> Do This
              </button>
              <button onClick={() => { setShowMeImages([]); setIsShowMeOpen(true); setShowMeTopic(currentNugget.searchTerm || currentNugget.text); }} className="py-3 px-2 rounded-xl bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 font-bold text-sm hover:bg-rose-100 transition-colors flex flex-col items-center gap-1">
                <ImageIcon className="w-5 h-5" /> Photos
              </button>
            </div>

            {/* Read a Story Button */}
            {currentNugget.storyType && (
              <div className="mb-6">
                <button 
                  onClick={() => {
                    const topic = CURRICULUM_TOPICS['Stories'];
                    if (topic && topic.stories) {
                      const categoryToMatch = currentNugget.storyType === 'Tall Tales' ? 'Tall Tale' : currentNugget.storyType.slice(0, -1);
                      const storiesOfType = topic.stories.filter(s => s.category === categoryToMatch);
                      if (storiesOfType.length > 0) {
                        const randomStory = storiesOfType[Math.floor(Math.random() * storiesOfType.length)];
                        openStoryActivity(randomStory);
                      } else {
                        showNotification('No stories found for this category');
                      }
                    }
                  }}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group"
                >
                  <BookOpen className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  Read a {currentNugget.storyType === 'Tall Tales' ? 'Tall Tale' : currentNugget.storyType.slice(0, -1)}
                </button>
              </div>
            )}

            {/* AI Content Boxes */}
            {aiLoading && <div className="text-center py-8 text-slate-400"><Loader className="w-6 h-6 animate-spin mx-auto mb-2" /><p className="text-sm">Thinking...</p></div>}
            
            {/* Learn Response */}
            {learnResponse && (
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-600 animate-pop mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                    <Sparkles className="w-4 h-4 text-amber-400" /> 
                    Did You Know?
                  </h3>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleReadAloud(learnResponse)}
                      className={`p-2 rounded-full ${isSpeaking ? 'bg-purple-500 text-white animate-pulse cursor-pointer hover:bg-purple-600' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'} hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all`}
                      title={isSpeaking ? "Click to stop reading" : "Read aloud"}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => { setLearnResponse(null); setAiResponse(null); }} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
                  </div>
                </div>
                <FormattedText text={learnResponse} onLinkClick={(tag) => generateNuggetByTag(tag)} onCollectWord={handleCollectWord} />
              </div>
            )}
            
            {/* Activity Response */}
            {activityResponse && (
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-600 animate-pop mb-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2" style={{ fontFamily: '"Permanent Marker", cursive' }}>
                    <Sparkles className="w-4 h-4 text-amber-400" /> 
                    Mission
                  </h3>
                  <button onClick={() => { setActivityResponse(null); setActivityImage(null); setAiResponse(null); }} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <h4 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex-1">{activityResponse.title}</h4>
                    <button 
                      onClick={() => {
                        const activityText = `${activityResponse.title}. You will need: ${activityResponse.supplies.join(', ')}. Steps: ${activityResponse.steps.join('. ')}`;
                        handleReadAloud(activityText);
                      }}
                      className={`flex-shrink-0 p-2 rounded-full ${isSpeaking ? 'bg-purple-500 text-white animate-pulse cursor-pointer hover:bg-purple-600' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'} hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all`}
                      title={isSpeaking ? "Click to stop reading" : "Read activity aloud"}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-3 rounded-xl flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">Adult supervision may be required for this activity</p>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2 tracking-wide">Supplies</div>
                    <div className="flex flex-wrap gap-2">
                      {activityResponse.supplies?.map((s, i) => <span key={i} className="bg-slate-100 dark:bg-slate-700 px-3 py-1.5 rounded-lg text-sm font-medium">{s}</span>)}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wide">Instructions</div>
                    <ol className="space-y-3">
                      {activityResponse.steps?.map((step, i) => {
                        const cleanStep = step.replace(/###/g, '');
                        const colonIndex = cleanStep.indexOf(':');
                        return (
                          <li key={i} className="flex gap-3 text-slate-700 dark:text-slate-300">
                            <span className="font-bold text-emerald-600 dark:text-emerald-400 flex-shrink-0">{i + 1}.</span>
                            <span className="flex-1">
                              {colonIndex !== -1 ? (
                                <>
                                  <strong className="font-bold text-slate-900 dark:text-white">
                                    {cleanStep.substring(0, colonIndex)}:
                                  </strong>
                                  {cleanStep.substring(colonIndex + 1)}
                                </>
                              ) : (
                                cleanStep
                              )}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  
                  <button 
                    onClick={() => {
                      const activityData = {
                        ...activityResponse,
                        nuggetText: currentNugget.text,
                        id: Date.now(),
                        date: new Date().toLocaleDateString(),
                        image: activityImage
                      };
                      if (!activityCollection.some(a => a.title === activityResponse.title)) {
                        const newCollection = [...activityCollection, activityData];
                        saveActivityCollection(newCollection);
                        updateCrumbs(5);
                        showNotification("Mission Saved! +5 Crumbs 🍗");
                      } else {
                        showNotification("Already saved!");
                      }
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                  >
                    <Rocket className="w-5 h-5" /> Save Mission
                  </button>
                </div>
              </div>
            )}
            
            {/* Legacy aiResponse */}
            {aiResponse && !learnResponse && !activityResponse && (
              <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-600 animate-pop">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2" style={aiResponse.type === 'activity' ? { fontFamily: '"Permanent Marker", cursive' } : { fontFamily: '"Permanent Marker", cursive' }}>
                    <Sparkles className="w-4 h-4 text-amber-400" /> 
                    {aiResponse.type === 'activity' ? 'Mission' : 'Did You Know?'}
                  </h3>
                  <div className="flex items-center gap-2">
                    {aiResponse.type === 'learn' && (
                      <button 
                        onClick={() => handleReadAloud(aiResponse.content)}
                        className={`p-2 rounded-full ${isSpeaking ? 'bg-purple-500 text-white animate-pulse cursor-pointer hover:bg-purple-600' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'} hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all`}
                        title={isSpeaking ? "Click to stop reading" : "Read aloud"}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => setAiResponse(null)} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4"/></button>
                  </div>
                </div>
                {aiResponse.type === 'activity' ? (
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <h4 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 flex-1">{aiResponse.content.title}</h4>
                      <button 
                        onClick={() => {
                          const activityText = `${aiResponse.content.title}. You will need: ${aiResponse.content.supplies.join(', ')}. Steps: ${aiResponse.content.steps.join('. ')}`;
                          handleReadAloud(activityText);
                        }}
                        className={`flex-shrink-0 p-2 rounded-full ${isSpeaking ? 'bg-purple-500 text-white animate-pulse cursor-pointer hover:bg-purple-600' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'} hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-all`}
                        title={isSpeaking ? "Click to stop reading" : "Read activity aloud"}
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {aiContentImage && (
                      <div className="rounded-xl overflow-hidden aspect-video">
                        <img src={aiContentImage} className="w-full h-full object-cover" alt={aiResponse.content.title} />
                      </div>
                    )}
                    
                    <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-3 rounded-xl flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-800 dark:text-amber-300 font-medium">Adult supervision may be required for this activity</p>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl">
                      <div className="text-xs font-bold text-slate-400 uppercase mb-2">Supplies</div>
                      <div className="flex flex-wrap gap-2">
                        {aiResponse.content.supplies?.map((s, i) => <span key={i} className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-sm">{s}</span>)}
                      </div>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
                      {aiResponse.content.steps?.map((step, i) => <li key={i}>{step.replace(/\*\*/g, '').replace(/###/g, '')}</li>)}
                    </ol>
                    
                    <button 
                      onClick={() => {
                        const activityData = {
                          ...aiResponse.content,
                          nuggetText: currentNugget.text,
                          id: Date.now(),
                          date: new Date().toLocaleDateString(),
                          image: aiContentImage
                        };
                        if (!activityCollection.some(a => a.title === aiResponse.content.title)) {
                          const newCollection = [...activityCollection, activityData];
                          saveActivityCollection(newCollection);
                          updateCrumbs(5);
                          showNotification("Mission Saved! +5 Crumbs 🍗");
                        } else {
                          showNotification("Already saved!");
                        }
                      }}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <Rocket className="w-5 h-5" /> Save Mission
                    </button>
                  </div>
                ) : (
                  <FormattedText text={aiResponse.content} onLinkClick={(tag) => generateNuggetByTag(tag)} onCollectWord={handleCollectWord} />
                )}
              </div>
            )}
          </div>
          
          {/* Bottom Action Bar */}
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex gap-4">
              <button 
                onClick={() => {
                  if(!collection.some(n=>n.text===currentNugget.text)){
                    const newCollection = [...collection, {...currentNugget, id: Date.now(), date: new Date().toLocaleDateString()}];
                    saveCollection(newCollection);
                    updateCrumbs(5);
                    showNotification("Collected! +5 Crumbs 🍗");
                    setShowStardustQuiz(true);
                    setStardustQuizType(null);
                    setSelectedStardustAnswer(null);
                    setWrongAnswers(new Set());
                    setFreeformAnswer('');
                    setStardustQuestion(null);
                    setStardustQuizSubmitted(false);
                  } else showNotification("Already collected!");
                }}
                disabled={collection.some(n=>n.text===currentNugget.text)}
                className={`flex-1 ${collection.some(n=>n.text===currentNugget.text) ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-yellow-900 hover:shadow-lg hover:-translate-y-1'} font-bold py-3 rounded-xl shadow-md transition-all flex items-center justify-center gap-2`}
              >
                <Heart className={`w-5 h-5 ${collection.some(n=>n.text===currentNugget.text) ? '' : 'fill-yellow-900'}`} /> {collection.some(n=>n.text===currentNugget.text) ? 'Already Collected' : 'Collect Nugget!'}
              </button>
              <button 
                onClick={() => {
                  if (apiKey && currentNugget.tags[0]) {
                    generateNuggetByTag(currentNugget.tags[0], currentNugget.subjectId);
                  } else if (currentNugget.subjectId) {
                    pickRandomFromSubject(currentNugget.subjectId);
                  }
                }} 
                className="px-6 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 rounded-xl hover:border-blue-400 transition-colors flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={() => navigateTo('my-collections')}
              className="w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 hover:from-red-600 hover:via-orange-600 hover:to-yellow-500 text-white font-bold py-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Star className="w-5 h-5" /> View My Collections
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
