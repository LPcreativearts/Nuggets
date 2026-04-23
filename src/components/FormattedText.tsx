import React from 'react';

export const FormattedText = ({ text, onLinkClick, onCollectWord }) => {
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
