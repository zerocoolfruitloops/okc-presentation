'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase, PresentationData, SlideContent } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

const DEFAULT_SLIDES: SlideContent[] = [
  {
    id: 1,
    sectionTitle: 'About me',
    content: 'Billy Boozer',
    role: 'Product Leader • Technology Executive • Faith-Driven Founder',
    image: '/billy.png',
  },
  {
    id: 2,
    sectionTitle: 'My Background',
    bullets: [
      '15+ years leading product, engineering & technology teams',
      'Built fintech and payment platforms at scale',
      'Helped launch Truth Social (#1 free app in App Store)',
      'Technology advisor to startups and Fortune 500 companies',
    ],
  },
  {
    id: 3,
    title: 'AI Agents:',
    titleBold: 'What\'s happening in Energy & Banking',
    subtitle: 'The rise of autonomous AI in critical industries',
  },
  {
    id: 4,
    sectionTitle: 'Who to Follow',
    personName: 'Ryan Carson',
    personTitle: 'Builder in Residence',
    personCompany: 'Sourcegraph (Amp)',
    personBio: 'Serial entrepreneur with 25+ years building tech companies. Founder of Treehouse. Now leading Amp, the frontier AI coding agent that ships features while you sleep.',
    personLinkedIn: 'https://linkedin.com/in/ryancarson',
    personTwitter: 'https://x.com/ryancarson',
    image: '/ryan-carson.jpg',
  },
  {
    id: 5,
    sectionTitle: 'Who to Follow',
    personName: 'Boris Cherny',
    personTitle: 'Creator of Claude Code',
    personCompany: 'Anthropic',
    personBio: 'Built Claude Code, the agentic coding tool that lives in your terminal. Author of "Programming TypeScript" (O\'Reilly). Pushing the boundaries of AI-assisted development.',
    personLinkedIn: 'https://linkedin.com/in/bcherny',
    personTwitter: 'https://x.com/bcherny',
    image: '/boris-cherny.jpg',
  },
  {
    id: 6,
    sectionTitle: 'Who to Follow',
    personName: 'Andrej Karpathy',
    personTitle: 'AI Researcher & Educator',
    personCompany: 'Former Tesla / OpenAI',
    personBio: 'Co-founded OpenAI. Former Director of AI at Tesla (Autopilot). Now building educational content on AI/ML. One of the most influential voices in deep learning.',
    personTwitter: 'https://x.com/karpathy',
    image: '/andrej-karpathy.jpg',
  },
  {
    id: 7,
    sectionTitle: 'Who to Follow — Energy',
    personName: 'Darryl Willis',
    personTitle: 'VP, Energy Industry Solutions',
    personCompany: 'Google Cloud',
    personBio: 'Former BP executive with 25+ years in oil & gas. Now leading Google Cloud\'s energy vertical, helping the industry adopt AI for exploration, production, and sustainability.',
    personLinkedIn: 'https://linkedin.com/in/darrylwillis',
    personTwitter: 'https://x.com/darraborojevic',
    image: '/darryl-willis.svg',
  },
  {
    id: 8,
    sectionTitle: 'Who to Follow — Banking',
    personName: 'Teresa Heitsenrether',
    personTitle: 'Chief Data & Analytics Officer',
    personCompany: 'JPMorgan Chase',
    personBio: 'Leading AI and data strategy at the world\'s largest bank. Overseeing 2,000+ AI/ML use cases in production. Transforming how banking uses machine learning at scale.',
    personLinkedIn: 'https://linkedin.com/in/teresa-heitsenrether',
    image: '/teresa-heitsenrether.svg',
  },
];

export function useRealtimePresentation() {
  const [slides, setSlides] = useState<SlideContent[]>(DEFAULT_SLIDES);
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const channelRef = useRef<RealtimeChannel | null>(null);
  const lastUpdateRef = useRef<string>('');

  // Fetch initial slides from database
  useEffect(() => {
    fetch('/api/slides/latest')
      .then(r => r.json())
      .then(data => {
        if (data.slides && data.slides.length > 0) {
          setSlides(data.slides);
          lastUpdateRef.current = data.updatedAt || '';
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let mounted = true;

    const setupRealtime = async () => {
      if (!mounted) return;

      try {
        if (channelRef.current) {
          await supabase.removeChannel(channelRef.current);
        }

        const channel = supabase.channel('presentation', {
          config: { broadcast: { self: true } },
        });

        channelRef.current = channel;

        channel
          .on('broadcast', { event: 'slide_update' }, (payload) => {
            if (!mounted) return;
            console.log('📡 Received update');
            const data = payload.payload as PresentationData;
            if (data.slides) {
              setSlides(data.slides);
              lastUpdateRef.current = data.updatedAt;
            }
          })
          .subscribe((subscriptionStatus) => {
            if (!mounted) return;
            if (subscriptionStatus === 'SUBSCRIBED') {
              setStatus('connected');
            } else if (subscriptionStatus === 'CHANNEL_ERROR' || subscriptionStatus === 'TIMED_OUT') {
              setStatus('error');
            }
          });
      } catch (error) {
        console.error('Realtime error:', error);
        setStatus('error');
      }
    };

    setupRealtime();

    // Polling fallback - checks database every 2 seconds
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/slides/latest?t=' + Date.now());
        if (response.ok) {
          const data = await response.json();
          // Only update if there's new data
          if (data.updatedAt && data.updatedAt !== lastUpdateRef.current && data.slides?.length > 0) {
            console.log('📡 Poll: new slides detected');
            setSlides(data.slides);
            lastUpdateRef.current = data.updatedAt;
          }
        }
      } catch (e) {
        // Silent fail
      }
    }, 2000);

    return () => {
      mounted = false;
      clearInterval(pollInterval);
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, []);

  return { slides, status };
}
