import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export type ProjectInfo = {
  name: string;
  logo: string;
  url: string;
  description: string;
  features?: string[];
};

export type SlideContent = {
  id: number;
  title?: string;
  titleBold?: string;
  subtitle?: string;
  sectionTitle?: string;
  bullets?: string[];
  content?: string;
  role?: string;
  image?: string;
  // Person to follow fields
  personName?: string;
  personTitle?: string;
  personCompany?: string;
  personBio?: string;
  personLinkedIn?: string;
  personTwitter?: string;
  // QR code fields
  qrCode?: string;
  qrLabel?: string;
  email?: string;
  website?: string;
  // Full graphic slide
  graphic?: string;
  // Project cards
  projects?: ProjectInfo[];
  // Callout cards
  callouts?: {
    stat: string;
    label: string;
    sublabel?: string;
    icon?: string;
  }[];
};

export type PresentationData = {
  slides: SlideContent[];
  currentSlide?: number;
  updatedAt: string;
};
