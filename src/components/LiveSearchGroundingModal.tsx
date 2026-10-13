import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Search, Globe, ExternalLink, Loader2, Link2, AlertCircle } from 'lucide-react';

interface LiveSearchGroundingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveSearchGroundingModal: React.FC<LiveSearchGroundingModalProps> = ({
  isOpen,
  onClose
}) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState<string | null>(null);
  const [sources, setSources] = useState<Array<{ title: string; url: string }>>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setResultText(null);
    setSources([]);
    setErrorMsg(null);

    try {
      const apiKey = process.env.API_KEY || (window as unknown as { __GEMINI_API_KEY__?: string }).__GEMINI_API_KEY__;
      const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `The user is looking for artificial intelligence tools, platforms, or workflows matching: "${query}".
Provide a concise, professional comparison of top verified tools for this task, with key features, pricing model, and official domain names. Keep your response direct and structured. Do not use emojis.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      setResultText(response.text || 'No information found.');

      // Extract search grounding metadata if available
      const searchChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (searchChunks && Array.isArray(searchChunks)) {
        const extractedSources: Array<{ title: string; url: string }> = [];
        searchChunks.forEach((chunk) => {
          if (chunk.web?.uri && chunk.web?.title) {
            extractedSources.push({
              title: chunk.web.title,
              url: chunk.web.uri
            });
          }
        });
        setSources(extractedSources);
      }
    } catch (err: unknown) {
      console.error('Gemini grounding search error:', err);
      const msg = err instanceof Error ? err.message : 'Failed to query Google Search Grounding.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-3xl bg-[#090e1f] border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-300 bg-blue-950/40 border border-blue-500/30 px-2 py-0.5 rounded font-semibold">
                Google Search Grounding
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-emerald-400 font-mono">Live Web Intel</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-400" />
              <span>Real-Time AI Tool Intelligence</span>
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              Query Google's live web index via Gemini 2.5 to find newly launched AI tools, updated pricing, or niche open-source alternatives.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#0e162e] hover:bg-[#141f3d] border border-slate-750 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search input form */}
        <form onSubmit={handleSearch} className="my-5">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. latest open source speech-to-text models launched in 2026..."
                className="w-full bg-[#0c1327] border border-slate-750 focus:border-blue-400 rounded-xl pl-10 pr-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400/50"
              />
            </div>
            {/* Blue & Mint-Green button */}
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md shadow-blue-500/25 shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <Search className="w-3.5 h-3.5" />
                  <span>Ground with Web</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Results Area */}
        <div className="flex-1 space-y-4">
          {errorMsg && (
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Web Grounding Notice</strong>
                <span>{errorMsg}</span>
              </div>
            </div>
          )}

          {resultText && (
            <div className="p-4 rounded-xl bg-[#0c1327] border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-xs font-mono uppercase text-emerald-300 font-semibold">
                  Synthesis Results
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Grounded via Google Search
                </span>
              </div>

              <div className="text-xs text-slate-200 leading-relaxed whitespace-pre-line font-sans">
                {resultText}
              </div>

              {/* Source chips */}
              {sources.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[11px] font-mono uppercase text-slate-400 block mb-2">
                    Verified Sources:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sources.map((src, i) => (
                      <a
                        key={i}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-lg bg-[#090d1a] border border-slate-750 text-blue-300 hover:text-white hover:border-blue-400 transition-colors truncate max-w-xs"
                      >
                        <Link2 className="w-3 h-3 text-blue-400" />
                        <span className="truncate">{src.title}</span>
                        <ExternalLink className="w-2.5 h-2.5 text-slate-500" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0e162e] hover:bg-[#141f3d] text-white border border-slate-750 transition-colors"
          >
            Close Search
          </button>
        </div>
      </div>
    </div>
  );
};
