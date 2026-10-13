import React from 'react';
import { Chapter } from '../types/aiTools';
import { CHAPTERS } from '../data/categories';
import { Layers, Bookmark, Sparkles, Star } from 'lucide-react';

interface ChapterNavProps {
  selectedChapterId: number | null;
  onSelectChapter: (id: number | null) => void;
  filterPicksOnly: boolean;
  onTogglePicks: () => void;
  filterRefreshOnly: boolean;
  onToggleRefresh: () => void;
  totalResultsCount: number;
}

export const ChapterNav: React.FC<ChapterNavProps> = ({
  selectedChapterId,
  onSelectChapter,
  filterPicksOnly,
  onTogglePicks,
  filterRefreshOnly,
  onToggleRefresh,
  totalResultsCount
}) => {
  return (
    <div className="bg-[#0a0f20]/90 border-b border-slate-800/80 px-4 sm:px-6 py-2.5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto space-y-2.5">
        {/* Quick Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => {
                onSelectChapter(null);
                if (filterPicksOnly) onTogglePicks();
                if (filterRefreshOnly) onToggleRefresh();
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 text-xs ${
                selectedChapterId === null && !filterPicksOnly && !filterRefreshOnly
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md shadow-purple-500/20'
                  : 'bg-[#0f172a] text-slate-300 hover:text-white hover:bg-[#15203b] border border-slate-750'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>

            <button
              onClick={onTogglePicks}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 text-xs border ${
                filterPicksOnly
                  ? 'bg-amber-500/20 text-amber-200 border-amber-400/80 ring-1 ring-amber-400/40 shadow-sm shadow-amber-500/20'
                  : 'bg-[#0f172a] text-slate-300 border-slate-750 hover:text-amber-300 hover:border-amber-500/40 hover:bg-[#15203b]'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${filterPicksOnly ? 'fill-amber-300 text-amber-300' : 'text-amber-400'}`} />
              <span>Featured Only</span>
            </button>

            <button
              onClick={onToggleRefresh}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 text-xs border ${
                filterRefreshOnly
                  ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/80 ring-1 ring-emerald-400/40 shadow-sm shadow-emerald-500/20'
                  : 'bg-[#0f172a] text-slate-300 border-slate-750 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-[#15203b]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>2026 Additions</span>
            </button>
          </div>

          <div className="text-slate-300 text-xs font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{totalResultsCount} verified tools</span>
          </div>
        </div>

        {/* 15 Chapter Horizontal Scroll Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-thin">
          {CHAPTERS.map((ch) => {
            const isSelected = selectedChapterId === ch.id;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChapter(isSelected ? null : ch.id)}
                className={`whitespace-nowrap px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 border ${
                  isSelected
                    ? ch.activeBtn
                    : `bg-[#0e162d] text-slate-200 border-slate-750 hover:${ch.borderAccent} hover:text-white hover:bg-[#141f3d]`
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${ch.dotColor} shrink-0 ${isSelected ? 'scale-125 ring-2 ring-white/20' : 'opacity-85'}`} />
                <span className="font-mono text-[11px] text-slate-400">
                  {ch.id < 10 ? `0${ch.id}` : ch.id}
                </span>
                <span>{ch.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
