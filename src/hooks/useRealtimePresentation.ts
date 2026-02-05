'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
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

// Store latest slides in memory for polling fallback
let latestSlides: SlideContent[] = DEFAULT_SLIDES;

export function useRealtimePresentation() {
  const [slides, setSlides] = useState<SlideContent[]>(DEFAULT_SLIDES);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const channelRef = useRef<RealtimeChannel | null>(null);
  const retryCount = useRef(0);
  const maxRetries = 5;

  const updateSlides = useCallback((newSlides: SlideContent[]) => {
    latestSlides = newSlides;
    setSlides(newSlides);
  }, []);

  useEffect(() => {
    let mounted = true;
    let reconnectTimeout: NodeJS.Timeout;

    const setupRealtime = async () => {
      if (!mounted) return;

      try {
        // Clean up existing channel
        if (channelRef.current) {
          await supabase.removeChannel(channelRef.current);
        }

        const channel = supabase.channel('presentation', {
          config: {
            broadcast: { self: true },
          },
        });

        channelRef.current = channel;

        channel
          .on('broadcast', { event: 'slide_update' }, (payload) => {
            if (!mounted) return;
            console.log('📡 Received slide update:', payload);
            const data = payload.payload as PresentationData;
            if (data.slides) {
              updateSlides(data.slides);
              retryCount.current = 0; // Reset retry count on successful message
            }
          })
          .subscribe((subscriptionStatus) => {
            if (!mounted) return;
            console.log('📡 Realtime status:', subscriptionStatus);
            
            if (subscriptionStatus === 'SUBSCRIBED') {
              setStatus('connected');
              retryCount.current = 0;
            } else if (subscriptionStatus === 'CHANNEL_ERROR' || subscriptionStatus === 'TIMED_OUT') {
              setStatus('error');
              
              // Retry connection
              if (retryCount.current < maxRetries) {
                retryCount.current++;
                console.log(`📡 Retrying connection (${retryCount.current}/${maxRetries})...`);
                reconnectTimeout = setTimeout(setupRealtime, 2000 * retryCount.current);
              }
            } else if (subscriptionStatus === 'CLOSED') {
              setStatus('error');
              // Try to reconnect
              if (retryCount.current < maxRetries) {
                retryCount.current++;
                reconnectTimeout = setTimeout(setupRealtime, 2000);
              }
            }
          });
      } catch (error) {
        console.error('📡 Realtime setup error:', error);
        setStatus('error');
        
        if (retryCount.current < maxRetries) {
          retryCount.current++;
          reconnectTimeout = setTimeout(setupRealtime, 2000 * retryCount.current);
        }
      }
    };

    setupRealtime();

    // Polling fallback - check for updates every 2 seconds if not connected
    const pollInterval = setInterval(async () => {
      if (status !== 'connected') {
        try {
          const response = await fetch('/api/slides/latest?t=' + Date.now());
          if (response.ok) {
            const data = await response.json();
            if (data.slides && JSON.stringify(data.slides) !== JSON.stringify(slides)) {
              updateSlides(data.slides);
            }
          }
        } catch (e) {
          // Silent fail for polling
        }
      }
    }, 2000);

    return () => {
      mounted = false;
      clearTimeout(reconnectTimeout);
      clearInterval(pollInterval);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [status, slides, updateSlides]);

  return { slides, status, updateSlides };
}
