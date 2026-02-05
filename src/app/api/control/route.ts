import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// In-memory state (will be synced via broadcast to all clients)
let currentSlide = 1;
let theme = 'dark';
const totalSlides = 35;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, value } = body;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Process action
    switch (action) {
      case 'next':
        currentSlide = Math.min(currentSlide + 1, totalSlides);
        break;
      case 'back':
      case 'prev':
      case 'previous':
        currentSlide = Math.max(currentSlide - 1, 1);
        break;
      case 'jump':
      case 'slide':
      case 'goto':
        if (value && value >= 1 && value <= totalSlides) {
          currentSlide = value;
        }
        break;
      case 'light':
        theme = 'light';
        break;
      case 'dark':
        theme = 'dark';
        break;
      case 'theme':
      case 'toggle':
        theme = theme === 'dark' ? 'light' : 'dark';
        break;
      case 'status':
        // Just return current state
        break;
      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
    }

    // Broadcast change via realtime
    const channel = supabase.channel('presentation-control');
    
    try {
      await new Promise<void>((resolve) => {
        const timeout = setTimeout(() => resolve(), 2000);
        channel.subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            clearTimeout(timeout);
            resolve();
          }
        });
      });

      await channel.send({
        type: 'broadcast',
        event: 'control_update',
        payload: { currentSlide, theme, updatedAt: new Date().toISOString() },
      });
      
      await supabase.removeChannel(channel);
    } catch (e) {
      console.log('Broadcast error (non-fatal):', e);
    }

    return NextResponse.json({ 
      success: true, 
      currentSlide,
      theme,
      totalSlides,
      message: `Slide ${currentSlide}/${totalSlides}, Theme: ${theme}`,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to process control' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    currentSlide,
    theme,
    totalSlides,
  });
}
// Forced rebuild Thu Feb  5 11:05:32 EST 2026
