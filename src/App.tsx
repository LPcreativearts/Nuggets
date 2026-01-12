// GitHub sync test - January 7, 2026
import React, { useState, useEffect } from 'react';
import { 
    Rocket, Cloud, Star, BookOpen, Music, Palette, Briefcase, Microscope, 
    Calculator, Settings, X, Sparkles, Map as MapIcon, Heart, ArrowLeft, Brain, 
    ShoppingBag, Edit3, Volume2, Image as ImageIcon, Loader, ExternalLink, 
    Square, Search, Trophy, Check, Mic, Shuffle, Moon, Sun, Cookie, HelpCircle, ArrowRight,
    Maximize2, Minimize2, Book, History as HistoryIcon, Lock, Grid, Trash2, Menu, LogIn, LogOut, User, AlertTriangle, Pencil, Save
} from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { AuthModal } from './components/AuthModal';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Mascot Images
import spaceNuggetImg from 'figma:asset/9bc58e8692cbac3863bf7255a7cd29b0e4334a64.png';
import skyNuggetImg from 'figma:asset/524aa8d812d9a0a6f5c495000fd779e4eae87150.png';
// Basic and Spicy nugget images
import baseNuggetImg from 'figma:asset/e23fe5acb66ca864e8e5ca8d62fa1245562b1fd4.png'; // Basic Nugget
import spicyNuggetImg from 'figma:asset/a3e4544d3442bb9c3e68eb1a33e7a1f69695dda9.png'; // Spicy Nugget
// Eye accessories
import eyeVertical from 'figma:asset/e51044114d9d56eb4d00716a8fdfa99f5590ce16.png';
import eyeAngled from 'figma:asset/936f0a47b985a3d05ca017f04ebf53a12ea0d463.png';
import angryEyebrows from 'figma:asset/0650c8948efd77365d16a26559017dfaed7dd651.png';
// Mouth accessories
import smileMouth from 'figma:asset/5660787e5ba0950ec04a09d7cf7f064f581302a5.png';
import frownPng from 'figma:asset/9823b22aa4c9af4c84901143b170ac410d1b8e0f.png';
// Arms accessories
import armsImg from 'figma:asset/e1cb00a2a60b8725d4265551a68159cb1070e5f5.png';
// Legs accessories
import legsImg from 'figma:asset/74f3553160d988436af237bafb15516d03789825.png';
// Tail accessories
import rainbowTailImg from 'figma:asset/2bfa5715385880a8a49bbec1db42b853e2dea6de.png';
import brownTailImg from 'figma:asset/95a24bc7dd74e427be04f134b6b56c8e106afdde.png';
// Accessory items
import glassesImg from 'figma:asset/6b16272a922b89d8b73e6fbdcd925544dbeb6eb3.png';
import crownImg from 'figma:asset/f5146dfa112d42072e9269fb8a42ad1ea8da06eb.png';
import topHatImg from 'figma:asset/a6075e3e6d5bdb9d91355afecb08d948ac0d741e.png';
import partyHatImg from 'figma:asset/611e368b479c6c41d505e90461ef11c7f2d40dbe.png';

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
      subtopics: ["Experiments", "Black Holes", "Carnivorous Plants", "Deep Sea Creatures", "Robots", "Slime", "Dinosaurs", "Volcanoes", "Magnets"],
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
  "Experiments": "https://images.unsplash.com/photo-1608037222011-cbf484177126?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJvcmF0b3J5JTIwZXhwZXJpbWVudHxlbnwxfHx8fDE3NjgyNTU1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Robots": "https://images.unsplash.com/photo-1737644467636-6b0053476bb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodW1hbm9pZCUyMHJvYm90fGVufDF8fHx8MTc2ODIzNTM2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Slime": "https://images.unsplash.com/photo-1671490996266-fa5b32d5f24d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHNsaW1lfGVufDF8fHx8MTc2ODI1NTUyOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Secret Spies": "https://images.unsplash.com/photo-1610449257708-7221b0b39687?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcHklMjBkZXRlY3RpdmV8ZW58MXx8fHwxNzY4MjU1NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Elements of Math": "https://images.unsplash.com/photo-1758685733737-71f8945decf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoZW1hdGljYWwlMjBlcXVhdGlvbnN8ZW58MXx8fHwxNzY4MjU1NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Infinity": "https://images.unsplash.com/photo-1606778303039-9fc1488b1d8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZpbml0eSUyMHN5bWJvbHxlbnwxfHx8fDE3NjgyNTU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Secret Codes": "https://images.unsplash.com/photo-1633185075416-c9ef98858411?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlwdG9ncmFwaHklMjBjb2Rlc3xlbnwxfHx8fDE3NjgyNTU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Impossible Shapes": "https://images.unsplash.com/photo-1760693318333-d3ae15709511?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbXBvc3NpYmxlJTIwZ2VvbWV0cnl8ZW58MXx8fHwxNzY4MjU1NTMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Zero": "https://images.unsplash.com/photo-1609166216058-457ce78d0e23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwemVyb3xlbnwxfHx8fDE3NjgyNTU1MzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Elements of Art": "https://images.unsplash.com/photo-1658301720419-d1c963f7993b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHBhbGV0dGV8ZW58MXx8fHwxNzY4MjU1NTMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Famous Works of Art": "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBtdXNldW18ZW58MXx8fHwxNjgyNTU1MzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Art Movements": "https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydHxlbnwxfHx8fDE3NjgxODAxMDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Street Art": "https://images.unsplash.com/photo-1611063158871-7dd3ed4a2ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBncmFmZml0aXxlbnwxfHx8fDE3NjgyNTU1MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Sculpture": "https://images.unsplash.com/photo-1691957713140-a9a042252202?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzY3VscHR1cmV8ZW58MXx8fHwxNzY4MTgwNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Weird Instruments": "https://images.unsplash.com/photo-1651931802891-1e200feafefe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bnVzdWFsJTIwaW5zdHJ1bWVudHN8ZW58MXx8fHwxNzY4MjU1NTMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Video Game Music": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdhbWluZ3xlbnwxfHx8fDE3NjgyMjc3NTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Animal Sounds": "https://images.unsplash.com/photo-1702323447893-949e93cb51ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aWxkbGlmZSUyMHNvdW5kc3xlbnwxfHx8fDE3NjgyNTU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Rhythm": "https://images.unsplash.com/photo-1612549354052-a91bd7d0bff6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnVtJTIwcmh5dGhtfGVufDF8fHx8MTc2ODI1NTUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Movie Soundtracks": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXJ8ZW58MXx8fHwxNzY4MTkzODcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Lego Master": "https://images.unsplash.com/photo-1633469924738-52101af51d87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMGxlZ298ZW58MXx8fHwxNzY4MjU1NTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Video Game Tester": "https://images.unsplash.com/photo-1611138290962-2c550ffd4002?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBjb250cm9sbGVyfGVufDF8fHx8MTc2ODI1NTUzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Animal Rescuer": "https://images.unsplash.com/photo-1654119938236-de0d8ed4641d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjBhbmltYWx8ZW58MXx8fHwxNzY4MjU1NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Elements of Language": "https://images.unsplash.com/photo-1725043394860-71304ce2b1b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbHBoYWJldCUyMGxldHRlcnN8ZW58MXx8fHwxNzY4MjU1NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Silly Words": "https://images.unsplash.com/photo-1598983941654-125cc1854744?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWN0aW9uYXJ5JTIwd29yZHN8ZW58MXx8fHwxNzY4MjU1NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Secret Languages": "https://images.unsplash.com/photo-1551240903-154be3f2e18b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWduJTIwbGFuZ3VhZ2V8ZW58MXx8fHwxNzY4MjU1NTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Tongue Twisters": "https://images.unsplash.com/photo-1592758212009-aad46d7b0f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVha2luZyUyMG1vdXRofGVufDF8fHx8MTc2ODI1NTUzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Ancient Writing": "https://images.unsplash.com/photo-1728242410422-a5893353cac4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwaGllcm9nbHlwaHN8ZW58MXx8fHwxNzY4MjU1NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Early Humans": "https://images.unsplash.com/photo-1647705777154-178dafd1e2d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXZlJTIwcGFpbnRpbmd8ZW58MXx8fHwxNzY4MjU1NTM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
  "Experiments": {
    id: "scientific-method",
    name: "Experiments",
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
    experiments: [
      { name: "Volcano Eruption", emoji: "🌋", description: "Baking soda + vinegar reaction", image: "https://images.unsplash.com/photo-1713976047691-cac4d1f4fc05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2b2xjYW5vJTIwZXJ1cHRpb24lMjBleHBlcmltZW50fGVufDF8fHx8MTc2ODIzNDMwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Growing Crystals", emoji: "💎", description: "Watch crystals form overnight", image: "https://images.unsplash.com/photo-1765958861048-1aa9b46867eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnlzdGFsJTIwZ3Jvd2luZyUyMHNjaWVuY2V8ZW58MXx8fHwxNzY4MjM0MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Rainbow in a Jar", emoji: "🌈", description: "Layer liquids by density", image: "https://images.unsplash.com/photo-1761258454507-3ba336fb2bd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYWluYm93JTIwbGlxdWlkJTIwbGF5ZXJzfGVufDF8fHx8MTc2ODIzNDMwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Plant Growth", emoji: "🌱", description: "Track how plants grow with light", image: "https://images.unsplash.com/photo-1682879398507-ea8d66d216f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHNlZWRsaW5nJTIwZ3Jvd2luZ3xlbnwxfHx8fDE3NjgyMzQzMDl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Static Electricity", emoji: "⚡", description: "Make things stick with a balloon", image: "https://images.unsplash.com/photo-1665217101903-923e53b74b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGF0aWMlMjBlbGVjdHJpY2l0eSUyMGJhbGxvb258ZW58MXx8fHwxNzY4MjM0MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Ice Melting Race", emoji: "🧊", description: "Test what melts ice fastest", image: "https://images.unsplash.com/photo-1767099579555-7f5c80d5024d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBtZWx0aW5nJTIwc2NpZW5jZXxlbnwxfHx8fDE3NjgyMzQzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Egg Drop Challenge", emoji: "🥚", description: "Protect an egg from falling", image: "https://images.unsplash.com/photo-1584385695389-f53f8cc13b17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ2clMjBwcm90ZWN0aW9uJTIwU1RFTXxlbnwxfHx8fDE3NjgyMzQzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Bird Watching", emoji: "🐦", description: "Observe and record local birds", image: "https://images.unsplash.com/photo-1703536760770-b5f5cdd838b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJkJTIwd2F0Y2hpbmclMjBuYXR1cmV8ZW58MXx8fHwxNzY4MjM0MzEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Water Tornado", emoji: "🌪️", description: "Create a vortex in a bottle", image: "https://images.unsplash.com/photo-1698664434322-94a43b98b9ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZSUyMHRvcm5hZG98ZW58MXx8fHwxNzY4MjM1NDg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Magnet Magic", emoji: "🧲", description: "Explore magnetic fields", image: "https://images.unsplash.com/photo-1727885348727-47c37ecc710c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWduZXQlMjBzY2llbmNlJTIwZXhwZXJpbWVudHxlbnwxfHx8fDE3NjgyMzU0ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Solar Oven", emoji: "☀️", description: "Cook with the sun's power", image: "https://images.unsplash.com/photo-1682071308247-04c65c28bba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMG92ZW4lMjBjb29raW5nfGVufDF8fHx8MTc2ODIzNTQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Paper Airplanes", emoji: "✈️", description: "Test different wing designs", image: "https://images.unsplash.com/photo-1719985968573-2f002f676a30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGFpcnBsYW5lJTIwZmx5aW5nfGVufDF8fHx8MTc2ODIzNTQ4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
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
    activities: [
      { name: "Contour Line Drawing", emoji: "✏️", description: "Draw without looking at your paper", element: "Line", image: "https://images.unsplash.com/photo-1659396455630-ad099b6d893a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGRyYXdpbmclMjBhcnR8ZW58MXx8fHwxNzY4MjU1MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Shape Collage", emoji: "✂️", description: "Cut and arrange geometric shapes", element: "Shape", image: "https://images.unsplash.com/photo-1631519952398-5b1d76b946e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGNvbGxhZ2UlMjBjcmFmdHxlbnwxfHx8fDE3NjgyNTUxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Color Wheel Painting", emoji: "🌈", description: "Mix primary colors into secondary", element: "Color", image: "https://images.unsplash.com/photo-1659185541754-c41d7c609e09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYWludCUyMHBhbGV0dGUlMjBjb2xvcnN8ZW58MXx8fHwxNzY4MjU1MTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Texture Rubbings", emoji: "🖍️", description: "Capture textures with crayon", element: "Texture", image: "https://images.unsplash.com/photo-1627873828946-44e8b5261d2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmF5b24lMjB0ZXh0dXJlJTIwcnViYmluZ3xlbnwxfHx8fDE3NjgyNTUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Value Scale", emoji: "⬛", description: "Create a gradient from light to dark", element: "Value", image: "https://images.unsplash.com/photo-1559924045-1c34ba930038?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZW5jaWwlMjBzaGFkaW5nJTIwZ3JhZGllbnR8ZW58MXx8fHwxNjg4NDg5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "3D Paper Sculpture", emoji: "📄", description: "Fold and bend paper into forms", element: "Form", image: "https://images.unsplash.com/photo-1765162308598-e67b089969c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXBlciUyMGNyYWZ0JTIwc2N1bHB0dXJlfGVufDF8fHx8MTY4ODQ4OTY0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Negative Space Art", emoji: "🔲", description: "Focus on the space around objects", element: "Space", image: "https://images.unsplash.com/photo-1613946576929-3cc54e1cb5ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXRvdXQlMjBzaWxob3VldHRlJTIwYXJ0fGVufDF8fHx8MTc2ODI1NTEzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Pattern Design", emoji: "🔶", description: "Repeat shapes to create patterns", element: "Pattern", image: "https://images.unsplash.com/photo-1677032160529-e03edd641cae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXBlYXRpbmclMjBwYXR0ZXJuJTIwZGVzaWdufGVufDF8fHx8MTY4ODQ4OTY0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Pointillism Portrait", emoji: "🎨", description: "Paint with dots like Seurat", element: "Color", image: "https://images.unsplash.com/photo-1721527896667-3fe4e55e0ea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2ludGlsbGlzbSUyMGRvdHMlMjBhcnR8ZW58MXx8fHwxNzY4MjU1MzE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Zentangle Patterns", emoji: "🖊️", description: "Create meditative line patterns", element: "Line", image: "https://images.unsplash.com/photo-1594577526227-daccc722bcc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW50YW5nbGUlMjBkb29kbGUlMjBwYXR0ZXJufGVufDF8fHx8MTY4ODQ4OTY0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Monochromatic Painting", emoji: "🎨", description: "Use one color in different shades", element: "Value", image: "https://images.unsplash.com/photo-1749746766525-eff0b9b50014?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlJTIwd2F0ZXJjb2xvciUyMHBhaW50aW5nfGVufDF8fHx8MTc2ODI1NTE0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
      { name: "Foil Relief Sculpture", emoji: "✨", description: "Create raised textures in foil", element: "Texture", image: "https://images.unsplash.com/photo-1645357907258-aa9aba27d98d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2lsJTIwZW1ib3NzaW5nJTIwY3JhZnR8ZW58MXx8fHwxNjg4NDg5NjQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    ],
    type: "activities"
  }
};

const SHOP_ITEMS = [
  { id: 'partyhat', name: 'Party Hat', cost: 0, currency: 'free', image: partyHatImg },
  { id: 'glasses', name: 'Smart Specs', cost: 15, currency: 'crumbs', image: glassesImg },
  { id: 'tophat', name: 'Fancy Hat', cost: 20, currency: 'crumbs', image: topHatImg },
  { id: 'crown', name: 'Gold Crown', cost: 25, currency: 'crumbs', image: crownImg },
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
    { text: "Other people's heartbeats can synchronize to the same musical rhythm when listening together.", tags: ["Heartbeat"], searchTerm: "Human heart" }
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
        const systemPrompt = `You are an educational guide for children (ages 7-8). Generate a single fascinating fact about the topic provided. DO NOT start with conversational phrases like "Did you know" or "Here's a fun fact". Launch directly into the fact itself. 

IMPORTANT CONTENT GUIDELINES:
- Keep content age-appropriate and positive for young children
- Use factual, straightforward language - avoid overly cutesy or conversational phrasing (e.g., prefer "other people's heartbeats" over "your friends' heartbeats")
- STRICTLY AVOID: human sacrifice, death rituals, violence, warfare, executions, torture, nudity, anatomy, bathing, underwear, classical sculptures/statues (often nude), adult content, medical procedures, drugs, alcohol, horror, crime
- When generating facts about sculpture as an art form, focus on modern, abstract, or assembled sculptures rather than classical statues
- Focus on fascinating, educational, uplifting aspects of topics
- When discussing ancient civilizations or historical topics, emphasize culture, achievements, daily life, inventions, and contributions to society

Return ONLY valid JSON in this exact format: { "fact": "The fact text here", "topic": "Topic Name", "imageSearchTerm": "3-5 HIGHLY SPECIFIC descriptive words directly related to the fact's main subject (e.g., 'kite flying traditional Chinese', 'anglerfish bioluminescent deep sea', 'volcanic lava eruption', 'humanoid robot technology'). AVOID generic or ambiguous terms. NEVER use just 'sculpture', 'statue', or 'classical art' - instead use 'modern sculpture installation', 'colorful abstract sculpture', or 'large assembled sculpture'.", "relatedTopics": ["Topic 1", "Topic 2", "Topic 3"] }`;
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

  const openScientificMethodStep = async (step) => {
    // Predefined educational content for each Scientific Method step
    const stepContent = {
      "Ask a Question": {
        fact: "Every scientific discovery starts with curiosity! Scientists ask questions like 'Why is the sky blue?' or 'How do birds fly?' The best questions often come from observing the world around us and wondering 'why' or 'how' something works.",
        topic: "Ask a Question - Scientific Method",
        imageSearchTerm: "child asking question thinking curious",
        relatedTopics: ["Curiosity", "Observation", "Scientific Method"]
      },
      "Research": {
        fact: "Before starting an experiment, scientists read books, search online, and talk to experts to learn what others have already discovered. This helps them avoid repeating mistakes and build on existing knowledge!",
        topic: "Research - Scientific Method",
        imageSearchTerm: "child reading books library research",
        relatedTopics: ["Research", "Learning", "Libraries"]
      },
      "Hypothesis": {
        fact: "A hypothesis is an educated guess based on what you already know. It's like saying 'I think this will happen because...' Scientists use the word 'if-then' to make predictions, like 'If I water this plant every day, then it will grow taller.'",
        topic: "Hypothesis - Scientific Method",
        imageSearchTerm: "scientist thinking lightbulb idea",
        relatedTopics: ["Predictions", "Logical Thinking", "Problem Solving"]
      },
      "Experiment": {
        fact: "Experiments are tests that help scientists check if their hypothesis is correct. The key is to change only ONE thing at a time so you know what caused the results. This is called testing a variable!",
        topic: "Experiment - Scientific Method",
        imageSearchTerm: "children science experiment laboratory",
        relatedTopics: ["Testing", "Variables", "Lab Safety"]
      },
      "Observe & Record": {
        fact: "Scientists carefully watch what happens during experiments and write everything down in a notebook or take photos. Even tiny details matter! Recording data helps scientists remember exactly what happened so they can share it with others.",
        topic: "Observe & Record - Scientific Method",
        imageSearchTerm: "scientist writing notebook data observation",
        relatedTopics: ["Data Collection", "Observation Skills", "Note-taking"]
      },
      "Analyze Results": {
        fact: "After collecting data, scientists look for patterns and try to understand what the information means. They might make charts, graphs, or tables to see the results more clearly. Sometimes the data shows something totally unexpected!",
        topic: "Analyze Results - Scientific Method",
        imageSearchTerm: "data analysis charts graphs colorful",
        relatedTopics: ["Data Analysis", "Patterns", "Graphs"]
      },
      "Draw Conclusions": {
        fact: "This is when scientists decide if their hypothesis was right or wrong. But here's the cool part: being wrong is actually good in science! When a hypothesis is wrong, scientists learn something new and can ask better questions next time.",
        topic: "Draw Conclusions - Scientific Method",
        imageSearchTerm: "child thinking conclusion checklist",
        relatedTopics: ["Critical Thinking", "Learning from Mistakes", "Problem Solving"]
      },
      "Share Findings": {
        fact: "Scientists share their discoveries by writing reports, giving presentations, or publishing in science journals. Sharing helps other scientists learn from the work and try the experiments themselves. Science is all about working together!",
        topic: "Share Findings - Scientific Method",
        imageSearchTerm: "children presenting science project fair",
        relatedTopics: ["Communication", "Collaboration", "Science Community"]
      }
    };

    const content = stepContent[step.name];
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

  const openScientificExperiment = (experiment) => {
    // Predefined experiments for the Scientific Method page
    const experimentData = {
      "Volcano Eruption": {
        title: "Volcano Eruption",
        supplies: ["Baking soda", "Vinegar", "Small cup or bottle", "Red food coloring (optional)", "Dish soap (optional)", "Tray or plate to catch spills"],
        steps: [
          "Set up your volcano: Place your cup or bottle on the tray.",
          "Add baking soda: Put 2-3 tablespoons of baking soda in the cup.",
          "Add color (optional): Mix in a few drops of red food coloring and a squirt of dish soap for foamy lava.",
          "Make it erupt: Pour vinegar into the cup and watch the chemical reaction create a foaming eruption!",
          "Observe: Notice how the baking soda (a base) reacts with the vinegar (an acid) to create carbon dioxide gas.",
          "Experiment more: Try using different amounts of baking soda or vinegar to see how it changes the eruption."
        ],
        imageSearchTerm: "baking soda vinegar volcano experiment"
      },
      "Growing Crystals": {
        title: "Growing Crystals",
        supplies: ["Sugar or salt", "Hot water (ask an adult)", "Glass jar", "String or pipe cleaner", "Pencil"],
        steps: [
          "Make supersaturated solution: Have an adult help you dissolve as much sugar or salt as possible in hot water.",
          "Prepare crystal starter: Tie a string to a pencil and hang it in the jar so it doesn't touch the bottom.",
          "Pour and wait: Pour the solution into the jar and place it somewhere it won't be disturbed.",
          "Observe daily: Watch over the next few days as crystals form on the string!",
          "Record changes: Take photos or draw pictures each day to track crystal growth.",
          "Learn: Crystals form when dissolved materials come out of solution and arrange in repeating patterns."
        ],
        imageSearchTerm: "sugar crystals growing jar science"
      },
      "Rainbow in a Jar": {
        title: "Rainbow in a Jar",
        supplies: ["Honey", "Dish soap", "Water", "Vegetable oil", "Rubbing alcohol (ask an adult)", "Tall clear glass or jar", "Food coloring"],
        steps: [
          "Start with honey: Pour honey into the bottom of your glass - it's the densest so it sinks.",
          "Add dish soap: Slowly pour dish soap on top of the honey. Pour it gently down the side of the glass.",
          "Color some water: Mix water with food coloring and slowly pour it on top.",
          "Add oil layer: Pour vegetable oil next - it's less dense than water so it floats on top.",
          "Top with alcohol: Have an adult help add rubbing alcohol with different food coloring as the top layer.",
          "Observe: Each liquid has a different density, so they stack in layers instead of mixing!"
        ],
        imageSearchTerm: "density rainbow jar liquid layers"
      },
      "Plant Growth": {
        title: "Plant Growth Experiment",
        supplies: ["Bean seeds (3-4)", "Small pots or cups", "Soil", "Water", "Sunny windowsill", "Notebook for observations"],
        steps: [
          "Plant your seeds: Fill pots with soil and plant one seed in each pot about 1 inch deep.",
          "Create different conditions: Put one plant in sunlight, one in partial shade, and one in complete darkness.",
          "Water regularly: Give each plant the same amount of water every day.",
          "Observe daily: Measure plant height, count leaves, and note color changes in your notebook.",
          "Track for 2 weeks: Draw pictures or take photos to document how each plant grows differently.",
          "Conclude: Which plant grew tallest? How did light affect growth? Plants need sunlight for photosynthesis!"
        ],
        imageSearchTerm: "children plant growth experiment beans"
      },
      "Static Electricity": {
        title: "Static Electricity Fun",
        supplies: ["Balloon", "Wool sweater or your hair", "Small pieces of paper", "Water faucet"],
        steps: [
          "Blow up balloon: Inflate a balloon and tie it closed.",
          "Create static charge: Rub the balloon on your hair or a wool sweater for 30 seconds.",
          "Pick up paper: Hold the balloon near tiny paper pieces - they'll jump up and stick!",
          "Bend water: Turn on a faucet to a thin stream, then bring your charged balloon close to it. Watch the water bend!",
          "Stick to wall: Press your charged balloon against a wall - it should stick there!",
          "Understand: Rubbing creates static electricity by moving electrons, which creates an electrical charge."
        ],
        imageSearchTerm: "static electricity balloon experiment children"
      },
      "Ice Melting Race": {
        title: "Ice Melting Race",
        supplies: ["Ice cubes (same size)", "Several small plates", "Salt", "Sugar", "Black paper", "White paper", "Stopwatch or timer"],
        steps: [
          "Set up your race: Place one ice cube on each plate in different conditions.",
          "Test salt: Sprinkle salt on one ice cube.",
          "Test sugar: Sprinkle sugar on another ice cube.",
          "Test colors: Put one ice cube on black paper and one on white paper in the sun.",
          "Control group: Leave one ice cube plain as your control.",
          "Time and record: Use a timer to track which ice cube melts first and why. Salt lowers the freezing point!"
        ],
        imageSearchTerm: "ice melting science experiment"
      },
      "Egg Drop Challenge": {
        title: "Egg Drop Challenge",
        supplies: ["Raw egg", "Various materials: cotton balls, bubble wrap, straws, tape, newspaper, rubber bands, small box or container"],
        steps: [
          "Plan your design: Sketch ideas for how to protect your egg from a fall.",
          "Build your protector: Use your materials to create padding or a structure around the egg.",
          "Test from low height: Start by dropping from waist height over grass or soft ground.",
          "Observe results: Did your egg survive? What protected it best?",
          "Improve design: Based on what you learned, redesign your protector to make it better.",
          "Challenge yourself: Try dropping from higher heights! Engineers test and improve designs just like this."
        ],
        imageSearchTerm: "egg drop challenge STEM activity"
      },
      "Bird Watching": {
        title: "Backyard Bird Watching",
        supplies: ["Notebook and pencil", "Binoculars (optional)", "Bird identification guide or app", "Camera (optional)", "Patience!"],
        steps: [
          "Choose your spot: Find a quiet place outside where you can see trees, bushes, or bird feeders.",
          "Sit quietly: Birds are more likely to appear if you stay still and quiet.",
          "Observe carefully: Look for birds and note their size, colors, beak shape, and behavior.",
          "Record data: Write or draw what you see. What time of day? What was the bird doing? How many did you see?",
          "Identify species: Use a field guide or app to identify the birds you observed.",
          "Track patterns: Return to your spot at different times. Do you see different birds in morning vs. evening?"
        ],
        imageSearchTerm: "children bird watching nature observation"
      },
      "Water Tornado": {
        title: "Water Tornado in a Bottle",
        supplies: ["Two 2-liter plastic bottles", "Water", "Duct tape or tornado tube connector", "Glitter (optional)"],
        steps: [
          "Fill one bottle: Fill one bottle about 2/3 full with water. Add glitter if you want to see the vortex better!",
          "Connect bottles: Place the empty bottle upside down on top of the full one and tape them together tightly.",
          "Flip and swirl: Turn the bottles upside down so the full bottle is on top.",
          "Create the tornado: Quickly move the bottles in a circular motion to start a swirl.",
          "Watch the vortex: A spinning funnel of water (vortex) will form as water flows into the bottom bottle!",
          "Understand: The spinning motion creates centripetal force, pulling the water into a tornado shape."
        ],
        imageSearchTerm: "water vortex bottle tornado experiment"
      },
      "Magnet Magic": {
        title: "Exploring Magnetic Fields",
        supplies: ["Bar magnets (2)", "Iron filings or paper clips", "White paper", "Compass", "Various objects to test"],
        steps: [
          "Test objects: Use your magnet to test different household items. Which are magnetic?",
          "See the field: Place a paper over a bar magnet and sprinkle iron filings on top to see the invisible magnetic field!",
          "Test poles: Bring two magnets together. Notice how opposite poles attract and same poles repel.",
          "Make a compass: Float a magnetized needle in water on a cork - it will point north!",
          "Magnetic strength: Test how many paper clips your magnet can pick up in a chain.",
          "Understand: Magnets create invisible force fields that can push or pull certain metals."
        ],
        imageSearchTerm: "magnet iron filings field experiment children"
      },
      "Solar Oven": {
        title: "Build a Solar Oven",
        supplies: ["Pizza box", "Aluminum foil", "Plastic wrap", "Black paper", "Tape", "Ruler", "Scissors", "S'mores ingredients"],
        steps: [
          "Create the flap: Draw a square on the box lid leaving a 1-inch border. Cut along three sides to make a flap.",
          "Add reflector: Cover the inside of the flap with aluminum foil (shiny side out) to reflect sunlight.",
          "Insulate the box: Line the bottom of the box with black paper to absorb heat.",
          "Seal it up: Tape plastic wrap over the opening you cut to create a greenhouse effect.",
          "Position in sun: Place s'mores ingredients inside and angle the foil flap to reflect maximum sunlight.",
          "Cook and learn: Wait 30-60 minutes. The sun's energy is converted to heat, melting your chocolate!"
        ],
        imageSearchTerm: "solar oven pizza box science kids"
      },
      "Paper Airplanes": {
        title: "Paper Airplane Engineering",
        supplies: ["Several sheets of paper", "Ruler", "Tape", "Paper clips", "Measuring tape", "Notebook for data"],
        steps: [
          "Design 1 - Classic dart: Fold a standard dart-style plane with a pointed nose.",
          "Design 2 - Wide wings: Create a plane with broader wings for more lift.",
          "Design 3 - Modified: Add modifications like paper clips on the nose or bent wing tips.",
          "Test flights: Throw each design three times and measure the distance traveled.",
          "Record data: Note which design flew farthest, straightest, or stayed in the air longest.",
          "Analyze: Which wing design worked best? How did weight affect flight? This is how engineers test designs!"
        ],
        imageSearchTerm: "paper airplane designs science experiment"
      }
    };

    const data = experimentData[experiment.name];
    if (!data) return;

    // Educational facts for each experiment
    const experimentFacts = {
      "Volcano Eruption": "When baking soda (a base) mixes with vinegar (an acid), they create a chemical reaction that produces carbon dioxide gas! The bubbles you see are actually thousands of tiny CO₂ gas bubbles escaping, just like real volcanic eruptions release gases from deep underground.",
      "Growing Crystals": "Crystals form when dissolved molecules arrange themselves in repeating geometric patterns as the water evaporates. Each type of crystal has its own unique shape - salt makes cubes while sugar forms long rectangles. Scientists study crystal structures to understand everything from diamonds to snowflakes!",
      "Rainbow in a Jar": "Density is how tightly packed molecules are in a substance. Honey is very dense (heavy for its size) so it sinks, while oil is less dense so it floats on water. This same principle keeps hot air balloons floating and helps ships stay afloat!",
      "Plant Growth": "Plants use sunlight, water, and carbon dioxide to make their own food through photosynthesis! The green chemical chlorophyll in leaves captures light energy and converts it into food energy. Without light, plants can't make food and will eventually die - that's why they always grow toward windows.",
      "Static Electricity": "When you rub a balloon on your hair, electrons (tiny negative particles) transfer from your hair to the balloon. This creates an electrical charge! The balloon now has extra electrons, making it negatively charged, while your hair has fewer electrons and becomes positively charged. Opposites attract, which is why your hair follows the balloon.",
      "Ice Melting Race": "Salt lowers the freezing point of water, which makes ice melt faster! This happens because salt dissolves into the water on the ice's surface and makes it harder for water molecules to stick together and refreeze. That's why cities put salt on icy roads in winter.",
      "Egg Drop Challenge": "Engineers use the same problem-solving process you're using! When designing everything from car airbags to phone cases, they test different materials and shapes to absorb impact energy. Crumple zones in cars work like your egg protector - they crush on impact to slow down the force gradually.",
      "Bird Watching": "Birds are descendants of dinosaurs! Scientists observe and record bird behaviors to learn about migration patterns, communication, and ecosystems. Just like you're doing, real ornithologists (bird scientists) use field notebooks, binoculars, and patience to study these amazing creatures.",
      "Water Tornado": "The spinning water creates a vortex - a spiral of fluid with low pressure in the center! This centripetal force pulls the water inward while it spins, creating the tornado shape. Real tornadoes and hurricanes work the same way with air instead of water.",
      "Magnet Magic": "Magnets create an invisible force field called a magnetic field! This field exists all around a magnet and can push or pull on certain metals like iron, nickel, and cobalt. Earth itself is a giant magnet, which is why compass needles always point north - they're being pulled by Earth's magnetic field.",
      "Solar Oven": "The sun sends energy to Earth in the form of light and heat! Your solar oven works by trapping this heat energy (like a greenhouse) and using the reflective foil to concentrate sunlight onto your food. Solar energy is clean, renewable, and powerful - some solar ovens can reach over 300°F!",
      "Paper Airplanes": "Airplane wings use Bernoulli's principle - air moving faster over the curved top of a wing creates lower pressure, which generates lift! Engineers test different wing shapes in wind tunnels just like you're testing paper plane designs. Weight, drag, thrust, and lift all work together to make things fly."
    };

    // Set activity response to show the mission page
    setActivityResponse(data);
    setAiResponse({ type: 'activity', content: data });
    
    // Navigate to nugget view (which displays activities)
    // Create a nugget with an educational fact
    const experimentFact = experimentFacts[experiment.name] || `${experiment.name}: ${experiment.description}`;
    const experimentNugget = {
      text: experimentFact,
      tags: ["Scientific Method", "Experiments", experiment.name],
      subjectId: 'science',
      id: Date.now(),
      searchTerm: data.imageSearchTerm,
      originalTag: experiment.name
    };
    
    setCurrentNugget(experimentNugget);
    setAiContentImage(null);
    setActivityImage(null);
    setLearnResponse(null);
    navigateTo('nugget');

    // Generate image for the experiment
    generateImage(data.title, data.imageSearchTerm, experiment.name);
  };

  const openArtActivity = (activity) => {
    // Predefined art activities for the Elements of Art page
    const activityData = {
      "Contour Line Drawing": {
        title: "Contour Line Drawing",
        supplies: ["Paper", "Pencil or pen", "Object to draw (like your hand, a shoe, or a plant)", "Optional: Mirror"],
        steps: [
          "Choose your subject: Pick an interesting object to draw.",
          "Position yourself: Look at your subject carefully. Don't look down at your paper!",
          "Start drawing: Put your pencil on the paper and slowly draw the outline while looking only at the object.",
          "Follow the edges: Let your eyes trace the contours (edges) of the object while your hand draws.",
          "Don't lift your pencil: Try to draw the entire object without lifting your pencil or looking down.",
          "Reveal your art: When finished, look at your paper! It might look wonky, but that's the charm of contour drawing."
        ],
        imageSearchTerm: "contour drawing"
      },
      "Shape Collage": {
        title: "Shape Collage",
        supplies: ["Colored paper or magazines", "Scissors", "Glue stick", "Large paper for background", "Pencil for sketching"],
        steps: [
          "Cut geometric shapes: Cut out circles, squares, triangles, and rectangles in different colors.",
          "Arrange shapes: Play with arranging your shapes on the background before gluing.",
          "Create something: Use shapes to create a picture - animals, buildings, abstract designs, or patterns.",
          "Layer shapes: Overlap shapes to create new forms and add depth to your design.",
          "Glue it down: Once you're happy with your arrangement, glue each shape carefully.",
          "Add details: Use smaller shapes or draw with markers to add finishing touches."
        ],
        imageSearchTerm: "geometric collage"
      },
      "Color Wheel Painting": {
        title: "Color Wheel Painting",
        supplies: ["Red, yellow, and blue paint (primary colors)", "Paintbrush", "Paper plate or palette", "White paper", "Water cup"],
        steps: [
          "Draw your wheel: Draw a large circle and divide it into 6 equal sections.",
          "Primary colors: Paint red, yellow, and blue in every other section, leaving spaces between them.",
          "Mix secondary colors: Mix red + yellow = orange; yellow + blue = green; blue + red = purple.",
          "Paint secondaries: Paint your secondary colors in the empty sections between their parent colors.",
          "Observe relationships: Notice how colors next to each other blend smoothly.",
          "Experiment more: Try mixing colors in different amounts to create lighter or darker shades."
        ],
        imageSearchTerm: "color wheel"
      },
      "Texture Rubbings": {
        title: "Texture Rubbings",
        supplies: ["Thin paper", "Unwrapped crayons or oil pastels", "Objects with interesting textures (leaves, coins, fabric, tree bark, tiles)"],
        steps: [
          "Find textures: Hunt around your home or outside for objects with interesting raised surfaces.",
          "Position paper: Place your thin paper over the textured object.",
          "Rub gently: Hold the paper still and rub the side of your crayon over it in one direction.",
          "Watch it appear: The texture will magically appear on your paper!",
          "Collect many textures: Create a texture collection by rubbing different surfaces on one page.",
          "Create art: Combine different textures to make a landscape, animal, or abstract design."
        ],
        imageSearchTerm: "texture rubbing"
      },
      "Value Scale": {
        title: "Value Scale",
        supplies: ["Pencil", "Paper", "Ruler", "Eraser", "Optional: Charcoal or black colored pencil"],
        steps: [
          "Draw boxes: Use a ruler to draw 6-8 connected boxes in a row.",
          "Label ends: Mark one end 'Light' and the other 'Dark'.",
          "Start with white: Leave the first box completely white (no shading).",
          "Lightest shade: In the second box, shade very lightly with your pencil.",
          "Gradually darken: In each box, press harder with your pencil to make darker shades.",
          "Darkest black: In the last box, shade as dark as possible, pressing hard or using multiple layers."
        ],
        imageSearchTerm: "value scale"
      },
      "3D Paper Sculpture": {
        title: "3D Paper Sculpture",
        supplies: ["Paper (cardstock works best)", "Scissors", "Glue or tape", "Ruler", "Pencil"],
        steps: [
          "Cut paper strips: Cut several strips of paper in different widths (1-3 inches wide).",
          "Create forms: Bend, curl, fold, or twist your paper strips to make 3D shapes.",
          "Cylinders: Roll a strip into a cylinder and glue the ends.",
          "Loops and arches: Create curves by bending strips and gluing ends to a base.",
          "Build upward: Stack and attach your forms to create a tall sculpture.",
          "Experiment: Try accordion folds, spirals, and cones to add variety to your sculpture."
        ],
        imageSearchTerm: "paper sculpture"
      },
      "Negative Space Art": {
        title: "Negative Space Art",
        supplies: ["Black and white paper", "Pencil", "Scissors", "Glue"],
        steps: [
          "Draw a simple shape: On black paper, draw a simple object (leaf, hand, bottle, etc.).",
          "Cut it out: Carefully cut out your shape.",
          "Glue the background: Glue the black paper (with the hole) onto white paper.",
          "See the negative: The white shape showing through is the 'negative space'!",
          "Try the reverse: Cut shapes from white paper and glue on black backgrounds.",
          "Create art: Use negative space to create hidden images or optical illusions."
        ],
        imageSearchTerm: "negative space"
      },
      "Pattern Design": {
        title: "Pattern Design",
        supplies: ["Paper", "Pencil, markers, or colored pencils", "Ruler (optional)", "Stamp or stencil (optional)"],
        steps: [
          "Choose a motif: Pick a simple shape or design to repeat (star, heart, triangle, etc.).",
          "Draw your unit: Draw your chosen shape neatly.",
          "Repeat in rows: Draw the same shape over and over in straight rows.",
          "Add rhythm: Change colors or sizes to create visual rhythm.",
          "Try different patterns: Make patterns that repeat, alternate, or radiate from a center point.",
          "Fill the page: Keep going until your entire paper is filled with your pattern!"
        ],
        imageSearchTerm: "repeating pattern"
      },
      "Pointillism Portrait": {
        title: "Pointillism Portrait",
        supplies: ["Cotton swabs or pencil eraser", "Paints or markers in various colors", "Paper", "Photo reference (optional)"],
        steps: [
          "Sketch lightly: Lightly draw a simple portrait or object with pencil.",
          "Dip and dot: Dip your cotton swab in paint and make small dots on your paper.",
          "Use new colors: Don't blend colors - place different colored dots next to each other.",
          "Build shapes: Use dots of different colors to create forms and shading.",
          "Step back: The magic of pointillism happens when you view it from a distance!",
          "Fill it in: Cover the entire image with dots until no white space remains."
        ],
        imageSearchTerm: "pointillism painting"
      },
      "Zentangle Patterns": {
        title: "Zentangle Patterns",
        supplies: ["White paper", "Black pen or fine marker", "Pencil"],
        steps: [
          "Draw a border: Lightly draw a square or rectangle on your paper.",
          "Divide the space: Draw random curved lines across your border to divide it into sections.",
          "Fill with patterns: In each section, draw a different repetitive pattern (dots, lines, swirls, etc.).",
          "No mistakes: There are no mistakes in Zentangle - every line is intentional!",
          "Take your time: Work slowly and mindfully, enjoying the meditative process.",
          "Add variety: Use different line weights, fill some spaces solid, and leave others open."
        ],
        imageSearchTerm: "zentangle patterns"
      },
      "Monochromatic Painting": {
        title: "Monochromatic Painting",
        supplies: ["One color of paint (choose your favorite!)", "White paint", "Black paint (optional)", "Paintbrush", "Paper", "Palette"],
        steps: [
          "Choose your color: Pick one color to work with (red, blue, green, etc.).",
          "Make tints: Mix your color with white paint to create lighter versions (tints).",
          "Make shades: Mix your color with a tiny bit of black to create darker versions (shades).",
          "Create your scale: Make 5-7 different values of your chosen color.",
          "Paint a picture: Use only your one color family to paint a landscape, still life, or abstract design.",
          "Observe unity: Notice how using one color creates harmony and mood in your artwork."
        ],
        imageSearchTerm: "monochromatic painting"
      },
      "Foil Relief Sculpture": {
        title: "Foil Relief Sculpture",
        supplies: ["Heavy-duty aluminum foil", "Cardboard base", "Glue", "Dull pencil or wooden skewer", "Optional: Markers or paint"],
        steps: [
          "Prepare foil: Cut a piece of foil larger than your cardboard base.",
          "Glue it down: Smooth the foil onto your cardboard, wrapping edges around the back.",
          "Draw your design: Use a dull pencil to gently draw a design into the foil.",
          "Create texture: Press different patterns and textures using your tools.",
          "Build relief: Press from the back to make raised areas, then flip and outline from the front.",
          "Add color: Color in sections with permanent markers or paint if desired."
        ],
        imageSearchTerm: "foil sculpture"
      }
    };

    const data = activityData[activity.name];
    if (!data) return;

    // Educational facts for each art activity
    const activityFacts = {
      "Contour Line Drawing": "Contour drawing trains your eye-hand coordination and teaches you to really see objects! Artists use this technique to improve their observation skills. By not looking at your paper, you're forcing your brain to focus on what your eyes see rather than what you think you should draw.",
      "Shape Collage": "Geometric shapes are the foundation of all art! Artists like Piet Mondrian and Wassily Kandinsky created famous abstract paintings using just simple shapes and colors. Every complex image can be broken down into basic shapes - circles, squares, and triangles.",
      "Color Wheel Painting": "The color wheel was invented by Sir Isaac Newton in 1666! Understanding color relationships helps artists create harmonious paintings. Colors opposite each other on the wheel (complementary colors) create the strongest contrast and make each other appear brighter.",
      "Texture Rubbings": "Texture is one of the elements of art that artists use to make flat pictures look and feel real! The artist Max Ernst created a technique called 'frottage' using texture rubbings. You can feel texture with your hands, but artists also create visual texture that you can only see.",
      "Value Scale": "Value (lightness and darkness) is what makes drawings look three-dimensional! Artists use value to show form, create mood, and guide your eye through a composition. Leonardo da Vinci was a master of value, using gradual shifts from light to dark in his famous paintings.",
      "3D Paper Sculpture": "Form is the element of art that has three dimensions: height, width, and depth! Unlike flat shapes, forms take up actual space. Sculptors throughout history have used many materials, but paper sculpture shows that amazing art doesn't need expensive supplies.",
      "Negative Space Art": "Negative space is the space around and between objects! Many famous logos and artworks use negative space cleverly. The FedEx logo hides an arrow in the negative space between letters. Learning to see negative space makes you a better artist.",
      "Pattern Design": "Patterns appear in nature everywhere - from honeycomb hexagons to leopard spots to spiral galaxies! Artists use patterns to create rhythm and unity in their work. Ancient cultures decorated pottery, textiles, and architecture with meaningful patterns.",
      "Pointillism Portrait": "Pointillism was invented by French artists Georges Seurat and Paul Signac in the 1880s! They discovered that when you place pure color dots next to each other, your eyes blend them from a distance. This is similar to how pixels create images on screens today!",
      "Zentangle Patterns": "Line is the most fundamental element of art - it's the path a point makes as it moves! Different types of lines create different feelings: horizontal lines feel calm, vertical lines feel strong, and diagonal lines create movement and tension. Zentangle combines many line patterns into meditative art.",
      "Monochromatic Painting": "Monochromatic means 'one color'! Pablo Picasso had a 'Blue Period' where he painted mainly in blue tones to express sadness. Using one color family creates a strong mood and teaches you about value (light and dark) better than using many colors.",
      "Foil Relief Sculpture": "Relief sculpture is raised off a flat surface, unlike sculptures you can walk around! Ancient civilizations carved relief sculptures on temple walls and coins. The Statue of Liberty's face is an example of high relief - parts stick out dramatically from the background."
    };

    // Set activity response to show the mission page
    setActivityResponse(data);
    setAiResponse({ type: 'activity', content: data });
    
    // Navigate to nugget view (which displays activities)
    // Create a nugget with an educational fact
    const activityFact = activityFacts[activity.name] || `${activity.name}: ${activity.description}`;
    const activityNugget = {
      text: activityFact,
      tags: ["Elements of Art", activity.element, activity.name],
      subjectId: 'art',
      id: Date.now(),
      searchTerm: data.imageSearchTerm,
      originalTag: activity.name
    };
    
    setCurrentNugget(activityNugget);
    setAiContentImage(null);
    setActivityImage(null);
    setLearnResponse(null);
    navigateTo('nugget');

    // Generate image for the activity
    generateImage(data.title, data.imageSearchTerm, activity.name);
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
      const systemPrompt = `You are ${guideName}, a friendly and helpful guide for children (ages 7-8) using the "Nuggets of Knowledge" educational app. Your role is to help them navigate and use the app features in a warm, encouraging way.

Available features in the app:
- Home page with subject planets (Science, History, Geography, Arts, Math, Language)
- Search bar to discover facts about any topic
- "My Collections" to view saved nuggets, activities, and words
- Nugget pages with "Explain", "Do This" (activities), and "Photos" buttons
- Quiz challenges when you collect 5+ nuggets
- Crumbs currency earned by completing activities
- Shop to customize mascots with accessories
- Dark/light theme toggle in settings

Keep responses:
- Short and simple (2-3 sentences max)
- Friendly and encouraging
- Focused on helping them use the app
- Age-appropriate for 7-8 year olds

Previous conversation:
${updatedMessages.slice(-6).map(m => `${m.role === 'user' ? 'Child' : guideName}: ${m.content}`).join('\n')}

Respond as ${guideName} to help the child.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt }] }],
            safetySettings: [
              { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
              { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm here to help! What would you like to know about the app?";
      
      setGuideChatMessages([...updatedMessages, { role: 'assistant', content: aiMessage }]);
    } catch (error) {
      console.error('Guide chat error:', error);
      setGuideChatMessages([...updatedMessages, { role: 'assistant', content: "Oops! I had a little trouble there. Can you ask me again?" }]);
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

        {/* Mascot Guide Selection */}
        <div className="mb-8 bg-gradient-to-r from-purple-100 via-blue-100 to-pink-100 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-pink-900/20 rounded-3xl p-6 border-2 border-purple-200 dark:border-purple-800 shadow-lg animate-pop hover:shadow-2xl transition-shadow">
          {!selectedGuide ? (
            <div className="flex flex-col items-center gap-6">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-2">
                  Pick a Guide!
                </h2>
                <p className="text-slate-600 dark:text-slate-300 font-semibold">
                  Choose a friend to help you explore 🌟
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Space Nugget */}
                <button 
                  onClick={() => handleGuideSelection('space')}
                  className="flex flex-col items-center gap-3 animate-bounce hover:scale-110 transition-transform group"
                  style={{ animationDuration: '3s' }}
                >
                  <img 
                    src={spaceNuggetImg}
                    alt="Space Nugget"
                    className="w-32 h-32 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
                  />
                  <div className="bg-purple-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-md relative group-hover:bg-purple-600 transition-colors">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-purple-500"></div>
                    Space Nugget 🌙⭐
                  </div>
                </button>

                {/* Sky Nugget */}
                <button 
                  onClick={() => handleGuideSelection('sky')}
                  className="flex flex-col items-center gap-3 animate-bounce hover:scale-110 transition-transform group"
                  style={{ animationDuration: '3s', animationDelay: '0.5s' }}
                >
                  <img 
                    src={skyNuggetImg}
                    alt="Sky Nugget"
                    className="w-32 h-32 object-contain drop-shadow-xl group-hover:drop-shadow-2xl transition-all"
                  />
                  <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl font-bold text-sm shadow-md relative group-hover:bg-blue-600 transition-colors">
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-blue-500"></div>
                    Sky Nugget ☀️☁️
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Selected Guide */}
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

              {/* Welcome Message */}
              <div className="text-center px-4">
                <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-2">
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

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
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
            <button 
                onClick={() => navigateTo('avatar')} 
                className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors flex flex-col items-center gap-2 relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all" />
                <div className="flex gap-2 relative">
                    <img src={spaceNuggetImg} alt="Space Nugget" className="w-8 h-8 object-contain" />
                    <img src={skyNuggetImg} alt="Sky Nugget" className="w-8 h-8 object-contain" />
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200 relative">Avatar</span>
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
                    {/* Search Bar - Full Width */}
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

                    {/* Popular Topics - Centered */}
                    <div className="max-w-4xl mx-auto">
                        <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4 text-center">Popular Topics</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{selectedSubject.subtopics.map(topic => (
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

                    {/* Surprise Me Button - Centered */}
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

                {/* PROCESS TYPE - Special Layout for Experiments */}
                {type === 'process' && topic.experiments ? (
                    <>
                        {/* Fun Experiments at the Top */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Fun Experiments to Try</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {topic.experiments.map((experiment, index) => (
                                    <button
                                        key={experiment.name}
                                        onClick={() => openScientificExperiment(experiment)}
                                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-slate-100 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 group animate-pop overflow-hidden"
                                        style={{animationDelay: `${index * 0.05}s`}}
                                    >
                                        <div className="relative w-full h-32 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                            <img 
                                                src={experiment.image} 
                                                alt={experiment.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                            />
                                        </div>
                                        <div className="p-4 text-left">
                                            <h3 className="font-bold text-slate-800 dark:text-white mb-1">{experiment.name}</h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">{experiment.description}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Two Column Layout: Scientific Method + Key Concepts */}
                        <div className="grid md:grid-cols-[2fr_1fr] gap-6 mb-8">
                            {/* Left Column: The Scientific Method Process */}
                            <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-lg">
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">The Scientific Method</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    {topic.steps.map((step, index) => (
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

                            {/* Right Column: Key Concepts */}
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Key Concepts</h2>
                                <div className="flex flex-col gap-3">
                                    {topic.subTopics.map((item, index) => (
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
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">The Scientific Method Process</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {topic.steps.map((step, index) => (
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

                {/* ACTIVITIES TYPE - Special Layout for Elements of Art */}
                {type === 'activities' && topic.activities ? (
                    <>
                        {/* Art Activities at the Top */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Art Activities to Try</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {topic.activities.map((activity, index) => (
                                    <button
                                        key={activity.name}
                                        onClick={() => openArtActivity(activity)}
                                        className="bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition-all border-2 border-slate-100 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-600 group animate-pop overflow-hidden"
                                        style={{animationDelay: `${index * 0.05}s`}}
                                    >
                                        <div className="relative w-full h-32 bg-slate-200 dark:bg-slate-700 overflow-hidden">
                                            <img 
                                                src={activity.image} 
                                                alt={activity.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                            />
                                        </div>
                                        <div className="p-4 text-left">
                                            <h3 className="font-bold text-slate-800 dark:text-white mb-1">{activity.name}</h3>
                                            <p className="text-xs text-slate-600 dark:text-slate-400">{activity.description}</p>
                                            <div className="mt-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
                                                {activity.element}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Key Concepts: Elements of Art */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Key Concepts: Elements of Art</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {topic.subTopics.map((item, index) => (
                                    <button
                                        key={item.name}
                                        onClick={() => {
                                            if (apiKey) {
                                                generateNuggetByTag(item.name, 'art');
                                            } else {
                                                showNotification("Add API key to explore topics!");
                                            }
                                        }}
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
                        </div>
                    </>
                ) : null}

                {/* Topic Cards Section - For non-process and non-activities types */}
                {type !== 'process' && type !== 'activities' && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 text-center">
                            {type === 'timeline' ? 'Explore Ancient Civilizations' : 'Explore Topics'}
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
                )}
            </div>
        </div>
    );
  };

  const renderNugget = () => {
    if (!currentNugget) return null;
    return (
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col">
            <div className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center">
                <button onClick={goBack} className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/30 dark:hover:to-purple-900/30 px-4 py-2 rounded-full transition-all font-bold border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 shadow-sm hover:shadow-md">
                    <ArrowLeft className="w-5 h-5" /> Back
                </button>
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
                  <button 
                    onClick={title === 'Mission Log' || title === 'My Nugget Collection' || title === 'Word Collection' ? () => navigateTo('my-collections') : goBack} 
                    className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"
                  >
                    <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                  </button>
                  <h1 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h1>
                  {title === 'Accessories Shop' && (
                    <div className="ml-4 px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full shadow-lg flex items-center gap-2">
                      <span className="text-2xl">🍗</span>
                      <span className="font-black text-white text-lg">{crumbs}</span>
                      <span className="font-bold text-orange-100 text-sm">Crumbs</span>
                    </div>
                  )}
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

  const renderAvatar = () => {
    const customizationCategories = [
      { id: 'eyes', label: 'Eyes', icon: '👀' },
      { id: 'mouth', label: 'Mouth', icon: '👄' },
      { id: 'arms', label: 'Arms', icon: '💪' },
      { id: 'legs', label: 'Legs', icon: '🦵' },
      { id: 'accessories', label: 'Accessories', icon: '✨' }
    ];

    // Accessory options for each category
    const accessoryOptions = {
      eyes: [
        { id: 'eye-lashes', name: 'Lashes', image: eyeAngled },
        { id: 'eye-oval', name: 'Oval Eyes', image: eyeVertical },
        { id: 'eye-angry', name: 'Angry Eyebrows', image: angryEyebrows }
      ],
      mouth: [
        { id: 'mouth-smile', name: 'Smile', image: smileMouth },
        { id: 'mouth-frown', name: 'Frown', image: frownPng }
      ],
      arms: [
        { id: 'arms-basic', name: 'Arms', image: armsImg }
      ],
      legs: [
        { id: 'legs-basic', name: 'Legs', image: legsImg }
      ],
      accessories: [
        { id: 'partyhat', name: 'Party Hat', image: partyHatImg, requiresUnlock: false },
        { id: 'rainbowtail', name: 'Rainbow Tail', image: rainbowTailImg, requiresUnlock: false, renderBehind: true },
        { id: 'browntail', name: 'Brown Tail', image: brownTailImg, requiresUnlock: false, renderBehind: true },
        { id: 'glasses', name: 'Smart Specs', image: glassesImg, requiresUnlock: true },
        { id: 'tophat', name: 'Fancy Hat', image: topHatImg, requiresUnlock: true },
        { id: 'crown', name: 'Gold Crown', image: crownImg, requiresUnlock: true }
      ]
    };

    const handleNuggetTypeSelection = (type) => {
      setAvatarNuggetType(type);
      localStorage.setItem('nuggets_avatarNuggetType', type);
      saveData({ avatarNuggetType: type });
    };

    // Show nugget type selection if not chosen yet
    if (!avatarNuggetType) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pattern-bg overflow-x-hidden transition-colors duration-500 flex items-center justify-center p-4">
          <div className="max-w-4xl w-full">
            {/* Header */}
            <div className="text-center mb-12 animate-pop">
              <h1 className="text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-4">
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Nugget!</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Pick your favorite style to start customizing
              </p>
            </div>

            {/* Selection Cards */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Basic Nugget */}
              <button
                onClick={() => handleNuggetTypeSelection('basic')}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border-4 border-slate-200 dark:border-slate-700 hover:border-yellow-400 dark:hover:border-yellow-500 transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute top-4 right-4 bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 rounded-full">
                  <span className="text-sm font-black text-yellow-700 dark:text-yellow-400">Classic</span>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-6 border-2 border-yellow-200 dark:border-yellow-800">
                  <img 
                    src={baseNuggetImg} 
                    alt="Basic Nugget"
                    className="w-full h-64 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform"
                  />
                </div>

                <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3">Basic Nugget</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  The original golden nugget! Perfect for classic learners who love the traditional look.
                </p>
                
                <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400 font-bold">
                  <span className="text-2xl">✨</span>
                  <span>Choose Classic</span>
                  <span className="text-2xl">✨</span>
                </div>
              </button>

              {/* Spicy Nugget */}
              <button
                onClick={() => handleNuggetTypeSelection('spicy')}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border-4 border-slate-200 dark:border-slate-700 hover:border-red-400 dark:hover:border-red-500 transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className="absolute top-4 right-4 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded-full">
                  <span className="text-sm font-black text-red-700 dark:text-red-400">Hot!</span>
                </div>
                
                <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl p-8 mb-6 border-2 border-red-200 dark:border-red-800">
                  <img 
                    src={spicyNuggetImg} 
                    alt="Spicy Nugget"
                    className="w-full h-64 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform"
                  />
                </div>

                <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-3">Spicy Nugget</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Extra crispy and full of flavor! For adventurous learners who like things spicy! 🌶️
                </p>
                
                <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-bold">
                  <span className="text-2xl">🔥</span>
                  <span>Choose Spicy</span>
                  <span className="text-2xl">🔥</span>
                </div>
              </button>
            </div>

            {/* Back Button */}
            <div className="text-center mt-8">
              <button
                onClick={goBack}
                className="px-6 py-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all text-slate-700 dark:text-slate-200 font-bold flex items-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-5 h-5" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Show customization interface after selection
    const currentNuggetImage = avatarNuggetType === 'spicy' ? spicyNuggetImg : baseNuggetImg;
    const nuggetDisplayName = avatarNuggetType === 'spicy' ? 'Spicy Nugget' : 'Basic Nugget';

    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pattern-bg overflow-x-hidden transition-colors duration-500">
        {/* Header */}
        <div className="sticky top-0 z-50 glass-panel border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={goBack} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:scale-110 transition-transform">
              <ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" />
            </button>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white">Avatar Studio</h1>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm">
              <span className="font-bold text-slate-700 dark:text-white">{crumbs}</span>
              <Cookie className="w-4 h-4 text-orange-400 fill-orange-400" />
            </div>
            <button onClick={goHome} className="px-4 py-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all text-slate-700 dark:text-slate-200 font-bold text-sm">
              Home
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Avatar Preview */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 text-center">Your Nugget</h2>
                
                {/* Avatar Display */}
                <div className={`relative rounded-2xl p-8 aspect-square flex items-center justify-center border-4 ${
                  avatarNuggetType === 'spicy' 
                    ? 'bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800'
                    : 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200 dark:border-yellow-800'
                }`}>
                  <div className="relative w-full h-full">
                    {/* Accessories that render behind the nugget (like tails) */}
                    {selectedAccessories.accessories.map(accessoryId => {
                      const accessoryOption = accessoryOptions.accessories.find(a => a.id === accessoryId);
                      return accessoryOption && accessoryOption.renderBehind ? (
                        <img 
                          key={accessoryId}
                          src={accessoryOption.image}
                          alt={accessoryOption.name}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      ) : null;
                    })}
                    {/* Base Nugget */}
                    <img 
                      src={currentNuggetImage} 
                      alt={nuggetDisplayName}
                      className="w-full h-full object-contain drop-shadow-2xl"
                    />
                    {/* Layered Eye Accessories - Show all selected */}
                    {selectedAccessories.eyes.map(eyeId => {
                      const eyeOption = accessoryOptions.eyes.find(e => e.id === eyeId);
                      return eyeOption ? (
                        <img 
                          key={eyeId}
                          src={eyeOption.image}
                          alt={eyeOption.name}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      ) : null;
                    })}
                    {/* Layered Mouth Accessory */}
                    {selectedAccessories.mouth && (() => {
                      const mouthOption = accessoryOptions.mouth.find(m => m.id === selectedAccessories.mouth);
                      return mouthOption ? (
                        <img 
                          src={mouthOption.image}
                          alt={mouthOption.name}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      ) : null;
                    })()}
                    {/* Layered Arms Accessory */}
                    {selectedAccessories.arms && (() => {
                      const armsOption = accessoryOptions.arms.find(a => a.id === selectedAccessories.arms);
                      return armsOption ? (
                        <img 
                          src={armsOption.image}
                          alt={armsOption.name}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      ) : null;
                    })()}
                    {/* Layered Legs Accessory */}
                    {selectedAccessories.legs && (() => {
                      const legsOption = accessoryOptions.legs.find(l => l.id === selectedAccessories.legs);
                      return legsOption ? (
                        <img 
                          src={legsOption.image}
                          alt={legsOption.name}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      ) : null;
                    })()}
                    {/* Layered Accessories (only those that render in front) */}
                    {selectedAccessories.accessories.map(accessoryId => {
                      const accessoryOption = accessoryOptions.accessories.find(a => a.id === accessoryId);
                      return accessoryOption && !accessoryOption.renderBehind ? (
                        <img 
                          key={accessoryId}
                          src={accessoryOption.image}
                          alt={accessoryOption.name}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                        />
                      ) : null;
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-3">
                  {/* Save Avatar Button */}
                  <button
                    onClick={saveAvatarConfig}
                    disabled={avatarSaveLoading}
                    className={`w-full px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border ${
                      avatarSaveSuccess
                        ? 'bg-green-500 dark:bg-green-600 text-white border-green-600 dark:border-green-700'
                        : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-transparent shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {avatarSaveLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : avatarSaveSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Avatar
                      </>
                    )}
                  </button>
                  
                  {/* Shop Button */}
                  <button
                    onClick={() => {
                      navigateTo('shop');
                    }}
                    className="w-full bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Visit Shop
                  </button>
                  
                  {/* Change Nugget Type Button */}
                  <button
                    onClick={() => {
                      setAvatarNuggetType(null);
                      localStorage.removeItem('nuggets_avatarNuggetType');
                    }}
                    className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700"
                  >
                    <Shuffle className="w-4 h-4" />
                    Change Nugget Style
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side - Customization Options */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6">
                  <h2 className="text-2xl font-black text-white">Customize</h2>
                  <p className="text-sm text-white/80 mt-1">Choose features for your nugget</p>
                </div>

                {/* Category Tabs */}
                <div className="grid grid-cols-5 gap-1 p-2 bg-slate-50 dark:bg-slate-800/50">
                  {customizationCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setAvatarCustomizationTab(category.id)}
                      className={`p-3 rounded-xl font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                        avatarCustomizationTab === category.id
                          ? 'bg-white dark:bg-slate-700 shadow-md scale-105 text-slate-800 dark:text-white'
                          : 'bg-transparent text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'
                      }`}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="hidden sm:inline">{category.label}</span>
                    </button>
                  ))}
                </div>

                {/* Options Display */}
                <div className="p-6 min-h-[400px]">
                  <h3 className="text-lg font-black text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">
                      {customizationCategories.find(c => c.id === avatarCustomizationTab)?.icon}
                    </span>
                    {customizationCategories.find(c => c.id === avatarCustomizationTab)?.label}
                  </h3>

                  {/* Placeholder for customization options */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {accessoryOptions[avatarCustomizationTab]?.length > 0 ? (
                      accessoryOptions[avatarCustomizationTab].map((option) => {
                        // Check if selected - handle both arrays (eyes) and single values (other categories)
                        const currentSelection = selectedAccessories[avatarCustomizationTab];
                        const isSelected = Array.isArray(currentSelection) 
                          ? currentSelection.includes(option.id)
                          : currentSelection === option.id;
                        
                        // Check if item is locked (for accessories that require unlock)
                        const isLocked = option.requiresUnlock && !inventory.includes(option.id);
                        
                        return (
                          <button
                            key={option.id}
                            disabled={isLocked}
                            onClick={() => {
                              if (isLocked) return;
                              
                              setSelectedAccessories(prev => {
                                const currentValue = prev[avatarCustomizationTab];
                                
                                // For eyes (array), add/remove from array
                                if (Array.isArray(currentValue)) {
                                  const newArray = isSelected
                                    ? currentValue.filter(id => id !== option.id)
                                    : [...currentValue, option.id];
                                  return {
                                    ...prev,
                                    [avatarCustomizationTab]: newArray
                                  };
                                }
                                
                                // For other categories (single value), toggle
                                return {
                                  ...prev,
                                  [avatarCustomizationTab]: isSelected ? null : option.id
                                };
                              });
                            }}
                            className={`aspect-square bg-white dark:bg-slate-800 rounded-2xl border-2 transition-all group p-4 flex flex-col items-center justify-center gap-2 relative ${
                              isLocked 
                                ? 'border-slate-200 dark:border-slate-700 opacity-60 cursor-not-allowed'
                                : `cursor-pointer hover:scale-105 hover:shadow-lg ${
                                    isSelected 
                                      ? 'border-blue-500 dark:border-blue-400 shadow-lg scale-105 ring-2 ring-blue-300 dark:ring-blue-600' 
                                      : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
                                  }`
                            }`}
                          >
                            {isLocked && (
                              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-2xl backdrop-blur-sm">
                                <Lock className="w-8 h-8 text-white" />
                              </div>
                            )}
                            <img 
                              src={option.image} 
                              alt={option.name}
                              className={`w-full h-auto object-contain transition-transform ${!isLocked && 'group-hover:scale-110'}`}
                            />
                            <p className={`text-xs font-bold text-center ${
                              isLocked 
                                ? 'text-slate-400 dark:text-slate-500'
                                : isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-300'
                            }`}>{option.name}</p>
                            {isLocked && (
                              <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                                Earn Crumbs to Unlock!
                              </p>
                            )}
                          </button>
                        );
                      })
                    ) : (
                      [1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex flex-col items-center justify-center gap-2 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group"
                        >
                          <div className="text-3xl group-hover:scale-110 transition-transform">
                            {customizationCategories.find(c => c.id === avatarCustomizationTab)?.icon}
                          </div>
                          <p className="text-xs font-bold text-slate-400 dark:text-slate-500">Coming Soon</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Placeholder Message */}
                  {accessoryOptions[avatarCustomizationTab]?.length === 0 && (
                    <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 text-center">
                      <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                      <h4 className="font-black text-slate-800 dark:text-white mb-2">More Options Coming Soon!</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        We're working on adding lots of fun {customizationCategories.find(c => c.id === avatarCustomizationTab)?.label.toLowerCase()} options for your nugget.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
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
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Missions</h2>
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
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">Words</h2>
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
                <button onClick={() => navigateTo('my-collections')} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                <button onClick={() => navigateTo('my-collections')} className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-sm hover:shadow-md transition-all"><ArrowLeft className="w-6 h-6 text-slate-600 dark:text-slate-400" /></button>
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
      
      {renderShowMeModal()}
      {renderEnlargedImage()}
      
      {/* Guide Chat Modal */}
      {showGuideChat && selectedGuide && (
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
                  <h2 className="text-2xl font-black text-white">
                    {selectedGuide === 'space' ? 'Space Nugget' : 'Sky Nugget'}
                  </h2>
                  <p className="text-sm text-white/80 font-semibold">Your Guide</p>
                </div>
              </div>
              <button 
                onClick={() => setShowGuideChat(false)} 
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
      )}
      
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
                  <p className="text-sm text-purple-100 font-semibold">Answer to Earn More Crumbs!</p>
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
                    className="w-full p-4 pr-12 border-2 border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 min-h-[60px] resize-none"
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
                        const isCorrect = stardustQuizSubmitted && index === stardustQuestion.correctIndex;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              if (isWrong) return;
                              setSelectedStardustAnswer(index);
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
                    {stardustQuizSubmitted && selectedStardustAnswer === stardustQuestion.correctIndex && (
                      <div className="bg-green-100 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-700 rounded-xl p-4 text-center animate-pop">
                        <p className="text-green-800 dark:text-green-200 font-bold flex items-center justify-center gap-2">
                          <Check className="w-5 h-5" /> Correct! Here are your Crumbs!
                        </p>
                      </div>
                    )}
                    {wrongAnswers.size > 0 && (
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
                  const hasValidTextAnswer = isValidTextInput(freeformAnswer);
                  const hasCorrectMCQ = selectedStardustAnswer === stardustQuestion?.correctIndex;
                  
                  if (hasValidTextAnswer || hasCorrectMCQ) {
                    setStardustQuizSubmitted(true);
                    updateCrumbs(10);
                    showNotification("Great job! +10 Crumbs 🍪");
                    
                    // Save the user's answer with the nugget if they provided one
                    if (hasValidTextAnswer && currentNugget) {
                      const updatedCollection = collection.map(nugget => {
                        if (nugget.text === currentNugget.text) {
                          return { ...nugget, userThoughts: freeformAnswer };
                        }
                        return nugget;
                      });
                      saveCollection(updatedCollection);
                    }
                    
                    setTimeout(() => {
                      setShowStardustQuiz(false);
                      setFreeformAnswer('');
                      setSelectedStardustAnswer(null);
                      setWrongAnswers(new Set());
                      setStardustQuestion(null);
                      setStardustQuizSubmitted(false);
                    }, 1500);
                  } else if (selectedStardustAnswer !== null && selectedStardustAnswer !== stardustQuestion?.correctIndex) {
                    // Wrong MCQ answer - mark it and show feedback
                    setStardustQuizSubmitted(true);
                    setWrongAnswers(new Set([...wrongAnswers, selectedStardustAnswer]));
                    setSelectedStardustAnswer(null);
                    showNotification("Not quite! Try again - you've got this! 💪");
                    setTimeout(() => setStardustQuizSubmitted(false), 500);
                  } else if (freeformAnswer.trim().length > 0 && !hasValidTextAnswer) {
                    showNotification("Please provide a thoughtful answer!");
                  } else {
                    showNotification("Please answer the question or write something thoughtful!");
                  }
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Submit for +10 Crumbs!
              </button>

              {/* Skip Button */}
              <button
                onClick={() => {
                  setShowStardustQuiz(false);
                  setFreeformAnswer('');
                  setSelectedStardustAnswer(null);
                  setWrongAnswers(new Set());
                  setStardustQuestion(null);
                  setStardustQuizSubmitted(false);
                }}
                className="w-full bg-slate-300 hover:bg-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold py-3 px-6 rounded-xl transition-all"
              >
                Skip
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
                  const isSelected = selectedCollectionAnswer === index;
                  const isWrong = collectionQuizWrongAnswers.has(`${currentCollectionQuestionIndex}-${index}`);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (isWrong) return;
                        setSelectedCollectionAnswer(index);
                      }}
                      disabled={isWrong}
                      className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                        isWrong
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed border-2 border-slate-300 dark:border-slate-600 line-through opacity-60'
                          : isSelected
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-slate-800 dark:text-white border-2 border-yellow-400 shadow-md'
                          : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-yellow-300 hover:shadow-md active:scale-[0.98]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Submit Button */}
              <button
                onClick={() => {
                  if (selectedCollectionAnswer === null) {
                    showNotification("Please select an answer!");
                    return;
                  }
                  
                  const isCorrect = selectedCollectionAnswer === collectionQuizQuestions[currentCollectionQuestionIndex].correctIndex;
                  
                  if (isCorrect) {
                    // Correct answer - show green button
                    setCollectionQuizCorrect(true);
                    showNotification("Correct! 🎉");
                    
                    if (currentCollectionQuestionIndex < collectionQuizQuestions.length - 1) {
                      // Move to next question
                      setTimeout(() => {
                        setCurrentCollectionQuestionIndex(currentCollectionQuestionIndex + 1);
                        setSelectedCollectionAnswer(null);
                        setCollectionQuizWrongAnswers(new Set());
                        setCollectionQuizCorrect(false);
                      }, 1200);
                    } else {
                      // All questions complete
                      updateCrumbs(20);
                      showNotification("Awesome! +20 Crumbs 🍪");
                      setTimeout(() => {
                        setShowCollectionQuiz(false);
                        setCollectionQuizQuestions([]);
                        setCurrentCollectionQuestionIndex(0);
                        setSelectedCollectionAnswer(null);
                        setCollectionQuizWrongAnswers(new Set());
                        setCollectionQuizCorrect(false);
                      }, 1500);
                    }
                  } else {
                    // Wrong answer - mark it and let them try again
                    setCollectionQuizWrongAnswers(new Set([...collectionQuizWrongAnswers, `${currentCollectionQuestionIndex}-${selectedCollectionAnswer}`]));
                    setSelectedCollectionAnswer(null);
                    showNotification("Not quite! Try again - you've got this! 💪");
                  }
                }}
                disabled={selectedCollectionAnswer === null || collectionQuizCorrect}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                  collectionQuizCorrect
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg cursor-default'
                    : selectedCollectionAnswer === null
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-yellow-900 shadow-lg hover:shadow-xl active:scale-[0.98]'
                }`}
              >
                {collectionQuizCorrect && <Check className="w-6 h-6" />}
                {collectionQuizCorrect ? 'Correct!' : 'Submit Answer'}
              </button>

              {/* Exit Button */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => {
                    setShowCollectionQuiz(false);
                    setCollectionQuizQuestions([]);
                    setCurrentCollectionQuestionIndex(0);
                    setSelectedCollectionAnswer(null);
                    setCollectionQuizWrongAnswers(new Set());
                  }}
                  className="w-full px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                  Exit Challenge
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
                  const isSelected = selectedWordAnswer === index;
                  const isWrong = wordQuizWrongAnswers.has(`${currentWordQuestionIndex}-${index}`);
                  const isCorrect = index === wordQuizQuestions[currentWordQuestionIndex].correctIndex;
                  const showFeedback = wordQuizWrongAnswers.size > 0;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        if (!showFeedback) {
                          setSelectedWordAnswer(index);
                        }
                      }}
                      disabled={showFeedback && !isCorrect}
                      className={`w-full p-4 rounded-xl font-semibold text-left transition-all ${
                        showFeedback && isCorrect
                          ? 'bg-green-500 text-white border-2 border-green-600 shadow-lg'
                          : showFeedback && isWrong
                          ? 'bg-red-500 text-white border-2 border-red-600 line-through'
                          : isSelected
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-slate-800 dark:text-white border-2 border-emerald-400 shadow-md'
                          : 'bg-white dark:bg-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 text-slate-800 dark:text-white border-2 border-slate-200 dark:border-slate-600 hover:border-emerald-300 hover:shadow-md active:scale-[0.98]'
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {/* Submit Button */}
              <button
                onClick={() => {
                  if (selectedWordAnswer === null) {
                    showNotification("Please select an answer!");
                    return;
                  }
                  
                  const isCorrect = selectedWordAnswer === wordQuizQuestions[currentWordQuestionIndex].correctIndex;
                  
                  if (isCorrect) {
                    // Correct answer
                    if (currentWordQuestionIndex < wordQuizQuestions.length - 1) {
                      // Move to next question
                      setTimeout(() => {
                        setCurrentWordQuestionIndex(currentWordQuestionIndex + 1);
                        setSelectedWordAnswer(null);
                        setWordQuizWrongAnswers(new Set());
                      }, 1200);
                    } else {
                      // All questions complete
                      updateCrumbs(20);
                      showNotification("Amazing! +20 Crumbs 🍪");
                      setTimeout(() => {
                        setShowWordQuiz(false);
                        setWordQuizQuestions([]);
                        setCurrentWordQuestionIndex(0);
                        setSelectedWordAnswer(null);
                        setWordQuizWrongAnswers(new Set());
                      }, 1500);
                    }
                  } else {
                    // Wrong answer - mark it
                    setWordQuizWrongAnswers(new Set([...wordQuizWrongAnswers, `${currentWordQuestionIndex}-${selectedWordAnswer}`]));
                  }
                }}
                disabled={selectedWordAnswer === null || wordQuizWrongAnswers.size > 0}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                  selectedWordAnswer === null || wordQuizWrongAnswers.size > 0
                    ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-emerald-900 shadow-lg hover:shadow-xl active:scale-[0.98]'
                }`}
              >
                {wordQuizWrongAnswers.size > 0 ? 'Try Another Answer!' : 'Submit Answer'}
              </button>

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
                    setSelectedWordAnswer(null);
                    setWordQuizWrongAnswers(new Set());
                  }}
                  className="w-full px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-semibold text-sm transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50"
                >
                  Exit Challenge
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
