import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { SUBTOPIC_IMAGES } from '../data/subtopic-images';
import { CURRICULUM_TOPICS } from '../data/curriculum-topics';

// fetchWikipediaImage helper (copied from App.tsx)
const fetchWikipediaImage = async (term) => {
    try {
        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`);
        if (!response.ok) return null;
        const data = await response.json();
        if (data.thumbnail?.source) {
            return { url: data.thumbnail.source.replace(/\/\d+px-/, '/800px-') };
        }
        return null;
    } catch { return null; }
};

export const SubtopicCard = ({ subtopic, onClick }) => {
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
        <button onClick={onClick} className={`group relative overflow-hidden bg-transparent rounded-2xl shadow-sm border-2 ${isCurriculum ? 'border-yellow-400 dark:border-yellow-500 shadow-yellow-400/20 shadow-lg' : 'border-slate-200 dark:border-slate-700'} hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex flex-col items-center justify-center text-center h-32 md:h-40 w-full animate-pop`}>
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
                    <span className="relative z-10 font-bold text-white text-lg md:text-xl drop-shadow-md px-2 leading-tight" style={{ fontFamily: 'var(--font-bubblegum)' }}>{subtopic}</span>
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
