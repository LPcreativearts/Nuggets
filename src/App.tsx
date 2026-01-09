// GitHub sync test - January 7, 2026
import React, { useState, useEffect } from 'react';
import { 
    Rocket, Cloud, Star, BookOpen, Music, Palette, Briefcase, Microscope, 
    Calculator, Settings, X, Sparkles, Map as MapIcon, Heart, ArrowLeft, Brain, 
    ShoppingBag, Edit3, Volume2, Image as ImageIcon, Loader, ExternalLink, 
    Square, Search, Trophy, Check, Mic, Shuffle, Moon, Sun, Cookie, HelpCircle, ArrowRight,
    Maximize2, Minimize2, Book, History as HistoryIcon, Lock, Grid, Trash2, Menu, LogIn, LogOut, User, AlertTriangle, Pencil
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { AuthModal } from './components/AuthModal';

// -----------------------------------------------------------------------------
// 🔧 PARENT SETUP: 
// Paste your API Key inside the quotes below to keep it saved permanently.
const HARDCODED_API_KEY = "AIzaSyCDj5t42zj_MgbBR33Zk6QRSWEMhi4pWns"; 
// -----------------------------------------------------------------------------

// --- Supabase Setup ---
const supabaseUrl = `https://${projectId}.supabase.co`;
const supabase = createClient(supabaseUrl, publicAnonKey);

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
        background-color: #f8fafc;
        background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
        background-size: 20px 20px;
    }
    .dark .pattern-bg {
        background-color: #0f172a;
        background-image: radial-gradient(#1e293b 1px, transparent 1px);
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
const SUBJECTS = [
  { 
      id: 'science', name: 'Science', icon: Microscope, 
      color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200', border: 'border-emerald-300 dark:border-emerald-700', 
      subtopics: ["Scientific Method", "Black Holes", "Carnivorous Plants", "Deep Sea Creatures", "Robots", "Slime", "Dinosaurs", "Volcanoes", "Magnets"],
      imgTerm: "Microscope" 
  },
  { 
      id: 'history', name: 'History', icon: MapIcon, 
      color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200', border: 'border-amber-300 dark:border-amber-700', 
      subtopics: ["Ancient Civilizations", "Mummies", "Vikings", "Pirates", "Secret Spies", "Titanic", "Castles", "Knights", "Early Humans"],
      imgTerm: "Ancient history"
  },
  { 
      id: 'math', name: 'Numbers', icon: Calculator, 
      color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200', border: 'border-blue-300 dark:border-blue-700', 
      subtopics: ["Elements of Math", "Infinity", "Secret Codes", "Fractals", "Impossible Shapes", "Zero", "Speed of Light", "Logic Puzzles", "Symmetry"],
      imgTerm: "Abacus"
  },
  { 
      id: 'art', name: 'Art', icon: Palette, 
      color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200', border: 'border-purple-300 dark:border-purple-700', 
      subtopics: ["Elements of Art", "Famous Works of Art", "Art Movements", "Prehistoric Art", "Optical Illusions", "Pixel Art", "Invisible Ink", "Street Art", "Sculpture", "Color Theory", "Origami", "Pottery"],
      imgTerm: "The Starry Night"
  },
  { 
      id: 'music', name: 'Music', icon: Music, 
      color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-200', border: 'border-rose-300 dark:border-rose-700', 
      subtopics: ["Elements of Music", "Weird Instruments", "Video Game Music", "Animal Sounds", "Synthesizers", "Rhythm", "Movie Soundtracks", "Beatboxing", "Drums"],
      imgTerm: "Orchestra"
  },
  { 
      id: 'career', name: 'Careers', icon: Briefcase, 
      color: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200', border: 'border-slate-300 dark:border-slate-600', 
      subtopics: ["Lego Master", "Video Game Tester", "Astronaut", "Paleontologist", "Special Effects", "Animal Rescuer", "Firefighter", "Robot Engineer"],
      imgTerm: "Astronaut"
  },
  { 
      id: 'words', name: 'Words', icon: Edit3, 
      color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-200', border: 'border-pink-300 dark:border-pink-700', 
      subtopics: ["Elements of Language", "Silly Words", "Secret Languages", "Jokes", "Ancient Writing", "Tongue Twisters", "Palindromes", "Hieroglyphics", "Storytelling"],
      imgTerm: "Calligraphy"
  },
];

// Subtopic Image Mapping - Using Unsplash for better visuals
const SUBTOPIC_IMAGES = {
  "Scientific Method": "https://images.unsplash.com/photo-1608037222011-cbf484177126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeSUyMGV4cGVyaW1lbnR8ZW58MXx8fHwxNzY3NzQ2NjM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Robots": "https://images.unsplash.com/photo-1760629863094-5b1e8d1aae74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByb2JvdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY3NzQ2NjM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Slime": "https://images.unsplash.com/photo-1642035271471-c2f7778908d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNsaW1lJTIwaGFuZHN8ZW58MXx8fHwxNzY3NzQ2NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Secret Spies": "https://images.unsplash.com/photo-1610449257708-7221b0b39687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHklMjBkZXRlY3RpdmV8ZW58MXx8fHwxNzY3NzQ2NjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Elements of Math": "https://images.unsplash.com/photo-1758685733737-71f8945decf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljYWwlMjBlcXVhdGlvbnMlMjBjaGFsa2JvYXJkfGVufDF8fHx8MTc2Nzc0NjYzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Infinity": "https://images.unsplash.com/photo-1624545607101-17159c56a3c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZpbml0eSUyMHN5bWJvbCUyMHNwaXJhbHxlbnwxfHx8fDE3Njc3NDY2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Secret Codes": "https://images.unsplash.com/photo-1633185075416-c9ef98858411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9ncmFwaHklMjBjb2Rlc3xlbnwxfHx8fDE3Njc3NDY2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Impossible Shapes": "https://images.unsplash.com/photo-1741997852885-33c22514e034?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcHRpY2FsJTIwaWxsdXNpb24lMjBnZW9tZXRyeXxlbnwxfHx8fDE3Njc3NDY2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Zero": "https://images.unsplash.com/photo-1623307019152-1ee797183f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxudW1iZXIlMjB6ZXJvJTIwbmVvbnxlbnwxfHx8fDE3Njc3NDY2Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Elements of Art": "https://images.unsplash.com/photo-1705154807723-febfd54e0478?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMGJydXNoZXMlMjBwYWxldHRlfGVufDF8fHx8MTc2Nzc0NjYzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Famous Works of Art": "https://images.unsplash.com/photo-1707261633952-79e36ccd2115?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1vdXMlMjBwYWludGluZyUyMG11c2V1bXxlbnwxfHx8fDE3Njc3NDY2Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Art Movements": "https://images.unsplash.com/photo-1656332694799-5fd721c0c2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMG1vZGVybiUyMGFydHxlbnwxfHx8fDE3Njc3MjYyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Street Art": "https://images.unsplash.com/photo-1628522994788-53bc1b1502c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBhcnQlMjBncmFmZml0aXxlbnwxfHx8fDE3Njc2OTY0NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Sculpture": "https://images.unsplash.com/photo-1683918891988-caf13254fbe2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBzY3VscHR1cmUlMjBzdGF0dWV8ZW58MXx8fHwxNzY3NzQ2NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Weird Instruments": "https://images.unsplash.com/photo-1762300422098-433973c90357?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bnVzdWFsJTIwbXVzaWNhbCUyMGluc3RydW1lbnR8ZW58MXx8fHwxNzY3NzQ2NjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Video Game Music": "https://images.unsplash.com/photo-1584013979505-67ba6e45cfda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMHZpZGVvJTIwZ2FtZXxlbnwxfHx8fDE3Njc3NDY2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Animal Sounds": "https://images.unsplash.com/photo-1702323447893-949e93cb51ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjB3aWxkbGlmZSUyMHNvdW5kc3xlbnwxfHx8fDE3Njc3NDY2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Rhythm": "https://images.unsplash.com/photo-1612549354052-a91bd7d0bff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtJTIwcmh5dGhtJTIwbXVzaWN8ZW58MXx8fHwxNzY3NzQ2NjQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Movie Soundtracks": "https://images.unsplash.com/photo-1739433437912-cca661ba902f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzY3NzM4MjU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Lego Master": "https://images.unsplash.com/photo-1633469924738-52101af51d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGxlZ28lMjBibG9ja3N8ZW58MXx8fHwxNzY3NzQ2NjQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Video Game Tester": "https://images.unsplash.com/photo-1610458131353-1f3f843bb0d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyJTIwZGVza3xlbnwxfHx8fDE3Njc3NDY2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Animal Rescuer": "https://images.unsplash.com/photo-1759164955427-14ca448a839d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBhbmltYWwlMjBjYXJlfGVufDF8fHx8MTc2Nzc0NjY0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Elements of Language": "https://images.unsplash.com/photo-1620862425686-465a01345cd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBoYWJldCUyMGxldHRlcnMlMjB0eXBvZ3JhcGh5fGVufDF8fHx8MTc2Nzc0NjY0Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Silly Words": "https://images.unsplash.com/photo-1667980432734-0e662dd989c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWN0aW9uYXJ5JTIwY3JlYXRpdmUlMjB3b3Jkc3xlbnwxfHx8fDE3Njc3NDY2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Secret Languages": "https://images.unsplash.com/photo-1519162721257-18cd195350c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWduJTIwbGFuZ3VhZ2UlMjBjb21tdW5pY2F0aW9ufGVufDF8fHx8MTc2NzY5MDAyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Tongue Twisters": "https://images.unsplash.com/photo-1648204068800-cfcfb9d814ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2luZyUyMG1vdXRoJTIwZXhwcmVzc2lvbnxlbnwxfHx8fDE3Njc3NDY2NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Ancient Writing": "https://images.unsplash.com/photo-1655923478826-ef7c2d40820e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwaGllcm9nbHlwaGljcyUyMHdyaXRpbmd8ZW58MXx8fHwxNzY3NzQ2NjQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Early Humans": "https://images.unsplash.com/photo-1647705777154-178dafd1e2d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXZlJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzY3ODMxNTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

// Curriculum Topics - Special topics with sub-categories and timelines
const CURRICULUM_TOPICS = {
  "Ancient Civilizations": {
    id: "ancient-civilizations",
    name: "Ancient Civilizations",
    description: "Journey through time to explore the great civilizations that shaped our world",
    timeline: [
      { name: "Mesopotamia", period: "3500-500 BCE", years: "3500 BCE", color: "bg-amber-600", region: "Middle East" },
      { name: "Ancient India", period: "3300 BCE - 500 CE", years: "3300 BCE", color: "bg-amber-700", region: "Middle East" },
      { name: "Ancient Egypt", period: "3100-30 BCE", years: "3100 BCE", color: "bg-purple-600", region: "Africa" },
      { name: "Ancient Greece", period: "2700-146 BCE", years: "2700 BCE", color: "bg-blue-600", region: "Europe" },
      { name: "Ancient China", period: "2070 BCE - 220 CE", years: "2070 BCE", color: "bg-red-600", region: "Asia" },
      { name: "Maya Civilization", period: "2000 BCE - 1500 CE", years: "2000 BCE", color: "bg-green-700", region: "Americas" },
      { name: "Kingdom of Kush", period: "1070 BCE - 350 CE", years: "1070 BCE", color: "bg-purple-500", region: "Africa" },
      { name: "Ancient Rome", period: "753 BCE - 476 CE", years: "753 BCE", color: "bg-blue-500", region: "Europe" },
      { name: "Ancient Japan", period: "300 BCE - 1868 CE", years: "300 BCE", color: "bg-red-500", region: "Asia" },
    ],
    subTopics: [
      { name: "Middle East", image: "https://images.unsplash.com/photo-1763590897919-308cf0973853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNaWRkbGUlMjBFYXN0JTIwZGVzZXJ0JTIwYW5jaWVudCUyMHJ1aW5zfGVufDF8fHx8MTc2Nzg5ODAwNHww&ixlib=rb-4.1.0&q=80&w=1080", description: "Early civilizations of the Middle East" },
      { name: "Asia", image: "https://images.unsplash.com/photo-1767770801467-f2cff0fdf402?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBc2lhJTIwYW5jaWVudCUyMHRlbXBsZSUyMHBhZ29kYXxlbnwxfHx8fDE3Njc4OTgwMDR8MA&ixlib=rb-4.1.0&q=80&w=1080", description: "Ancient Asian civilizations" },
      { name: "Europe", image: "https://images.unsplash.com/photo-1728076992371-659f5540a27c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHcmVlayUyMHRlbXBsZSUyMEF0aGVucyUyMHJ1aW5zfGVufDF8fHx8MTc2Nzg5ODAwNHww&ixlib=rb-4.1.0&q=80&w=1080", description: "Classical European civilizations" },
      { name: "Americas", image: "https://images.unsplash.com/photo-1681686587641-45cd5bd876d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbWVyaWNhbiUyMHB5cmFtaWQlMjBNYXlhfGVufDF8fHx8MTc2Nzg5ODAwNXww&ixlib=rb-4.1.0&q=80&w=1080", description: "Pre-Columbian American civilizations" },
      { name: "Africa", image: "https://images.unsplash.com/photo-1760199078363-3c31058d5802?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2ElMjBzYXZhbm5hJTIwYW5jaWVudHxlbnwxfHx8fDE3Njc4OTgwMDV8MA&ixlib=rb-4.1.0&q=80&w=1080", description: "Ancient African kingdoms" },
      { name: "Mesopotamia", image: "https://images.unsplash.com/photo-1763590897919-308cf0973853?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXNvcG90YW1pYSUyMGFuY2llbnQlMjBydWluc3xlbnwxfHx8fDE3Njc4OTgwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080", description: "The cradle of civilization" },
      { name: "Ancient Egypt", image: "https://images.unsplash.com/photo-1630776212743-6d31601fd616?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFZ3lwdGlhbiUyMHB5cmFtaWRzJTIwc3BoaW54fGVufDF8fHx8MTc2Nzg5ODAwNnww&ixlib=rb-4.1.0&q=80&w=1080", description: "Land of pharaohs and pyramids" },
      { name: "Ancient India", image: "https://images.unsplash.com/photo-1668948824982-37c263b8dfb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxJbmRpYSUyMGFuY2llbnQlMjB0ZW1wbGV8ZW58MXx8fHwxNzY3ODk4MDA3fDA&ixlib=rb-4.1.0&q=80&w=1080", description: "From Indus Valley to Vedic period" },
      { name: "Ancient China", image: "https://images.unsplash.com/photo-1608037521244-f1c6c7635194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDaGluYSUyMEdyZWF0JTIwV2FsbHxlbnwxfHx8fDE3Njc4OTgwMDh8MA&ixlib=rb-4.1.0&q=80&w=1080", description: "Inventors and dynasties" },
      { name: "Ancient Japan", image: "https://images.unsplash.com/photo-1590414107400-14eb9dc03565?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKYXBhbiUyMHBhZ29kYSUyMGNhc3RsZXxlbnwxfHx8fDE3Njc4OTg1NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080", description: "Samurai and traditions" },
      { name: "Ancient Greece", image: "https://images.unsplash.com/photo-1649287710140-95a0dadf3a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHcmVlayUyMFBhcnRoZW5vbiUyMGNvbHVtbnN8ZW58MXx8fHwxNzY3ODk4MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080", description: "From Minoans to Classical Greece" },
      { name: "Ancient Rome", image: "https://images.unsplash.com/photo-1566983688369-1e1f002b6976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxSb21hbiUyMENvbG9zc2V1bSUyMGZvcnVtfGVufDF8fHx8MTc2Nzg5ODAwOHww&ixlib=rb-4.1.0&q=80&w=1080", description: "From kings to empire" },
      { name: "Kingdom of Kush", image: "https://images.unsplash.com/photo-1764685761992-a6bfb9f241ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxOdWJpYW4lMjBweXJhbWlkcyUyMFN1ZGFufGVufDF8fHx8MTc2Nzg5ODAwOHww&ixlib=rb-4.1.0&q=80&w=1080", description: "Nubian pharaohs and iron workers" },
      { name: "Maya Civilization", image: "https://images.unsplash.com/photo-1681686586861-19013ef8be90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYXlhJTIwcHlyYW1pZCUyMGp1bmdsZXxlbnwxfHx8fDE3Njc4OTgwMDl8MA&ixlib=rb-4.1.0&q=80&w=1080", description: "Calendar makers and astronomers" },
    ],
    type: "timeline"
  },
  "Elements of Language": {
    id: "elements-of-language",
    name: "Elements of Language",
    description: "Master the building blocks of reading and writing",
    subTopics: [
      { name: "Parts of Speech", emoji: "📝", description: "Nouns, verbs, and more", color: "bg-blue-500" },
      { name: "Sentence Structure", emoji: "🔗", description: "How sentences are built", color: "bg-purple-500" },
      { name: "Poetry", emoji: "✨", description: "Rhyme, rhythm, and verse", color: "bg-pink-500" },
      { name: "Persuasive Writing", emoji: "💬", description: "Convince and influence", color: "bg-orange-500" },
      { name: "Etymology", emoji: "🌱", description: "Word roots and origins", color: "bg-green-500" },
      { name: "Punctuation", emoji: "❗", description: "Marks that give meaning", color: "bg-yellow-500" },
      { name: "Literary Devices", emoji: "🎭", description: "Metaphors and similes", color: "bg-indigo-500" },
      { name: "Story Elements", emoji: "📖", description: "Plot, character, setting", color: "bg-red-500" },
    ],
    type: "grid"
  },
  "Elements of Math": {
    id: "elements-of-math",
    name: "Elements of Math",
    description: "Build your number skills from the ground up",
    subTopics: [
      { name: "Addition", emoji: "➕", description: "Combining numbers", color: "bg-green-500" },
      { name: "Subtraction", emoji: "➖", description: "Taking away", color: "bg-blue-500" },
      { name: "Multiplication", emoji: "✖️", description: "Repeated addition", color: "bg-purple-500" },
      { name: "Division", emoji: "➗", description: "Splitting into parts", color: "bg-orange-500" },
      { name: "Fractions", emoji: "½", description: "Parts of a whole", color: "bg-pink-500" },
      { name: "Decimals", emoji: "🔢", description: "Numbers with points", color: "bg-teal-500" },
      { name: "Geometry", emoji: "📐", description: "Shapes and space", color: "bg-indigo-500" },
      { name: "Measurement", emoji: "📏", description: "Size and quantity", color: "bg-yellow-500" },
    ],
    type: "grid"
  },
  "Scientific Method": {
    id: "scientific-method",
    name: "Scientific Method",
    description: "Learn how scientists discover new things",
    steps: [
      { name: "Ask a Question", emoji: "❓", description: "What do you want to know?", step: 1 },
      { name: "Research", emoji: "📚", description: "Learn what's already known", step: 2 },
      { name: "Hypothesis", emoji: "💡", description: "Make an educated guess", step: 3 },
      { name: "Experiment", emoji: "🔬", description: "Test your idea", step: 4 },
      { name: "Observe & Record", emoji: "📊", description: "Collect data carefully", step: 5 },
      { name: "Analyze Results", emoji: "🧮", description: "What does the data say?", step: 6 },
      { name: "Draw Conclusions", emoji: "✅", description: "Was your hypothesis right?", step: 7 },
      { name: "Share Findings", emoji: "📢", description: "Tell others what you learned", step: 8 },
    ],
    subTopics: [
      { name: "Variables", emoji: "🔄", description: "Things that change", color: "bg-blue-500" },
      { name: "Control Groups", emoji: "⚖️", description: "The comparison group", color: "bg-purple-500" },
      { name: "Data Collection", emoji: "📝", description: "Recording observations", color: "bg-green-500" },
      { name: "Lab Safety", emoji: "🥽", description: "Staying safe while experimenting", color: "bg-red-500" },
    ],
    type: "process"
  },
  "Elements of Music": {
    id: "elements-of-music",
    name: "Elements of Music",
    description: "Discover what makes music come alive",
    subTopics: [
      { name: "Rhythm", emoji: "🥁", description: "The beat and timing", color: "bg-red-500" },
      { name: "Melody", emoji: "🎵", description: "The tune you hum", color: "bg-blue-500" },
      { name: "Harmony", emoji: "🎹", description: "Notes played together", color: "bg-purple-500" },
      { name: "Tempo", emoji: "⏱️", description: "Fast or slow", color: "bg-orange-500" },
      { name: "Dynamics", emoji: "🔊", description: "Loud and soft", color: "bg-yellow-500" },
      { name: "Instruments of the Orchestra", emoji: "🎻", description: "Strings, brass, woodwinds", color: "bg-green-500" },
      { name: "Musical Notation", emoji: "🎼", description: "Reading sheet music", color: "bg-indigo-500" },
      { name: "Pitch", emoji: "🎤", description: "High and low sounds", color: "bg-pink-500" },
    ],
    type: "grid"
  },
  "Elements of Art": {
    id: "elements-of-art",
    name: "Elements of Art",
    description: "The building blocks artists use to create",
    subTopics: [
      { name: "Line", emoji: "📏", description: "Marks that connect points", color: "bg-slate-600" },
      { name: "Shape", emoji: "⭕", description: "2D enclosed spaces", color: "bg-blue-500" },
      { name: "Form", emoji: "🧊", description: "3D objects with depth", color: "bg-purple-500" },
      { name: "Color", emoji: "🎨", description: "Hue, value, and intensity", color: "bg-red-500" },
      { name: "Texture", emoji: "🖐️", description: "How things feel or look", color: "bg-yellow-500" },
      { name: "Space", emoji: "🌌", description: "Positive and negative areas", color: "bg-indigo-500" },
      { name: "Value", emoji: "◐", description: "Light and dark", color: "bg-gray-500" },
      { name: "Pattern", emoji: "🔲", description: "Repeated elements", color: "bg-teal-500" },
    ],
    type: "grid"
  }
};

const SHOP_ITEMS = [
  { id: 'partyhat', name: 'Party Hat', cost: 0, currency: 'free', icon: '🎉' },
  { id: 'glasses', name: 'Smart Specs', cost: 50, currency: 'crumbs', icon: '👓' },
  { id: 'tophat', name: 'Fancy Hat', cost: 100, currency: 'crumbs', icon: '🎩' },
  { id: 'crown', name: 'Gold Crown', cost: 20, currency: 'stardust', icon: '👑' },
];

const STARTER_NUGGETS = {
  science: [
    { text: "Octopuses have three hearts and blue blood.", tags: ["Octopuses"], searchTerm: "Octopus" },
    { text: "A teaspoon of a neutron star would weigh 6 billion tons.", tags: ["Neutron Star"], searchTerm: "Neutron star" },
    { text: "Bananas are slightly radioactive!", tags: ["Bananas"], searchTerm: "Banana" }
  ],
  history: [
    { text: "The Great Pyramids were built when woolly mammoths were still alive.", tags: ["Pyramids"], searchTerm: "Great Pyramid of Giza" },
    { text: "Vikings used a special crystal called a 'sunstone' to find the sun on cloudy days.", tags: ["Vikings"], searchTerm: "Viking ship" }
  ],
  math: [
    { text: "The number zero was invented in India.", tags: ["Zero"], searchTerm: "Aryabhata" },
    { text: "A 'jiffy' is an actual unit of time: 1/100th of a second.", tags: ["Time"], searchTerm: "Stopwatch" }
  ],
  art: [
    { text: "The color 'Mummy Brown' was originally made from actual Egyptian mummies.", tags: ["Paint"], searchTerm: "Mummy" },
    { text: "Vincent Van Gogh only sold one painting while he was alive.", tags: ["Van Gogh"], searchTerm: "The Starry Night" }
  ],
  music: [
    { text: "Termites eat wood twice as fast when listening to heavy metal music.", tags: ["Termites"], searchTerm: "Termite" },
    { text: "Your heartbeat changes to mimic the music you listen to.", tags: ["Heartbeat"], searchTerm: "Human heart" }
  ],
  career: [
    { text: "There is a job called a 'Snake Milker' who collects venom for medicine.", tags: ["Snakes"], searchTerm: "Snake venom" },
    { text: "Lego Sculptors are professionals who get paid to build Lego sets.", tags: ["Lego"], searchTerm: "Lego" }
  ],
  words: [
    { text: "The word 'bookkeeper' is the only unhyphenated word with three double letters in a row.", tags: ["Bookkeeper"], searchTerm: "Bookkeeping" },
    { text: "Ghost words are words that ended up in the dictionary by mistake.", tags: ["Dictionaries"], searchTerm: "Dictionary" }
  ]
};

// --- Helper Functions ---
const fetchWikipediaImage = async (term) => {
    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrlimit=1&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=600&format=json&origin=*`);
        const data = await response.json();
        const pages = data.query?.pages;
        if (pages) {
            const pageId = Object.keys(pages)[0];
            if (pageId !== "-1" && pages[pageId].thumbnail) {
                return {
                    url: pages[pageId].thumbnail.source,
                    title: pages[pageId].title,
                    description: pages[pageId].terms?.description ? pages[pageId].terms.description[0] : null
                };
            }
        }
    } catch (e) { }
    return null;
};

// --- Reusable Components ---

const SubtopicCard = ({ subtopic, onClick }) => {
    const [imageUrl, setImageUrl] = useState(null);
    const isCurriculum = CURRICULUM_TOPICS[subtopic] ? true : false;

    useEffect(() => {
        let isMounted = true;
        const cacheKey = `img_subtopic_${subtopic}`;
        const fetchImage = async () => {
            // Check if there's a predefined Unsplash image first
            if (SUBTOPIC_IMAGES[subtopic]) {
                if (isMounted) setImageUrl(SUBTOPIC_IMAGES[subtopic]);
                localStorage.setItem(cacheKey, SUBTOPIC_IMAGES[subtopic]);
                return;
            }
            
            // Otherwise check cache
            const cached = localStorage.getItem(cacheKey);
            if (cached) { if (isMounted) setImageUrl(cached); return; }
            
            // Fallback to Wikipedia
            const imgData = await fetchWikipediaImage(subtopic);
            if (isMounted && imgData) {
                setImageUrl(imgData.url);
                localStorage.setItem(cacheKey, imgData.url);
            }
        };
        fetchImage();
        return () => { isMounted = false; };
    }, [subtopic]);

    return (
        <button onClick={onClick} className={`group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl shadow-sm border-2 ${isCurriculum ? 'border-yellow-400 dark:border-yellow-500 shadow-yellow-400/20 shadow-lg' : 'border-slate-200 dark:border-slate-700'} hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center text-center h-32 md:h-40 w-full animate-pop`}>
            {isCurriculum && (
                <div className="absolute -top-1 -right-1 z-20">
                    <div className="bg-yellow-400 dark:bg-yellow-500 text-yellow-900 dark:text-yellow-950 px-2 py-0.5 rounded-bl-lg rounded-tr-xl text-xs font-black uppercase tracking-wider shadow-md">
                        ⭐
                    </div>
                </div>
            )}
            {imageUrl ? (
                <>
                    <div className="absolute inset-0">
                        <img src={imageUrl} alt={subtopic} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                        <div className={`absolute inset-0 ${isCurriculum ? 'bg-gradient-to-br from-yellow-600/40 via-black/40 to-black/40' : 'bg-black/40'} group-hover:bg-black/30 transition-colors`} />
                    </div>
                    <span className="relative z-10 font-bold text-white text-lg md:text-xl drop-shadow-md px-2 leading-tight">{subtopic}</span>
                </>
            ) : (
                <>
                    <Sparkles className={`w-6 h-6 mb-2 ${isCurriculum ? 'text-yellow-400 dark:text-yellow-500' : 'text-slate-300 dark:text-slate-600'}`} />
                    <span className="font-bold text-slate-600 dark:text-slate-300 px-4">{subtopic}</span>
                </>
            )}
        </button>
    );
};

const SurpriseNuggetButton = ({ onClick, subjectName }) => (
    <button onClick={onClick} className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 p-1 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all group">
        <div className="absolute inset-0 bg-white/20 group-hover:bg-white/10 transition-colors" />
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center gap-3 h-full">
            <Shuffle className="w-6 h-6 text-orange-600 dark:text-orange-400 group-hover:rotate-180 transition-transform duration-500" />
            <div className="text-left">
                <div className="font-black text-slate-800 dark:text-white uppercase tracking-wider text-sm">Surprise Me</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Random {subjectName || 'Fact'}</div>
            </div>
        </div>
    </button>
);

const FormattedText = ({ text, onLinkClick, onCollectWord }) => {
    if (!text) return null;
    const cleanText = text.replace(/###/g, ''); 
    const paragraphs = cleanText.split('\n').filter(p => p.trim());
    const definedWords = new Set();

    return (
        <div className="space-y-4 font-medium text-base leading-relaxed text-slate-700 dark:text-slate-200">
            {paragraphs.map((p, i) => {
                const parts = p.split(/(\*\*.*?\*\*\{.*?\}|\*\*.*?\*\*)/g);
                return (
                    <p key={i}>
                        {parts.map((part, j) => {
                            if (!part) return null;
                            if (part.startsWith('**') && part.includes('{') && part.endsWith('}')) {
                                const content = part.slice(2, -1); 
                                const splitIndex = content.lastIndexOf('**{');
                                if (splitIndex !== -1) {
                                    let word = content.substring(0, splitIndex).replace(/[*_]/g, '').trim();
                                    const def = content.substring(splitIndex + 3);
                                    if (!definedWords.has(word.toLowerCase()) && word.split(' ').length <= 3) {
                                        definedWords.add(word.toLowerCase());
                                        return (
                                            <span key={j} onClick={() => onCollectWord(word, def)}
                                                className="relative inline-block font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-800 cursor-pointer border-b-2 border-dotted border-emerald-400/50 hover:border-emerald-600 transition-colors group">
                                                {word}
                                                <span className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-900 text-white text-xs p-2 rounded-lg shadow-xl z-50 text-center pointer-events-none">
                                                    {def}
                                                    <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></span>
                                                </span>
                                            </span>
                                        );
                                    }
                                    return <span key={j}>{word}</span>;
                                }
                            }
                            else if (part.startsWith('**') && part.endsWith('**')) {
                                let word = part.slice(2, -2).replace(/[*_]/g, '').trim();
                                if (word.split(' ').length <= 3) {
                                    return (
                                        <button key={j} onClick={() => onLinkClick && onLinkClick(word)}
                                            className="font-bold text-blue-600 dark:text-blue-400 hover:underline decoration-2 decoration-blue-300 underline-offset-2 transition-all">
                                            {word}
                                        </button>
                                    );
                                }
                                return <span key={j}>{word}</span>;
                            }
                            return <span key={j}>{part}</span>;
                        })}
                    </p>
                );
            })}
        </div>
    );
};

// --- Main App Component ---

export default function NuggetsApp() {
  const [view, setView] = useState('home'); 
  const [navigationHistory, setNavigationHistory] = useState(['home']); // Track navigation history
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentNugget, setCurrentNugget] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Stardust Quiz Popup
  const [showStardustQuiz, setShowStardustQuiz] = useState(false);
  const [stardustQuestion, setStardustQuestion] = useState(null);
  const [stardustQuizType, setStardustQuizType] = useState(null); // 'mcq' or 'freeform'
  const [selectedStardustAnswer, setSelectedStardustAnswer] = useState(null);
  const [wrongAnswers, setWrongAnswers] = useState(new Set());
  const [freeformAnswer, setFreeformAnswer] = useState('');
  const [stardustQuizLoading, setStardustQuizLoading] = useState(false);

  // Collection Quiz
  const [showCollectionQuiz, setShowCollectionQuiz] = useState(false);
  const [collectionQuizQuestions, setCollectionQuizQuestions] = useState([]);
  const [currentCollectionQuestionIndex, setCurrentCollectionQuestionIndex] = useState(0);
  const [collectionQuizWrongAnswers, setCollectionQuizWrongAnswers] = useState(new Set());
  const [usedCollectionFactIds, setUsedCollectionFactIds] = useState(new Set());

  // Word Quiz
  const [showWordQuiz, setShowWordQuiz] = useState(false);
  const [wordQuizQuestions, setWordQuizQuestions] = useState([]);
  const [currentWordQuestionIndex, setCurrentWordQuestionIndex] = useState(0);
  const [wordQuizWrongAnswers, setWordQuizWrongAnswers] = useState(new Set());
  const [usedWordIds, setUsedWordIds] = useState(new Set());

  // Auth
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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
    
    if (HARDCODED_API_KEY) setApiKey(HARDCODED_API_KEY);
    else {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) setApiKey(savedKey);
    }
    const savedDust = localStorage.getItem('nuggets_stardust');
    if (savedDust) setStarDust(parseInt(savedDust));
    const savedCrumbs = localStorage.getItem('nuggets_crumbs');
    if (savedCrumbs) setCrumbs(parseInt(savedCrumbs));
    const savedInventory = localStorage.getItem('nuggets_inventory');
    if (savedInventory) setInventory(JSON.parse(savedInventory));
    const savedEquipped = localStorage.getItem('nuggets_equipped');
    if (savedEquipped) setEquipped(JSON.parse(savedEquipped));
    const savedTheme = localStorage.getItem('nuggets_theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('nuggets_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

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
        generateImage(currentNugget.text, currentNugget.searchTerm, currentNugget.originalTag);
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
              const searches = [showMeTopic, currentNugget?.searchTerm].filter(Boolean);
              const allImages = [];
              
              for (const term of searches) {
                  try {
                      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrlimit=6&prop=pageimages|pageterms&piprop=thumbnail&pithumbsize=800&format=json&origin=*`);
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
                      console.error("Image fetch error:", e);
                  }
              }
              
              // Remove duplicates based on URL
              const uniqueImages = allImages.filter((img, index, self) => 
                index === self.findIndex(i => i.url === img.url)
              );
              
              // Filter out inappropriate content for children
              const inappropriateWords = [
                'scandal', 'controversy', 'death', 'murder', 'killing', 'war crime',
                'assassination', 'terrorism', 'violence', 'attack', 'bombing',
                'disaster', 'tragedy', 'crash', 'accident', 'victim', 'crime',
                'arrest', 'convicted', 'guilty', 'trial', 'lawsuit', 'allegations'
              ];
              
              const filteredImages = uniqueImages.filter(img => {
                const textToCheck = `${img.title} ${img.description}`.toLowerCase();
                return !inappropriateWords.some(word => textToCheck.includes(word));
              });
              
              setShowMeImages(filteredImages);
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
      
      // Preferred voice names (in order of preference)
      const preferredVoices = [
        'Samantha', // Mac OS - friendly female
        'Google US English Female',
        'Microsoft Zira Desktop', // Windows
        'Google UK English Female',
        'Karen', // Mac OS
        'Microsoft Zira',
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

  const generateImage = async (text, searchTerm = null, originalTag = null) => {
    setImageLoading(true);
    setNuggetImage(null);
    
    // First check if we have a predefined Unsplash image for this subtopic
    if (originalTag && SUBTOPIC_IMAGES[originalTag]) {
        setNuggetImage({ url: SUBTOPIC_IMAGES[originalTag] });
        setImageLoading(false);
        return;
    }
    
    // Otherwise try Wikipedia with search terms
    const searches = [searchTerm, text.split(' ').slice(0, 2).join(' ')].filter(s => s);
    for (let query of searches) {
        if (!query) continue;
        const imgData = await fetchWikipediaImage(query);
        if (imgData) {
            setNuggetImage(imgData);
            setImageLoading(false);
            return;
        }
    }
    
    // If Wikipedia failed, use Unsplash as fallback
    try {
        const unsplashQuery = searchTerm || text.split(' ').slice(0, 3).join(' ');
        const unsplashUrl = await fetchUnsplashImage(unsplashQuery);
        if (unsplashUrl) {
            setNuggetImage({ url: unsplashUrl });
        }
    } catch (error) {
        console.error('Unsplash fallback error:', error);
    }
    
    setImageLoading(false);
  };

  const generateNuggetByTag = async (tag, subjectId = null) => {
    if (!apiKey) { 
        showNotification("Add API Key in Settings!"); 
        setTimeout(() => navigateTo('settings'), 1000);
        return; 
    }
    setAiLoading(true);
    
    try {
        const systemPrompt = `You are a friendly educational guide for children (ages 7-8). Generate a single fascinating fact about the topic provided. DO NOT start with conversational phrases like "Did you know" or "Here's a fun fact". Launch directly into the fact itself. 

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive for young children
- AVOID topics like: human sacrifice, death rituals, violence, warfare casualties, executions, torture, graphic historical events
- Focus on fascinating, educational, uplifting aspects of topics
- When discussing ancient civilizations or historical topics, emphasize culture, achievements, daily life, inventions, and contributions to society

Return ONLY valid JSON in this exact format: { "fact": "The fact text here", "topic": "Topic Name", "imageSearchTerm": "2-3 specific descriptive words about the main subject to avoid ambiguity (e.g., 'Chinese flying kite', 'anglerfish deep sea', 'volcanic eruption', 'humanoid robot')", "relatedTopics": ["Topic 1", "Topic 2", "Topic 3"] }`;
        const userPrompt = `Tell me a cool educational fact about: ${tag}`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            })
        });
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error.message || "API Error");
        }
        
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        let parsed = { 
            fact: "The universe is full of mysteries waiting to be discovered!", 
            topic: tag, 
            imageSearchTerm: tag, 
            relatedTopics: [tag, "Space", "Science"] 
        };
        
        try { 
            const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
            parsed = JSON.parse(cleaned); 
        } catch(e) {
            console.error("JSON parse error:", e);
        }
        
        const newNugget = {
            text: parsed.fact,
            tags: parsed.relatedTopics || [tag], 
            subjectId: subjectId || 'science', 
            id: Date.now(),
            searchTerm: parsed.imageSearchTerm,
            originalTag: tag // Store the original subtopic name for image lookup
        };
        
        setCurrentNugget(newNugget);
        setAiResponse(null);
        setAiContentImage(null);
        setLearnResponse(null);
        setActivityResponse(null);
        setActivityImage(null);
        navigateTo('nugget');
        
        // Generate image for the nugget
        generateImage(parsed.fact, parsed.imageSearchTerm, tag);
        
    } catch(e) {
        console.error("AI Error:", e);
        showNotification("Could not generate nugget. Check your API key!");
    } finally {
        setAiLoading(false);
    }
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
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userPrompt }] }],
                systemInstruction: { parts: [{ text: systemPrompt }] }
            })
        });
        
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        try {
            const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
            const parsed = JSON.parse(cleaned);
            setStardustQuestion(parsed);
        } catch(e) {
            console.error("JSON parse error:", e);
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
        const systemPrompt = `You are a question creator for children (ages 7-8). Create ONE simple multiple choice question about the given fact. Keep it age-appropriate and straightforward.`;
        const userPrompt = `Create a simple multiple choice question about this fact: "${fact.text}"

CRITICAL: Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "question": "The question text?",
  "options": ["Option A", "Option B", "Option C"],
  "correctIndex": 0
}`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        try {
          const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          questions.push({ ...parsed, factId: fact.id });
        } catch(e) {
          console.error("JSON parse error for fact:", fact.id, e);
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
    
    if (wordCollection.length < 4) {
      showNotification("Collect at least 4 words first!");
      return;
    }
    
    setAiLoading(true);
    
    try {
      // Select 4 random words from collection that haven't been used recently
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
          systemPrompt = `You are a question creator for children (ages 7-8). Create ONE simple multiple choice question about the definition of a word. Keep it age-appropriate.`;
          userPrompt = `Create a multiple choice question asking what the word "${word.word}" means. The correct definition is: "${word.definition}"

CRITICAL: Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "question": "What does the word '${word.word}' mean?",
  "options": ["Correct definition", "Wrong option 1", "Wrong option 2"],
  "correctIndex": 0
}`;
        } else {
          systemPrompt = `You are a question creator for children (ages 7-8). Create ONE simple multiple choice question about how to spell a word. Keep it age-appropriate.`;
          userPrompt = `Create a multiple choice question about how to spell this word. The word is: "${word.word}" which means "${word.definition}"

CRITICAL: Respond with ONLY a valid JSON object. No markdown, no explanations, no additional text.

{
  "question": "How do you spell the word that means '${word.definition}'?",
  "options": ["${word.word}", "Wrong spelling 1", "Wrong spelling 2"],
  "correctIndex": 0
}`;
        }
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userPrompt }] }],
            systemInstruction: { parts: [{ text: systemPrompt }] }
          })
        });
        
        const data = await response.json();
        const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
        
        try {
          const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          questions.push({ ...parsed, wordId: word.word, type: questionType });
        } catch(e) {
          console.error("JSON parse error for word:", word.word, e);
        }
      }
      
      if (questions.length === 4) {
        setWordQuizQuestions(questions);
        setCurrentWordQuestionIndex(0);
        setWordQuizWrongAnswers(new Set());
        setShowWordQuiz(true);
        
        // Mark these words as used
        setUsedWordIds(new Set([...usedWordIds, ...selectedWords.map(w => w.word)]));
        
        // Reset used words if we've used most of them
        if (usedWordIds.size + 4 >= wordCollection.length) {
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
            systemPrompt = `You are a helpful companion for a curious child (ages 7-8). Explain the fact in simple terms. 

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive for young children
- AVOID topics like: human sacrifice, death rituals, violence, warfare casualties, executions, torture, graphic historical events
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

Keep it under 4 sentences. DO NOT use conversational lead-ins like "Wow", "That's cool", "Did you know", or comments about how interesting the topic is. Start directly with the educational content.`;
            userPrompt = `Explain more about this fact: "${currentNugget.text}"`;
        } else if (type === 'activity') {
            systemPrompt = `You are a helpful activity creator for children.

IMPORTANT CONTENT GUIDELINES:
- Keep all activities age-appropriate and safe for young children
- AVOID topics related to: human sacrifice, death rituals, violence, warfare, or graphic historical events
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
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`, {
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
                console.error("Activity JSON parse error:", parseError, "Original text:", text);
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
                console.error("Trivia JSON parse error:", parseError, "Original text:", text);
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

  // --- Views ---

  const renderHome = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pattern-bg overflow-x-hidden transition-colors duration-500">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-panel border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">N</div>
             <div className="hidden md:block font-bold text-slate-800 dark:text-white leading-tight">Nuggets of<br/>Knowledge</div>
        </div>
        <div className="flex gap-2">
             <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="font-bold text-slate-700 dark:text-white">{starDust}</span>
                <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
             </div>
             <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
                <span className="font-bold text-slate-700 dark:text-white">{crumbs}</span>
                <Cookie className="w-4 h-4 text-orange-400 fill-orange-400" />
             </div>
             {/* Cloud Sync Indicator */}
             <div className={`w-2 h-2 rounded-full ${isSaving ? 'bg-yellow-400 animate-pulse' : !user ? 'bg-slate-300' : 'bg-green-400'}`} title={isSaving ? "Saving..." : !user ? "Guest (Not Saved)" : "Synced to Cloud"} />
             <button onClick={() => navigateTo('settings')} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-600 dark:text-slate-300 hover:scale-110 transition-transform">
                <Settings className="w-5 h-5" />
             </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Search Hero */}
        <div className="text-center py-8 md:py-12 animate-pop">
            <h1 className="text-3xl md:text-5xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">
                What do you want to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">discover?</span>
            </h1>
            <div className="relative max-w-lg mx-auto group">
                <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchQuery.trim() && generateNuggetByTag(searchQuery)}
                    placeholder="Dinosaurs, Space, Robots..."
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

        {/* --- Hybrid Subject Display --- */}
        
        {/* Mobile: Grid Layout */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-8">
            {SUBJECTS.map((sub) => (
                <button 
                    key={sub.id} 
                    onClick={() => { setSelectedSubject(sub); navigateTo('subject-menu'); }}
                    className={`relative p-4 rounded-2xl border-2 ${sub.border} ${sub.color.replace('text', 'bg').replace('100', '50').replace('/50', '/10')} flex flex-col items-center justify-center gap-3 h-32 active:scale-95 transition-transform shadow-sm`}
                >
                    <div className={`w-12 h-12 rounded-full ${sub.color} flex items-center justify-center shadow-inner`}>
                        <sub.icon className="w-6 h-6" />
                    </div>
                    <span className="font-bold text-slate-800 dark:text-white text-sm">{sub.name}</span>
                </button>
            ))}
        </div>

        {/* Desktop: Orbit Layout */}
        <div className="hidden md:block relative h-[500px] w-full bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-inner overflow-hidden mb-8 group">
            <div className="absolute inset-0 opacity-30 dark:opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            
            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 pointer-events-none">
                 <div className="font-bold text-slate-500 dark:text-slate-400 text-xl">Select a Topic</div>
            </div>

            {/* Orbiting Planets */}
            {SUBJECTS.map((sub, index) => {
                const total = SUBJECTS.length;
                const angle = (index * 360) / total - 90;
                const radius = 38;
                const x = 50 + radius * Math.cos(angle * Math.PI / 180);
                const y = 50 + radius * Math.sin(angle * Math.PI / 180);

                return (
                    <button
                        key={sub.id}
                        onClick={() => { setSelectedSubject(sub); navigateTo('subject-menu'); }}
                        className="absolute w-20 h-20 -ml-10 -mt-10 rounded-full bg-white dark:bg-slate-800 shadow-xl border-4 flex items-center justify-center hover:scale-125 transition-all duration-300 z-10 group/planet"
                        style={{ left: `${x}%`, top: `${y}%`, borderColor: 'currentColor' }}
                    >
                        <div className={`text-slate-400 group-hover/planet:text-blue-500 transition-colors`}>
                            <sub.icon className="w-8 h-8" />
                        </div>
                        <span className="absolute top-full mt-2 font-bold text-xs bg-slate-900 text-white px-2 py-1 rounded opacity-0 group-hover/planet:opacity-100 transition-opacity whitespace-nowrap z-20">
                            {sub.name}
                        </span>
                    </button>
                );
            })}
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button onClick={() => navigateTo('collection')} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-yellow-400 dark:hover:border-yellow-500 transition-colors flex flex-col items-center gap-2 group">
                <Star className="w-8 h-8 text-yellow-400 group-hover:rotate-12 transition-transform" />
                <span className="font-bold text-slate-700 dark:text-slate-200">Nuggets</span>
                <span className="text-xs text-slate-400">{collection.length} nuggets</span>
            </button>
            <button onClick={() => navigateTo('word-bank')} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors flex flex-col items-center gap-2 group">
                <BookOpen className="w-8 h-8 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="font-bold text-slate-700 dark:text-slate-200">Words</span>
                <span className="text-xs text-slate-400">{wordCollection.length} words</span>
            </button>
            <button onClick={() => navigateTo('activities')} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-orange-400 dark:hover:border-orange-500 transition-colors flex flex-col items-center gap-2 group">
                <Rocket className="w-8 h-8 text-orange-400 group-hover:rotate-12 transition-transform" />
                <span className="font-bold text-slate-700 dark:text-slate-200">Missions</span>
                <span className="text-xs text-slate-400">{activityCollection.length} missions</span>
            </button>
            <button onClick={() => navigateTo('shop')} className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-purple-400 dark:hover:border-purple-500 transition-colors flex flex-col items-center gap-2 group">
                <ShoppingBag className="w-8 h-8 text-purple-400 group-hover:-translate-y-1 transition-transform" />
                <span className="font-bold text-slate-700 dark:text-slate-200">Shop</span>
            </button>
            <button className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />
                <div className="flex gap-2">
                    <SpaceNugget className="w-8 h-8" accessory={equipped.space} />
                    <SkyNugget className="w-8 h-8" accessory={equipped.sky} />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">Mascots</span>
            </button>
        </div>
      </div>
    </div>
  );

  const renderSubjectMenu = () => {
    if (!selectedSubject) return null;
    
    // Subject-specific gradients
    const gradients = {
      science: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600',
      history: 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500',
      math: 'bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600',
      art: 'bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500',
      music: 'bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600',
      career: 'bg-gradient-to-br from-slate-500 via-slate-600 to-slate-700',
      words: 'bg-gradient-to-br from-pink-400 via-rose-500 to-red-500'
    };
    
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pattern-bg pb-20">
            {/* Header */}
            <div className={`relative h-32 md:h-40 ${gradients[selectedSubject.id] || gradients.science} overflow-hidden`}>
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
                            <selectedSubject.icon className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">{selectedSubject.name}</h1>
                            <p className="text-white/90 font-medium text-sm md:text-base">Explore the world of {selectedSubject.name.toLowerCase()}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-4 mt-4 relative z-10">
                <div className="space-y-6">
                    {/* Popular Topics - Centered */}
                    <div className="max-w-4xl mx-auto">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">Popular Topics</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {selectedSubject.subtopics.map(topic => (
                                <SubtopicCard 
                                    key={topic} 
                                    subtopic={topic} 
                                    onClick={() => {
                                        // Check if this is a curriculum topic
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

                    {/* Quick Find - Below Topics */}
                    <div className="max-w-md mx-auto">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
                             <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-3 text-center">Quick Find</h3>
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
        </div>
    );
  };

  const renderCurriculum = () => {
    if (!selectedCurriculumTopic) return null;
    
    const topic = selectedCurriculumTopic;
    const type = topic.type || 'grid';
    
    // Dynamic gradient based on topic
    const gradientMap = {
      'ancient-civilizations': 'from-amber-400 via-orange-500 to-red-600',
      'elements-of-language': 'from-blue-400 via-indigo-500 to-purple-600',
      'elements-of-math': 'from-blue-500 via-cyan-500 to-teal-600',
      'scientific-method': 'from-emerald-400 via-teal-500 to-cyan-600',
      'elements-of-music': 'from-rose-400 via-pink-500 to-fuchsia-600',
      'elements-of-art': 'from-purple-400 via-pink-500 to-rose-500'
    };
    
    const iconMap = {
      'ancient-civilizations': MapIcon,
      'elements-of-language': BookOpen,
      'elements-of-math': Calculator,
      'scientific-method': Microscope,
      'elements-of-music': Music,
      'elements-of-art': Palette
    };
    
    const gradient = gradientMap[topic.id] || 'from-blue-400 via-indigo-500 to-purple-600';
    const Icon = iconMap[topic.id] || BookOpen;
    
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
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
                            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">{topic.name}</h1>
                            <p className="text-white/90 font-medium text-sm md:text-base">{topic.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto p-4 md:p-6 mt-4">
                {/* TIMELINE TYPE (Ancient Civilizations) */}
                {type === 'timeline' && topic.timeline && (() => {
                    // Parse period ranges for each civilization
                    const parsePeriod = (periodStr) => {
                        // Handle formats like "3500-500 BCE", "2070 BCE - 220 CE", "27 BCE - 476 CE"
                        const parts = periodStr.split('-').map(p => p.trim());
                        
                        const parseYear = (yearStr) => {
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
                    
                    // Define regions for each civilization
                    const regionMap = {
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
                    
                    const regionColors = {
                        "Middle East": { bg: "bg-amber-600", text: "text-white", border: "border-amber-700" },
                        "Asia": { bg: "bg-red-600", text: "text-white", border: "border-red-700" },
                        "Europe": { bg: "bg-blue-600", text: "text-white", border: "border-blue-700" },
                        "Americas": { bg: "bg-green-600", text: "text-white", border: "border-green-700" },
                        "Africa": { bg: "bg-purple-600", text: "text-white", border: "border-purple-700" }
                    };
                    
                    const timelineData = topic.timeline.map((item, index) => ({
                        ...item,
                        ...parsePeriod(item.period),
                        region: regionMap[item.name] || "Other",
                        index
                    }));
                    
                    // Calculate overall range
                    const allYears = timelineData.flatMap(item => [item.start, item.end]);
                    const minYear = Math.min(...allYears);
                    const maxYear = Math.max(...allYears);
                    const range = maxYear - minYear;
                    
                    // Calculate position and width for each civilization
                    const civilizations = timelineData.map(item => ({
                        ...item,
                        left: ((item.start - minYear) / range) * 100,
                        width: ((item.end - item.start) / range) * 100
                    }));
                    
                    // Generate year markers
                    const yearMarkers = [];
                    const markerInterval = 500; // Every 500 years
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
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">Timeline of Ancient Civilizations</h2>
                            
                            {/* Regional Key */}
                            <div className="flex flex-wrap justify-center gap-3 mb-6">
                                {Object.entries(regionColors).map(([region, style]) => (
                                    <div 
                                        key={region} 
                                        onClick={() => {
                                            generateNuggetByTag(region + " ancient civilizations", 'history');
                                        }}
                                        className={`${style.bg} ${style.text} px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 border-2 ${style.border} shadow-md cursor-pointer hover:scale-105 transition-transform`}
                                    >
                                        {region}
                                    </div>
                                ))}
                            </div>
                            
                            <div className="relative w-full">
                                {/* Year markers at top */}
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
                                
                                {/* Stacked civilization bars */}
                                <div className="space-y-3 mt-8">
                                    {civilizations.map((civ, index) => (
                                        <div 
                                            key={civ.name}
                                            className="relative h-12 animate-pop"
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            <div 
                                                onClick={() => {
                                                    generateNuggetByTag(civ.name, 'history');
                                                }}
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

                {/* PROCESS TYPE (Scientific Method) */}
                {type === 'process' && topic.steps && (
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">The Scientific Method Process</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {topic.steps.map((step, index) => (
                                <div key={step.name} className="relative">
                                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6 border-2 border-emerald-200 dark:border-emerald-700 animate-pop" style={{animationDelay: `${index * 0.1}s`}}>
                                        <div className="absolute -top-3 -left-3 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                                            {step.step}
                                        </div>
                                        <div className="text-4xl mb-3">{step.emoji}</div>
                                        <h3 className="font-bold text-slate-800 dark:text-white mb-1">{step.name}</h3>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">{step.description}</p>
                                    </div>
                                    {index < topic.steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                                            <ArrowRight className="w-4 h-4 text-emerald-500" />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Topic Cards Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                        {type === 'timeline' ? 'Explore Ancient Civilizations' : type === 'process' ? 'Key Concepts' : 'Explore Topics'}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {topic.subTopics.map((item, index) => (
                            <button
                                key={item.name}
                                onClick={() => {
                                    if (apiKey) {
                                        // Determine subject based on topic id
                                        const subjectMap = {
                                            'ancient-civilizations': 'history',
                                            'elements-of-language': 'words',
                                            'elements-of-math': 'math',
                                            'scientific-method': 'science',
                                            'elements-of-music': 'music',
                                            'elements-of-art': 'art'
                                        };
                                        // For ancient civilizations timeline type, add context to the tag
                                        const tag = type === 'timeline' ? `${item.name} ancient civilizations` : item.name;
                                        generateNuggetByTag(tag, subjectMap[topic.id] || 'science');
                                    } else {
                                        showNotification("Add API key to explore topics!");
                                    }
                                }}
                                className={`${item.color ? 'text-white' : 'bg-white dark:bg-slate-800'} rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 ${item.color ? item.color : 'border-slate-100 dark:border-slate-700'} hover:border-opacity-80 group animate-pop overflow-hidden`}
                                style={{animationDelay: `${index * 0.05}s`}}
                            >
                                {item.image ? (
                                    <div className="w-full h-32 mb-3 rounded-lg overflow-hidden">
                                        <img 
                                            src={item.image} 
                                            alt={item.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                        />
                                    </div>
                                ) : (
                                    <div className="text-5xl mb-3">{item.emoji}</div>
                                )}
                                <h3 className={`font-bold mb-1 ${item.color ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                                    {item.name}
                                </h3>
                                <p className={`text-xs ${item.color ? 'text-white/90' : 'text-slate-600 dark:text-slate-400'}`}>{item.description}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const renderNugget = () => {
    if (!currentNugget) return null;
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center">
                <button onClick={goBack} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 px-3 py-1.5 rounded-full transition-colors font-bold">
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>
                <div className="font-black text-slate-800 dark:text-white uppercase tracking-widest text-sm">Nugget</div>
                <div className="flex items-center gap-2">
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
                            <div className="absolute inset-0 flex items-center justify-center"><Loader className="w-8 h-8 text-slate-400 animate-spin" /></div>
                        ) : nuggetImage ? (
                            <>
                            <img src={nuggetImage.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Nugget Visual" />
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-2">
                                <Maximize2 className="w-3 h-3" /> Tap to Explore
                            </div>
                            </>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-2 text-slate-400">
                                <ImageIcon className="w-12 h-12 opacity-50" />
                                <span className="text-sm font-medium">No Image Found</span>
                            </div>
                        )}
                    </div>

                    {/* Content Area */}
                    <div className="p-6 md:p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white leading-tight flex-1">
                                {currentNugget.text}
                            </h2>
                            <button 
                                onClick={() => handleReadAloud(currentNugget.text)}
                                className={`flex-shrink-0 p-3 rounded-full ${isSpeaking ? 'bg-purple-500 text-white animate-pulse cursor-pointer hover:bg-purple-600' : 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'} hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all shadow-sm hover:shadow-md`}
                                title={isSpeaking ? "Click to stop reading" : "Read aloud"}
                            >
                                <Volume2 className="w-6 h-6" />
                            </button>
                        </div>
                        
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
                            <button onClick={() => callGemini('learn')} disabled={aiLoading || !apiKey} className="py-3 px-2 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-bold text-sm hover:bg-indigo-100 transition-colors flex flex-col items-center gap-1 disabled:opacity-50">
                                <Brain className="w-5 h-5" /> Explain
                            </button>
                            <button onClick={() => callGemini('activity')} disabled={aiLoading || !apiKey} className="py-3 px-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-bold text-sm hover:bg-emerald-100 transition-colors flex flex-col items-center gap-1 disabled:opacity-50">
                                <Rocket className="w-5 h-5" /> Do This
                            </button>
                            <button onClick={() => { setShowMeImages([]); setIsShowMeOpen(true); setShowMeTopic(currentNugget.searchTerm || currentNugget.text); }} className="py-3 px-2 rounded-xl bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 font-bold text-sm hover:bg-rose-100 transition-colors flex flex-col items-center gap-1">
                                <ImageIcon className="w-5 h-5" /> Photos
                            </button>
                        </div>

                        {/* AI Content Boxes */}
                        {aiLoading && <div className="text-center py-8 text-slate-400"><Loader className="w-6 h-6 animate-spin mx-auto mb-2" /><p className="text-sm">Thinking...</p></div>}
                        
                        {/* Learn Response */}
                        {learnResponse && (
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-600 animate-pop mb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
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
                                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-400" /> 
                                        Activity Mission
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
                                                // Check if step has a colon to separate subhead from instruction
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
                                                showNotification("Mission Saved! +5 Crumbs 🍪");
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
                        
                        {/* Legacy aiResponse (for backward compatibility during transition) */}
                        {aiResponse && !learnResponse && !activityResponse && (
                            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-600 animate-pop">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-amber-400" /> 
                                        {aiResponse.type === 'activity' ? 'Activity Mission' : 'Did You Know?'}
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
                                                    showNotification("Mission Saved! +5 Crumbs 🍪");
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
                                        showNotification("Collected! +5 Crumbs 🍪");
                                        // Open Stardust quiz popup
                                        setShowStardustQuiz(true);
                                        setStardustQuizType(null);
                                        setSelectedStardustAnswer(null);
                                        setWrongAnswers(new Set());
                                        setFreeformAnswer('');
                                        setStardustQuestion(null);
                                    } else showNotification("Already collected!");
                                }}
                                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-3 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                            >
                                <Heart className="w-5 h-5 fill-yellow-900" /> Collect Nugget!
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
                            className="w-full bg-gradient-to-r from-purple-100 to-blue-100 hover:from-purple-200 hover:to-blue-200 dark:from-purple-900/30 dark:to-blue-900/30 dark:hover:from-purple-900/50 dark:hover:to-blue-900/50 text-purple-700 dark:text-purple-300 font-bold py-4 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                            <Star className="w-5 h-5" /> View My Collections
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const renderGridPage = (title, items, renderItem, emptyMsg) => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <button onClick={goBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h1>
                </div>
                <div className="flex items-center gap-2">
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
      
      return (
        <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsShowMeOpen(false)}>
            <div className="w-full max-w-5xl h-[80vh] bg-slate-900 rounded-3xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 flex justify-between items-center border-b border-slate-800">
                    <h3 className="text-white font-bold text-lg">Visual Explorer: {showMeTopic || currentNugget?.searchTerm || "Images"}</h3>
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

  const renderSettings = () => (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <button onClick={goBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-white">Settings</h1>
                </div>
                <div className="flex items-center gap-2">
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
                    <h3 className="font-bold text-lg mb-4 text-slate-800 dark:text-white">Account</h3>
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
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
                  My Collections
                </h1>
              </div>
              <button onClick={goHome} className="px-4 py-2 bg-white/90 dark:bg-slate-800 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2 text-slate-700 dark:text-slate-200 font-bold text-sm">
                Home
              </button>
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
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Nuggets</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                    All your collected facts
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
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Missions</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                    Fun things to try
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
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Words</h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-3">
                    Your vocabulary list
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
                <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">
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
      
      {view === 'subject-menu' && renderSubjectMenu()}
      {view === 'curriculum' && renderCurriculum()}
      {view === 'nugget' && renderNugget()}
      {view === 'collection' && (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button onClick={goBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">My Nugget Collection</h1>
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
                      <span className="bg-yellow-600 text-yellow-50 px-3 py-1 rounded-full text-sm font-bold ml-2">
                        +10 Stardust
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
      {view === 'shop' && renderGridPage("Sticker Shop", SHOP_ITEMS, (item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center gap-4">
              <div className="text-5xl">{item.icon}</div>
              <div className="text-center">
                  <h3 className="font-bold dark:text-white">{item.name}</h3>
                  <p className={`text-sm font-bold ${item.currency === 'crumbs' ? 'text-orange-500' : item.currency === 'stardust' ? 'text-yellow-500' : 'text-slate-400'}`}>
                      {item.cost === 0 ? 'FREE' : `${item.cost} ${item.currency === 'crumbs' ? 'Crumbs' : 'Stardust'}`}
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
                    } else if (item.currency === 'stardust' && starDust >= item.cost) { 
                        updateStarDust(-item.cost); 
                        setInventory(newInv);
                        saveData({ inventory: newInv });
                        showNotification(`Purchased ${item.name}!`); 
                    } else {
                        showNotification("Not enough currency!");
                    }
                }}
                className={`w-full py-2 rounded-lg font-bold text-sm ${inventory.includes(item.id) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg cursor-pointer'}`}
              >
                {inventory.includes(item.id) ? 'Owned' : 'Buy'}
              </button>
              {inventory.includes(item.id) && (
                  <div className="w-full flex gap-2">
                      <button 
                        onClick={() => {
                            const newEquipped = {...equipped, space: equipped.space === item.id ? null : item.id};
                            setEquipped(newEquipped);
                            saveData({ equipped: newEquipped });
                        }}
                        className={`flex-1 py-1 px-2 rounded text-xs font-bold ${equipped.space === item.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {equipped.space === item.id ? '✓ Space' : 'Space'}
                      </button>
                      <button 
                        onClick={() => {
                            const newEquipped = {...equipped, sky: equipped.sky === item.id ? null : item.id};
                            setEquipped(newEquipped);
                            saveData({ equipped: newEquipped });
                        }}
                        className={`flex-1 py-1 px-2 rounded text-xs font-bold ${equipped.sky === item.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`}
                      >
                        {equipped.sky === item.id ? '✓ Sky' : 'Sky'}
                      </button>
                  </div>
              )}
          </div>
      ), "Check back later for more!")}
      {view === 'word-bank' && (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button onClick={goBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
                <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Word Collection</h1>
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
                      <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm font-bold ml-2">
                        +10 Stardust
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
      {view === 'settings' && renderSettings()}
      
      {renderShowMeModal()}
      {renderEnlargedImage()}
      
      {/* Stardust Question Modal */}
      {showStardustQuiz && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-pop border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">What Do You Think?</h2>
                  <p className="text-sm text-purple-100 font-semibold">Answer to Earn Stardust ✨</p>
                </div>
              </div>
              <button onClick={() => setShowStardustQuiz(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Text Input Section */}
              <div>
                <label className="text-base font-bold text-slate-800 dark:text-white mb-3 block">
                  What did you find most interesting?
                </label>
                <div className="relative">
                  <textarea
                    value={freeformAnswer}
                    onChange={(e) => setFreeformAnswer(e.target.value)}
                    placeholder="Type or speak your thoughts here..."
                    className="w-full p-4 pr-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-[100px] resize-none"
                  />
                  <button
                    onClick={startListening}
                    disabled={isListening}
                    className={`absolute right-2 top-2 p-2 rounded-full transition-colors ${
                      isListening 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800'
                    }`}
                    title="Speech to text"
                  >
                    <Mic className={`w-5 h-5 ${isListening ? 'text-white' : 'text-purple-600 dark:text-purple-300'}`} />
                  </button>
                </div>
              </div>

              {/* Multiple Choice Section */}
              <div>
                <label className="text-base font-bold text-slate-800 dark:text-white mb-3 block">
                  Or answer this question:
                </label>
                {stardustQuizLoading ? (
                  <div className="flex flex-col items-center justify-center py-6 bg-white dark:bg-slate-800 rounded-xl">
                    <Loader className="w-6 h-6 text-purple-600 animate-spin mb-2" />
                    <p className="text-sm text-slate-600 dark:text-slate-400">Generating question...</p>
                  </div>
                ) : stardustQuestion ? (
                  <>
                    <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mb-3 border border-slate-200 dark:border-slate-700">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-base font-bold text-slate-800 dark:text-white">
                          {stardustQuestion.question}
                        </p>
                        <button
                          onClick={() => {
                            const utterance = new SpeechSynthesisUtterance(stardustQuestion.question);
                            utterance.rate = 0.9;
                            utterance.pitch = 1.1;
                            
                            // Get available voices
                            const voices = speechSynthesis.getVoices();
                            
                            // Preferred voice names (same as rest of app)
                            const preferredVoices = [
                              'Samantha', // Mac OS - friendly female
                              'Google US English Female',
                              'Microsoft Zira Desktop', // Windows
                              'Google UK English Female',
                              'Karen', // Mac OS
                              'Microsoft Zira',
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
                            }
                            
                            // Final fallback: use first English voice
                            if (!selectedVoice) {
                              selectedVoice = voices.find(voice => 
                                voice.lang.startsWith('en-') || voice.lang === 'en'
                              );
                            }
                            
                            // Set the voice if we found one
                            if (selectedVoice) {
                              utterance.voice = selectedVoice;
                              utterance.lang = selectedVoice.lang;
                            } else {
                              utterance.lang = 'en-US';
                            }
                            
                            speechSynthesis.speak(utterance);
                          }}
                          className="flex-shrink-0 p-2 bg-purple-100 dark:bg-purple-900 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                        >
                          <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-300" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {stardustQuestion.options.map((option, index) => {
                        const isWrong = wrongAnswers.has(index);
                        const isSelected = selectedStardustAnswer === index;
                        const isCorrect = index === stardustQuestion.correctIndex;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              if (isWrong) return;
                              setSelectedStardustAnswer(index);
                              
                              // Immediate feedback
                              if (index === stardustQuestion.correctIndex) {
                                // Correct answer selected
                              } else {
                                // Wrong answer - mark as wrong (no notification to avoid confusion)
                                setWrongAnswers(new Set([...wrongAnswers, index]));
                              }
                            }}
                            disabled={isWrong}
                            className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                              isWrong 
                                ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed border-2 border-slate-300 dark:border-slate-600 line-through opacity-60'
                                : isSelected && isCorrect
                                ? 'bg-green-500 text-white shadow-lg border-2 border-green-600'
                                : isSelected
                                ? 'bg-purple-500 text-white shadow-lg border-2 border-purple-600'
                                : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 shadow border-2 border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg hover:-translate-y-0.5'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span>{option}</span>
                              {isSelected && isCorrect && <Check className="w-5 h-5 flex-shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    {selectedStardustAnswer === stardustQuestion.correctIndex && (
                      <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-700 rounded-xl p-4 text-center animate-pop">
                        <p className="text-green-800 dark:text-green-200 font-bold flex items-center justify-center gap-2">
                          <Check className="w-5 h-5" /> Click "Submit" for your reward!
                        </p>
                      </div>
                    )}
                    {wrongAnswers.size > 0 && selectedStardustAnswer !== stardustQuestion.correctIndex && (
                      <div className="text-center">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Try again - you've got this! 💪
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Question couldn't be generated</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={() => {
                  const hasTextAnswer = freeformAnswer.trim().length >= 10;
                  const hasCorrectMCQ = selectedStardustAnswer === stardustQuestion?.correctIndex;
                  
                  if (hasTextAnswer || hasCorrectMCQ) {
                    updateStarDust(5);
                    showNotification("Great job! +5 Stardust ✨");
                    setTimeout(() => {
                      setShowStardustQuiz(false);
                      setFreeformAnswer('');
                      setSelectedStardustAnswer(null);
                      setWrongAnswers(new Set());
                      setStardustQuestion(null);
                    }, 1500);
                  } else {
                    showNotification("Please answer the question correctly or write at least 10 characters!");
                  }
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Submit for Stardust!
              </button>

              {/* Skip Button */}
              <button
                onClick={() => {
                  setShowStardustQuiz(false);
                  setFreeformAnswer('');
                  setSelectedStardustAnswer(null);
                  setWrongAnswers(new Set());
                  setStardustQuestion(null);
                }}
                className="w-full bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-6 rounded-xl transition-all"
              >
                Skip (No Reward)
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Collection Challenge Modal */}
      {showCollectionQuiz && collectionQuizQuestions.length > 0 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-pop border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-yellow-900" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-yellow-900">Collection Challenge</h2>
                  <p className="text-sm text-yellow-800 font-semibold">
                    Question {currentCollectionQuestionIndex + 1} of {collectionQuizQuestions.length}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowCollectionQuiz(false);
                  setCollectionQuizQuestions([]);
                  setCurrentCollectionQuestionIndex(0);
                  setCollectionQuizWrongAnswers(new Set());
                }} 
                className="text-yellow-900/80 hover:text-yellow-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Progress Bar */}
              <div className="flex gap-2">
                {collectionQuizQuestions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 flex-1 rounded-full ${
                      i < currentCollectionQuestionIndex 
                        ? 'bg-green-500' 
                        : i === currentCollectionQuestionIndex 
                        ? 'bg-yellow-500' 
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Question */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-lg font-bold text-slate-800 dark:text-white">
                  {collectionQuizQuestions[currentCollectionQuestionIndex].question}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {collectionQuizQuestions[currentCollectionQuestionIndex].options.map((option, index) => {
                  const isWrong = collectionQuizWrongAnswers.has(`${currentCollectionQuestionIndex}-${index}`);
                  const isCorrect = index === collectionQuizQuestions[currentCollectionQuestionIndex].correctIndex;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isWrong) return;
                        
                        if (isCorrect) {
                          // Correct answer
                          if (currentCollectionQuestionIndex < collectionQuizQuestions.length - 1) {
                            // Move to next question
                            setTimeout(() => {
                              setCurrentCollectionQuestionIndex(currentCollectionQuestionIndex + 1);
                            }, 800);
                          } else {
                            // All questions complete
                            updateStarDust(10);
                            showNotification("Awesome! +10 Stardust ✨");
                            setTimeout(() => {
                              setShowCollectionQuiz(false);
                              setCollectionQuizQuestions([]);
                              setCurrentCollectionQuestionIndex(0);
                              setCollectionQuizWrongAnswers(new Set());
                            }, 1500);
                          }
                        } else {
                          // Wrong answer - mark it
                          setCollectionQuizWrongAnswers(new Set([...collectionQuizWrongAnswers, `${currentCollectionQuestionIndex}-${index}`]));
                        }
                      }}
                      disabled={isWrong}
                      className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                        isWrong
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 line-through cursor-not-allowed'
                          : 'bg-white dark:bg-slate-700 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-yellow-400 hover:shadow-md active:scale-[0.98]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {collectionQuizWrongAnswers.size > 0 && (
                <div className="text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Try again - you've got this! 💪
                  </p>
                </div>
              )}

              {/* Exit Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    setShowCollectionQuiz(false);
                    setCollectionQuizQuestions([]);
                    setCurrentCollectionQuestionIndex(0);
                    setCollectionQuizWrongAnswers(new Set());
                  }}
                  className="w-full px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                  Exit Challenge (No Reward)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Word Challenge Modal */}
      {showWordQuiz && wordQuizQuestions.length > 0 && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-pop border border-slate-200 dark:border-slate-700">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-400 to-teal-500 p-6 rounded-t-3xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white">Word Challenge</h2>
                  <p className="text-sm text-white/90 font-semibold">
                    Question {currentWordQuestionIndex + 1} of {wordQuizQuestions.length}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setShowWordQuiz(false);
                  setWordQuizQuestions([]);
                  setCurrentWordQuestionIndex(0);
                  setWordQuizWrongAnswers(new Set());
                }} 
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Progress Bar */}
              <div className="flex gap-2">
                {wordQuizQuestions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-2 flex-1 rounded-full ${
                      i < currentWordQuestionIndex 
                        ? 'bg-green-500' 
                        : i === currentWordQuestionIndex 
                        ? 'bg-emerald-500' 
                        : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                ))}
              </div>

              {/* Question Type Badge */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-bold">
                  {wordQuizQuestions[currentWordQuestionIndex].type === 'definition' ? (
                    <>
                      <BookOpen className="w-4 h-4" />
                      Definition Question
                    </>
                  ) : (
                    <>
                      <Pencil className="w-4 h-4" />
                      Spelling Question
                    </>
                  )}
                </span>
              </div>

              {/* Question */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-lg font-bold text-slate-800 dark:text-white">
                  {wordQuizQuestions[currentWordQuestionIndex].question}
                </p>
              </div>

              {/* Answer Options */}
              <div className="space-y-3">
                {wordQuizQuestions[currentWordQuestionIndex].options.map((option, index) => {
                  const isWrong = wordQuizWrongAnswers.has(`${currentWordQuestionIndex}-${index}`);
                  const isCorrect = index === wordQuizQuestions[currentWordQuestionIndex].correctIndex;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isWrong) return;
                        
                        if (isCorrect) {
                          // Correct answer
                          if (currentWordQuestionIndex < wordQuizQuestions.length - 1) {
                            // Move to next question
                            setTimeout(() => {
                              setCurrentWordQuestionIndex(currentWordQuestionIndex + 1);
                            }, 800);
                          } else {
                            // All questions complete
                            updateStarDust(10);
                            showNotification("Amazing! +10 Stardust ✨");
                            setTimeout(() => {
                              setShowWordQuiz(false);
                              setWordQuizQuestions([]);
                              setCurrentWordQuestionIndex(0);
                              setWordQuizWrongAnswers(new Set());
                            }, 1500);
                          }
                        } else {
                          // Wrong answer - mark it
                          setWordQuizWrongAnswers(new Set([...wordQuizWrongAnswers, `${currentWordQuestionIndex}-${index}`]));
                        }
                      }}
                      disabled={isWrong}
                      className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                        isWrong
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 line-through cursor-not-allowed'
                          : 'bg-white dark:bg-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-emerald-400 hover:shadow-md active:scale-[0.98]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {wordQuizWrongAnswers.size > 0 && (
                <div className="text-center">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Keep trying - you can do it! 💪
                  </p>
                </div>
              )}

              {/* Exit Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    setShowWordQuiz(false);
                    setWordQuizQuestions([]);
                    setCurrentWordQuestionIndex(0);
                    setWordQuizWrongAnswers(new Set());
                  }}
                  className="w-full px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                  Exit Challenge (No Reward)
                </button>
              </div>
            </div>
          </div>
        </div>
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
