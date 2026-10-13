import React, { useState, useEffect, useMemo } from 'react';
import { ALL_TOOLS } from './data/allTools';
import { CHAPTERS } from './data/categories';
import { USER_ROLES, UserRole } from './data/rolesData';
import { AITool } from './types/aiTools';
import { Header } from './components/Header';
import { ChapterNav } from './components/ChapterNav';
import { ToolCard } from './components/ToolCard';
import { ToolModal } from './components/ToolModal';
import { WorkflowAdvisorModal } from './components/WorkflowAdvisorModal';
import { StackDrawer } from './components/StackDrawer';
import { RoleSelectionModal } from './components/RoleSelectionModal';
import { LiveSearchGroundingModal } from './components/LiveSearchGroundingModal';
import { InstallPwaBanner } from './components/InstallPwaBanner';
import { 
  ArrowRight, 
  Compass, 
  SlidersHorizontal, 
  Globe, 
  Terminal, 
  PenLine, 
  Video, 
  Palette, 
  Mic, 
  TrendingUp, 
  ShoppingBag, 
  Rocket, 
  GraduationCap, 
  Share2, 
  Workflow, 
  BadgeDollarSign,
  Star,
  Sparkles,
  Download,
  CheckCircle2,
  Layers,
  Smartphone,
  Laptop
} from 'lucide-react';

const renderRoleIcon = (name: string, colorClass: string = "text-slate-200") => {
  const iconProps = { className: `w-4 h-4 ${colorClass}` };
  switch (name) {
    case 'Terminal': return <Terminal {...iconProps} />;
    case 'PenLine': return <PenLine {...iconProps} />;
    case 'Video': return <Video {...iconProps} />;
    case 'Palette': return <Palette {...iconProps} />;
    case 'Mic': return <Mic {...iconProps} />;
    case 'TrendingUp': return <TrendingUp {...iconProps} />;
    case 'ShoppingBag': return <ShoppingBag {...iconProps} />;
    case 'Rocket': return <Rocket {...iconProps} />;
    case 'GraduationCap': return <GraduationCap {...iconProps} />;
    case 'Share2': return <Share2 {...iconProps} />;
    case 'Workflow': return <Workflow {...iconProps} />;
    case 'BadgeDollarSign': return <BadgeDollarSign {...iconProps} />;
    default: return <Compass {...iconProps} />;
  }
};

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState<number | null>(null);
  const [filterPicksOnly, setFilterPicksOnly] = useState(false);
  const [filterRefreshOnly, setFilterRefreshOnly] = useState(false);

  // Modal states
  const [activeModalTool, setActiveModalTool] = useState<AITool | null>(null);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isStackOpen, setIsStackOpen] = useState(false);
  const [isLiveSearchOpen, setIsLiveSearchOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  // Role Selection State
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(() => {
    try {
      const storedRoleId = localStorage.getItem('omni_ai_selected_role');
      if (storedRoleId) {
        return USER_ROLES.find((r) => r.id === storedRoleId) || null;
      }
      return null;
    } catch {
      return null;
    }
  });

  // Open role modal on first visit if no role has been chosen yet
  useEffect(() => {
    const hasConfigured = localStorage.getItem('omni_ai_role_configured');
    if (!hasConfigured && !selectedRole) {
      setIsRoleModalOpen(true);
    }
  }, []);

  const handleSelectRole = (role: UserRole | null) => {
    setSelectedRole(role);
    try {
      localStorage.setItem('omni_ai_role_configured', 'true');
      if (role) {
        localStorage.setItem('omni_ai_selected_role', role.id);
      } else {
        localStorage.removeItem('omni_ai_selected_role');
      }
    } catch (e) {
      console.error('Failed to store role in localStorage', e);
    }
  };

  // Saved tools in Stack (persisted in localStorage)
  const [savedTools, setSavedTools] = useState<AITool[]>(() => {
    try {
      const stored = localStorage.getItem('omni_ai_saved_stack');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('omni_ai_saved_stack', JSON.stringify(savedTools));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [savedTools]);

  const handleToggleSave = (tool: AITool) => {
    setSavedTools((prev) => {
      const exists = prev.some((t) => t.id === tool.id);
      if (exists) {
        return prev.filter((t) => t.id !== tool.id);
      } else {
        return [...prev, tool];
      }
    });
  };

  const handleSelectToolByName = (name: string) => {
    const match = ALL_TOOLS.find((t) => t.name.toLowerCase().includes(name.toLowerCase()));
    if (match) {
      setActiveModalTool(match);
      setIsAdvisorOpen(false);
    }
  };

  // Filter tools
  const filteredTools = useMemo(() => {
    return ALL_TOOLS.filter((tool) => {
      // 1. Role / Field Filter
      if (selectedRole) {
        const inRoleChapter = selectedRole.recommendedChapters.includes(tool.chapterId);
        const isSuggested = selectedRole.suggestedTools.some(
          (st) => tool.name.toLowerCase() === st.toLowerCase()
        );
        if (!inRoleChapter && !isSuggested) {
          return false;
        }
      }

      // 2. Chapter filter
      if (selectedChapterId !== null && tool.chapterId !== selectedChapterId) {
        return false;
      }

      // 3. Featured Filter
      if (filterPicksOnly && !tool.isPick) {
        return false;
      }

      // 4. 2026 Additions
      if (filterRefreshOnly && !tool.is2026Refresh) {
        return false;
      }

      // 5. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesTagline = tool.tagline.toLowerCase().includes(q);
        const matchesCategory = tool.category.toLowerCase().includes(q);
        const matchesSubgroup = tool.subgroup.toLowerCase().includes(q);
        const matchesNum = tool.number.toString().includes(q);
        return matchesName || matchesTagline || matchesCategory || matchesSubgroup || matchesNum;
      }

      return true;
    });
  }, [searchQuery, selectedChapterId, filterPicksOnly, filterRefreshOnly, selectedRole]);

  // Group tools by chapter for categorized view
  const toolsGroupedByChapter = useMemo(() => {
    const map = new Map<number, AITool[]>();
    filteredTools.forEach((tool) => {
      const list = map.get(tool.chapterId) || [];
      list.push(tool);
      map.set(tool.chapterId, list);
    });
    return map;
  }, [filteredTools]);

  return (
    <div className="min-h-screen bg-[#090d1a] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-white">
      {/* PWA Install Banner for Mobile Phones & PCs */}
      <InstallPwaBanner />

      {/* Global Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        savedCount={savedTools.length}
        onOpenStack={() => setIsStackOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenLiveSearch={() => setIsLiveSearchOpen(true)}
        onOpenRoleModal={() => setIsRoleModalOpen(true)}
        selectedRole={selectedRole}
      />

      {/* Navigation & Chapter Bar */}
      <ChapterNav
        selectedChapterId={selectedChapterId}
        onSelectChapter={setSelectedChapterId}
        filterPicksOnly={filterPicksOnly}
        onTogglePicks={() => setFilterPicksOnly(!filterPicksOnly)}
        filterRefreshOnly={filterRefreshOnly}
        onToggleRefresh={() => setFilterRefreshOnly(!filterRefreshOnly)}
        totalResultsCount={filteredTools.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-7">
        
        {/* Active Discipline Workspace Banner (when role is selected) */}
        {selectedRole && (
          <div className="relative rounded-2xl p-4 sm:p-5 border border-purple-500/35 bg-[#0d152c] shadow-xl overflow-hidden">
            {/* Ambient background glow in Deep Navy & Mint */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#141f3e] border border-purple-500/30 shrink-0 mt-0.5">
                  {renderRoleIcon(selectedRole.iconName, "text-emerald-300")}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                      Active Field Workspace
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-slate-300">
                      Targeting Chapters {selectedRole.recommendedChapters.join(', ')}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {selectedRole.title}
                  </h2>
                  <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
                    {selectedRole.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons with Palette Gradients */}
              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={() => setIsRoleModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#111c38] hover:bg-[#18274f] text-slate-200 border border-slate-700 hover:border-blue-400 transition-colors flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-blue-300" />
                  <span>Switch Field</span>
                </button>
                <button
                  onClick={() => handleSelectRole(null)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                >
                  Clear Filter
                </button>
              </div>
            </div>

            {/* Curated Field Picks Strip */}
            <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-mono text-slate-400 uppercase mr-1">
                Field Priorities:
              </span>
              {selectedRole.suggestedTools.map((toolName) => (
                <button
                  key={toolName}
                  onClick={() => handleSelectToolByName(toolName)}
                  className="inline-flex items-center gap-1 bg-[#090e1f] hover:bg-[#101b38] text-slate-200 hover:text-white px-2.5 py-1 rounded-lg text-xs font-medium border border-slate-800 hover:border-blue-500/50 transition-colors"
                >
                  <span>{toolName}</span>
                  <ArrowRight className="w-2.5 h-2.5 text-blue-400 opacity-70" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Hero Directory Overview (Only shown when no search & no role filter active) */}
        {!selectedRole && !searchQuery && selectedChapterId === null && !filterPicksOnly && !filterRefreshOnly && (
          <div className="relative rounded-2xl p-6 sm:p-8 border border-slate-800/90 bg-[#0d1428] shadow-2xl overflow-hidden">
            {/* Ambient gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600/15 via-blue-600/10 to-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl space-y-3.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-semibold tracking-wider">
                  Universal Intelligence Infrastructure
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-emerald-300 font-mono font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>550+ Production Tools Verified</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-blue-300 font-mono flex items-center gap-1">
                  <Laptop className="w-3.5 h-3.5 text-blue-400" />
                  <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                  <span>PC & Mobile Installable</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                The open-source digital directory for professional AI tools.
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Organized across 15 operational disciplines with zero fluff. Filter by your field of work, inspect capabilities, synthesize multi-tool pipelines, or ground queries against the live web.
              </p>

              {/* Quick Actions Row with Palette Gradients */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Purple & Violet Gradient button */}
                <button
                  onClick={() => setIsRoleModalOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/25 transition-all flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-white" />
                  <span>Select Your Field / Job</span>
                </button>

                {/* Blue & Mint-Green button */}
                <button
                  onClick={() => setIsAdvisorOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white shadow-md shadow-blue-500/25 transition-all flex items-center gap-1.5"
                >
                  <Compass className="w-3.5 h-3.5 text-white" />
                  <span>Explore Workflows</span>
                </button>

                <button
                  onClick={() => setIsLiveSearchOpen(true)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#101b36] hover:bg-[#16254c] text-white border border-blue-500/35 transition-colors flex items-center gap-1.5"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Live Web Search</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Mode: Filtered Search Results OR Grouped Chapter Sections */}
        {searchQuery || selectedChapterId !== null || filterPicksOnly || filterRefreshOnly ? (
          /* Flat Grid for Filtered / Search Mode */
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Filtered Tools'}
                </span>
                <span className="text-xs font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded font-semibold">
                  {filteredTools.length} found
                </span>
              </div>

              {selectedRole && (
                <button
                  onClick={() => handleSelectRole(null)}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Clear discipline filter
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  isSaved={savedTools.some((t) => t.id === tool.id)}
                  onToggleSave={handleToggleSave}
                  onOpenDetails={setActiveModalTool}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Categorized Chapter View with Deep Navy & Category Accents */
          <div className="space-y-12">
            {CHAPTERS.map((ch) => {
              const chapterTools = toolsGroupedByChapter.get(ch.id) || [];
              if (chapterTools.length === 0) return null;

              return (
                <section key={ch.id} className="space-y-3.5 scroll-mt-24" id={`chapter-${ch.id}`}>
                  {/* Chapter Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800/80 gap-2">
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md border ${ch.badgeBg}`}>
                        {ch.id < 10 ? `0${ch.id}` : ch.id}
                      </span>
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <span className={ch.accentColor}>{ch.title}</span>
                          {ch.id === 15 && (
                            <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                              2026
                            </span>
                          )}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">{ch.subtitle}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedChapterId(ch.id)}
                      className={`text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors px-3 py-1.5 rounded-lg border ${ch.badgeBg} hover:brightness-110`}
                    >
                      <span>Focus Category ({chapterTools.length})</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Tools Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {chapterTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        isSaved={savedTools.some((t) => t.id === tool.id)}
                        onToggleSave={handleToggleSave}
                        onOpenDetails={setActiveModalTool}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      {/* Footer in Deep Navy */}
      <footer className="mt-auto border-t border-slate-800/80 bg-[#070b16]/95 py-6 px-4 sm:px-6 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <div className="font-bold text-white">Omni AI Tool</div>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Standardized Index of 550+ Machine Intelligence Tools · Progressive Web App (PWA)
            </p>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-xs font-medium">
            <button onClick={() => setIsRoleModalOpen(true)} className="hover:text-emerald-300 transition-colors">
              Fields
            </button>
            <button onClick={() => setIsLiveSearchOpen(true)} className="hover:text-blue-300 transition-colors">
              Live Search
            </button>
            <button onClick={() => setIsAdvisorOpen(true)} className="hover:text-purple-300 transition-colors">
              Workflows
            </button>
            <button onClick={() => setFilterPicksOnly(true)} className="hover:text-amber-300 transition-colors">
              Featured
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <ToolModal
        tool={activeModalTool}
        isOpen={activeModalTool !== null}
        onClose={() => setActiveModalTool(null)}
        isSaved={activeModalTool ? savedTools.some((t) => t.id === activeModalTool.id) : false}
        onToggleSave={handleToggleSave}
        onSelectRelatedTool={setActiveModalTool}
      />

      <WorkflowAdvisorModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
        onSelectTool={setActiveModalTool}
        onSaveTool={handleToggleSave}
        savedToolIds={new Set(savedTools.map((t) => t.id))}
      />

      <StackDrawer
        isOpen={isStackOpen}
        onClose={() => setIsStackOpen(false)}
        savedTools={savedTools}
        onRemoveTool={handleToggleSave}
        onSelectTool={setActiveModalTool}
        onClearAll={() => setSavedTools([])}
      />

      <RoleSelectionModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        selectedRoleId={selectedRole?.id || null}
        onSelectRole={handleSelectRole}
      />

      <LiveSearchGroundingModal
        isOpen={isLiveSearchOpen}
        onClose={() => setIsLiveSearchOpen(false)}
      />
    </div>
  );
}
