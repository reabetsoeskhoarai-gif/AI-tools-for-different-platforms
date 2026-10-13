import React, { useState } from 'react';
import { AITool } from '../types/aiTools';
import { ALL_TOOLS } from '../data/allTools';
import { CHAPTERS } from '../data/categories';
import { X, ExternalLink, Bookmark, Check, Copy, ArrowRight, Star } from 'lucide-react';

interface ToolModalProps {
  tool: AITool | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (tool: AITool) => void;
  onSelectRelatedTool: (tool: AITool) => void;
}

export const ToolModal: React.FC<ToolModalProps> = ({
  tool,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onSelectRelatedTool
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !tool) return null;

  const chapter = CHAPTERS.find((c) => c.id === tool.chapterId);
  const relatedTools = ALL_TOOLS.filter(
    (t) => t.chapterId === tool.chapterId && t.id !== tool.id
  ).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(tool.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#090e1f] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-[#101a38] border border-slate-750">
                #{tool.number.toString().padStart(3, '0')}
              </span>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-md border ${chapter?.badgeBg || 'bg-blue-500/10 text-blue-300 border-blue-500/30'}`}>
                {chapter ? chapter.title : tool.category}
              </span>
              <span className="text-xs font-mono text-emerald-300 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-500/30">
                {tool.pricing}
              </span>
              {tool.isPick && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono uppercase bg-amber-500/15 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-semibold">
                  <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {tool.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Subgroup: <span className="text-slate-200">{tool.subgroup}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#0e162e] hover:bg-[#141f3d] border border-slate-750 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="py-5 space-y-4 text-sm text-slate-200">
          <div>
            <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">Overview</h4>
            <p className="text-slate-200 leading-relaxed font-normal bg-[#0c1327] p-3.5 rounded-xl border border-slate-800/80">
              {tool.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase text-slate-400 mb-1">Verified Destination</h4>
            <div className="flex items-center justify-between gap-2 bg-[#0c1327] border border-slate-800/80 rounded-xl px-3.5 py-2.5">
              <span className="font-mono text-xs text-blue-300 truncate">
                {tool.url}
              </span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 text-xs text-slate-300 hover:text-white px-2 py-1 rounded bg-[#131d3a] border border-slate-700 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">
                More in {chapter?.title || 'this category'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {relatedTools.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => onSelectRelatedTool(rel)}
                    className="p-2.5 rounded-lg bg-[#0c1327] border border-slate-800/80 hover:border-purple-500/40 text-left transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-slate-400">#{rel.number.toString().padStart(3, '0')}</span>
                      <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
                        {rel.name}
                      </p>
                    </div>
                    <span className="text-[10px] text-slate-400 flex items-center gap-0.5 mt-1 self-end group-hover:text-white">
                      <span>View</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onToggleSave(tool)}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs transition-colors border ${
              isSaved
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                : 'bg-[#0e162e] text-slate-200 border-slate-750 hover:text-white hover:bg-[#141f3d]'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-400 text-emerald-400' : ''}`} />
            <span>{isSaved ? 'In Your Stack' : 'Save to Stack'}</span>
          </button>

          {/* Official site button with Purple & Violet gradient */}
          <a
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/30 transition-all"
          >
            <span>Launch Official Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
