import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

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
};

export type PresentationData = {
  slides: SlideContent[];
  currentSlide?: number;
  updatedAt: string;
};
