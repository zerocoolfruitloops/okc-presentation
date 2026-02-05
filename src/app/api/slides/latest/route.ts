import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const DEFAULT_SLIDES = [
  {
    id: 1,
    title: 'AI Agents:',
    titleBold: "What's happening in Energy & Banking",
    subtitle: 'The rise of autonomous AI in critical industries',
  },
  {
    id: 2,
    sectionTitle: 'About me',
    content: 'Billy Boozer - CEO, Dualboot Partners',
  },
  {
    id: 3,
    sectionTitle: "What we'll cover",
    bullets: [
      'The evolution of AI and large language models',
      'What generative AI can do today',
      'Real-world applications and use cases',
      'Challenges and limitations',
      "What's next: trends and predictions",
    ],
  },
  {
    id: 4,
    sectionTitle: 'Ready for your content',
    content: "Send me your presentation content and I'll populate the slides.",
  },
];

export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('presentation_state')
      .select('slides, updated_at')
      .eq('id', 1)
      .single();

    if (error || !data?.slides || data.slides.length === 0) {
      return NextResponse.json({
        slides: DEFAULT_SLIDES,
        updatedAt: new Date().toISOString(),
      }, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    return NextResponse.json({
      slides: data.slides,
      updatedAt: data.updated_at,
    }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    console.error('Error fetching slides:', error);
    return NextResponse.json({
      slides: DEFAULT_SLIDES,
      updatedAt: new Date().toISOString(),
    }, {
      headers: { 'Cache-Control': 'no-store' },
    });
  }
}
