import React, { useState } from 'react';
import { AITool } from '../types/aiTools';
import { X, Trash2, Copy, Check, ExternalLink, Bookmark, Sparkles } from 'lucide-react';

interface StackDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedTools: AITool[];
  onRemoveTool: (tool: AITool) => void;
  onSelectTool: (tool: AITool) => void;
  onClearAll: () => void;
}

export const StackDrawer: React.FC<StackDrawerProps> = ({
  isOpen,
  isOpen: _isOpen,
  onClose,
  savedTools,
  onRemoveTool,
  onSelectTool,
  onClearAll
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleExportMarkdown = () => {
    if (savedTools.length === 0) return;
    const md = `# My Omni AI Tool Stack (${savedTools.length} Tools)\n\n` +
      savedTools.map((t, idx) => `${idx + 1}. **${t.name}** - ${t.tagline}\n   - URL: ${t.url}\n   - Pricing: ${t.pricing} | Category: ${t.category}`).join('\n\n') +
      `\n\nGenerated with Omni AI Tool (https://omni-ai-tool.app)`;
    
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-md bg-[#090e1f] border-l border-slate-800 h-full flex flex-col p-6 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/25">
              <Bookmark className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                My Workspace Stack
              </h2>
              <p className="text-xs text-slate-400">
                {savedTools.length} {savedTools.length === 1 ? 'tool' : 'tools'} pinned
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#0e162e] hover:bg-[#141f3d] border border-slate-750 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-2.5 pr-1">
          {savedTools.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Bookmark className="w-10 h-10 mb-3 stroke-[1.5] text-slate-600" />
              <h3 className="font-semibold text-white text-sm mb-1">Your stack is empty</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Click the bookmark icon on any tool card to save it here for fast reference and pipeline exports.
              </p>
            </div>
          ) : (
            savedTools.map((tool) => (
              <div
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="p-3.5 rounded-xl bg-[#0c1327] border border-slate-800 hover:border-purple-500/40 hover:bg-[#121c38] transition-all cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-mono text-blue-300">#{tool.number.toString().padStart(3, '0')}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      {tool.pricing}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors truncate">
                    {tool.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                    {tool.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                    title="Open website"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveTool(tool);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                    title="Remove from stack"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedTools.length > 0 && (
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <button
              onClick={handleExportMarkdown}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/25 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Markdown Copied to Clipboard!' : 'Export Stack as Markdown'}</span>
            </button>

            <button
              onClick={onClearAll}
              className="w-full py-1.5 text-center text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              Clear all saved tools
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
