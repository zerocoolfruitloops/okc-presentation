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
    
    // Store slides in database for persistence
    const { error: dbError } = await supabase
      .from('presentation_state')
      .upsert({ id: 1, slides, updated_at: new Date().toISOString() });
    
    if (dbError) {
      console.error('DB error:', dbError);
    }

    // Also broadcast via realtime for instant updates
    const channel = supabase.channel('presentation');
    
    try {
      await new Promise<void>((resolve, reject) => {
        const timeout = setTimeout(() => resolve(), 3000); // Don't wait too long
        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            clearTimeout(timeout);
            resolve();
          }
        });
      });

      await channel.send({
        type: 'broadcast',
        event: 'slide_update',
        payload: { slides, updatedAt: new Date().toISOString() },
      });
      
      await supabase.removeChannel(channel);
    } catch (e) {
      console.log('Broadcast error (non-fatal):', e);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Slides updated',
      slidesCount: slides.length,
    });
  } catch (error) {
    console.error('Error updating slides:', error);
    return NextResponse.json({ error: 'Failed to update slides' }, { status: 500 });
  }
}

export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase
    .from('presentation_state')
    .select('slides, updated_at')
    .eq('id', 1)
    .single();

  return NextResponse.json({
    slides: data?.slides || [],
    updatedAt: data?.updated_at,
  });
}
