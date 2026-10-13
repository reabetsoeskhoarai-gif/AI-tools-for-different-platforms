import React, { useState, useEffect } from 'react';
import { Download, Laptop, Smartphone, Check, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallPwaBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // Check if already installed in standalone mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      setShowGuideModal(true);
    }
  };

  if (isInstalled || isDismissed) return null;

  return (
    <>
      <div className="bg-[#0b1226]/95 border-b border-purple-500/30 px-3 sm:px-6 py-2.5 backdrop-blur-md shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          {/* Left badge & copy */}
          <div className="flex items-center gap-3 text-xs">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 p-0.5 shadow-md shadow-purple-500/20 shrink-0 flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white tracking-tight">Install Omni AI Tool</span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-1.5 py-0.2 rounded font-semibold">
                  Desktop & Mobile App
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Install as a standalone native app on Windows, macOS, Linux, Android & iOS with offline caching.
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg shadow-md shadow-purple-500/25 transition-all"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Install App</span>
            </button>

            <button
              onClick={() => setIsDismissed(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Guide Modal for Desktop Chrome/Edge or iOS Safari */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div 
            className="w-full max-w-md bg-[#0a1024] border border-purple-500/40 rounded-2xl p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-750"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">How to Install Omni AI</h3>
                <p className="text-xs text-slate-400">Available across all platforms</p>
              </div>
            </div>

            <div className="space-y-3.5 my-4 text-xs text-slate-200">
              {/* PC / Mac / Chrome / Edge */}
              <div className="p-3 rounded-xl bg-[#0e162e] border border-blue-500/25 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-blue-300">
                  <Laptop className="w-4 h-4 text-blue-400" />
                  <span>On PC, Mac & Chromebook</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Look for the <strong className="text-white">Install</strong> icon in your browser address bar (top right in Chrome / Edge), or click the browser menu (⋮) → <strong className="text-white">"Install Omni AI Tool"</strong>.
                </p>
              </div>

              {/* Mobile Phone / Android / iOS */}
              <div className="p-3 rounded-xl bg-[#0e162e] border border-emerald-500/25 space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-emerald-300">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>On Mobile Phones (Android & iPhone)</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {isIOS ? (
                    <>On Safari, tap the <strong>Share</strong> button (square with arrow) at the bottom, then scroll down and tap <strong className="text-white">"Add to Home Screen"</strong>.</>
                  ) : (
                    <>In Chrome for Android, tap the three dots (⋮) in the top-right corner and select <strong className="text-white">"Install app"</strong> or <strong className="text-white">"Add to Home screen"</strong>.</>
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowGuideModal(false)}
              className="w-full py-2 px-4 rounded-xl font-semibold text-xs bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/30 transition-all text-center"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
