import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slides } = body;

    if (!slides || !Array.isArray(slides)) {
      return NextResponse.json({ error: 'slides array required' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const channel = supabase.channel('presentation');
    
    // Subscribe first
    await new Promise<void>((resolve) => {
      channel.subscribe((status) => {
        if (status === 'SUBSCRIBED') resolve();
      });
    });

    // Send broadcast
    await channel.send({
      type: 'broadcast',
      event: 'slide_update',
      payload: {
        slides,
        updatedAt: new Date().toISOString(),
      },
    });

    // Cleanup
    await supabase.removeChannel(channel);

    return NextResponse.json({ 
      success: true, 
      message: 'Slides updated',
      slidesCount: slides.length 
    });
  } catch (error) {
    console.error('Error updating slides:', error);
    return NextResponse.json({ error: 'Failed to update slides' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST slides array to update presentation in real-time',
    example: {
      slides: [
        { id: 1, title: 'Hello', titleBold: 'World', subtitle: 'My presentation' },
        { id: 2, sectionTitle: 'Agenda', bullets: ['Point 1', 'Point 2'] },
      ]
    }
  });
}
