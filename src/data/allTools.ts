import { AITool } from '../types/aiTools';
import { TOOLS_PART_1 } from './toolsPart1';
import { TOOLS_PART_2 } from './toolsPart2';
import { TOOLS_PART_3 } from './toolsPart3';
import { ADDITIONAL_OPEN_TOOLS } from './developerAndOpenTools';

export const ALL_TOOLS: AITool[] = [
  ...TOOLS_PART_1,
  ...TOOLS_PART_2,
  ...TOOLS_PART_3,
  ...ADDITIONAL_OPEN_TOOLS
];

export interface WorkflowRecipe {
  id: string;
  title: string;
  targetRole: string;
  description: string;
  accent: string;
  steps: {
    order: number;
    toolName: string;
    action: string;
    toolNumber: number;
  }[];
}

export const WORKFLOW_RECIPES: WorkflowRecipe[] = [
  {
    id: 'wf-1',
    title: 'Faceless YouTube Automation',
    targetRole: 'Video Creators & Marketers',
    description: 'Transform an idea into a viral 4K video with voiceover and automated thumbnail.',
    accent: 'from-amber-500/20 to-red-500/20 border-amber-500/30',
    steps: [
      { order: 1, toolName: 'ChatGPT', action: 'Write 60-second retention hook and full script', toolNumber: 66 },
      { order: 2, toolName: 'ElevenLabs', action: 'Generate ultra-realistic human voiceover track', toolNumber: 520 },
      { order: 3, toolName: 'Runway ML', action: 'Generate cinematic B-roll scenes via Gen-3', toolNumber: 57 },
      { order: 4, toolName: 'Canva', action: 'Design high-CTR thumbnail with bold text', toolNumber: 76 },
      { order: 5, toolName: 'TubeBuddy', action: 'Optimize tags, title A/B test, and schedule', toolNumber: 86 }
    ]
  },
  {
    id: 'wf-2',
    title: 'AI Full-Stack App Launch',
    targetRole: 'Founders & Engineers',
    description: 'Go from prompt to fully deployed SaaS application in under 2 hours.',
    accent: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30',
    steps: [
      { order: 1, toolName: 'Claude', action: 'Architect system design, DB schema, and PRD', toolNumber: 501 },
      { order: 2, toolName: 'v0 by Vercel', action: 'Generate sleek React + Tailwind UI components', toolNumber: 529 },
      { order: 3, toolName: 'Cursor', action: 'Assemble frontend & backend with AI composer', toolNumber: 528 },
      { order: 4, toolName: 'Looka', action: 'Generate brand logos, favicon, and brand kit', toolNumber: 346 },
      { order: 5, toolName: 'Instantly.ai', action: 'Launch targeted B2B outbound campaign', toolNumber: 21 }
    ]
  },
  {
    id: 'wf-3',
    title: 'Academic Research & Literature Review',
    targetRole: 'Students & Researchers',
    description: 'Synthesize dozens of peer-reviewed papers with verifiable citations.',
    accent: 'from-sky-500/20 to-teal-500/20 border-sky-500/30',
    steps: [
      { order: 1, toolName: 'Research Rabbit', action: 'Explore paper citation graph & co-authors', toolNumber: 188 },
      { order: 2, toolName: 'SciSpace', action: 'Chat with complex PDFs to extract methods', toolNumber: 190 },
      { order: 3, toolName: 'NotebookLM', action: 'Synthesize findings and create Audio Overview', toolNumber: 504 },
      { order: 4, toolName: 'QuillBot', action: 'Refine syntax and eliminate redundancy', toolNumber: 156 }
    ]
  },
  {
    id: 'wf-4',
    title: 'High-Converting Dropshipping Store',
    targetRole: 'E-commerce Entrepreneurs',
    description: 'Find a trending product, build a branded storefront, and automate ads.',
    accent: 'from-orange-500/20 to-amber-500/20 border-orange-500/30',
    steps: [
      { order: 1, toolName: 'Sell The Trend', action: 'Spot breakout viral products on TikTok', toolNumber: 306 },
      { order: 2, toolName: 'Shopify Magic', action: 'Set up product listings with SEO descriptions', toolNumber: 296 },
      { order: 3, toolName: 'PhotoRoom', action: 'Clean up product images into studio renders', toolNumber: 124 },
      { order: 4, toolName: 'AdCreative.ai', action: 'Generate high-performing ad creatives', toolNumber: 248 },
      { order: 5, toolName: 'Tidio', action: 'Install AI chatbot for 24/7 shopper support', toolNumber: 316 }
    ]
  }
];
