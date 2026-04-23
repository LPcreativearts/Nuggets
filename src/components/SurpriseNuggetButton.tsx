import React from 'react';
import { Shuffle } from 'lucide-react';

export const SurpriseNuggetButton = ({ onClick, subjectName }) => (
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
