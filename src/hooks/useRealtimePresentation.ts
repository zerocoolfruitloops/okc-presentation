'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase, PresentationData, SlideContent } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

const DEFAULT_SLIDES: SlideContent[] = [
  {
    id: 1,
    title: 'AI Agents:',
    titleBold: 'What\'s happening in Energy & Banking',
    subtitle: 'The rise of autonomous AI in critical industries',
  },
  {
    id: 2,
    sectionTitle: 'About me',
    content: 'Billy Boozer - CEO, Dualboot Partners',
  },
  {
    id: 3,
    sectionTitle: 'What we\'ll cover',
    bullets: [
      'The evolution of AI and large language models',
      'What generative AI can do today',
      'Real-world applications and use cases',
      'Challenges and limitations',
      'What\'s next: trends and predictions',
    ],
  },
  {
    id: 4,
    sectionTitle: 'Ready for your content',
    content: 'Send me your presentation content and I\'ll populate the slides.',
  },
];

export function useRealtimePresentation() {
  const [slides, setSlides] = useState<SlideContent[]>(DEFAULT_SLIDES);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [lastUpdate, setLastUpdate] = useState<string | null>(null);

  useEffect(() => {
    let channel: RealtimeChannel;

    const setupRealtime = async () => {
      channel = supabase.channel('presentation', {
        config: {
          broadcast: { self: true },
        },
      });

      channel
        .on('broadcast', { event: 'slide_update' }, (payload) => {
          console.log('Received slide update:', payload);
          const data = payload.payload as PresentationData;
          if (data.slides) {
            setSlides(data.slides);
            setLastUpdate(data.updatedAt);
          }
        })
        .subscribe((status) => {
          console.log('Realtime status:', status);
          if (status === 'SUBSCRIBED') {
            setStatus('connected');
          } else if (status === 'CHANNEL_ERROR') {
            setStatus('error');
          }
        });
    };

    setupRealtime();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const updateSlides = useCallback(async (newSlides: SlideContent[]) => {
    const channel = supabase.channel('presentation');
    await channel.send({
      type: 'broadcast',
      event: 'slide_update',
      payload: {
        slides: newSlides,
        updatedAt: new Date().toISOString(),
      } as PresentationData,
    });
    setSlides(newSlides);
  }, []);

  return { slides, status, lastUpdate, updateSlides };
}
