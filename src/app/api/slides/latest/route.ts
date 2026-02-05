import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// In-memory store for latest slides (simple solution)
// In production, you'd use a database or Redis
let latestSlides = [
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

let lastUpdated = new Date().toISOString();

export async function GET() {
  return NextResponse.json({
    slides: latestSlides,
    updatedAt: lastUpdated,
  }, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.slides) {
      latestSlides = body.slides;
      lastUpdated = new Date().toISOString();
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
