import React from 'react';
import { USER_ROLES, UserRole } from '../data/rolesData';
import { 
  X, 
  ArrowRight, 
  Layers, 
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
  Compass
} from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRoleId: string | null;
  onSelectRole: (role: UserRole | null) => void;
  isFirstVisit?: boolean;
}

const renderRoleIcon = (name: string, colorClass: string) => {
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

export const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  selectedRoleId,
  onSelectRole,
  isFirstVisit = false
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-4xl bg-[#090e1f] border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 px-2 py-0.5 rounded font-semibold">
                Omni AI Tool
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 font-medium">Field & Job Onboarding</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Select your primary field or job
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Curate the 550+ tool directory for your specific workflow. You can switch fields or explore all categories anytime.
            </p>
          </div>

          {!isFirstVisit && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-[#0e172e] hover:bg-[#152244] border border-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Roles Grid with Deep Navy & Palette Colors */}
        <div className="flex-1 overflow-y-auto py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pr-1">
          {USER_ROLES.map((role) => {
            const isSelected = selectedRoleId === role.id;
            const cs = role.colorScheme;
            return (
              <button
                key={role.id}
                onClick={() => {
                  onSelectRole(role);
                  onClose();
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between group ${
                  isSelected
                    ? `${cs.activeBorder} bg-[#141f3e] shadow-lg ${cs.glow}`
                    : `bg-[#0c1327] border-slate-800 hover:border-slate-700 hover:bg-[#111a36]`
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-white/10' : 'bg-slate-800/80'} group-hover:scale-105 transition-transform`}>
                        {renderRoleIcon(role.iconName, cs.accentText)}
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${cs.badgeBg}`}>
                        {role.badge}
                      </span>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-white transition-colors">
                    {role.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
                    {role.description}
                  </p>
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono">
                    {role.suggestedTools.length} curated picks
                  </span>
                  <span className={`flex items-center gap-1 font-semibold group-hover:translate-x-0.5 transition-transform ${cs.accentText}`}>
                    <span>Filter</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <button
            onClick={() => {
              onSelectRole(null);
              onClose();
            }}
            className="text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Show all 550+ tools without job filter</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-xl font-semibold text-xs bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-purple-500/25 transition-all text-center"
          >
            {selectedRoleId ? 'Continue with Selected Field' : 'Explore All Categories'}
          </button>
        </div>
      </div>
    </div>
  );
};
