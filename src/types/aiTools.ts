export type PricingTier = 'Free' | 'Freemium' | 'Free Trial' | 'Paid';

export interface AITool {
  id: string;
  number: number;
  name: string;
  tagline: string;
  url: string;
  chapterId: number;
  category: string;
  subgroup: string;
  isPick?: boolean;
  is2026Refresh?: boolean;
  pricing: PricingTier;
  tags: string[];
}

export interface Chapter {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  accentColor: string;
  borderAccent: string;
  bgGradient: string;
  iconName: string;
  totalTools: number;
  picksCount: number;
  subgroups: string[];
  badgeBg: string;
  activeBtn: string;
  dotColor: string;
  cardHoverGlow: string;
}
