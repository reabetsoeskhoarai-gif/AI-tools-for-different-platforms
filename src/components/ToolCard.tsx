import React, { useState } from 'react';
import { AITool } from '../types/aiTools';
import { CHAPTERS } from '../data/categories';
import { Bookmark, Check, Copy, ArrowUpRight, Star } from 'lucide-react';

interface ToolCardProps {
  tool: AITool;
  isSaved: boolean;
  onToggleSave: (tool: AITool) => void;
  onOpenDetails: (tool: AITool) => void;
}

const getPricingBadge = (pricing: string) => {
  switch (pricing) {
    case 'Free':
      // Light mint-green badge
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    case 'Freemium':
      // Blue badge
      return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
    case 'Free Trial':
      // Sky blue badge
      return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    case 'Paid':
      // Purple / Violet badge
      return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700';
  }
};

export const ToolCard: React.FC<ToolCardProps> = ({
  tool,
  isSaved,
  onToggleSave,
  onOpenDetails
}) => {
  const [copied, setCopied] = useState(false);
  const chapter = CHAPTERS.find((c) => c.id === tool.chapterId);

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(tool.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={() => onOpenDetails(tool)}
      className="group relative flex flex-col justify-between bg-[#0e162d]/90 hover:bg-[#141f3d] border border-slate-800/90 hover:border-purple-500/40 rounded-xl p-4 sm:p-4.5 transition-all duration-200 cursor-pointer shadow-md shadow-black/25 hover:shadow-xl hover:shadow-purple-500/5 hover:-translate-y-0.5"
    >
      {/* Top subtle category accent bar on hover */}
      <div 
        className={`absolute top-0 left-4 right-4 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${chapter?.dotColor || 'bg-blue-400'}`} 
      />

      <div>
        {/* Top bar with ID, tag and action buttons */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className={`font-semibold ${chapter?.accentColor || 'text-blue-400'}`}>
              #{tool.number.toString().padStart(3, '0')}
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300 font-sans truncate max-w-[140px] text-[11px]">
              {tool.subgroup}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {tool.isPick && (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-semibold">
                <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                <span>Featured</span>
              </span>
            )}
            <button
              onClick={handleCopyLink}
              title="Copy URL"
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave(tool);
              }}
              title={isSaved ? 'In Stack' : 'Save to Stack'}
              className={`p-1 rounded transition-colors ${
                isSaved 
                  ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/40' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-bold text-white group-hover:text-blue-200 transition-colors tracking-tight">
          {tool.name}
        </h3>

        {/* Tagline */}
        <p className="text-xs text-slate-300/95 mt-1.5 line-clamp-2 leading-relaxed">
          {tool.tagline}
        </p>
      </div>

      {/* Card Footer: Pricing, Chapter, and Visit */}
      <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-800/70">
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-md border ${getPricingBadge(tool.pricing)}`}>
            {tool.pricing}
          </span>
          <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
            Ch.{tool.chapterId}
          </span>
        </div>

        {/* Visit link button with Blue hover */}
        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-white hover:bg-blue-600/20 px-2 py-1 rounded transition-colors"
        >
          <span>Visit</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
