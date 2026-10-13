import React, { useState } from 'react';
import { WORKFLOW_RECIPES, WorkflowRecipe, ALL_TOOLS } from '../data/allTools';
import { AITool } from '../types/aiTools';
import { X, ArrowRight, Bookmark, ExternalLink, Compass, Sparkles, Check } from 'lucide-react';

interface WorkflowAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (tool: AITool) => void;
  onSaveTool: (tool: AITool) => void;
  savedToolIds: Set<string>;
}

export const WorkflowAdvisorModal: React.FC<WorkflowAdvisorModalProps> = ({
  isOpen,
  onClose,
  onSelectTool,
  onSaveTool,
  savedToolIds
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<WorkflowRecipe>(WORKFLOW_RECIPES[0]);
  const [customGoal, setCustomGoal] = useState('');
  const [analyzedTools, setAnalyzedTools] = useState<AITool[]>([]);
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  if (!isOpen) return null;

  const handleSynthesizeCustomPipeline = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoal.trim()) return;

    setIsSynthesizing(true);
    const keywords = customGoal.toLowerCase().split(/\s+/);

    setTimeout(() => {
      const scored = ALL_TOOLS.map((tool) => {
        let score = 0;
        const text = `${tool.name} ${tool.tagline} ${tool.category} ${tool.subgroup}`.toLowerCase();
        keywords.forEach((kw) => {
          if (kw.length > 2 && text.includes(kw)) score += 2;
        });
        if (tool.isPick) score += 1;
        return { tool, score };
      });

      const topPicks = scored
        .filter((item) => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((item) => item.tool);

      setAnalyzedTools(topPicks.length > 0 ? topPicks : ALL_TOOLS.filter((t) => t.isPick).slice(0, 4));
      setIsSynthesizing(false);
    }, 400);
  };

  const getToolsForStep = (stepName: string) => {
    return ALL_TOOLS.filter((t) => t.name.toLowerCase() === stepName.toLowerCase());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#090e1f] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white shadow-md shadow-purple-500/25">
                <Compass className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                Multi-Tool Orchestrator
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              AI Workflow Advisor
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Connect disparate AI tools into end-to-end multi-step production pipelines or synthesize your own pipeline.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#0e162e] hover:bg-[#141f3d] border border-slate-750 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Custom Synthesizer Bar */}
        <form onSubmit={handleSynthesizeCustomPipeline} className="my-5 p-4 rounded-xl bg-[#0c1327] border border-blue-500/30">
          <label className="block text-xs font-semibold text-white mb-1.5">
            Describe your workflow goal (e.g. "Generate YouTube shorts from podcast audio and publish"):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customGoal}
              onChange={(e) => setCustomGoal(e.target.value)}
              placeholder="e.g. build fullstack SaaS with landing page, payments and AI backend..."
              className="flex-1 bg-[#090d1a] border border-slate-750 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-400"
            />
            {/* Purple & Violet Gradient button */}
            <button
              type="submit"
              disabled={isSynthesizing || !customGoal.trim()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-purple-500/25 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>{isSynthesizing ? 'Synthesizing...' : 'Synthesize Pipeline'}</span>
            </button>
          </div>
        </form>

        {/* Custom Pipeline Results */}
        {analyzedTools.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-[#0e172e] border border-emerald-500/30">
            <h4 className="text-xs font-mono uppercase text-emerald-300 font-semibold mb-2">
              Recommended Toolchain for Your Goal
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {analyzedTools.map((t) => (
                <div key={t.id} className="p-3 rounded-lg bg-[#090e1f] border border-slate-800 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-blue-300">#{t.number.toString().padStart(3, '0')}</span>
                    <h5 className="font-bold text-xs text-white truncate">{t.name}</h5>
                    <p className="text-[11px] text-slate-300 line-clamp-2 mt-0.5">{t.tagline}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-[10px] text-emerald-300 font-mono">{t.pricing}</span>
                    <button
                      onClick={() => onSelectTool(t)}
                      className="text-xs text-blue-400 hover:text-white flex items-center gap-1 font-semibold"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Curated Pre-built Pipelines */}
        <div>
          <h4 className="text-xs font-mono uppercase text-slate-400 font-semibold mb-3">
            Standard Operating Workflows
          </h4>

          {/* Recipe Switcher Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
            {WORKFLOW_RECIPES.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setSelectedRecipe(recipe)}
                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedRecipe.id === recipe.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-purple-500/20'
                    : 'bg-[#0c1327] text-slate-300 border-slate-800 hover:text-white hover:bg-[#121c38]'
                }`}
              >
                {recipe.title}
              </button>
            ))}
          </div>

          {/* Selected Recipe Deep Dive */}
          <div className="mt-4 p-5 rounded-2xl bg-[#0c1327] border border-slate-800 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  {selectedRecipe.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {selectedRecipe.steps.length} Sequenced Phases
                </span>
              </div>
              <h3 className="text-base font-bold text-white">{selectedRecipe.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{selectedRecipe.description}</p>
            </div>

            {/* Sequence chain */}
            <div className="space-y-3 pt-2">
              {selectedRecipe.steps.map((st, idx) => {
                const tools = getToolsForStep(st.toolName);
                const matchedTool = tools[0];

                return (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-[#090e1f] border border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{st.toolName}</span>
                          <span className="text-slate-600">·</span>
                          <span className="text-xs text-blue-300 font-medium">{st.phase}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{st.instruction}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      {matchedTool && (
                        <>
                          <button
                            onClick={() => onSaveTool(matchedTool)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            title="Pin to stack"
                          >
                            <Bookmark className={`w-3.5 h-3.5 ${savedToolIds.has(matchedTool.id) ? 'fill-emerald-400 text-emerald-400' : ''}`} />
                          </button>
                          <button
                            onClick={() => onSelectTool(matchedTool)}
                            className="text-xs font-semibold text-blue-300 hover:text-white px-2.5 py-1 rounded bg-[#101934] border border-slate-700 hover:border-blue-500/40 transition-colors"
                          >
                            Details
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/25 transition-all"
          >
            Close Advisor
          </button>
        </div>
      </div>
    </div>
  );
};
