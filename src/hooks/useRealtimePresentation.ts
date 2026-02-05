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
    sectionTitle: 'Open Source AI Tools',
    bullets: [
      'LangChain — Framework for building LLM applications',
      'AutoGPT — Autonomous AI agent experiments',
      'CrewAI — Multi-agent orchestration framework',
      'OpenDevin — Open-source AI software engineer',
      'Haystack — End-to-end NLP pipelines',
    ],
  },
  {
    id: 5,
    sectionTitle: 'Closed Source AI',
    bullets: [
      'OpenAI GPT-4 / ChatGPT — Industry leader in reasoning',
      'Anthropic Claude — Constitutional AI, long context',
      'Google Gemini — Multimodal, deep Google integration',
      'Cursor / GitHub Copilot — AI-powered coding',
      'Amp / Claude Code — Agentic coding assistants',
    ],
  },
  {
    id: 6,
    sectionTitle: 'Who to Follow',
    personName: 'Ryan Carson',
    personTitle: 'Builder in Residence',
    personCompany: 'Sourcegraph (Amp)',
    personBio: 'Serial entrepreneur with 25+ years building tech companies. Founder of Treehouse. Now leading Amp, the frontier AI coding agent.',
    personLinkedIn: 'https://linkedin.com/in/ryancarson',
    personTwitter: 'https://x.com/ryancarson',
    image: '/ryan-carson.jpg',
  },
  {
    id: 7,
    sectionTitle: 'Who to Follow',
    personName: 'Boris Cherny',
    personTitle: 'Creator of Claude Code',
    personCompany: 'Anthropic',
    personBio: 'Built Claude Code, the agentic coding tool that lives in your terminal. Author of "Programming TypeScript" (O\'Reilly).',
    personLinkedIn: 'https://linkedin.com/in/bcherny',
    personTwitter: 'https://x.com/bcherny',
    image: '/boris-cherny.jpg',
  },
  {
    id: 8,
    sectionTitle: 'Who to Follow',
    personName: 'Andrej Karpathy',
    personTitle: 'AI Researcher & Educator',
    personCompany: 'Former Tesla / OpenAI',
    personBio: 'Co-founded OpenAI. Former Director of AI at Tesla (Autopilot). One of the most influential voices in deep learning.',
    personTwitter: 'https://x.com/karpathy',
    image: '/andrej-karpathy.jpg',
  },
  {
    id: 9,
    sectionTitle: 'Who to Follow — Energy',
    personName: 'Darryl Willis',
    personTitle: 'Corporate Vice President, Energy & Resources',
    personCompany: 'Microsoft',
    personBio: 'Leading Microsoft\'s Energy & Resources Industry. Former BP executive with 25+ years in oil & gas.',
    personLinkedIn: 'https://linkedin.com/in/darryl-willis',
    image: '/darryl-willis.jpg',
  },
  {
    id: 10,
    sectionTitle: 'Who to Follow — Banking',
    personName: 'Teresa Heitsenrether',
    personTitle: 'Chief Data & Analytics Officer',
    personCompany: 'JPMorgan Chase',
    personBio: 'Leading AI and data strategy at the world\'s largest bank. Overseeing 2,000+ AI/ML use cases in production.',
    personLinkedIn: 'https://linkedin.com/in/teresa-heitsenrether',
    image: '/teresa-heitsenrether.svg',
  },
  {
    id: 11,
    graphic: 'db90',
  },
  {
    id: 12,
    sectionTitle: 'DB90 — Key Benefits',
    bullets: [
      '50% reduction in development time',
      'AI handles repetitive tasks, humans guide strategy',
      'Improved code quality through AI-assisted review',
      'Faster time to market for new features',
      'Scalable across all SDLC phases',
    ],
  },
  {
    id: 13,
    sectionTitle: '3PO — AI-Powered Requirements',
    bullets: [
      'Natural language to structured requirements',
      'Automatic diagram and backlog generation',
      'Connects requirements to development workflow',
      'Reduces handoff friction between teams',
      'Maintains traceability from idea to deployment',
    ],
  },
  {
    id: 14,
    sectionTitle: 'Key Takeaways',
    content: 'The future of software development is AI-augmented',
    bullets: [
      'AI agents are transforming every phase of the SDLC',
      'Energy & Banking are leading enterprise AI adoption',
      'Open source + closed source tools complement each other',
      'Human expertise remains essential — AI augments, not replaces',
      'Start experimenting now — the learning curve is real',
    ],
  },
  {
    id: 15,
    sectionTitle: 'Let\'s Connect',
    qrCode: '/linkedin-qr.svg',
    content: 'Billy Boozer',
    qrLabel: 'linkedin.com/in/billyboozer',
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
