// GitHub sync test - January 7, 2026
import React, { useState, useEffect } from 'react';
import { 
    Rocket, Cloud, Star, BookOpen, Music, Palette, Briefcase, Microscope, 
    Calculator, Settings, X, Sparkles, Map as MapIcon, Heart, ArrowLeft, Brain, 
    ShoppingBag, Edit3, Volume2, Image as ImageIcon, Loader, ExternalLink, 
    Square, Search, Trophy, Check, Mic, Shuffle, Moon, Sun, Drumstick, HelpCircle, ArrowRight,
    Maximize2, Minimize2, Book, History as HistoryIcon, Lock, Grid, Trash2, Menu, LogIn, LogOut, User, AlertTriangle, Pencil, Save
} from 'lucide-react';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { supabase } from './utils/supabase/client';
import { AuthModal } from './components/AuthModal';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { UserAvatar } from './components/UserAvatar';
import { BetaSignup } from './components/BetaSignup';
import { SUBJECTS } from './data/subjects';
import { SUBTOPIC_IMAGES } from './data/subtopic-images';
import { STARTER_NUGGETS } from './data/starter-nuggets';
import { STORY_RETELLINGS } from './story-retellings';
import { CURRICULUM_TOPICS } from './data/curriculum-topics';
import { 
  SCIENTIFIC_METHOD_STEP_CONTENT, EXPERIMENT_DATA, EXPERIMENT_FACTS,
  ART_ACTIVITY_DATA, ART_ACTIVITY_FACTS,
  MATH_ACTIVITY_DATA, MATH_ACTIVITY_FACTS,
  MUSIC_ACTIVITY_DATA, MUSIC_ACTIVITY_FACTS,
  LANGUAGE_ACTIVITY_DATA, LANGUAGE_ACTIVITY_FACTS
} from './data/activity-data';
import { createActivityOpeners } from './data/activity-helpers';
import { SHOP_ITEMS, ACCESSORY_OPTIONS } from './data/shop-data';
import { GuideChatModal } from './components/GuideChatModal';
import { StardustQuizModal } from './components/StardustQuizModal';
import { CollectionQuizModal } from './components/CollectionQuizModal';
import { WordQuizModal } from './components/WordQuizModal';
import { SubtopicCard } from './components/SubtopicCard';
import { SurpriseNuggetButton } from './components/SurpriseNuggetButton';
import { FormattedText } from './components/FormattedText';
import { SubjectMenuView } from './components/SubjectMenuView';
import { NuggetDetailView } from './components/NuggetDetailView';
import { AvatarView } from './components/AvatarView';
import { HomeView } from './components/HomeView';
import { CurriculumView } from './components/CurriculumView';
import { SettingsView } from './components/SettingsView';

// Services
import * as GeminiService from './services/geminiService';
import * as ImageService from './services/imageService';
import * as SpeechHelpers from './utils/speechHelpers';

// Hooks
import { useNavigation } from './hooks/useNavigation';
import { useDataSync } from './hooks/useDataSync';

// Mascot Images
import spaceNuggetImg from 'figma:asset/9bc58e8692cbac3863bf7255a7cd29b0e4334a64.png';
import skyNuggetImg from 'figma:asset/1c4420e39637b1843482bc777ba0d8c1d5156bbe.png';
// Basic and Spicy nugget images
import baseNuggetImg from 'figma:asset/e23fe5acb66ca864e8e5ca8d62fa1245562b1fd4.png'; // Basic Nugget
import spicyNuggetImg from 'figma:asset/a3e4544d3442bb9c3e68eb1a33e7a1f69695dda9.png'; // Spicy Nugget
// Math Nugget for homepage
import mathNuggetImg from 'figma:asset/6b61b99df97372873886ee032fadd2390c4bbb0c.png';
// Music Nugget for homepage
import musicNuggetImg from 'figma:asset/00ddf4248efce64baeb4827728f5018c81c18025.png';
// Art Nugget for homepage
import artNuggetImg from 'figma:asset/48648910f2775ab3e0f27df47315666b05acda83.png';
// Words Nugget for homepage
import wordsNuggetImg from 'figma:asset/163f11babf5028ab961fdc649758889561bcf1dc.png';
// Science Nugget for homepage
import scienceNuggetImg from 'figma:asset/fcd23767ced17aa3bfb8109518a349738075cae6.png';
// History Nugget for homepage
import historyNuggetImg from 'figma:asset/2cdefef7d7b6116e322874e7e905d09826ef36bd.png';
// --- Supabase client imported from /utils/supabase/client.tsx (singleton) ---

// --- Global Styles & Animations ---
const GlobalStyles = () => (
  <style>{`
    @keyframes float {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
      100% { transform: translateY(0px); }
    }
    @keyframes pop {
      0% { transform: scale(0.9); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes shine {
      0% { background-position: 200% center; }
      100% { background-position: -200% center; }
    }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-pop { animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
    .animate-shine {
      background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
      background-size: 200% auto;
      animation: shine 3s linear infinite;
    }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    .glass-panel {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    .dark .glass-panel {
      background: rgba(30, 41, 59, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .pattern-bg {
        background-color: #f8fbff;
    }
    .dark .pattern-bg {
        background-color: #0f172a;
    }
  `}</style>
);

// --- Mascots Components (SVG) ---
const MascotAccessory = ({ type, cx, cy, scale = 1 }) => {
  if (!type) return null;
   
  if (type === 'tophat') return (
    <g transform={`translate(${cx}, ${cy - 55}) scale(${scale})`}>
      <rect x="-25" y="0" width="50" height="10" fill="#1e293b" />
      <rect x="-18" y="-35" width="36" height="35" fill="#1e293b" />
      <rect x="-18" y="-10" width="36" height="4" fill="#ef4444" />
    </g>
  );
  if (type === 'partyhat') return (
    <g transform={`translate(${cx}, ${cy - 55}) scale(${scale})`}>
        <polygon points="-20,0 20,0 0,-40" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2"/>
        <circle cx="0" cy="-40" r="4" fill="#fbbf24" />
        <circle cx="-5" cy="-10" r="3" fill="#ffffff" opacity="0.5"/>
        <circle cx="8" cy="-20" r="2" fill="#ffffff" opacity="0.5"/>
    </g>
  );
  if (type === 'glasses') return (
    <g transform={`translate(${cx}, ${cy - 5}) scale(${scale})`}>
      <circle cx="-15" cy="0" r="12" stroke="#1e293b" strokeWidth="3" fill="rgba(255,255,255,0.3)" />
      <circle cx="15" cy="0" r="12" stroke="#1e293b" strokeWidth="3" fill="rgba(255,255,255,0.3)" />
      <line x1="-3" y1="0" x2="3" y2="0" stroke="#1e293b" strokeWidth="3" />
    </g>
  );
  if (type === 'crown') return (
    <path d="M-20 0 L-20 -25 L-10 -15 L0 -30 L10 -15 L20 -25 L20 0 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" transform={`translate(${cx}, ${cy - 50}) scale(${scale})`} />
  );
  return null;
};

const SpaceNugget = ({ className, accessory }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#FBBF24" />
    <circle cx="35" cy="45" r="5" fill="#000" />
    <circle cx="65" cy="45" r="5" fill="#000" />
    <path d="M40 65 Q50 75 60 65" stroke="#000" strokeWidth="3" strokeLinecap="round" />
    <path d="M20 50 Q10 50 10 30" stroke="#F59E0B" strokeWidth="4" />
    <circle cx="10" cy="30" r="5" fill="#EF4444" />
    <path d="M10 50 L90 50" stroke="#F59E0B" strokeWidth="2" strokeOpacity="0.5" />
    <circle cx="50" cy="50" r="45" stroke="#F59E0B" strokeWidth="4" />
    <MascotAccessory type={accessory} cx={50} cy={50} />
  </svg>
);

const SkyNugget = ({ className, accessory }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#60A5FA" />
    <circle cx="35" cy="45" r="5" fill="#000" />
    <circle cx="65" cy="45" r="5" fill="#000" />
    <path d="M45 65 Q50 72 55 65" stroke="#000" strokeWidth="3" strokeLinecap="round" /> 
    <path d="M10 40 Q20 20 40 10" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
    <path d="M90 40 Q80 20 60 10" stroke="#93C5FD" strokeWidth="4" strokeLinecap="round" />
    <circle cx="20" cy="60" r="8" fill="#DBEAFE" opacity="0.6" />
    <circle cx="80" cy="60" r="8" fill="#DBEAFE" opacity="0.6" />
    <MascotAccessory type={accessory} cx={50} cy={50} />
  </svg>
);

// --- Data & Constants ---
// SUBJECTS, SUBTOPIC_IMAGES, STARTER_NUGGETS, CURRICULUM_TOPICS, activity data, SHOP_ITEMS, and ACCESSORY_OPTIONS are imported from /data/ files
// Image and AI helper functions extracted to /services/

// --- Reusable Components (SubtopicCard, SurpriseNuggetButton, FormattedText) imported from /components/ ---

// --- Main App Component ---

export default function NuggetsApp() {
  const [view, setView] = useState('home'); 
  const [navigationHistory, setNavigationHistory] = useState(['home']); // Track navigation history
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentNugget, setCurrentNugget] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [topicSearchQuery, setTopicSearchQuery] = useState(''); // For searching within topic pages
  const [selectedCurriculumTopic, setSelectedCurriculumTopic] = useState(null); // For curriculum topics like Ancient Civilizations
  
  const [collection, setCollection] = useState([]);
  const [wordCollection, setWordCollection] = useState([]); 
  const [activityCollection, setActivityCollection] = useState([]);
  const [expandedMissions, setExpandedMissions] = useState([]); // Track which missions are expanded
  const [apiKey, setApiKey] = useState('');
  const [starDust, setStarDust] = useState(0);
  const [crumbs, setCrumbs] = useState(0); 
  const [inventory, setInventory] = useState([]); 
  const [equipped, setEquipped] = useState({ space: null, sky: null }); 
  const [darkMode, setDarkMode] = useState(false);
  
  const [aiLoading, setAiLoading] = useState(false);
  const [isPreGenerating, setIsPreGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [aiContentImage, setAiContentImage] = useState(null);
  const [learnResponse, setLearnResponse] = useState(null);
  const [activityResponse, setActivityResponse] = useState(null);
  const [activityImage, setActivityImage] = useState(null);

  const [notification, setNotification] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showMeLoading, setShowMeLoading] = useState(false);
  
  const [triviaQuestions, setTriviaQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [isTriviaAnswered, setIsTriviaAnswered] = useState(false);
  
  // Show Me Modal
  const [showMeImages, setShowMeImages] = useState([]);
  const [isShowMeOpen, setIsShowMeOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [showMeTopic, setShowMeTopic] = useState('');

  // Nugget Image
  const [nuggetImage, setNuggetImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [nuggetLoading, setNuggetLoading] = useState(false);
  const [imageError, setImageError] = useState(false); // Track if the main image failed to load

  // Stardust Quiz Popup
  const [showStardustQuiz, setShowStardustQuiz] = useState(false);
  const [stardustQuestion, setStardustQuestion] = useState(null);
  const [stardustQuizType, setStardustQuizType] = useState(null); // 'mcq' or 'freeform'
  const [selectedStardustAnswer, setSelectedStardustAnswer] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState(new Set());
  const [freeformAnswer, setFreeformAnswer] = useState('');
  const [stardustQuizLoading, setStardustQuizLoading] = useState(false);
  const [stardustQuizSubmitted, setStardustQuizSubmitted] = useState(false);

  // Mascot Guide
  const [selectedGuide, setSelectedGuide] = useState(null); // 'space' or 'sky'
  const [showGuideChat, setShowGuideChat] = useState(false);
  const [guideChatMessages, setGuideChatMessages] = useState([]);
  const [guideChatInput, setGuideChatInput] = useState('');
  const [guideChatLoading, setGuideChatLoading] = useState(false);

  // Avatar Customization
  const [avatarCustomizationTab, setAvatarCustomizationTab] = useState('eyes');
  const [avatarNuggetType, setAvatarNuggetType] = useState(null); // 'basic' or 'spicy'
  const [selectedAccessories, setSelectedAccessories] = useState({
    eyes: [], // Array to allow multiple eye accessories
    mouth: null,
    arms: null,
    legs: null,
    accessories: [] // Array to allow multiple accessories at once
  });
  const [avatarSaveLoading, setAvatarSaveLoading] = useState(false);
  const [avatarSaveSuccess, setAvatarSaveSuccess] = useState(false);

  // Collection Quiz
  const [showCollectionQuiz, setShowCollectionQuiz] = useState(false);
  const [collectionQuizQuestions, setCollectionQuizQuestions] = useState([]);
  const [currentCollectionQuestionIndex, setCurrentCollectionQuestionIndex] = useState(0);
  const [selectedCollectionAnswer, setSelectedCollectionAnswer] = useState(null);
  const [collectionQuizWrongAnswers, setCollectionQuizWrongAnswers] = useState(new Set());
  const [usedCollectionFactIds, setUsedCollectionFactIds] = useState(new Set());
  const [collectionQuizCorrect, setCollectionQuizCorrect] = useState(false);

  // Word Quiz
  const [showWordQuiz, setShowWordQuiz] = useState(false);
  const [wordQuizQuestions, setWordQuizQuestions] = useState([]);
  const [currentWordQuestionIndex, setCurrentWordQuestionIndex] = useState(0);
  const [selectedWordAnswer, setSelectedWordAnswer] = useState(null);
  const [wordQuizWrongAnswers, setWordQuizWrongAnswers] = useState(new Set());
  const [wordQuizSubmitted, setWordQuizSubmitted] = useState(false);
  const [usedWordIds, setUsedWordIds] = useState(new Set());

  // Auth
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Accessory options imported from /data/shop-data.tsx
  const accessoryOptions = ACCESSORY_OPTIONS;

  // Auth Effect - Initialize Supabase Auth
  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      console.log('Init auth - session:', session ? `User: ${session.user.email}` : 'No session');
      if (session) {
        setUser(session.user);
      }
    };
    initAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session ? `User: ${session.user.email}` : 'No session');
      setUser(session?.user || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);

  // Data Sync Effect - Load user data from server
  useEffect(() => {
    if (!user) return;
    
    const loadUserData = async () => {
      try {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          console.log('No session found when loading user data');
          return;
        }

        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-c9fbfdc0/progress/${user.id}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
              'x-user-token': session.access_token
            }
          }
        );

        const result = await response.json();
        
        if (result.success && result.data) {
          const data = result.data;
          if (data.collection) setCollection(data.collection);
          if (data.word_collection) setWordCollection(data.word_collection);
          if (data.activity_collection) setActivityCollection(data.activity_collection);
          if (data.star_dust !== undefined) setStarDust(data.star_dust);
          if (data.crumbs !== undefined) setCrumbs(data.crumbs);
          if (data.inventory) setInventory(data.inventory);
          if (data.equipped) setEquipped(data.equipped);
          if (data.dark_mode !== undefined) setDarkMode(data.dark_mode);
          if (data.selected_guide) setSelectedGuide(data.selected_guide);
          if (data.avatar_nugget_type) setAvatarNuggetType(data.avatar_nugget_type);
        }
      } catch (error) {
        console.error('Load user data error:', error);
      }
    };
    
    loadUserData();
  }, [user]);

  // Init - Load from localStorage as fallback
  useEffect(() => {
    const savedCollection = localStorage.getItem('nuggets_collection');
    if (savedCollection) setCollection(JSON.parse(savedCollection));
    const savedWordCollection = localStorage.getItem('nuggets_wordCollection');
    if (savedWordCollection) setWordCollection(JSON.parse(savedWordCollection));
    const savedActivityCollection = localStorage.getItem('nuggets_activityCollection');
    if (savedActivityCollection) setActivityCollection(JSON.parse(savedActivityCollection));
    
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) setApiKey(savedKey);
    
    const savedDust = localStorage.getItem('nuggets_stardust');
    if (savedDust) setStarDust(parseInt(savedDust));
    const savedCrumbs = localStorage.getItem('nuggets_crumbs');
    if (savedCrumbs) setCrumbs(parseInt(savedCrumbs));
    const savedInventory = localStorage.getItem('nuggets_inventory');
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory));
    } else {
      // Default inventory includes Party Hat
      setInventory(['partyhat']);
      localStorage.setItem('nuggets_inventory', JSON.stringify(['partyhat']));
    }
    const savedEquipped = localStorage.getItem('nuggets_equipped');
    if (savedEquipped) setEquipped(JSON.parse(savedEquipped));
    const savedTheme = localStorage.getItem('nuggets_theme');
    if (savedTheme === 'dark') setDarkMode(true);
    const savedGuide = localStorage.getItem('nuggets_selectedGuide');
    if (savedGuide) setSelectedGuide(savedGuide);
    const savedAvatarType = localStorage.getItem('nuggets_avatarNuggetType');
    if (savedAvatarType) setAvatarNuggetType(savedAvatarType);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('nuggets_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Utility: Get or create a unique user ID for avatar saving
  const getOrCreateUserId = () => {
    let userId = localStorage.getItem('nuggets_userId');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
      localStorage.setItem('nuggets_userId', userId);
    }
    return userId;
  };

  // Load avatar configuration on mount
  useEffect(() => {
    const loadAvatarConfig = async () => {
      try {
        const userId = getOrCreateUserId();
        const response = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-c9fbfdc0/avatar/load/${userId}`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`
            }
          }
        );
        
        const result = await response.json();
        
        if (result.success && result.data) {
          const { nuggetType, accessories } = result.data;
          if (nuggetType) setAvatarNuggetType(nuggetType);
          if (accessories) setSelectedAccessories(accessories);
          console.log('Avatar configuration loaded successfully');
        }
      } catch (error) {
        console.error('Failed to load avatar configuration:', error);
      }
    };
    
    loadAvatarConfig();
  }, []);

  // Save avatar configuration
  const saveAvatarConfig = async () => {
    setAvatarSaveLoading(true);
    setAvatarSaveSuccess(false);
    
    try {
      const userId = getOrCreateUserId();
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c9fbfdc0/avatar/save`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            userId,
            avatarConfig: {
              nuggetType: avatarNuggetType,
              accessories: selectedAccessories
            }
          })
        }
      );
      
      const result = await response.json();
      
      if (result.success) {
        setAvatarSaveSuccess(true);
        // Also save to localStorage as backup
        localStorage.setItem('nuggets_avatarNuggetType', avatarNuggetType);
        console.log('Avatar configuration saved successfully');
        
        // Hide success message after 2 seconds
        setTimeout(() => {
          setAvatarSaveSuccess(false);
        }, 2000);
      } else {
        throw new Error(result.error || 'Failed to save avatar');
      }
    } catch (error) {
      console.error('Failed to save avatar configuration:', error);
      alert('Failed to save avatar. Please try again.');
    } finally {
      setAvatarSaveLoading(false);
    }
  };

  // Initialize chat messages when guide is loaded
  useEffect(() => {
    if (selectedGuide && guideChatMessages.length === 0) {
      const guideName = selectedGuide === 'space' ? 'Space Nugget' : 'Sky Nugget';
      setGuideChatMessages([
        { role: 'assistant', content: `Hi! I'm ${guideName}, your guide! 🌟 I can help you explore the app. Just ask me anything, like "How do I collect nuggets?" or "What can I do with Crumbs?"` }
      ]);
    }
  }, [selectedGuide]);

  // Load speech synthesis voices
  useEffect(() => {
    if ('speechSynthesis' in window) {
      // Load voices (some browsers need this to populate the voices list)
      window.speechSynthesis.getVoices();
      
      // Some browsers fire this event when voices are loaded
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
    
    // Cleanup: cancel any ongoing speech when component unmounts
    return () => {
      if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (currentNugget && view === 'nugget') {
        // Reset error state for new nugget
        setImageError(false);
        // Start image generation immediately but don't block the UI with full-screen loader
        generateImage(currentNugget.text, currentNugget.searchTerm, currentNugget.originalTag, currentNugget.subjectId);
    }
    
    // Stop any ongoing speech when switching views
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [currentNugget, view]);

  // Generate Stardust question when modal opens
  useEffect(() => {
    if (showStardustQuiz && !stardustQuestion && !stardustQuizLoading) {
      generateStardustQuestion();
    }
  }, [showStardustQuiz]);

  // Speech recognition for freeform answer
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showNotification("Speech recognition not supported in this browser");
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFreeformAnswer(prev => prev ? `${prev} ${transcript}` : transcript);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        showNotification("Microphone access denied. Please allow microphone access in your browser settings.");
      } else if (event.error === 'no-speech') {
        showNotification("No speech detected. Please try again.");
      } else {
        showNotification("Voice input error: " + event.error);
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  // Load "Show Me" images when modal opens
  useEffect(() => {
      if (isShowMeOpen && showMeImages.length === 0 && !showMeLoading) {
          setShowMeLoading(true);
          const loadImages = async () => {
              // Helper function to extract key search terms (just the main concept)
              const extractKeyTerms = (text) => {
                  if (!text) return '';
                  // Remove ALL modifier words - keep only the core noun/concept
                  const modifierWords = [
                      'the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'that', 'this', 'these', 'those', 'and', 'or', 'but',
                      'children', 'child', 'kids', 'kid', 'playing', 'play', 'learning', 'learn', 'watching', 'watch', 'doing', 'making', 'educational', 'education', 'young', 'little', 'fun',
                      // Color/appearance modifiers
                      'colorful', 'bright', 'dark', 'light', 'beautiful', 'stunning', 'amazing', 'incredible',
                      // Style/type modifiers
                      'modern', 'ancient', 'traditional', 'contemporary', 'classic', 'vintage', 'new', 'old', 'reverse',
                      // Action/process words
                      'creating', 'building', 'drawing', 'painting', 'cleaning', 'washing', 'designing', 'crafting',
                      // Size/scale
                      'large', 'small', 'big', 'tiny', 'huge', 'massive', 'giant',
                      // Generic descriptors
                      'character', 'characters', 'image', 'images', 'picture', 'pictures', 'mural', 'murals', 'style', 'technique',
                      // Nationality/origin modifiers
                      'egyptian', 'greek', 'roman', 'chinese', 'japanese', 'indian', 'african', 'european', 'american', 'asian',
                      // Location/surface words
                      'wall', 'walls', 'ceiling', 'floor', 'surface', 'ground', 'paper', 'canvas', 'board'
                  ];
                  const words = text.toLowerCase().split(/\s+/)
                      .filter(word => word.length > 2 && !modifierWords.includes(word));
                  // Take 1-2 core words to capture the main subject
                  // "ancient egyptian hieroglyphics wall" → "hieroglyphics"
                  // "black hole" → "black hole"
                  // "pixel art character" → "pixel art"
                  return words.slice(0, 2).join(' ');
              };
              
              const searches = [showMeTopic, currentNugget?.searchTerm]
                  .filter(Boolean)
                  .map(extractKeyTerms)
                  .filter(term => term.length > 0);
              const allImages = [];
              
              // TIER 1: Try Wikipedia for educational images
              for (const term of searches) {
                  try {
                      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrlimit=8&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=800&format=json&origin=*`);
                      const data = await response.json();
                      const pages = data.query?.pages;
                      
                      if (pages) {
                          const images = Object.values(pages)
                              .filter(p => p.thumbnail)
                              .map(p => ({
                                  url: p.thumbnail.source,
                                  title: p.title,
                                  description: p.terms?.description ? p.terms.description[0] : "Image from Wikipedia"
                              }));
                          allImages.push(...images);
                      }
                  } catch (e) {
                      console.error("Wikipedia image fetch error:", e);
                  }
              }
              
              // TIER 2: If we don't have enough images, supplement with Unsplash
              if (allImages.length < 6 && searches.length > 0) {
                  console.log('📷 Supplementing with Unsplash images');
                  for (const term of searches.slice(0, 2)) { // Use first 2 search terms
                      try {
                          // Generate varied Unsplash images with random signatures for diversity
                          for (let i = 0; i < 3; i++) {
                              const randomSeed = Math.random().toString(36).substring(7);
                              const unsplashUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(term)}&sig=${randomSeed}`;
                              allImages.push({
                                  url: unsplashUrl,
                                  title: term,
                                  description: 'Educational image from Unsplash'
                              });
                          }
                      } catch (e) {
                          console.error("Unsplash image error:", e);
                      }
                  }
              }
              
              // Remove duplicates based on URL
              const uniqueImages = allImages.filter((img, index, self) => 
                index === self.findIndex(i => i.url === img.url)
              );
              
              // Filter out inappropriate content for children - COMPREHENSIVE SAFETY
              const inappropriateWords = [
                // Violence & Crime
                'scandal', 'controversy', 'death', 'murder', 'killing', 'war crime',
                'assassination', 'terrorism', 'violence', 'attack', 'bombing',
                'disaster', 'tragedy', 'crash', 'accident', 'victim', 'crime',
                'arrest', 'convicted', 'guilty', 'trial', 'lawsuit', 'allegations',
                'weapon', 'gun', 'knife', 'blood', 'execution', 'torture',
                
                // Adult/Inappropriate Content - CRITICAL SAFETY
                'nude', 'nudity', 'naked', 'underwear', 'lingerie', 'bikini',
                'sexual', 'adult', 'mature', 'explicit', 'nsfw', 'pornography',
                'erotic', 'seductive', 'intimate', 'provocative', 'revealing',
                'undressed', 'topless', 'bottomless', 'bathing', 'shower',
                'bedroom', 'romantic', 'sensual', 'strip', 'exposed',
                'models (painting)', 'seurat',
                
                // Medical/Body (can be inappropriate in images)
                'anatomy', 'reproductive', 'genitalia', 'breast', 'buttock',
                'surgery', 'medical procedure', 'autopsy', 'dissection',
                
                // Disturbing Content
                'horror', 'scary', 'gore', 'graphic', 'disturbing', 'frightening',
                'monster', 'demon', 'evil', 'haunted', 'nightmare',
                
                // Drugs & Alcohol
                'drug', 'marijuana', 'cocaine', 'alcohol', 'beer', 'wine',
                'smoking', 'cigarette', 'tobacco', 'vaping', 'drunk', 'intoxicated'
              ];
              
              const filteredImages = uniqueImages.filter(img => {
                const textToCheck = `${img.title} ${img.description}`.toLowerCase();
                // Block if ANY inappropriate word is found
                return !inappropriateWords.some(word => textToCheck.includes(word));
              });
              
              // Take up to 15 images for a good gallery
              setShowMeImages(filteredImages.slice(0, 15));
              setShowMeLoading(false);
          };
          
          loadImages();
      }
  }, [isShowMeOpen, showMeTopic, currentNugget?.searchTerm]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Navigation helper functions
  const navigateTo = (newView) => {
    setNavigationHistory(prev => [...prev, newView]);
    setView(newView);
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // Remove current page
      const previousView = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setView(previousView);
    } else {
      // Fallback to home if history is empty
      setView('home');
      setNavigationHistory(['home']);
    }
  };

  const goHome = () => {
    setView('home');
    setNavigationHistory(['home']);
  };

  // Save data to server
  const saveData = async (updates) => {
    console.log('saveData called - user:', user ? user.email : 'null');
    
    if (!user) {
      // Guest mode - only save to localStorage
      console.log('Saving to localStorage (guest mode)');
      Object.keys(updates).forEach(key => {
        if (typeof updates[key] === 'object') {
          localStorage.setItem(`nuggets_${key}`, JSON.stringify(updates[key]));
        } else {
          localStorage.setItem(`nuggets_${key}`, updates[key]);
        }
      });
      return;
    }
    
    setIsSaving(true);
    try {
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      console.log('Got session for save:', session ? `User: ${session.user.email}` : 'No session');
      
      if (!session) {
        throw new Error('No active session');
      }

      console.log('Saving with user ID:', user.id);
      console.log('Session user ID:', session.user.id);
      console.log('Access token exists:', !!session.access_token);
      console.log('Access token (first 50 chars):', session.access_token.substring(0, 50));

      // Convert camelCase to snake_case for storage
      const dbUpdates = {};
      if (updates.collection !== undefined) dbUpdates.collection = updates.collection;
      if (updates.wordCollection !== undefined) dbUpdates.word_collection = updates.wordCollection;
      if (updates.activityCollection !== undefined) dbUpdates.activity_collection = updates.activityCollection;
      if (updates.starDust !== undefined) dbUpdates.star_dust = updates.starDust;
      if (updates.crumbs !== undefined) dbUpdates.crumbs = updates.crumbs;
      if (updates.inventory !== undefined) dbUpdates.inventory = updates.inventory;
      if (updates.equipped !== undefined) dbUpdates.equipped = updates.equipped;
      if (updates.darkMode !== undefined) dbUpdates.dark_mode = updates.darkMode;
      if (updates.selectedGuide !== undefined) dbUpdates.selected_guide = updates.selectedGuide;
      if (updates.avatarNuggetType !== undefined) dbUpdates.avatar_nugget_type = updates.avatarNuggetType;
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-c9fbfdc0/progress/${user.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
            'x-user-token': session.access_token
          },
          body: JSON.stringify(dbUpdates)
        }
      );

      console.log('Save response status:', response.status);
      
      if (!response.ok) {
        const result = await response.json();
        console.log('Save response data:', result);
        throw new Error(result.error || `Save failed with status ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Save response data:', result);
      
      if (!result.success) {
        throw new Error(result.error || 'Save failed');
      }
      
      // Also save to localStorage as backup
      Object.keys(updates).forEach(key => {
        if (typeof updates[key] === 'object') {
          localStorage.setItem(`nuggets_${key}`, JSON.stringify(updates[key]));
        } else {
          localStorage.setItem(`nuggets_${key}`, updates[key]);
        }
      });
    } catch (error) {
      console.error("Save error:", error);
      
      // Still save to localStorage even if server save fails
      Object.keys(updates).forEach(key => {
        if (typeof updates[key] === 'object') {
          localStorage.setItem(`nuggets_${key}`, JSON.stringify(updates[key]));
        } else {
          localStorage.setItem(`nuggets_${key}`, updates[key]);
        }
      });
      
      showNotification("Save failed - saved locally");
    } finally {
      setTimeout(() => setIsSaving(false), 500);
    }
  };

  const updateStarDust = (amount) => {
    const newVal = starDust + amount;
    setStarDust(newVal);
    saveData({ starDust: newVal });
  };

  const updateCrumbs = (amount) => {
    const newVal = crumbs + amount;
    setCrumbs(newVal);
    saveData({ crumbs: newVal });
  };

  const saveCollection = (newCollection) => {
    setCollection(newCollection);
    saveData({ collection: newCollection });
  };

  const saveActivityCollection = (newCollection) => {
    setActivityCollection(newCollection);
    saveData({ activityCollection: newCollection });
  };

  // Validate if text input is meaningful (not random gibberish)
  const isValidTextInput = (text) => {
    const trimmed = text.trim().toLowerCase();
    
    // Check minimum length
    if (trimmed.length < 10) return false;
    
    // Check for common nonsense patterns
    const nonsensePatterns = [
      /^(.)\1{5,}$/, // Same character repeated (e.g., "aaaaaaa")
      /^(nothing|n\/a|na|none|idk|dunno|whatever|nope|no|yes)$/i, // Non-answers
      /^[^a-z\s]{10,}$/i, // All special characters/numbers
      /^(asdf|qwer|zxcv|hjkl|test|blah|meh|ugh|hmm){2,}/i, // Keyboard mashing patterns
    ];
    
    for (const pattern of nonsensePatterns) {
      if (pattern.test(trimmed)) return false;
    }
    
    // Check for silly/inappropriate words commonly used by children
    const sillyWords = [
      'poop', 'poopy', 'fart', 'farts', 'butt', 'pee', 'poo', 'toot', 'burp',
      'booger', 'snot', 'dumb', 'stupid', 'doo doo', 'doodoo', 'caca', 'peepee',
      'weewee', 'stinky', 'smelly', 'gross', 'yuck', 'icky'
    ];
    
    // Check if answer contains primarily silly words
    const wordsArray = trimmed.split(/\s+/);
    const sillyWordCount = wordsArray.filter(word => 
      sillyWords.some(silly => word.includes(silly))
    ).length;
    
    // If more than 30% of words are silly, reject it
    if (sillyWordCount > 0 && sillyWordCount / wordsArray.length > 0.3) return false;
    
    // Check if text has reasonable word-to-character ratio
    const words = trimmed.split(/\s+/).filter(w => w.length > 0);
    if (words.length < 2) return false; // Need at least 2 words
    
    // Check for average word length (should be reasonable, not just random letters)
    const avgWordLength = trimmed.replace(/\s+/g, '').length / words.length;
    if (avgWordLength > 15) return false; // Words too long (likely gibberish)
    
    // Check for vowel ratio (English text typically has vowels)
    const vowels = trimmed.match(/[aeiou]/gi) || [];
    const vowelRatio = vowels.length / trimmed.replace(/\s+/g, '').length;
    if (vowelRatio < 0.2) return false; // Too few vowels (likely gibberish)
    
    return true;
  };

  const handleVoiceInput = (callback) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showNotification("Voice input not supported in this browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      callback(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      if (event.error === 'not-allowed') {
        showNotification("Microphone access denied. Please allow microphone access in your browser settings.");
      } else if (event.error === 'no-speech') {
        showNotification("No speech detected. Please try again.");
      } else {
        showNotification("Voice input error: " + event.error);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleReadAloud = (text) => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      showNotification('Text-to-speech not supported in this browser');
      return;
    }

    // Stop any current speech (check both the state and the actual API)
    if (isSpeaking || window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      console.log('Speech stopped by user');
      return;
    }

    // Set speaking state immediately to make button responsive
    setIsSpeaking(true);

    // Clean the text - remove markdown formatting for better speech
    let cleanText = text
      .replace(/\*\*([^*]+)\*\*\{[^}]+\}/g, '$1') // Remove word definitions
      .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markdown
      .replace(/#{1,6}\s/g, '') // Remove headers
      .replace(/[_~`]/g, ''); // Remove other markdown

    const speakText = () => {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Get available voices
      let voices = window.speechSynthesis.getVoices();
      
      // If no voices yet, they might still be loading
      if (voices.length === 0) {
        console.log('No voices loaded yet, waiting...');
        // Try again after a brief delay
        setTimeout(speakText, 100);
        return;
      }
      
      console.log('Available voices:', voices.map(v => v.name));
      
      // Preferred voice names (in order of preference) - prioritizing British/friendly voices
      const preferredVoices = [
        'Google UK English Female', // British female - web friendly
        'Microsoft Hazel', // British female Windows
        'Daniel', // British male Mac OS
        'Google UK English Male', // British male - web friendly  
        'Serena', // British female Mac OS
        'Samantha', // Mac OS - friendly female US
        'Google US English Female',
        'Microsoft Zira Desktop', // Windows
        'Karen', // Mac OS
        'Fiona', // Mac OS alternative
        'Female', // Generic fallback
      ];
      
      // Try to find a preferred voice
      let selectedVoice = null;
      for (const preferred of preferredVoices) {
        selectedVoice = voices.find(voice => 
          voice.name.includes(preferred) && 
          (voice.lang.startsWith('en-') || voice.lang === 'en')
        );
        if (selectedVoice) {
          console.log('Selected preferred voice:', selectedVoice.name);
          break;
        }
      }
      
      // If no preferred voice found, use any English female voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          (voice.name.toLowerCase().includes('female') || 
           voice.name.toLowerCase().includes('woman')) &&
          (voice.lang.startsWith('en-') || voice.lang === 'en')
        );
        if (selectedVoice) {
          console.log('Selected female voice:', selectedVoice.name);
        }
      }
      
      // Final fallback: use first English voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang.startsWith('en-') || voice.lang === 'en'
        );
        if (selectedVoice) {
          console.log('Selected English voice:', selectedVoice.name);
        }
      }
      
      // Set the voice if we found one
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        utterance.lang = selectedVoice.lang;
      } else {
        // Last resort: use default with explicit lang
        utterance.lang = 'en-US';
        console.log('Using default voice');
      }
      
      // Voice settings for a friendly, natural tone
      utterance.rate = 0.9; // Slightly slower than normal for clarity
      utterance.pitch = 1.1; // Slightly higher pitch for warmth without being childish
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
        console.log('Speech started');
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
        console.log('Speech ended');
      };
      
      utterance.onerror = (event) => {
        // "interrupted" and "canceled" are expected when user clicks stop button
        if (event.error === 'interrupted' || event.error === 'canceled') {
          console.log('Speech stopped by user');
          setIsSpeaking(false);
          return;
        }
        
        console.error('Speech synthesis error:', event.error, event);
        setIsSpeaking(false);
        
        // Provide helpful error messages
        if (event.error === 'not-allowed') {
          showNotification('Please allow audio playback');
        } else if (event.error === 'network') {
          showNotification('Network error during speech');
        } else if (event.error === 'synthesis-unavailable') {
          showNotification('Speech synthesis unavailable');
        } else if (event.error === 'synthesis-failed') {
          showNotification('Speech synthesis failed');
        } else {
          showNotification('Could not read aloud: ' + (event.error || 'unknown error'));
        }
      };
      
      utterance.onpause = () => {
        console.log('Speech paused');
      };
      
      utterance.onresume = () => {
        console.log('Speech resumed');
      };
      
      // Speak the text
      try {
        window.speechSynthesis.speak(utterance);
        console.log('Speech synthesis started with text length:', cleanText.length);
      } catch (error) {
        console.error('Error calling speak():', error);
        setIsSpeaking(false);
        showNotification('Could not start speech');
      }
    };
    
    // Start speaking
    speakText();
  };

  const generateImage = async (text, searchTerm = null, originalTag = null, subjectId = 'science') => {
    setImageLoading(true);
    setNuggetImage(null);
    
    // PRIORITY 1: Use the card's image if this nugget came from a subtopic card
    if (originalTag && SUBTOPIC_IMAGES[originalTag]) {
        console.log('✅ Using card image for:', originalTag);
        setNuggetImage({ url: SUBTOPIC_IMAGES[originalTag] });
        setImageLoading(false);
        return;
    }
    
    // PRIORITY 2: Use multi-tier fallback system for AI-generated or dynamic content
    try {
        // Try primary search term first
        if (searchTerm) {
            const imgData = await fetchEducationalImage(searchTerm, subjectId);
            if (imgData) {
                setNuggetImage(imgData);
                setImageLoading(false);
                return;
            }
        }
        
        // Try extracting key words from the fact text
        // Remove common words and get more meaningful terms
        const stopWords = ['the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for'];
        const words = text.split(' ').filter(w => !stopWords.includes(w.toLowerCase()) && w.length > 2);
        const keyWords = words.slice(0, 3).join(' ');
        if (keyWords.trim()) {
            const imgData = await fetchEducationalImage(keyWords, subjectId);
            if (imgData) {
                setNuggetImage(imgData);
                setImageLoading(false);
                return;
            }
        }
        
        // PRIORITY 3: If originalTag exists, try it as a search term before generic fallback
        if (originalTag) {
            const tagImgData = await fetchEducationalImage(originalTag, subjectId);
            if (tagImgData) {
                setNuggetImage(tagImgData);
                setImageLoading(false);
                return;
            }
        }
        
        // Final fallback: generic educational term
        const finalImgData = await fetchEducationalImage('education', subjectId);
        setNuggetImage(finalImgData);
    } catch (error) {
        console.error('Error loading image:', error);
        // Absolute last resort: subject-themed placeholder
        const subjectPlaceholders = {
            science: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
            math: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop',
            music: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop',
            art: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=600&fit=crop',
            words: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=600&fit=crop',
            career: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
            default: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop'
        };
        setNuggetImage({ 
            url: subjectPlaceholders[subjectId] || subjectPlaceholders.default,
            title: 'Educational content',
            description: 'Learning image'
        });
    }
    
    setImageLoading(false);
  };

  const generateNuggetByTag = async (tag, subjectId = null) => {
    if (!apiKey) { 
        showNotification("Add API Key in Settings!"); 
        setTimeout(() => navigateTo('settings'), 1000);
        return; 
    }
    
    // CHECK CACHE FIRST for pre-generated nuggets
    const cacheKey = `nugget_${tag}_${subjectId || 'general'}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try {
            const cachedNugget = JSON.parse(cached);
            console.log('✨ Using cached nugget for:', tag);
            setCurrentNugget(cachedNugget);
            setAiResponse(null);
            setAiContentImage(null);
            setLearnResponse(null);
            setActivityResponse(null);
            setActivityImage(null);
            // Navigate immediately, let image load on nugget page
            navigateTo('nugget');
            // Generate image in background
            generateImage(cachedNugget.text, cachedNugget.searchTerm, tag, cachedNugget.subjectId);
            return;
        } catch(e) {
            console.error('Cache parse error:', e);
        }
    }
    
    // Navigate immediately and show loading state
    console.log('🎯 Starting nugget generation for:', tag);
    navigateTo('nugget');
    setCurrentNugget({
        text: '...',
        tags: [tag],
        subjectId: subjectId || 'science',
        id: Date.now(),
        searchTerm: tag,
        originalTag: tag,
        isLoading: true
    });
    setNuggetImage(null);
    setAiLoading(true);
    
    try {
        console.log('🤖 Calling Gemini API...');
        const systemPrompt = `You are an educational guide for children (ages 7-8). Generate a single fascinating fact about the topic provided. DO NOT start with conversational phrases like "Did you know" or "Here's a fun fact". Launch directly into the fact itself. 

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive for young children
- Use factual, straightforward language
- STRICTLY AVOID: human sacrifice, death rituals, violence, warfare, executions, torture, nudity, anatomy, bathing, underwear, classical sculptures/statues (often nude), adult content, medical procedures, drugs, alcohol, horror, crime
- When generating facts about sculpture as an art form, focus on modern, abstract, or assembled sculptures rather than classical statues
- Focus on fascinating, educational, uplifting aspects of topics
- When discussing ancient civilizations or historical topics, emphasize culture, achievements, daily life, inventions, and contributions to society

Return ONLY valid JSON in this exact format: { "fact": "The fact text here", "topic": "Topic Name", "imageSearchTerm": "2-4 specific descriptive words about the main subject", "relatedTopics": ["Topic 1", "Topic 2", "Topic 3"] }`;
        const userPrompt = `Tell me a cool educational fact about: ${tag}`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            })
        });
        
        console.log('📡 API responded, parsing...');
        const data = await response.json();
        
        if (data.error) {
            console.error('❌ API Error:', data.error);
            throw new Error(data.error.message || "API Error");
        }
        
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log('✅ Got content from API, processing...');
        let parsed = { 
            fact: "The universe is full of mysteries waiting to be discovered!", 
            topic: tag, 
            imageSearchTerm: tag, 
            relatedTopics: [tag, "Space", "Science"] 
        };
        
        if (content) {
            try { 
                const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
                parsed = JSON.parse(cleaned); 
            } catch(e) {
                console.error("JSON parse error:", e.message);
                // Use fallback values - don't log full content to avoid noise
            }
        }
        
        // CRITICAL SAFETY: Filter image search terms for inappropriate content
        const unsafeTerms = [
            'nude', 'nudity', 'naked', 'underwear', 'lingerie', 'bikini',
            'body', 'anatomy', 'bathing', 'shower', 'bedroom', 'adult',
            'classical statue', 'classical sculpture', 'renaissance art'
        ];
        
        let safeSearchTerm = parsed.imageSearchTerm;
        const lowerSearchTerm = safeSearchTerm.toLowerCase();
        
        // If unsafe term detected, replace with safe generic term
        if (unsafeTerms.some(term => lowerSearchTerm.includes(term))) {
            console.warn('Unsafe image search term blocked:', safeSearchTerm);
            safeSearchTerm = tag + ' educational children';
        }
        
        const newNugget = {
            text: parsed.fact,
            tags: parsed.relatedTopics || [tag], 
            subjectId: subjectId || 'science', 
            id: Date.now(),
            searchTerm: safeSearchTerm,
            originalTag: tag // Store the original subtopic name for image lookup
        };
        
        // Cache the nugget for instant future access
        localStorage.setItem(cacheKey, JSON.stringify(newNugget));
        
        console.log('💾 Cached nugget, updating UI...');
        setCurrentNugget(newNugget);
        setAiResponse(null);
        setAiContentImage(null);
        setLearnResponse(null);
        setActivityResponse(null);
        setActivityImage(null);
        
        console.log('🖼️ Starting image generation...');
        // Generate image after text is ready (need the search term from AI)
        await generateImage(parsed.fact, safeSearchTerm, tag, subjectId || 'science');
        
    } catch(e) {
        console.error("❌ AI Error:", e);
        showNotification("Could not generate nugget. Check your API key!");
        // Show error nugget instead of navigating away
        setCurrentNugget({
            text: "Oops! Something went wrong. Please try again.",
            tags: [tag],
            subjectId: subjectId || 'science',
            id: Date.now(),
            searchTerm: tag,
            originalTag: tag
        });
    } finally {
        setAiLoading(false);
    }
  };

  // Pre-generate nuggets for all main subtopics in background
  const preGenerateNuggets = async () => {
    if (!apiKey) return;
    
    setIsPreGenerating(true);
    console.log('🚀 Pre-generating nuggets for instant loading...');
    const startTime = Date.now();
    let generated = 0;
    let cached = 0;
    
    // Rate limit: 1 request per 2 seconds to avoid API throttling
    for (const subject of SUBJECTS) {
      for (const subtopic of subject.subtopics) {
        const cacheKey = `nugget_${subtopic}_${subject.id}`;
        
        // Skip if already cached
        if (localStorage.getItem(cacheKey)) {
          cached++;
          continue;
        }
        
        try {
          // Wait 2 seconds between requests
          if (generated > 0) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
          
          const systemPrompt = `You are an educational guide for children (ages 7-8). Generate a single fascinating fact about the topic provided. DO NOT start with conversational phrases like "Did you know" or "Here's a fun fact". Launch directly into the fact itself. 

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive for young children
- Use factual, straightforward language - avoid overly cutesy or conversational phrasing (e.g., prefer "other people's heartbeats" over "your friends' heartbeats")
- STRICTLY AVOID: human sacrifice, death rituals, violence, warfare, executions, torture, nudity, anatomy, bathing, underwear, classical sculptures/statues (often nude), adult content, medical procedures, drugs, alcohol, horror, crime
- When generating facts about sculpture as an art form, focus on modern, abstract, or assembled sculptures rather than classical statues
- Focus on fascinating, educational, uplifting aspects of topics
- When discussing ancient civilizations or historical topics, emphasize culture, achievements, daily life, inventions, and contributions to society

Return ONLY valid JSON in this exact format: { "fact": "The fact text here", "topic": "Topic Name", "imageSearchTerm": "3-5 HIGHLY SPECIFIC descriptive words focused on the PRIMARY SUBJECT/NOUN of the fact. CRITICAL: Identify the MAIN subject (the thing the fact is ABOUT), not secondary objects or actions. Examples: 'Crows solve multi-step puzzles by creating their own tools' → 'crow bird intelligence'; 'Octopuses have three hearts' → 'octopus marine creature'; 'Venus rotates backwards compared to other planets' → 'venus planet solar system'; 'Bamboo can grow three feet in one day' → 'bamboo plant forest'. AVOID generic or ambiguous terms. NEVER use just 'sculpture', 'statue', or 'classical art' - instead use 'modern sculpture installation', 'colorful abstract sculpture', or 'large assembled sculpture'. For grammar/language topics like parts of speech (noun, verb, adjective, etc.), use EDUCATIONAL terms like 'grammar textbook learning', 'alphabet blocks children', 'language arts classroom', 'word flashcards education' rather than generic word examples.", "relatedTopics": ["Topic 1", "Topic 2", "Topic 3"] }`;
          
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `Tell me a cool educational fact about: ${subtopic}` }] }],
              systemInstruction: { parts: [{ text: systemPrompt }] }
            })
          });
          
          const data = await response.json();
          if (data.error) throw new Error(data.error.message);
          
          const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (content) {
            const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            
            // Safety filter
            const unsafeTerms = ['nude', 'nudity', 'naked', 'underwear', 'lingerie', 'bikini', 'body', 'anatomy', 'bathing', 'shower', 'bedroom', 'adult', 'classical statue', 'classical sculpture', 'renaissance art'];
            let safeSearchTerm = parsed.imageSearchTerm;
            if (unsafeTerms.some(term => safeSearchTerm.toLowerCase().includes(term))) {
              safeSearchTerm = subtopic + ' educational children';
            }
            
            const nugget = {
              text: parsed.fact,
              tags: parsed.relatedTopics || [subtopic],
              subjectId: subject.id,
              id: Date.now(),
              searchTerm: safeSearchTerm,
              originalTag: subtopic
            };
            
            localStorage.setItem(cacheKey, JSON.stringify(nugget));
            generated++;
            console.log(`✅ Pre-generated: ${subtopic} (${generated} total)`);
          }
        } catch(e) {
          console.error(`❌ Failed to pre-generate ${subtopic}:`, e.message);
        }
      }
    }
    
    const elapsed = Math.round((Date.now() - startTime) / 1000);
    console.log(`🎉 Pre-generation complete! Generated: ${generated}, Cached: ${cached}, Time: ${elapsed}s`);
    setIsPreGenerating(false);
    showNotification(`✅ Pre-generated ${generated} nuggets! (${cached} already cached)`);
  };

  const openScientificMethodStep = async (step) => {
    // Data imported from /data/activity-data.tsx
    const content = SCIENTIFIC_METHOD_STEP_CONTENT[step.name];
    if (!content) return;

    const newNugget = {
      text: content.fact,
      tags: content.relatedTopics,
      subjectId: 'science',
      id: Date.now(),
      searchTerm: content.imageSearchTerm,
      originalTag: content.topic
    };

    setCurrentNugget(newNugget);
    setAiResponse(null);
    setAiContentImage(null);
    setLearnResponse(null);
    setActivityResponse(null);
    setActivityImage(null);
    navigateTo('nugget');

    // Generate image for the nugget
    generateImage(content.fact, content.imageSearchTerm, content.topic);
  };

  // Activity opener functions - extracted to /data/activity-helpers.tsx for file size reduction
  const { openScientificExperiment, openArtActivity, openMathActivity, openMusicActivity, openLanguageActivity } = createActivityOpeners({
    setActivityResponse, setAiResponse, setCurrentNugget, setAiContentImage, setActivityImage, setLearnResponse, navigateTo, generateImage
  });



  const openStoryActivity = (story) => {
    const data = STORY_RETELLINGS[story.name];
    if(!data)return;
    const storyNugget={text:data.retelling,title:story.name,tags:["Stories",story.category,story.origin],subjectId:'words',id:Date.now(),searchTerm:data.imageSearchTerm,originalTag:story.name,storyData:{lesson:data.lesson,vocabulary:data.vocabulary}};
    setCurrentNugget(storyNugget);
    setAiContentImage(null);
    setActivityImage(null);
    setLearnResponse(null);
    setActivityResponse(null);
    navigateTo('nugget');
    generateImage(story.name,data.imageSearchTerm,story.name);
  };

  const generateStardustQuestion = async () => {
    if (!apiKey || !currentNugget) return;
    
    setStardustQuizLoading(true);
    try {
        const systemPrompt = `You are a question creator for children (ages 7-8). Create ONE simple multiple choice question about the given fact. Keep it age-appropriate and straightforward.`;
        const userPrompt = `Create a simple multiple choice question about this fact: "${currentNugget.text}"

CRITICAL: Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "question": "The question text?",
  "options": ["Option A", "Option B", "Option C"],
  "correctIndex": 0
}`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            })
        });
        
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (content) {
            try {
                const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
                const parsed = JSON.parse(cleaned);
                setStardustQuestion(parsed);
            } catch(e) {
                console.error("JSON parse error:", e.message);
                setStardustQuestion(null);
            }
        } else {
            setStardustQuestion(null);
        }
    } catch(e) {
        console.error("Question generation error:", e);
        setStardustQuestion(null);
    } finally {
        setStardustQuizLoading(false);
    }
  };

  const startCollectionQuiz = async () => {
    if (!apiKey) {
      showNotification("Add API Key in Settings!");
      setTimeout(() => navigateTo('settings'), 1000);
      return;
    }
    
    if (collection.length < 4) {
      showNotification("Collect at least 4 nuggets first!");
      return;
    }
    
    setAiLoading(true);
    
    try {
      // Select 4 random facts from collection that haven't been used recently
      const availableFacts = collection.filter(fact => !usedCollectionFactIds.has(fact.id));
      
      // If we don't have enough unused facts, reset the used set (but keep using all facts)
      let factsToUse = availableFacts.length >= 4 ? availableFacts : collection;
      
      // Shuffle and pick 4 facts
      const shuffled = [...factsToUse].sort(() => Math.random() - 0.5);
      const selectedFacts = shuffled.slice(0, 4);
      
      // Generate questions for each fact
      const questions = [];
      
      for (const fact of selectedFacts) {
        const systemPrompt = `You are a question creator for children (ages 8-9). Create ONE multiple choice question about the given fact. Make it challenging but age-appropriate.`;
        const userPrompt = `Create a multiple choice question about this fact: "${fact.text}"

CRITICAL REQUIREMENTS:
- Ensure that ONLY ONE answer could possibly be correct based on the fact
- Make incorrect options clearly wrong (not just slightly different)
- Use precise, factual language
- Target difficulty for ages 8-9 (one grade level higher than the audience)

Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "question": "The question text?",
  "options": ["Correct answer", "Clearly incorrect option 1", "Clearly incorrect option 2"],
  "correctIndex": 0
}`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (content) {
          try {
            const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            questions.push({ ...parsed, factId: fact.id });
          } catch(e) {
            console.error("JSON parse error for fact:", fact.id, e.message);
          }
        }
      }
      
      if (questions.length === 4) {
        setCollectionQuizQuestions(questions);
        setCurrentCollectionQuestionIndex(0);
        setCollectionQuizWrongAnswers(new Set());
        setShowCollectionQuiz(true);
        
        // Mark these facts as used
        setUsedCollectionFactIds(new Set([...usedCollectionFactIds, ...selectedFacts.map(f => f.id)]));
        
        // Reset used facts if we've used most of them
        if (usedCollectionFactIds.size + 4 >= collection.length) {
          setUsedCollectionFactIds(new Set());
        }
      } else {
        showNotification("Could not generate questions. Try again!");
      }
    } catch(e) {
      console.error("Collection challenge error:", e);
      showNotification("Could not generate questions. Check your API key!");
    } finally {
      setAiLoading(false);
    }
  };

  const startWordQuiz = async () => {
    if (!apiKey) {
      showNotification("Add API Key in Settings!");
      setTimeout(() => navigateTo('settings'), 1000);
      return;
    }
    
    if (wordCollection.length < 5) {
      showNotification("Collect at least 5 words first!");
      return;
    }
    
    setAiLoading(true);
    
    try {
      // Select 5 random words from collection that haven't been used recently
      const availableWords = wordCollection.filter(word => !usedWordIds.has(word.word));
      
      // If we don't have enough unused words, reset the used set
      let wordsToUse = availableWords.length >= 5 ? availableWords : wordCollection;
      
      // Shuffle and pick 5 words
      const shuffled = [...wordsToUse].sort(() => Math.random() - 0.5);
      const selectedWords = shuffled.slice(0, 5);
      
      // Generate questions for each word (mix of definition and spelling questions)
      const questions = [];
      
      for (let i = 0; i < selectedWords.length; i++) {
        const word = selectedWords[i];
        const questionType = i % 2 === 0 ? 'definition' : 'spelling';
        
        let systemPrompt, userPrompt;
        
        if (questionType === 'definition') {
          systemPrompt = `You are a question creator for children (ages 8-9). Create ONE multiple choice question about the definition of a word. Make it challenging but age-appropriate.`;
          userPrompt = `Create a multiple choice question asking what the word "${word.word}" means. The correct definition is: "${word.definition}"

CRITICAL REQUIREMENTS:
- Ensure that ONLY ONE answer could possibly be correct
- Make incorrect definitions clearly wrong (not just slightly different)
- Target difficulty for ages 8-9 (one grade level higher)

Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "question": "What does the word '${word.word}' mean?",
  "options": ["Correct definition", "Clearly wrong definition 1", "Clearly wrong definition 2"],
  "correctIndex": 0
}`;
        } else {
          systemPrompt = `You are a question creator for children (ages 8-9). Create ONE multiple choice question about how to spell a word. Make it challenging but age-appropriate.`;
          userPrompt = `Create a multiple choice question about how to spell this word. The word is: "${word.word}" which means "${word.definition}"

CRITICAL REQUIREMENTS:
- Ensure that ONLY ONE spelling could possibly be correct
- Make incorrect spellings plausible but clearly wrong
- Target difficulty for ages 8-9 (one grade level higher)

Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "question": "How do you spell the word that means '${word.definition}'?",
  "options": ["${word.word}", "Wrong spelling 1", "Wrong spelling 2"],
  "correctIndex": 0
}`;
        }
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (content) {
          try {
            const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            questions.push({ ...parsed, wordId: word.word, type: questionType });
          } catch(e) {
            console.error("JSON parse error for word:", word.word, e.message);
          }
        }
      }
      
      if (questions.length === 5) {
        setWordQuizQuestions(questions);
        setCurrentWordQuestionIndex(0);
        setWordQuizWrongAnswers(new Set());
        setSelectedWordAnswer(null);
        setWordQuizSubmitted(false);
        setShowWordQuiz(true);
        
        // Mark these words as used
        setUsedWordIds(new Set([...usedWordIds, ...selectedWords.map(w => w.word)]));
        
        // Reset used words if we've used most of them
        if (usedWordIds.size + 5 >= wordCollection.length) {
          setUsedWordIds(new Set());
        }
      } else {
        showNotification("Could not generate questions. Try again!");
      }
    } catch(e) {
      console.error("Word challenge error:", e);
      showNotification("Could not generate questions. Check your API key!");
    } finally {
      setAiLoading(false);
    }
  };

  const callGemini = async (type) => {
      if (!apiKey) {
          showNotification("Needs API Key");
          return;
      }
      
      setAiLoading(true);
      
      try {
        let systemPrompt = "";
        let userPrompt = "";
        
        if (type === 'learn') {
            systemPrompt = `You are an educational companion for a curious child (ages 7-8). Explain the fact in simple, factual terms. 

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive for young children
- Use precise, factual language - avoid overly cutesy or conversational phrasing (e.g., prefer "other people's heartbeats" over "your friends' heartbeats")
- STRICTLY AVOID: human sacrifice, death rituals, violence, warfare, executions, torture, nudity, anatomy, bathing, underwear, classical sculptures/statues, adult content, medical procedures, drugs, alcohol, horror, crime
- Focus on fascinating, educational, uplifting aspects of topics

CRITICAL FORMATTING RULES:
- Use **word**{definition} ONLY for vocabulary words that children should collect (with age-appropriate definitions)
  - Choose vocabulary words that a 10-year-old might NOT know (e.g., "aqueduct", "amphitheater", "photosynthesis")
  - DO NOT define simple common words that kids already know (e.g., "roads", "building", "water")
- Use **actual topic name** (wrapped in double asterisks) ONLY for clickable topics that can generate a new fascinating nugget (like proper nouns, specific concepts). For example: **Rome**, **Ancient Egypt**, **pyramids**, etc.
- NEVER use both formats on the same word - a word can either be a vocabulary definition OR a clickable topic, not both
- Only highlight each word ONCE - do not repeat the same word multiple times with formatting
- DO NOT use ** for emphasis, highlighting, or making text bold
- DO NOT bold random words or phrases for stylistic purposes
- If a word doesn't fit the above two categories, leave it as plain text

Keep it under 4 sentences. DO NOT use conversational lead-ins like "Wow", "That's cool", "Did you know", or comments about how interesting the topic is. Start directly with factual educational content.`;
            userPrompt = `Explain more about this fact: "${currentNugget.text}"`;
        } else if (type === 'activity') {
            systemPrompt = `You are a helpful activity creator for children.

CRITICAL CONTENT SAFETY:
- Keep all activities age-appropriate and safe for young children
- STRICTLY AVOID: human sacrifice, death rituals, violence, warfare, executions, torture, nudity, anatomy, bathing, adult content, medical procedures, drugs, alcohol, horror, crime
- Focus on positive, educational, hands-on learning experiences`;
            userPrompt = `Create ONE simple hands-on OFF-SCREEN activity for children about: "${currentNugget.text}"

CRITICAL GUIDELINES:
- Write instructions in SECOND PERSON directly to the child (use "you" and "your", not "the child" or "children")
- Each step should start with a brief action subhead followed by a colon, then the full instruction
- Example: "Mix ingredients: Pour the baking soda and vinegar together in the cup."
- Use ONLY common household items that don't require printing, downloading, or searching online
- DO NOT include "printable cards", "worksheets", "downloaded templates", or similar materials
- Keep supplies simple and readily available in most homes

CRITICAL: Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "title": "Activity Name",
  "supplies": ["item1", "item2"],
  "steps": ["Action subhead: Full instruction in second person.", "Another action: Do this step."]
}`;
        } else if (type === 'trivia') {
             systemPrompt = `You are a question creator for children.`;
             userPrompt = `Create 3 multiple choice questions about these facts: ${collection.slice(0, 3).map(n => n.text).join('; ')}

CRITICAL: Respond with ONLY a valid JSON array. No markdown, no explanations, no additional text.

[{"question": "Q?", "options": ["A", "B", "C"], "correctIndex": 0}]`;
        }
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            })
        });
        
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (!text) {
            throw new Error("No response from AI");
        }
        
        if (type === 'activity') {
            try {
                // Clean up the response
                let jsonText = text.trim();
                
                // Remove markdown code blocks
                jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
                
                // Remove any markdown headers (lines starting with #)
                jsonText = jsonText.replace(/^#+.*$/gm, '');
                
                // Find the first { and last } to extract just the JSON object
                const firstBrace = jsonText.indexOf('{');
                const lastBrace = jsonText.lastIndexOf('}');
                
                if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
                    jsonText = jsonText.substring(firstBrace, lastBrace + 1);
                }
                
                const json = JSON.parse(jsonText.trim());
                
                // Validate the JSON has required fields
                if (!json.title || !json.supplies || !json.steps) {
                    throw new Error("Invalid activity JSON structure");
                }
                
                setAiResponse({ type: 'activity', content: json });
                setActivityResponse(json);
                
                // Fetch an image for the activity using the activity title
                // This ensures it's different from the main nugget image
                const activityImageData = await fetchWikipediaImage(json.title);
                if (activityImageData) {
                    setAiContentImage(activityImageData.url);
                    setActivityImage(activityImageData.url);
                } else {
                    setAiContentImage(null);
                    setActivityImage(null);
                }
            } catch (parseError) {
                console.error("Activity JSON parse error:", parseError.message);
                // Fallback: show as text
                setAiResponse({ type: 'learn', content: text });
            }
        } else if (type === 'trivia') {
            try {
                let jsonText = text.trim();
                
                // Remove markdown code blocks
                jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
                
                // Remove any markdown headers
                jsonText = jsonText.replace(/^#+.*$/gm, '');
                
                // Find the first [ and last ] to extract just the JSON array
                const firstBracket = jsonText.indexOf('[');
                const lastBracket = jsonText.lastIndexOf(']');
                
                if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
                    jsonText = jsonText.substring(firstBracket, lastBracket + 1);
                }
                
                const json = JSON.parse(jsonText.trim());
                setTriviaQuestions(json);
            } catch (parseError) {
                console.error("Trivia JSON parse error:", parseError.message);
                showNotification("Could not create trivia. Try again!");
            }
        } else {
             setAiResponse({ type: 'learn', content: text });
             setLearnResponse(text);
        }
        
      } catch(e) { 
          console.error("Gemini error:", e);
          setAiResponse({ type: 'error', content: "Could not connect to AI." }); 
      } finally { 
          setAiLoading(false); 
      }
  };

  const handleCollectWord = (word, def) => {
     if (!wordCollection.some(w => w.word.toLowerCase() === word.toLowerCase())) {
         const newCollection = [...wordCollection, { word, definition: def }];
         setWordCollection(newCollection);
         saveData({ wordCollection: newCollection });
         updateCrumbs(5);
         showNotification(`Collected "${word}"! +5 Crumbs`);
     } else {
         showNotification(`Already collected "${word}"!`);
     }
  };

  const pickRandomFromSubject = (subjectId) => {
      const starter = STARTER_NUGGETS[subjectId];
      const random = starter[Math.floor(Math.random() * starter.length)];
      setCurrentNugget({ ...random, subjectId, id: Date.now() });
      setAiResponse(null);
      setAiContentImage(null);
      setLearnResponse(null);
      setActivityResponse(null);
      setActivityImage(null);
      navigateTo('nugget');
  };

  // Login/Logout Handlers
  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      showNotification("Signed out.");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Guide Chat Handler
  const sendGuideMessage = async (userMessage) => {
    if (!apiKey || !userMessage.trim()) return;
    
    const newUserMessage = { role: 'user', content: userMessage };
    const updatedMessages = [...guideChatMessages, newUserMessage];
    setGuideChatMessages(updatedMessages);
    setGuideChatInput('');
    setGuideChatLoading(true);

    try {
      const guideName = selectedGuide === 'space' ? 'Space Nugget' : 'Sky Nugget';
      const aiMessage = await GeminiService.generateGuideChatResponse(
        apiKey,
        userMessage,
        guideName,
        updatedMessages
      );
      
      setGuideChatMessages([
        ...updatedMessages,
        { role: 'assistant', content: aiMessage || "Oops! I had a little trouble there. Can you ask me again?" }
      ]);
    } catch (error) {
      console.error('Guide chat error:', error);
      setGuideChatMessages([
        ...updatedMessages,
        { role: 'assistant', content: "Oops! I had a little trouble there. Can you ask me again?" }
      ]);
    } finally {
      setGuideChatLoading(false);
    }
  };

  const handleGuideSelection = (guide) => {
    setSelectedGuide(guide);
    const guideName = guide === 'space' ? 'Space Nugget' : 'Sky Nugget';
    setGuideChatMessages([
      { role: 'assistant', content: `Hi! I'm ${guideName}, your guide! 🌟 I can help you explore the app. Just ask me anything, like "How do I collect nuggets?" or "What can I do with Crumbs?"` }
    ]);
    saveData({ selectedGuide: guide });
  };

  const openGuideChat = () => {
    setShowGuideChat(true);
  };

  // --- Views ---

  const renderHome = () => (
    <HomeView
      navigateTo={navigateTo}
      setSelectedSubject={setSelectedSubject}
      avatarNuggetType={avatarNuggetType}
      selectedAccessories={selectedAccessories}
      accessoryOptions={accessoryOptions}
      baseNuggetImg={baseNuggetImg}
      spicyNuggetImg={spicyNuggetImg}
      crumbs={crumbs}
      isSaving={isSaving}
      user={user}
      darkMode={darkMode}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      generateNuggetByTag={generateNuggetByTag}
      handleVoiceInput={handleVoiceInput}
      isListening={isListening}
      aiLoading={aiLoading}
      collection={collection}
      wordCollection={wordCollection}
      activityCollection={activityCollection}
      selectedGuide={selectedGuide}
      setSelectedGuide={setSelectedGuide}
      handleGuideSelection={handleGuideSelection}
      openGuideChat={openGuideChat}
      setGuideChatMessages={setGuideChatMessages}
      saveData={saveData}
      spaceNuggetImg={spaceNuggetImg}
      skyNuggetImg={skyNuggetImg}
      mathNuggetImg={mathNuggetImg}
      musicNuggetImg={musicNuggetImg}
      artNuggetImg={artNuggetImg}
      wordsNuggetImg={wordsNuggetImg}
      scienceNuggetImg={scienceNuggetImg}
      historyNuggetImg={historyNuggetImg}
    />
  );

  // renderSubjectMenu extracted to SubjectMenuView component

  const renderCurriculum = () => {
    return (
      <CurriculumView
        selectedCurriculumTopic={selectedCurriculumTopic}
        goBack={goBack}
        goHome={goHome}
        navigateTo={navigateTo}
        apiKey={apiKey}
        generateNuggetByTag={generateNuggetByTag}
        showNotification={showNotification}
        openScientificExperiment={openScientificExperiment}
        openScientificMethodStep={openScientificMethodStep}
        openArtActivity={openArtActivity}
        openMathActivity={openMathActivity}
        openMusicActivity={openMusicActivity}
        openLanguageActivity={openLanguageActivity}
        openStoryActivity={openStoryActivity}
        setCurrentNugget={setCurrentNugget}
        setAiContentImage={setAiContentImage}
        setActivityImage={setActivityImage}
        setLearnResponse={setLearnResponse}
        setActivityResponse={setActivityResponse}
        generateImage={generateImage}
        avatarNuggetType={avatarNuggetType}
        selectedAccessories={selectedAccessories}
        accessoryOptions={accessoryOptions}
        baseNuggetImg={baseNuggetImg}
        spicyNuggetImg={spicyNuggetImg}
      />
    );
  };

  const renderNugget = () => {
    if (!currentNugget) return null;
    return (
      <NuggetDetailView
        currentNugget={currentNugget}
        goBack={goBack}
        goHome={goHome}
        navigateTo={navigateTo}
        avatarNuggetType={avatarNuggetType}
        selectedAccessories={selectedAccessories}
        accessoryOptions={accessoryOptions}
        baseNuggetImg={baseNuggetImg}
        spicyNuggetImg={spicyNuggetImg}
        imageLoading={imageLoading}
        nuggetImage={nuggetImage}
        imageError={imageError}
        setImageError={setImageError}
        setShowMeImages={setShowMeImages}
        setIsShowMeOpen={setIsShowMeOpen}
        setShowMeTopic={setShowMeTopic}
        isSpeaking={isSpeaking}
        handleReadAloud={handleReadAloud}
        apiKey={apiKey}
        generateNuggetByTag={generateNuggetByTag}
        callGemini={callGemini}
        aiLoading={aiLoading}
        learnResponse={learnResponse}
        setLearnResponse={setLearnResponse}
        activityResponse={activityResponse}
        setActivityResponse={setActivityResponse}
        activityImage={activityImage}
        setActivityImage={setActivityImage}
        aiResponse={aiResponse}
        setAiResponse={setAiResponse}
        aiContentImage={aiContentImage}
        collection={collection}
        saveCollection={saveCollection}
        updateCrumbs={updateCrumbs}
        showNotification={showNotification}
        activityCollection={activityCollection}
        saveActivityCollection={saveActivityCollection}
        setShowStardustQuiz={setShowStardustQuiz}
        setStardustQuizType={setStardustQuizType}
        setSelectedStardustAnswer={setSelectedStardustAnswer}
        setWrongAnswers={setWrongAnswers}
        setFreeformAnswer={setFreeformAnswer}
        setStardustQuestion={setStardustQuestion}
        setStardustQuizSubmitted={setStardustQuizSubmitted}
        pickRandomFromSubject={pickRandomFromSubject}
        openStoryActivity={openStoryActivity}
        handleCollectWord={handleCollectWord}
        user={user}
      />
    );
  };

  // Dead renderNugget code fully removed (extracted to NuggetDetailView component)

  const renderGridPage = (title, items, renderItem, emptyMsg) => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={title === 'Mission Log' || title === 'My Nugget Collection' || title === 'Word Collection' ? () => navigateTo('my-collections') : goBack} 
                    className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  </button>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-bubblegum)' }}>{title}</h1>
                  {title === 'Accessories Shop' && (
                    <div className="ml-4 px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full shadow-lg flex items-center gap-2">
                      <span className="text-2xl">🍗</span>
                      <span className="font-black text-white text-lg">{crumbs}</span>
                      <span className="font-bold text-orange-100 text-sm">Crumbs</span>
                    </div>
                  )}
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
                  {title !== 'My Nugget Collection' && title !== 'Word Collection' && title !== 'Mission Log' && (
                    <button onClick={() => navigateTo('my-collections')} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                      <Star className="w-4 h-4 text-yellow-400" /> Collections
                    </button>
                  )}
                  <button onClick={goHome} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                    Home
                  </button>
                </div>
            </div>
            {items.length === 0 ? (
                <div className="text-center py-20 opacity-50">
                    <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center"><Search className="w-10 h-10 text-slate-400" /></div>
                    <p className="font-bold text-xl text-slate-600 dark:text-slate-400">{emptyMsg}</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(renderItem)}
                </div>
            )}
        </div>
    </div>
  );

  const renderShowMeModal = () => {
      if (!isShowMeOpen) return null;
      
      // Helper to create a shorter display title
      const getDisplayTitle = () => {
          const topic = showMeTopic || currentNugget?.searchTerm || "Images";
          // Use same filtering logic as search - strip modifiers, keep only core concept
          const modifierWords = [
              'the', 'a', 'an', 'is', 'are', 'was', 'were', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'that', 'this', 'these', 'those', 'and', 'or', 'but',
              'children', 'child', 'kids', 'kid', 'playing', 'play', 'learning', 'learn', 'watching', 'watch', 'doing', 'making', 'educational', 'education', 'young', 'little', 'fun',
              'colorful', 'bright', 'dark', 'light', 'beautiful', 'stunning', 'amazing', 'incredible',
              'modern', 'ancient', 'traditional', 'contemporary', 'classic', 'vintage', 'new', 'old', 'reverse',
              'creating', 'building', 'drawing', 'painting', 'cleaning', 'washing', 'designing', 'crafting',
              'large', 'small', 'big', 'tiny', 'huge', 'massive', 'giant',
              'character', 'characters', 'image', 'images', 'picture', 'pictures', 'mural', 'murals', 'style', 'technique',
              'egyptian', 'greek', 'roman', 'chinese', 'japanese', 'indian', 'african', 'european', 'american', 'asian',
              'wall', 'walls', 'ceiling', 'floor', 'surface', 'ground', 'paper', 'canvas', 'board'
          ];
          const words = topic.toLowerCase().split(/\s+/)
              .filter(word => word.length > 2 && !modifierWords.includes(word));
          // Take 1-2 core words and capitalize properly
          const result = words.slice(0, 2).join(' ') || topic;
          return result.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      };
      
      return (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsShowMeOpen(false)}>
            <div className="w-full max-w-5xl h-[80vh] bg-slate-900 rounded-3xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 flex justify-between items-center border-b border-slate-800">
                    <h3 className="text-white font-bold text-lg" style={{ fontFamily: 'var(--font-bubblegum)' }}>Visual Explorer: {getDisplayTitle()}</h3>
                    <button onClick={() => { setIsShowMeOpen(false); setShowMeImages([]); }} className="p-2 bg-slate-800 rounded-full text-white hover:bg-slate-700"><X className="w-5 h-5" /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    {showMeLoading ? (
                        <div className="h-full flex items-center justify-center">
                            <Loader className="w-12 h-12 text-blue-400 animate-spin" />
                        </div>
                    ) : showMeImages.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {showMeImages.map((img, i) => (
                                <div key={i} className="rounded-xl overflow-hidden aspect-[4/3] relative group cursor-pointer" onClick={() => setEnlargedImage(img)}>
                                    <img src={img.url} className="w-full h-full object-cover" alt={img.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Maximize2 className="w-4 h-4 text-white" />
                                            <span className="text-white text-xs">Click to enlarge</span>
                                        </div>
                                        <p className="text-white font-bold text-sm">{img.title}</p>
                                        {img.description && <p className="text-white/70 text-xs">{img.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
                             <ImageIcon className="w-16 h-16 opacity-30" />
                             <p>No images found for this topic.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      );
  };

  const renderEnlargedImage = () => {
      if (!enlargedImage) return null;
      
      return (
        <div className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setEnlargedImage(null)}>
            <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col" onClick={e => e.stopPropagation()}>
                <button onClick={() => setEnlargedImage(null)} className="absolute -top-12 right-0 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-10">
                    <X className="w-6 h-6" />
                </button>
                <div className="flex-shrink-0 max-h-[70vh] flex items-center justify-center">
                    <img src={enlargedImage.url} className="max-w-full max-h-[70vh] object-contain rounded-xl" alt={enlargedImage.title} />
                </div>
                <div className="mt-4 bg-slate-800/80 backdrop-blur-sm p-4 rounded-xl flex-shrink-0">
                    <button 
                        onClick={() => {
                            if (apiKey) {
                                setEnlargedImage(null);
                                setIsShowMeOpen(false);
                                generateNuggetByTag(enlargedImage.title);
                            } else {
                                showNotification("Add API key to explore topics!");
                            }
                        }}
                        className="text-white font-bold text-lg hover:text-blue-400 transition-colors text-left w-full group flex items-center gap-2"
                    >
                        {enlargedImage.title}
                        <Search className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                    {enlargedImage.description && <p className="text-white/70 text-sm mt-1">{enlargedImage.description}</p>}
                </div>
            </div>
        </div>
      );
  };

  const renderAvatar = () => (
    <AvatarView
      avatarNuggetType={avatarNuggetType}
      setAvatarNuggetType={setAvatarNuggetType}
      selectedAccessories={selectedAccessories}
      setSelectedAccessories={setSelectedAccessories}
      accessoryOptions={accessoryOptions}
      goBack={goBack}
      goHome={goHome}
      navigateTo={navigateTo}
      crumbs={crumbs}
      inventory={inventory}
      avatarCustomizationTab={avatarCustomizationTab}
      setAvatarCustomizationTab={setAvatarCustomizationTab}
      saveData={saveData}
      saveAvatarConfig={saveAvatarConfig}
      avatarSaveLoading={avatarSaveLoading}
      avatarSaveSuccess={avatarSaveSuccess}
    />
  );

  // renderAvatar code fully extracted to AvatarView component

  const renderSettings = () => (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-800 p-4 md:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <button onClick={goBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>Settings</h1>
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
                  <button onClick={() => navigateTo('my-collections')} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                    <Star className="w-4 h-4 text-yellow-400" /> Collections
                  </button>
                  <button onClick={goHome} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                    Home
                  </button>
                </div>
            </div>
            <div className="space-y-4">
                {/* Account Section */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white" style={{ fontFamily: 'var(--font-bubblegum)' }}>Account</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${!user ? 'bg-slate-200 dark:bg-slate-700' : 'bg-blue-100 dark:bg-blue-900'}`}>
                                <User className={`w-5 h-5 ${!user ? 'text-slate-400' : 'text-blue-600 dark:text-blue-400'}`} />
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                                    {user ? (user.email || "Signed In") : "Guest User"}
                                </p>
                                <p className="text-xs text-slate-400">
                                    {!user ? "Progress not saved" : "Synced to cloud ☁️"}
                                </p>
                            </div>
                            {isSaving && (
                                <Loader className="w-4 h-4 text-blue-500 animate-spin" />
                            )}
                        </div>
                        
                        {!user ? (
                            <button 
                                onClick={handleLogin}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                            >
                                <LogIn className="w-4 h-4" /> Sign in to Save Progress
                            </button>
                        ) : (
                            <button 
                                onClick={handleLogout}
                                className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                            >
                                <LogOut className="w-4 h-4" /> Sign Out
                            </button>
                        )}
                    </div>
                </div>

                {/* Beta Tester Signup Link */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-2xl shadow-sm border-2 border-purple-200 dark:border-purple-700">
                    <div className="flex items-start gap-3 mb-3">
                        <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white">🚀 Beta Tester Program</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Help shape the future of Nugget School! Get early access.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigateTo('beta-signup')}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                        <Rocket className="w-4 h-4" /> Join Beta Program
                    </button>
                </div>

                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-2">Gemini API Key</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Required for AI-generated facts and activities. Get yours at <a href="https://ai.google.dev/" target="_blank" className="text-blue-500 hover:underline">ai.google.dev</a></p>
                    <div className="flex gap-2">
                        <input 
                            type="password" 
                            value={apiKey} 
                            onChange={e => setApiKey(e.target.value)} 
                            className="flex-1 p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            placeholder="Paste your key here..." 
                        />
                        <button 
                            onClick={() => {
                                localStorage.setItem('gemini_api_key', apiKey);
                                showNotification("API Key Saved!");
                            }}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
                        >
                            Save
                        </button>
                    </div>
                </div>
                
                {/* Pre-generate Nuggets Section */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 p-6 rounded-2xl shadow-sm border-2 border-yellow-200 dark:border-yellow-700">
                    <div className="flex items-start gap-3 mb-3">
                        <Rocket className="w-6 h-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="font-bold text-slate-800 dark:text-white">⚡ Speed Boost</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Pre-generate facts for all topics so they load instantly! Takes ~5-10 minutes in the background.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => {
                            if (!apiKey) {
                                showNotification("Add API Key first!");
                                return;
                            }
                            preGenerateNuggets();
                            showNotification("⚡ Pre-generation started! Check console for progress.");
                        }}
                        disabled={!apiKey || isPreGenerating}
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-slate-300 disabled:to-slate-300 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md disabled:cursor-not-allowed"
                    >
                        {isPreGenerating ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" /> Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4" /> Pre-generate All Topics
                            </>
                        )}
                    </button>
                </div>
                
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-800 dark:text-white">Dark Mode</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Toggle dark theme</p>
                    </div>
                    <button onClick={() => { 
                        const newMode = !darkMode;
                        setDarkMode(newMode); 
                        saveData({ darkMode: newMode });
                    }} className={`w-14 h-8 rounded-full p-1 transition-colors ${darkMode ? 'bg-blue-600' : 'bg-slate-200'}`}>
                        <div className={`w-6 h-6 bg-white rounded-full shadow-sm transition-transform ${darkMode ? 'translate-x-6' : ''} flex items-center justify-center`}>
                            {darkMode ? <Moon className="w-3 h-3 text-blue-600" /> : <Sun className="w-3 h-3 text-orange-500" />}
                        </div>
                    </button>
                </div>
                
                <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                    <h3 className="font-bold text-red-800 dark:text-red-400 mb-2">Danger Zone</h3>
                    <p className="text-sm text-red-600 dark:text-red-400 mb-3">This will delete all your collected nuggets and words.</p>
                    <button 
                        onClick={() => { 
                            if(confirm("Are you sure? This cannot be undone!")) { 
                                localStorage.clear(); 
                                window.location.reload(); 
                            } 
                        }} 
                        className="text-red-600 dark:text-red-400 text-sm font-bold hover:underline"
                    >
                        Clear All Data
                    </button>
                </div>
            </div>
          </div>
      </div>
  );

  return (
    <>
      <GlobalStyles />
      {notification && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-6 py-3 rounded-full shadow-2xl z-[100] font-bold flex items-center gap-3 animate-pop">
              <Sparkles className="w-5 h-5 text-yellow-400" /> {notification}
          </div>
      )}
      
      {view === 'home' && renderHome()}
      
      {/* My Collections Hub */}
      {view === 'my-collections' && (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button onClick={goBack} className="p-2 bg-white/90 dark:bg-slate-800 rounded-full shadow-md hover:shadow-lg transition-all">
                  <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                </button>
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                  My Collections
                </h1>
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
                <button onClick={goHome} className="px-4 py-2 bg-white/90 dark:bg-slate-800 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                  Home
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Nuggets Collection Card */}
              <button
                onClick={() => navigateTo('collection')}
                className="group bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all p-8 flex flex-col items-center gap-4 border-2 border-transparent hover:border-yellow-400 dark:hover:border-yellow-500 active:scale-95"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Star className="w-10 h-10 text-white fill-white" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'var(--font-bubblegum)' }}>Nuggets</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                    Cool Facts
                  </p>
                  <div className="inline-flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-4 py-2 rounded-full font-bold">
                    <span className="text-2xl">{collection.length}</span>
                    <span className="text-sm">saved</span>
                  </div>
                </div>
              </button>

              {/* Missions Collection Card */}
              <button
                onClick={() => navigateTo('activities')}
                className="group bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all p-8 flex flex-col items-center gap-4 border-2 border-transparent hover:border-orange-400 dark:hover:border-orange-500 active:scale-95"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-red-400 flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'var(--font-bubblegum)' }}>Missions</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                    Fun Activities
                  </p>
                  <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full font-bold">
                    <span className="text-2xl">{activityCollection.length}</span>
                    <span className="text-sm">missions</span>
                  </div>
                </div>
              </button>

              {/* Words Collection Card */}
              <button
                onClick={() => navigateTo('word-bank')}
                className="group bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl transition-all p-8 flex flex-col items-center gap-4 border-2 border-transparent hover:border-emerald-400 dark:hover:border-emerald-500 active:scale-95"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen className="w-10 h-10 text-white" />
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2" style={{ fontFamily: 'var(--font-bubblegum)' }}>Words</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                    Interesting Words
                  </p>
                  <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full font-bold">
                    <span className="text-2xl">{wordCollection.length}</span>
                    <span className="text-sm">saved</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Empty State Message */}
            {collection.length === 0 && activityCollection.length === 0 && wordCollection.length === 0 && (
              <div className="text-center mt-12 p-8 bg-white/50 dark:bg-slate-800/50 rounded-3xl">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2" style={{ fontFamily: 'var(--font-bubblegum)' }}>
                  Start Your Collection!
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Explore topics and collect nuggets, activities, and words as you learn.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {view === 'subject-menu' && (
        <SubjectMenuView
          selectedSubject={selectedSubject}
          topicSearchQuery={topicSearchQuery}
          setTopicSearchQuery={setTopicSearchQuery}
          apiKey={apiKey}
          generateNuggetByTag={generateNuggetByTag}
          handleVoiceInput={handleVoiceInput}
          isListening={isListening}
          setSelectedCurriculumTopic={setSelectedCurriculumTopic}
          navigateTo={navigateTo}
          avatarNuggetType={avatarNuggetType}
          selectedAccessories={selectedAccessories}
          accessoryOptions={accessoryOptions}
          baseNuggetImg={baseNuggetImg}
          spicyNuggetImg={spicyNuggetImg}
          goBack={goBack}
          goHome={goHome}
          showNotification={showNotification}
          pickRandomFromSubject={pickRandomFromSubject}
        />
      )}
      {view === 'curriculum' && renderCurriculum()}
      {view === 'nugget' && renderNugget()}
      {view === 'collection' && (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-800 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => navigateTo('my-collections')} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-bubblegum)' }}>My Nugget Collection</h1>
              </div>
              <button onClick={goHome} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                Home
              </button>
            </div>
            
            {collection.length >= 5 && (
              <div className="mb-6">
                <button
                  onClick={startCollectionQuiz}
                  disabled={aiLoading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-yellow-900 font-black text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {aiLoading ? (
                    <>
                      <Loader className="w-6 h-6 animate-spin" />
                      Preparing Questions...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Ask About My Collection!
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                        +20 Crumbs
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {collection.length < 5 && (
              <div className="mb-6 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/20 dark:to-amber-900/20 border-2 border-yellow-300 dark:border-yellow-700 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-400 dark:bg-yellow-600 p-2 rounded-full">
                    <Sparkles className="w-5 h-5 text-yellow-900 dark:text-yellow-100" />
                  </div>
                  <div>
                    <p className="font-black text-yellow-900 dark:text-yellow-100 text-sm">Unlock a Challenge!</p>
                    <p className="text-yellow-700 dark:text-yellow-300 text-xs font-semibold">Collect 5 nuggets to start</p>
                  </div>
                </div>
                <div className="bg-yellow-400 dark:bg-yellow-600 px-4 py-2 rounded-full">
                  <span className="font-black text-yellow-900 dark:text-yellow-100 text-lg">{collection.length}/5</span>
                </div>
              </div>
            )}
            
            {collection.length === 0 ? (
              <div className="text-center py-20 opacity-50">
                <div className="w-24 h-24 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-4 flex items-center justify-center"><Search className="w-10 h-10 text-slate-400" /></div>
                <p className="font-bold text-xl text-slate-600 dark:text-slate-400">No nuggets collected yet!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {collection.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col gap-4 group hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-start">
                      <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">{item.tags[0]}</span>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <p className="font-medium text-lg dark:text-white line-clamp-3 leading-relaxed">{item.text}</p>
                    {item.userThoughts && (
                      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-xl p-3">
                        <p className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-1">My Thoughts:</p>
                        <p className="text-sm text-purple-900 dark:text-purple-200 italic">{item.userThoughts}</p>
                      </div>
                    )}
                    <div className="flex gap-2 mt-auto">
                      <button onClick={() => { setCurrentNugget(item); setLearnResponse(null); setActivityResponse(null); setActivityImage(null); setAiResponse(null); navigateTo('nugget'); }} className="flex-1 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-bold rounded-lg text-sm hover:bg-blue-100 transition-colors">Open</button>
                  <button 
                    onClick={() => {
                        const newCollection = collection.filter(n => n.id !== item.id);
                        saveCollection(newCollection);
                        showNotification("Removed from collection");
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )}
      {view === 'shop' && renderGridPage("Accessories Shop", SHOP_ITEMS, (item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-4">
              <div className="w-32 h-32 flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                  <h3 className="font-bold dark:text-white">{item.name}</h3>
                  <p className={`text-sm font-bold ${item.currency === 'crumbs' ? 'text-orange-500' : 'text-slate-400'}`}>
                      {item.cost === 0 ? 'Welcome Gift!' : `${item.cost} Crumbs`}
                  </p>
              </div>
              <button 
                disabled={inventory.includes(item.id)}
                onClick={() => {
                    if (inventory.includes(item.id)) return;
                    const newInv = [...inventory, item.id];
                    if (item.currency === 'free') {
                        setInventory(newInv);
                        saveData({ inventory: newInv });
                        showNotification(`Got ${item.name}!`);
                    } else if (item.currency === 'crumbs' && crumbs >= item.cost) { 
                        updateCrumbs(-item.cost); 
                        setInventory(newInv);
                        saveData({ inventory: newInv });
                        showNotification(`Purchased ${item.name}!`); 
                    } else {
                        showNotification("Not enough Crumbs!");
                    }
                }}
                className={`w-full py-2 rounded-lg font-bold text-sm ${inventory.includes(item.id) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg cursor-pointer'}`}
              >
                {inventory.includes(item.id) ? 'Unlocked!' : 'Buy'}
              </button>
          </div>
      ), "Check back later for more!")}
      {view === 'word-bank' && (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-800 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => navigateTo('my-collections')} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight" style={{ fontFamily: 'var(--font-bubblegum)' }}>Word Collection</h1>
              </div>
              <button onClick={goHome} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                Home
              </button>
            </div>
            
            {wordCollection.length >= 5 && (
              <div className="mb-6">
                <button
                  onClick={startWordQuiz}
                  disabled={aiLoading}
                  className="w-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {aiLoading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating Challenge...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                      Ask About My Collection!
                      <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                        +20 Crumbs
                      </span>
                    </>
                  )}
                </button>
              </div>
            )}

            {wordCollection.length < 5 && (
              <div className="mb-6 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-400 dark:bg-emerald-600 p-2 rounded-full">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-emerald-900 dark:text-emerald-100 text-sm">Unlock a Challenge!</p>
                    <p className="text-emerald-700 dark:text-emerald-300 text-xs font-semibold">Collect 5 words to start</p>
                  </div>
                </div>
                <div className="bg-emerald-400 dark:bg-emerald-600 px-4 py-2 rounded-full">
                  <span className="font-black text-white text-lg">{wordCollection.length}/5</span>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wordCollection.length > 0 ? (
                wordCollection.map((item, i) => (
                  <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border-l-4 border-emerald-500 dark:border-emerald-400">
                    <h3 className="font-bold text-lg text-emerald-600 dark:text-emerald-400 mb-1">{item.word}</h3>
                    <p className="text-slate-600 dark:text-slate-300 italic text-sm">"{item.definition}"</p>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <BookOpen className="w-16 h-16 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                  <p className="text-slate-500 dark:text-slate-400 text-lg">Click green words in nuggets to collect them!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {view === 'activities' && renderGridPage("Mission Log", activityCollection, (item) => {
          const isExpanded = expandedMissions.includes(item.id);
          return (
            <div key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 border-orange-200 dark:border-orange-700 overflow-hidden transition-all">
              {/* Collapsed View - Always Visible */}
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-orange-600 dark:text-orange-400 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      From: {item.nuggetText?.substring(0, 60)}{item.nuggetText?.length > 60 ? '...' : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                          const newCollection = activityCollection.filter(a => a.id !== item.id);
                          saveActivityCollection(newCollection);
                          showNotification("Mission removed");
                      }}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Remove mission"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {/* Do It! Button */}
                <button
                  onClick={() => {
                    if (isExpanded) {
                      setExpandedMissions(expandedMissions.filter(id => id !== item.id));
                    } else {
                      setExpandedMissions([...expandedMissions, item.id]);
                    }
                  }}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <Rocket className={`w-5 h-5 ${isExpanded ? 'rotate-180' : ''} transition-transform`} />
                  {isExpanded ? 'Hide Details' : 'Do It!'}
                </button>
              </div>

              {/* Expanded View - Shows when clicked */}
              {isExpanded && (
                <div className="border-t border-orange-200 dark:border-orange-700 p-6 bg-orange-50/50 dark:bg-orange-900/10 space-y-4 animate-pop">
                  {item.image && (
                    <div className="rounded-xl overflow-hidden aspect-video -mx-6 -mt-6 mb-4">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                    </div>
                  )}
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 p-3 rounded-lg flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                    <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">Adult supervision may be required</p>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                    <div className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase mb-3 flex items-center gap-2">
                      <Square className="w-4 h-4" /> Supplies Needed
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.supplies?.map((s, i) => (
                        <span key={i} className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1.5 rounded-full text-sm font-medium">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-orange-200 dark:border-orange-700">
                    <div className="text-sm font-bold text-orange-600 dark:text-orange-400 uppercase mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4" /> Mission Steps
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-slate-700 dark:text-slate-300">
                      {item.steps?.map((step, i) => (
                        <li key={i} className="pl-2 leading-relaxed">
                          {step.replace(/\*\*/g, '').replace(/###/g, '')}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              )}
            </div>
          );
      }, "Save missions from nuggets to see them here!")}
      {view === 'avatar' && renderAvatar()}
      {view === 'settings' && renderSettings()}
      {view === 'beta-signup' && <BetaSignup goBack={goBack} darkMode={darkMode} />}
      
      {renderShowMeModal()}
      {renderEnlargedImage()}
      
      {/* Guide Chat Modal */}
      {showGuideChat && selectedGuide && (
        <GuideChatModal
          selectedGuide={selectedGuide}
          guideChatMessages={guideChatMessages}
          guideChatInput={guideChatInput}
          setGuideChatInput={setGuideChatInput}
          guideChatLoading={guideChatLoading}
          isListening={isListening}
          sendGuideMessage={sendGuideMessage}
          handleVoiceInput={handleVoiceInput}
          user={user}
          onClose={() => setShowGuideChat(false)}
        />
      )}
      
      {/* Stardust Question Modal */}
      {showStardustQuiz && (
        <StardustQuizModal
          stardustQuestion={stardustQuestion}
          stardustQuizLoading={stardustQuizLoading}
          stardustQuizSubmitted={stardustQuizSubmitted}
          freeformAnswer={freeformAnswer}
          setFreeformAnswer={setFreeformAnswer}
          selectedStardustAnswer={selectedStardustAnswer}
          setSelectedStardustAnswer={setSelectedStardustAnswer}
          wrongAnswers={wrongAnswers}
          setWrongAnswers={setWrongAnswers}
          isListening={isListening}
          startListening={startListening}
          isValidTextInput={isValidTextInput}
          currentNugget={currentNugget}
          collection={collection}
          saveCollection={saveCollection}
          updateCrumbs={updateCrumbs}
          showNotification={showNotification}
          setShowStardustQuiz={setShowStardustQuiz}
          setStardustQuestion={setStardustQuestion}
          setStardustQuizSubmitted={setStardustQuizSubmitted}
        />
      )}
      
      {/* Collection Challenge Modal */}
      {showCollectionQuiz && collectionQuizQuestions.length > 0 && (
        <CollectionQuizModal
          collectionQuizQuestions={collectionQuizQuestions}
          currentCollectionQuestionIndex={currentCollectionQuestionIndex}
          setCurrentCollectionQuestionIndex={setCurrentCollectionQuestionIndex}
          selectedCollectionAnswer={selectedCollectionAnswer}
          setSelectedCollectionAnswer={setSelectedCollectionAnswer}
          collectionQuizWrongAnswers={collectionQuizWrongAnswers}
          setCollectionQuizWrongAnswers={setCollectionQuizWrongAnswers}
          collectionQuizCorrect={collectionQuizCorrect}
          setCollectionQuizCorrect={setCollectionQuizCorrect}
          updateCrumbs={updateCrumbs}
          showNotification={showNotification}
          setShowCollectionQuiz={setShowCollectionQuiz}
          setCollectionQuizQuestions={setCollectionQuizQuestions}
        />
      )}
      
      {/* Word Challenge Modal */}
      {showWordQuiz && wordQuizQuestions.length > 0 && (
        <WordQuizModal
          wordQuizQuestions={wordQuizQuestions}
          currentWordQuestionIndex={currentWordQuestionIndex}
          setCurrentWordQuestionIndex={setCurrentWordQuestionIndex}
          selectedWordAnswer={selectedWordAnswer}
          setSelectedWordAnswer={setSelectedWordAnswer}
          wordQuizWrongAnswers={wordQuizWrongAnswers}
          setWordQuizWrongAnswers={setWordQuizWrongAnswers}
          wordQuizSubmitted={wordQuizSubmitted}
          setWordQuizSubmitted={setWordQuizSubmitted}
          updateCrumbs={updateCrumbs}
          showNotification={showNotification}
          setShowWordQuiz={setShowWordQuiz}
          setWordQuizQuestions={setWordQuizQuestions}
        />
      )}
      
      {showAuthModal && (
        <AuthModal 
          supabase={supabase}
          onClose={() => setShowAuthModal(false)}
          onSuccess={(message) => {
            setShowAuthModal(false);
            showNotification(message);
          }}
        />
      )}
    </>
  );
}
