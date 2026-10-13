export interface UserRole {
  id: string;
  title: string;
  iconName: string;
  description: string;
  recommendedChapters: number[];
  badge: string;
  colorScheme: {
    accentText: string;
    bgTint: string;
    border: string;
    activeBorder: string;
    badgeBg: string;
    glow: string;
  };
  suggestedTools: string[];
}

export const USER_ROLES: UserRole[] = [
  {
    id: 'developer',
    title: 'Software Engineer & Developer',
    iconName: 'Terminal',
    description: 'AI-native IDEs, full-stack builders, code completion, and autonomous terminal agents.',
    recommendedChapters: [15, 13, 10],
    badge: 'Engineering',
    colorScheme: {
      accentText: 'text-cyan-400',
      bgTint: 'bg-cyan-950/30 hover:bg-cyan-950/50',
      border: 'border-cyan-500/25',
      activeBorder: 'border-cyan-400 ring-1 ring-cyan-400/50',
      badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
      glow: 'shadow-cyan-500/10'
    },
    suggestedTools: ['Cursor', 'v0 by Vercel', 'Lovable', 'Bolt.new', 'Claude', 'Windsurf', 'GitHub Copilot']
  },
  {
    id: 'content-creator',
    title: 'Content Creator & Copywriter',
    iconName: 'PenLine',
    description: 'Long-form writing, editorial research, headline optimizers, and automated copywriting pipelines.',
    recommendedChapters: [1, 5, 8],
    badge: 'Editorial',
    colorScheme: {
      accentText: 'text-indigo-400',
      bgTint: 'bg-indigo-950/30 hover:bg-indigo-950/50',
      border: 'border-indigo-500/25',
      activeBorder: 'border-indigo-400 ring-1 ring-indigo-400/50',
      badgeBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
      glow: 'shadow-indigo-500/10'
    },
    suggestedTools: ['Jasper', 'Copy.ai', 'Writesonic', 'ChatGPT', 'Grammarly AI', 'QuillBot']
  },
  {
    id: 'video-creator',
    title: 'Video Creator & Producer',
    iconName: 'Video',
    description: 'Text-to-video generation, high-CTR thumbnails, scriptwriting, auto-cut subtitles, and virality scoring.',
    recommendedChapters: [3, 15, 7],
    badge: 'Production',
    colorScheme: {
      accentText: 'text-amber-400',
      bgTint: 'bg-amber-950/30 hover:bg-amber-950/50',
      border: 'border-amber-500/25',
      activeBorder: 'border-amber-400 ring-1 ring-amber-400/50',
      badgeBg: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      glow: 'shadow-amber-500/10'
    },
    suggestedTools: ['Runway ML', 'Sora', 'Pictory', 'Canva', 'TubeBuddy', 'OpusClip', 'ElevenLabs']
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer & UI/UX',
    iconName: 'Palette',
    description: 'Vector assets, design systems, background extraction, generative fill, and UI prototyping.',
    recommendedChapters: [4, 15],
    badge: 'Design',
    colorScheme: {
      accentText: 'text-violet-400',
      bgTint: 'bg-violet-950/30 hover:bg-violet-950/50',
      border: 'border-violet-500/25',
      activeBorder: 'border-violet-400 ring-1 ring-violet-400/50',
      badgeBg: 'bg-violet-500/10 text-violet-300 border-violet-500/30',
      glow: 'shadow-violet-500/10'
    },
    suggestedTools: ['Midjourney', 'Canva', 'Uizard', 'Framer', 'Recraft', 'Remove.bg', 'Ideogram']
  },
  {
    id: 'podcaster',
    title: 'Podcaster & Audio Producer',
    iconName: 'Mic',
    description: 'Vocal isolation, filler-word elimination, broadcast mastering, voice cloning, and audio transcriptions.',
    recommendedChapters: [2, 15],
    badge: 'Audio',
    colorScheme: {
      accentText: 'text-rose-400',
      bgTint: 'bg-rose-950/30 hover:bg-rose-950/50',
      border: 'border-rose-500/25',
      activeBorder: 'border-rose-400 ring-1 ring-rose-400/50',
      badgeBg: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
      glow: 'shadow-rose-500/10'
    },
    suggestedTools: ['Descript', 'Adobe Podcast', 'Cleanvoice', 'Otter.ai', 'Murf.ai', 'ElevenLabs', 'Riverside.fm']
  },
  {
    id: 'marketing-seo',
    title: 'Growth Marketer & SEO Specialist',
    iconName: 'TrendingUp',
    description: 'SERP briefs, keyword clustering, conversion-optimized ad copy, and competitor market intelligence.',
    recommendedChapters: [8, 1, 7],
    badge: 'Marketing',
    colorScheme: {
      accentText: 'text-emerald-400',
      bgTint: 'bg-emerald-950/30 hover:bg-emerald-950/50',
      border: 'border-emerald-500/25',
      activeBorder: 'border-emerald-400 ring-1 ring-emerald-400/50',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      glow: 'shadow-emerald-500/10'
    },
    suggestedTools: ['Surfer SEO', 'AdCreative.ai', 'Exploding Topics', 'GrowthBar', 'Anyword', 'Instantly.ai']
  },
  {
    id: 'ecommerce',
    title: 'E-commerce & Retail Merchant',
    iconName: 'ShoppingBag',
    description: 'Catalog descriptions, store automation, product research, studio staging, and support bots.',
    recommendedChapters: [9, 8, 4],
    badge: 'Commerce',
    colorScheme: {
      accentText: 'text-orange-400',
      bgTint: 'bg-orange-950/30 hover:bg-orange-950/50',
      border: 'border-orange-500/25',
      activeBorder: 'border-orange-400 ring-1 ring-orange-400/50',
      badgeBg: 'bg-orange-500/10 text-orange-300 border-orange-500/30',
      glow: 'shadow-orange-500/10'
    },
    suggestedTools: ['Shopify Magic', 'Sell The Trend', 'Hypotenuse AI', 'PhotoRoom', 'Durable.co', 'Tidio']
  },
  {
    id: 'startup-founder',
    title: 'Startup Founder & Executive',
    iconName: 'Rocket',
    description: 'Pitch decks, business model validation, investor updates, outbound sales, and rapid prototypes.',
    recommendedChapters: [10, 13, 14, 15],
    badge: 'Founders',
    colorScheme: {
      accentText: 'text-sky-400',
      bgTint: 'bg-sky-950/30 hover:bg-sky-950/50',
      border: 'border-sky-500/25',
      activeBorder: 'border-sky-400 ring-1 ring-sky-400/50',
      badgeBg: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
      glow: 'shadow-sky-500/10'
    },
    suggestedTools: ['Storydoc', 'Beautiful.ai', 'Looka', 'Apollo.io', 'Cursor', 'Lovable', 'Gamma']
  },
  {
    id: 'educator-student',
    title: 'Educator & Academic Researcher',
    iconName: 'GraduationCap',
    description: 'Study flashcards, tutoring systems, academic paper synthesis, citation management, and rubrics.',
    recommendedChapters: [6, 12, 15],
    badge: 'Academia',
    colorScheme: {
      accentText: 'text-teal-400',
      bgTint: 'bg-teal-950/30 hover:bg-teal-950/50',
      border: 'border-teal-500/25',
      activeBorder: 'border-teal-400 ring-1 ring-teal-400/50',
      badgeBg: 'bg-teal-500/10 text-teal-300 border-teal-500/30',
      glow: 'shadow-teal-500/10'
    },
    suggestedTools: ['Quizlet', 'Khanmigo', 'SciSpace', 'Research Rabbit', 'NotebookLM', 'MagicSchool.ai']
  },
  {
    id: 'social-media',
    title: 'Social Media Manager',
    iconName: 'Share2',
    description: 'Multi-platform scheduling, carousel design, thread writing, and cross-channel growth tracking.',
    recommendedChapters: [7, 3, 4],
    badge: 'Social',
    colorScheme: {
      accentText: 'text-fuchsia-400',
      bgTint: 'bg-fuchsia-950/30 hover:bg-fuchsia-950/50',
      border: 'border-fuchsia-500/25',
      activeBorder: 'border-fuchsia-400 ring-1 ring-fuchsia-400/50',
      badgeBg: 'bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30',
      glow: 'shadow-fuchsia-500/10'
    },
    suggestedTools: ['Buffer', 'Predis.ai', 'Tweet Hunter', 'Social Blade', 'Canva', 'Repurpose.io']
  },
  {
    id: 'automation-ops',
    title: 'Operations & Workflow Engineer',
    iconName: 'Workflow',
    description: 'System integrations, autonomous workflow agents, meeting intelligence, and calendar scheduling.',
    recommendedChapters: [13, 11, 15],
    badge: 'Operations',
    colorScheme: {
      accentText: 'text-purple-400',
      bgTint: 'bg-purple-950/30 hover:bg-purple-950/50',
      border: 'border-purple-500/25',
      activeBorder: 'border-purple-400 ring-1 ring-purple-400/50',
      badgeBg: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
      glow: 'shadow-purple-500/10'
    },
    suggestedTools: ['Zapier', 'Make', 'N8n.io', 'Motion', 'Tactiq', 'Superhuman AI', 'OpenAI Deep Research']
  },
  {
    id: 'finance-investor',
    title: 'Finance & Investment Analyst',
    iconName: 'BadgeDollarSign',
    description: 'Automated receipt categorization, tax write-offs, algorithmic models, and market intelligence.',
    recommendedChapters: [14],
    badge: 'Finance',
    colorScheme: {
      accentText: 'text-emerald-300',
      bgTint: 'bg-emerald-950/30 hover:bg-emerald-950/50',
      border: 'border-emerald-500/25',
      activeBorder: 'border-emerald-300 ring-1 ring-emerald-300/50',
      badgeBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
      glow: 'shadow-emerald-500/10'
    },
    suggestedTools: ['Cleo', 'Keeper Tax', 'Wealthfront', 'YNAB', 'Upstart', 'Composer']
  }
];
