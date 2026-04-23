import { Microscope, Map as MapIcon, Calculator, Music, Palette, Briefcase, Edit3 } from 'lucide-react';

export const SUBJECTS = [
  { 
    id: 'science', name: 'Science', icon: Microscope, 
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-200', border: 'border-emerald-300 dark:border-emerald-700', 
    subtopics: ["Experiments", "Black Holes", "Carnivorous Plants", "Deep Sea Creatures", "Robots", "Slime", "Dinosaurs", "Volcanoes", "Magnets"],
    imgTerm: "Microscope" 
  },
  { 
    id: 'history', name: 'History', icon: MapIcon, 
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-200', border: 'border-amber-300 dark:border-amber-700', 
    subtopics: ["Ancient Civilizations", "Wonders of the World", "Mummies", "Vikings", "Pirates", "Titanic", "Castles", "Knights", "Early Humans"],
    imgTerm: "Ancient history"
  },
  { 
    id: 'math', name: 'Numbers', icon: Calculator, 
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200', border: 'border-blue-300 dark:border-blue-700', 
    subtopics: ["Elements of Math", "Infinity", "Secret Codes", "Fractals", "Impossible Shapes", "Zero", "Speed of Light", "Logic Puzzles", "Symmetry"],
    imgTerm: "Abacus"
  },
  { 
    id: 'music', name: 'Music', icon: Music, 
    color: 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-200', border: 'border-rose-300 dark:border-rose-700', 
    subtopics: ["Elements of Music", "Weird Instruments", "Video Game Music", "Animal Sounds", "Synthesizers", "Rhythm", "Movie Soundtracks", "Beatboxing", "Drums"],
    imgTerm: "Orchestra"
  },
  { 
    id: 'art', name: 'Art', icon: Palette, 
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200', border: 'border-purple-300 dark:border-purple-700', 
    subtopics: ["Elements of Art", "Famous Works of Art", "Art Movements", "Prehistoric Art", "Optical Illusions", "Pixel Art", "Sculpture", "Origami", "Pottery"],
    imgTerm: "The Starry Night"
  },
  { 
    id: 'career', name: 'Careers', icon: Briefcase, 
    color: 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200', border: 'border-slate-300 dark:border-slate-600', 
    subtopics: ["Lego Master", "Video Game Tester", "Astronaut", "Paleontologist", "Special Effects", "Animal Rescuer", "Firefighter", "Robot Engineer", "Marine Biologist"],
    imgTerm: "Astronaut"
  },
  { 
    id: 'words', name: 'Words', icon: Edit3, 
    color: 'bg-pink-100 text-pink-700 dark:bg-pink-900/50 dark:text-pink-200', border: 'border-pink-300 dark:border-pink-700', 
    subtopics: ["Elements of Language", "Stories", "Silly Words", "Secret Languages", "Jokes", "Ancient Writing", "Palindromes", "Hieroglyphics", "Storytelling"],
    imgTerm: "Calligraphy"
  },
];
