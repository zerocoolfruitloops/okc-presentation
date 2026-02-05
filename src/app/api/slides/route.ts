import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Shared state with latest endpoint
let latestSlides: unknown[] = [];
let lastUpdated = new Date().toISOString();

export { latestSlides, lastUpdated };

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slides } = body;

    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json({ error: 'slides array required' }, { status: 400 });
    }

    // Store for polling fallback
    latestSlides = slides;
    lastUpdated = new Date().toISOString();

    // Also update the /api/slides/latest endpoint's in-memory store
    // by making an internal call
    try {
      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}` 
        : 'http://localhost:3000';
      await fetch(`${baseUrl}/api/slides/latest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slides }),
      });
    } catch (e) {
      console.log('Could not update latest endpoint:', e);
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const channel = supabase.channel('presentation');
    
    // Subscribe first
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Subscribe timeout')), 5000);
      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          clearTimeout(timeout);
          resolve();
        } else if (status === 'CHANNEL_ERROR') {
          clearTimeout(timeout);
          reject(new Error('Channel error'));
        }
      });
    });

    // Send broadcast
    await channel.send({
      type: 'broadcast',
      event: 'slide_update',
      payload: {
        slides,
        updatedAt: lastUpdated,
      },
    });

    // Cleanup
    await supabase.removeChannel(channel);

    return NextResponse.json({ 
      success: true, 
      message: 'Slides updated',
      slidesCount: slides.length,
      updatedAt: lastUpdated,
    });
  } catch (error) {
    console.error('Error updating slides:', error);
    return NextResponse.json({ 
      error: 'Failed to update slides',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST slides array to update presentation in real-time',
    currentSlides: latestSlides.length > 0 ? latestSlides : 'No slides stored yet',
    lastUpdated,
    example: {
      slides: [
        { id: 1, title: 'Hello', titleBold: 'World', subtitle: 'My presentation' },
        { id: 2, sectionTitle: 'Agenda', bullets: ['Point 1', 'Point 2'] },
      ]
    }
  });
}
