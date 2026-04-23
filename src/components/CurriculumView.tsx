import React from 'react';
import {
  BookOpen, Calculator, Microscope, Music, Palette,
  ArrowLeft, Star, ArrowRight, Map as MapIcon
} from 'lucide-react';
import { UserAvatar } from './UserAvatar';

interface CurriculumViewProps {
  selectedCurriculumTopic: any;
  goBack: () => void;
  goHome: () => void;
  navigateTo: (view: string) => void;
  apiKey: string;
  generateNuggetByTag: (tag: string, subject?: string) => void;
  showNotification: (msg: string) => void;
  openScientificExperiment: (experiment: any) => void;
  openScientificMethodStep: (step: any) => void;
  openArtActivity: (activity: any) => void;
  openMathActivity: (activity: any) => void;
  openMusicActivity: (activity: any) => void;
  openLanguageActivity: (activity: any) => void;
  openStoryActivity: (story: any) => void;
  setCurrentNugget: (nugget: any) => void;
  setAiContentImage: (img: any) => void;
  setActivityImage: (img: any) => void;
  setLearnResponse: (resp: any) => void;
  setActivityResponse: (resp: any) => void;
  generateImage: (text: string, searchTerm?: string, originalTag?: string, subjectId?: string) => void;
  avatarNuggetType: string | null;
  selectedAccessories: any;
  accessoryOptions: any;
  baseNuggetImg: string;
  spicyNuggetImg: string;
}

export function CurriculumView({
  selectedCurriculumTopic,
  goBack,
  goHome,
  navigateTo,
  apiKey,
  generateNuggetByTag,
  showNotification,
  openScientificExperiment,
  openScientificMethodStep,
  openArtActivity,
  openMathActivity,
  openMusicActivity,
  openLanguageActivity,
  openStoryActivity,
  setCurrentNugget,
  setAiContentImage,
  setActivityImage,
  setLearnResponse,
  setActivityResponse,
  generateImage,
  avatarNuggetType,
  selectedAccessories,
  accessoryOptions,
  baseNuggetImg,
  spicyNuggetImg,
}: CurriculumViewProps) {
  if (!selectedCurriculumTopic) return null;
    
  const topic = selectedCurriculumTopic;
  const type = topic.type || 'grid';
    
  // Dynamic gradient based on topic
  const gradientMap: Record<string, string> = {
    'ancient-civilizations': 'from-amber-400 via-orange-500 to-red-600',
    'elements-of-language': 'from-blue-400 via-indigo-500 to-purple-600',
    'elements-of-math': 'from-blue-500 via-cyan-500 to-teal-600',
    'scientific-method': 'from-emerald-400 via-teal-500 to-cyan-600',
    'elements-of-music': 'from-rose-400 via-pink-500 to-fuchsia-600',
    'elements-of-art': 'from-purple-400 via-pink-500 to-rose-500',
    'famous-works-of-art': 'from-yellow-400 via-amber-500 to-orange-600',
    'art-movements': 'from-fuchsia-400 via-purple-500 to-indigo-600',
    'wonders-of-the-world': 'from-amber-400 via-yellow-500 to-orange-600'
  };
    
  const iconMap: Record<string, any> = {
    'ancient-civilizations': MapIcon,
    'elements-of-language': BookOpen,
    'elements-of-math': Calculator,
    'scientific-method': Microscope,
    'elements-of-music': Music,
    'elements-of-art': Palette,
    'famous-works-of-art': Palette,
    'art-movements': Palette,
    'wonders-of-the-world': MapIcon
  };
    
  const gradient = gradientMap[topic.id] || 'from-blue-400 via-indigo-500 to-purple-600';
  const Icon = iconMap[topic.id] || BookOpen;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 pb-20">
      {/* Header */}
      <div className={`relative h-40 md:h-48 bg-gradient-to-br ${gradient} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          <button onClick={goBack} className="bg-white/90 p-2 rounded-full shadow-md text-slate-700 hover:scale-110 transition-transform">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
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
              <Icon className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg" style={{ fontFamily: 'var(--font-bubblegum)' }}>{topic.name}</h1>
              <p className="text-white/90 font-medium text-sm md:text-base">{topic.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6 mt-4">
        {/* TIMELINE TYPE (Ancient Civilizations) */}
        {type === 'timeline' && topic.timeline && (() => {
          const parsePeriod = (periodStr: string) => {
            const parts = periodStr.split('-').map((p: string) => p.trim());
            const parseYear = (yearStr: string) => {
              const match = yearStr.match(/(\d+)\s*(BCE|CE)?/);
              if (!match) return 0;
              const year = parseInt(match[1]);
              const era = match[2] || 'BCE';
              return era === 'BCE' ? -year : year;
            };
            if (parts.length === 2) {
              const start = parseYear(parts[0]);
              const end = parseYear(parts[1]);
              return { start, end };
            }
            return { start: 0, end: 0 };
          };

          const regionMap: Record<string, string> = {
            "Mesopotamia": "Middle East",
            "Ancient Egypt": "Africa",
            "Indus Valley": "Asia",
            "Ancient China": "Asia",
            "Ancient Greece": "Europe",
            "Roman Empire": "Europe",
            "Maya": "Americas",
            "Ancient Japan": "Asia",
            "Inca Empire": "Americas",
            "Aztec Empire": "Americas",
            "Kingdom of Kush": "Africa"
          };

          const regionColors: Record<string, { bg: string; text: string; border: string }> = {
            "Middle East": { bg: "bg-amber-600", text: "text-white", border: "border-amber-700" },
            "Asia": { bg: "bg-red-600", text: "text-white", border: "border-red-700" },
            "Europe": { bg: "bg-blue-600", text: "text-white", border: "border-blue-700" },
            "Americas": { bg: "bg-green-600", text: "text-white", border: "border-green-700" },
            "Africa": { bg: "bg-purple-600", text: "text-white", border: "border-purple-700" }
          };

          const timelineData = topic.timeline.map((item: any, index: number) => ({
            ...item,
            ...parsePeriod(item.period),
            region: regionMap[item.name] || "Other",
            index
          }));

          const allYears = timelineData.flatMap((item: any) => [item.start, item.end]);
          const minYear = Math.min(...allYears);
          const maxYear = Math.max(...allYears);
          const range = maxYear - minYear;

          const civilizations = timelineData.map((item: any) => ({
            ...item,
            left: ((item.start - minYear) / range) * 100,
            width: ((item.end - item.start) / range) * 100
          }));

          const yearMarkers: { year: number; position: number; label: string }[] = [];
          const markerInterval = 500;
          for (let year = Math.floor(minYear / markerInterval) * markerInterval; year <= maxYear; year += markerInterval) {
            if (year >= minYear && year <= maxYear) {
              yearMarkers.push({
                year,
                position: ((year - minYear) / range) * 100,
                label: year <= 0 ? `${Math.abs(year)} BCE` : `${year} CE`
              });
            }
          }

          return (
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center" style={{ fontFamily: 'var(--font-bubblegum)' }}>Timeline of Ancient Civilizations</h2>
              
              {/* Regional Key */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {Object.entries(regionColors).map(([region, style]) => (
                  <div 
                    key={region} 
                    onClick={() => generateNuggetByTag(region + " ancient civilizations", 'history')}
                    className={`${style.bg} ${style.text} px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 border-2 ${style.border} shadow-md cursor-pointer hover:scale-105 transition-transform`}
                  >
                    {region}
                  </div>
                ))}
              </div>
              
              <div className="relative w-full">
                <div className="relative h-8 mb-4 border-b-2 border-slate-300 dark:border-slate-600">
                  {yearMarkers.map((marker, idx) => (
                    <div 
                      key={idx}
                      className="absolute top-0 transform -translate-x-1/2"
                      style={{ left: `${marker.position}%` }}
                    >
                      <div className="w-0.5 h-3 bg-slate-400 dark:bg-slate-500 mb-1" />
                      <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                        {marker.label}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 mt-8">
                  {civilizations.map((civ: any, index: number) => (
                    <div 
                      key={civ.name}
                      className="relative h-12 animate-pop"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div 
                        onClick={() => generateNuggetByTag(civ.name, 'history')}
                        className={`absolute h-full ${civ.color} rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex items-center justify-between px-3 border-2 border-white dark:border-slate-900`}
                        style={{ 
                          left: `${civ.left}%`, 
                          width: `${civ.width}%`,
                          minWidth: '120px'
                        }}
                      >
                        <div className="text-white font-bold text-sm leading-tight">
                          {civ.name}
                        </div>
                        <div className="text-lg opacity-80">
                          {regionColors[civ.region]?.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center text-xs text-slate-500 dark:text-slate-400 mt-6">
                Bar length represents duration of each civilization
              </div>
            </div>
          );
        })()}

        {/* PROCESS TYPE - Special Layout for Experiments */}
        {type === 'process' && topic.experiments ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6" style={{ fontFamily: 'var(--font-bubblegum)' }}>Fun Experiments to Try</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {topic.experiments.map((experiment: any, index: number) => (
                  <button
                    key={experiment.name}
                    onClick={() => openScientificExperiment(experiment)}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-slate-100 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 group animate-pop overflow-hidden"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <div className="relative w-full h-32 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <img src={experiment.image} alt={experiment.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="p-4 text-left">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-1">{experiment.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{experiment.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-[2fr_1fr] gap-6 mb-8">
              <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center" style={{ fontFamily: 'var(--font-bubblegum)' }}>The Scientific Method</h2>
                <div className="grid grid-cols-2 gap-4">
                  {topic.steps.map((step: any, index: number) => (
                    <div key={step.name} className="relative">
                      <button 
                        onClick={() => openScientificMethodStep(step)}
                        className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-4 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500 animate-pop transition-all hover:shadow-lg hover:scale-105 cursor-pointer text-left" 
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="absolute -top-2 -left-2 bg-emerald-500 text-white w-7 h-7 rounded-full flex items-center justify-center font-bold shadow-lg text-sm">
                          {step.step}
                        </div>
                        <div className="text-3xl mb-2">{step.emoji}</div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-1 text-sm">{step.name}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400">{step.description}</p>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6" style={{ fontFamily: 'var(--font-bubblegum)' }}>Key Concepts</h2>
                <div className="flex flex-col gap-3">
                  {topic.subTopics.map((item: any, index: number) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        if (apiKey) {
                          generateNuggetByTag(item.name, 'science');
                        } else {
                          showNotification("Add API key to explore topics!");
                        }
                      }}
                      className={`${item.color} text-white rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-white/20 group animate-pop text-left`}
                      style={{animationDelay: `${index * 0.05}s`}}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{item.emoji}</div>
                        <div className="flex-1">
                          <h3 className="font-bold text-white">{item.name}</h3>
                          <p className="text-xs text-white/90">{item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : type === 'process' && topic.steps ? (
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center" style={{ fontFamily: 'var(--font-bubblegum)' }}>The Scientific Method Process</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {topic.steps.map((step: any, index: number) => (
                <div key={step.name} className="relative">
                  <button 
                    onClick={() => openScientificMethodStep(step)}
                    className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500 animate-pop transition-all hover:shadow-lg hover:scale-105 cursor-pointer text-left" 
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="absolute -top-3 -left-3 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                      {step.step}
                    </div>
                    <div className="text-4xl mb-3">{step.emoji}</div>
                    <h3 className="font-bold text-slate-800 dark:text-white mb-1">{step.name}</h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{step.description}</p>
                  </button>
                  {index < topic.steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-4 h-4 text-emerald-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* ACTIVITIES TYPE */}
        {type === 'activities' && topic.activities ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                {topic.id === 'elements-of-math' ? 'Math Activities to Try' : topic.id === 'elements-of-music' ? 'Music Activities to Try' : topic.id === 'elements-of-language' ? 'Language Activities to Try' : 'Art Activities to Try'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {topic.activities.map((activity: any, index: number) => (
                  <button
                    key={activity.name}
                    onClick={() => {
                      if (topic.id === 'elements-of-math') {
                        openMathActivity(activity);
                      } else if (topic.id === 'elements-of-music') {
                        openMusicActivity(activity);
                      } else if (topic.id === 'elements-of-language') {
                        openLanguageActivity(activity);
                      } else {
                        openArtActivity(activity);
                      }
                    }}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-slate-100 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-600 group animate-pop overflow-hidden"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <div className="relative w-full h-32 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <img src={activity.image} alt={activity.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="p-4 text-left">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-1">{activity.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{activity.description}</p>
                      <div className={`mt-2 text-xs font-semibold ${
                        topic.id === 'elements-of-language' && activity.concept
                          ? activity.concept === 'Parts of Speech' ? 'text-blue-600 dark:text-blue-400'
                          : activity.concept === 'Sentence Structure' ? 'text-purple-600 dark:text-purple-400'
                          : activity.concept === 'Poetry' ? 'text-pink-600 dark:text-pink-400'
                          : activity.concept === 'Persuasive Writing' ? 'text-orange-600 dark:text-orange-400'
                          : activity.concept === 'Etymology' ? 'text-green-600 dark:text-green-400'
                          : activity.concept === 'Punctuation' ? 'text-yellow-600 dark:text-yellow-400'
                          : activity.concept === 'Literary Devices' ? 'text-indigo-600 dark:text-indigo-400'
                          : activity.concept === 'Story Elements' ? 'text-red-600 dark:text-red-400'
                          : 'text-purple-600 dark:text-purple-400'
                        : 'text-purple-600 dark:text-purple-400'
                      }`}>
                        {activity.element || activity.movement || activity.concept}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                {topic.id === 'elements-of-art' ? 'Key Concepts: Elements of Art' : topic.id === 'art-movements' ? 'Key Concepts: Art Movements' : topic.id === 'elements-of-math' ? 'Key Concepts: Elements of Math' : topic.id === 'elements-of-music' ? 'Key Concepts: Elements of Music' : topic.id === 'elements-of-language' ? 'Key Concepts: Elements of Language' : 'Key Concepts'}
              </h2>
              
              {renderSubTopicsByType(topic, apiKey, generateNuggetByTag, showNotification)}
            </div>
          </>
        ) : null}

        {/* STORIES TYPE */}
        {type === 'stories' && topic.stories ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6" style={{ fontFamily: 'var(--font-bubblegum)' }}>Stories from Around the World</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topic.stories.map((story: any, index: number) => (
                  <button
                    key={story.name}
                    onClick={() => openStoryActivity(story)}
                    className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-slate-100 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-600 group animate-pop overflow-hidden"
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    <div className="relative w-full h-32 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <img src={story.image} alt={story.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="p-4 text-left">
                      <h3 className="font-bold text-slate-800 dark:text-white mb-1">{story.name}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{story.description}</p>
                      <div className="flex gap-1 flex-wrap text-xs">
                        <span className={`px-2 py-1 rounded-full font-semibold ${
                          story.category === 'Fairytale' 
                            ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            : story.category === 'Fable'
                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                            : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        }`}>{story.category}</span>
                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full font-semibold">{story.origin}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6" style={{ fontFamily: 'var(--font-bubblegum)' }}>Key Concepts: Story Types</h2>
              <div className="grid grid-cols-3 gap-4">
                {topic.subTopics.map((category: any, index: number) => (
                  <button
                    key={category.name}
                    onClick={() => {
                      if (apiKey) {
                        const categoryNugget = {
                          text: category.name === 'Fairytales' 
                            ? 'Fairytales are magical stories with enchanted objects, mythical creatures, and supernatural events. They teach life lessons through heroes and heroines facing challenges. These stories come from oral traditions passed down through generations, with each culture adding unique elements. Common themes include good versus evil, kindness, and courage.'
                            : category.name === 'Fables'
                            ? 'Fables are short stories that teach a moral lesson using animals that talk and act like humans. Each animal represents a human trait, like the clever fox or hardworking ant. The moral is usually spelled out at the end. Famous collections like Aesop\'s Fables have taught wisdom for thousands of years!'
                            : 'Tall tales are funny, exaggerated stories about larger-than-life heroes who do impossible things! These American folk stories feature characters with superhuman abilities, like Paul Bunyan or Pecos Bill who rode a tornado. The fun comes from ridiculous exaggerations, like someone being so strong they could tie a river in a knot!',
                          title: category.name,
                          tags: ['Stories', category.name, 'Story Types'],
                          subjectId: 'words',
                          id: Date.now(),
                          searchTerm: category.name + ' stories',
                          originalTag: category.name,
                          storyType: category.name
                        };
                        setCurrentNugget(categoryNugget);
                        setAiContentImage(null);
                        setActivityImage(null);
                        setLearnResponse(null);
                        setActivityResponse(null);
                        navigateTo('nugget');
                        generateImage(category.name, category.name + ' stories', category.name);
                      } else {
                        showNotification('Add API key to explore story types!');
                      }
                    }}
                    className={`${category.color} text-white rounded-xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all text-center animate-pop cursor-pointer`}
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <div className="text-4xl mb-2">{category.emoji}</div>
                    <h3 className="font-bold text-lg" style={{ fontFamily: 'var(--font-bubblegum)' }}>{category.name}</h3>
                    <p className="text-sm opacity-90 mt-1">{category.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {/* Topic Cards Section - For non-process and non-activities types */}
        {type !== 'process' && type !== 'activities' && type !== 'stories' && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center" style={{ fontFamily: 'var(--font-bubblegum)' }}>
              {type === 'timeline' ? 'Explore Ancient Civilizations' : topic.id === 'famous-works-of-art' ? 'Explore the Masterpieces' : topic.id === 'art-movements' ? 'Explore the Styles' : topic.id === 'wonders-of-the-world' ? 'Explore the Wonders' : 'Explore Topics'}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {topic.subTopics.map((item: any, index: number) => {
                const useImageFormat = topic.id === 'famous-works-of-art' || topic.id === 'art-movements' || topic.id === 'wonders-of-the-world';
                
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      if (apiKey) {
                        const subjectMap: Record<string, string> = {
                          'ancient-civilizations': 'history',
                          'elements-of-language': 'words',
                          'elements-of-math': 'math',
                          'scientific-method': 'science',
                          'elements-of-music': 'music',
                          'elements-of-art': 'art',
                          'famous-works-of-art': 'art',
                          'art-movements': 'art',
                          'wonders-of-the-world': 'history'
                        };
                        const tag = type === 'timeline' ? `${item.name} ancient civilizations` : item.name;
                        generateNuggetByTag(tag, subjectMap[topic.id] || 'science');
                      } else {
                        showNotification("Add API key to explore topics!");
                      }
                    }}
                    className={useImageFormat 
                      ? "bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-slate-100 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 group animate-pop overflow-hidden"
                      : `${item.color ? 'text-white' : 'bg-white dark:bg-slate-800'} rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 ${item.color ? item.color : 'border-slate-100 dark:border-slate-700'} hover:border-opacity-80 group animate-pop overflow-hidden`
                    }
                    style={{animationDelay: `${index * 0.05}s`}}
                  >
                    {useImageFormat ? (
                      <>
                        <div className="relative w-full h-32 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="p-4 text-left">
                          <h3 className="font-bold text-slate-800 dark:text-white mb-1">{item.name}</h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400">{item.description}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        {item.image ? (
                          <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                          </div>
                        ) : (
                          <div className="text-5xl mb-3">{item.emoji}</div>
                        )}
                        <h3 className={`font-bold mb-1 ${item.color ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                          {item.name}
                        </h3>
                        <p className={`text-xs ${item.color ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'}`}>{item.description}</p>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to render subtopics based on topic type
function renderSubTopicsByType(topic: any, apiKey: string, generateNuggetByTag: (tag: string, subject?: string) => void, showNotification: (msg: string) => void) {
  const subjectForTopic: Record<string, string> = {
    'elements-of-art': 'art',
    'art-movements': 'art',
    'elements-of-math': 'math',
    'elements-of-music': 'music',
    'elements-of-language': 'words',
  };
  const subject = subjectForTopic[topic.id] || 'science';

  const handleClick = (itemName: string) => {
    if (apiKey) {
      generateNuggetByTag(itemName, subject);
    } else {
      showNotification("Add API key to explore topics!");
    }
  };

  // Image-based cards for art movements
  if (topic.id === 'art-movements') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {topic.subTopics.map((item: any, index: number) => (
          <button
            key={item.name}
            onClick={() => handleClick(item.name)}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all overflow-hidden border-2 border-slate-100 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 group animate-pop"
            style={{animationDelay: `${index * 0.05}s`}}
          >
            <div className="relative w-full h-40 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-4 text-left">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm mb-1">{item.name}</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    );
  }

  // Colored emoji boxes for all other types
  const gridCols = 'grid grid-cols-2 md:grid-cols-4 gap-4';
  return (
    <div className={gridCols}>
      {topic.subTopics.map((item: any, index: number) => (
        <button
          key={item.name}
          onClick={() => handleClick(item.name)}
          className={`${item.color} text-white rounded-xl p-4 shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-transparent hover:border-white/20 group animate-pop text-left`}
          style={{animationDelay: `${index * 0.05}s`}}
        >
          <div className="flex flex-col items-center text-center gap-2">
            <div className="text-3xl">{item.emoji}</div>
            <div>
              <h3 className="font-bold text-white">{item.name}</h3>
              <p className="text-xs text-white/90">{item.description}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
