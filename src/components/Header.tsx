import React from 'react';
import { Search, Bookmark, Command, Layers, Globe, SlidersHorizontal, Compass, X, Download } from 'lucide-react';
import { UserRole } from '../data/rolesData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  savedCount: number;
  onOpenStack: () => void;
  onOpenAdvisor: () => void;
  onOpenLiveSearch: () => void;
  onOpenRoleModal: () => void;
  selectedRole: UserRole | null;
  onTriggerInstall?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  savedCount,
  onOpenStack,
  onOpenAdvisor,
  onOpenLiveSearch,
  onOpenRoleModal,
  selectedRole,
  onTriggerInstall
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#090d1a]/95 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/25">
      {/* Top Utility Bar with Deep Navy and Light Mint Green accent */}
      <div className="bg-[#0b1226]/85 border-b border-slate-800/60 py-1.5 px-3 sm:px-6 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-white tracking-wide">Omni AI Tool</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-300 font-mono text-[11px]">550+ Verified Tools</span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">15 Domains</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 font-medium">Open Source AI Directory</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLiveSearch}
              className="inline-flex items-center gap-1.5 bg-[#0e1b38] hover:bg-[#13254e] text-blue-300 hover:text-white px-2.5 py-0.5 rounded-md text-[11px] font-medium border border-blue-500/35 transition-all shadow-sm"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>Search Web with Google Grounding</span>
            </button>
            {onTriggerInstall && (
              <button
                onClick={onTriggerInstall}
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 hover:text-white bg-emerald-950/40 hover:bg-emerald-900/50 px-2 py-0.5 rounded-md border border-emerald-500/30 transition-all"
                title="Install Omni AI on PC or Mobile"
              >
                <Download className="w-3 h-3 text-emerald-400" />
                <span>Install</span>
              </button>
            )}
            <span className="text-slate-500 font-mono text-[11px]">v2026.4</span>
          </div>
        </div>
      </div>

      {/* Main Nav Container in Deep Navy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3.5">
        {/* Brand */}
        <div className="flex items-center justify-between w-full md:w-auto gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 via-violet-600 to-blue-500 p-[1.5px] shadow-md shadow-purple-500/25">
              <div className="w-full h-full bg-[#0a0f1e] rounded-[10px] flex items-center justify-center font-bold font-mono text-sm text-white">
                Ω
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold tracking-tight text-white">
                  Omni AI Tool
                </h1>
                <span className="text-[10px] font-mono uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-semibold">
                  Suite Hub
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium">
                Professional AI Infrastructure & Workflows
              </p>
            </div>
          </div>
        </div>

        {/* Global Live Search */}
        <div className="flex-1 w-full max-w-xl relative">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tools by name, task, category, or role..."
              className="w-full bg-[#0d152c] border border-slate-750 focus:border-blue-400 rounded-xl pl-10 pr-10 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-400/50 transition-all shadow-inner"
            />
            {searchQuery ? (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="hidden sm:flex items-center gap-0.5 absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-300 bg-[#141e3d] px-1.5 py-0.5 rounded border border-slate-700">
                <Command className="w-2.5 h-2.5" /> K
              </div>
            )}
          </div>
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
          <button
            onClick={onOpenRoleModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              selectedRole
                ? `${selectedRole.colorScheme.badgeBg} ${selectedRole.colorScheme.border} shadow-sm ${selectedRole.colorScheme.glow}`
                : 'bg-[#0f172a] text-slate-200 border-slate-700 hover:text-white hover:border-blue-500/50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>{selectedRole ? selectedRole.title.split(' ')[0] : 'Filter by Field'}</span>
          </button>

          {/* Workflow Advisor with Purple & Violet Gradient */}
          <button
            onClick={onOpenAdvisor}
            className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-md shadow-purple-500/25 transition-all"
          >
            <Compass className="w-3.5 h-3.5 text-white" />
            <span>Workflow Advisor</span>
          </button>

          {/* My Stack with Dark Slate Blue & Mint highlight */}
          <button
            onClick={onOpenStack}
            className="relative flex items-center gap-1.5 bg-[#0e162d] hover:bg-[#141f3d] text-white border border-slate-700 font-medium text-xs px-3 py-1.5 rounded-lg transition-colors"
          >
            <Bookmark className="w-3.5 h-3.5 text-blue-300" />
            <span>My Stack</span>
            {savedCount > 0 && (
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full min-w-4 text-center">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
