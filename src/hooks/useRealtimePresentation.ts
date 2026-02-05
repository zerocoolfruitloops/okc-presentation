'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase, PresentationData, SlideContent } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

const DEFAULT_SLIDES: SlideContent[] = [
  // INTRO
  {
    id: 1,
    sectionTitle: 'About me',
    content: 'Billy Boozer',
    role: 'Product Leader • Technology Executive',
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
  // OPEN SOURCE AI - Page 1
  {
    id: 4,
    sectionTitle: 'Open Source AI Tools',
    projects: [
      {
        name: 'LangChain',
        logo: '/langchain-logo.png',
        url: 'https://langchain.com',
        description: 'The leading framework for building LLM-powered applications. Provides modular components for prompts, chains, agents, and memory to create sophisticated AI workflows.',
      },
      {
        name: 'AutoGPT',
        logo: '/autogpt-logo.png',
        url: 'https://autogpt.net',
        description: 'An experimental open-source application showcasing autonomous AI agents. Chains together LLM "thoughts" to achieve user-defined goals with minimal human intervention.',
      },
    ],
  },
  // OPEN SOURCE AI - Page 2
  {
    id: 5,
    sectionTitle: 'Open Source AI Tools',
    projects: [
      {
        name: 'CrewAI',
        logo: '/crewai-logo.png',
        url: 'https://crewai.com',
        description: 'Framework for orchestrating autonomous AI agents that work together. Define roles, goals, and tools for each agent to collaborate on complex tasks.',
      },
      {
        name: 'OpenDevin',
        logo: '/opendevin-logo.png',
        url: 'https://github.com/OpenDevin/OpenDevin',
        description: 'Open-source AI software engineer that can write code, debug, and execute tasks. Replicates Devin\'s capabilities with full transparency and customization.',
      },
    ],
  },
  // CLOSED SOURCE AI - Page 1
  {
    id: 6,
    sectionTitle: 'Closed Source AI',
    projects: [
      {
        name: 'OpenAI GPT-4',
        logo: '/openai-logo.png',
        url: 'https://openai.com',
        description: 'Industry-leading large language model powering ChatGPT. Excels at reasoning, coding, and creative tasks with the largest ecosystem of plugins and integrations.',
      },
      {
        name: 'Anthropic Claude',
        logo: '/anthropic-logo.png',
        url: 'https://anthropic.com',
        description: 'Constitutional AI designed to be helpful, harmless, and honest. Features 200K token context window and excels at analysis, writing, and coding tasks.',
      },
    ],
  },
  // CLOSED SOURCE AI - Page 2
  {
    id: 7,
    sectionTitle: 'Closed Source AI',
    projects: [
      {
        name: 'Google Gemini',
        logo: '/gemini-logo.svg',
        url: 'https://gemini.google.com',
        description: 'Google\'s most capable multimodal AI. Natively understands text, images, audio, and video with deep integration across Google Workspace and Cloud.',
      },
      {
        name: 'GitHub Copilot',
        logo: '/copilot-logo.png',
        url: 'https://github.com/features/copilot',
        description: 'AI pair programmer that suggests code in real-time. Trained on billions of lines of code, it accelerates development across all major languages and IDEs.',
      },
    ],
  },
  // CLOSED SOURCE AI - Page 3
  {
    id: 8,
    sectionTitle: 'Closed Source AI',
    projects: [
      {
        name: 'Cursor',
        logo: '/cursor-logo.png',
        url: 'https://cursor.com',
        description: 'AI-first code editor built on VS Code. Features AI-powered autocomplete, chat, and codebase understanding that learns your project\'s patterns.',
      },
      {
        name: 'Amp',
        logo: '/amp-logo.png',
        url: 'https://sourcegraph.com/amp',
        description: 'Frontier AI coding agent by Sourcegraph. Ships entire features autonomously while you sleep, handling everything from planning to pull requests.',
      },
    ],
  },
  // PEOPLE TO FOLLOW
  {
    id: 9,
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
    id: 10,
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
    id: 11,
    sectionTitle: 'Who to Follow',
    personName: 'Andrej Karpathy',
    personTitle: 'AI Researcher & Educator',
    personCompany: 'Former Tesla / OpenAI',
    personBio: 'Co-founded OpenAI. Former Director of AI at Tesla (Autopilot). One of the most influential voices in deep learning.',
    personTwitter: 'https://x.com/karpathy',
    image: '/andrej-karpathy.jpg',
  },
  {
    id: 12,
    sectionTitle: 'Who to Follow — Energy',
    personName: 'Darryl Willis',
    personTitle: 'Corporate Vice President, Energy & Resources',
    personCompany: 'Microsoft',
    personBio: 'Leading Microsoft\'s Energy & Resources Industry. Former BP executive with 25+ years in oil & gas.',
    personLinkedIn: 'https://linkedin.com/in/darryl-willis',
    image: '/darryl-willis.jpg',
  },
  {
    id: 13,
    sectionTitle: 'Who to Follow — AI Leadership',
    personName: 'Daniela Amodei',
    personTitle: 'President & Co-Founder',
    personCompany: 'Anthropic',
    personBio: 'Co-founded Anthropic to build safe, beneficial AI. Former VP of Operations at OpenAI. Leading the company behind Claude.',
    personTwitter: 'https://x.com/DanielaAmodei',
    image: '/daniela-amodei.jpg',
  },
  // DB90 SECTION
  {
    id: 14,
    title: 'Introducing',
    titleBold: 'DB90',
    subtitle: 'AI-augmented software development that delivers 50% efficiency gains',
  },
  {
    id: 15,
    graphic: 'db90',
  },
  {
    id: 16,
    sectionTitle: 'DB90 — Key Benefits',
    bullets: [
      '50% reduction in development time',
      'AI handles repetitive tasks, humans guide strategy',
      'Improved code quality through AI-assisted review',
      'Faster time to market for new features',
      'Scalable across all SDLC phases',
    ],
  },
  // 3PO SECTION
  {
    id: 17,
    title: 'Introducing',
    titleBold: '3PO',
    subtitle: 'AI-powered requirements that bridge the gap from idea to code',
  },
  {
    id: 18,
    sectionTitle: '3PO — How It Works',
    bullets: [
      'Natural language to structured requirements',
      'Automatic diagram and backlog generation',
      'Connects requirements to development workflow',
      'Reduces handoff friction between teams',
      'Maintains traceability from idea to deployment',
    ],
  },
  {
    id: 19,
    sectionTitle: '3PO — The Impact',
    bullets: [
      'Requirements phase reduced from 15% to 5% of project time',
      'Fewer misunderstandings between stakeholders and developers',
      'Living documentation that evolves with the project',
      'AI suggests edge cases humans often miss',
      'Seamless integration with DB90 workflow',
    ],
  },
  // CLOSING
  {
    id: 20,
    sectionTitle: 'Key Takeaways',
    content: 'The future of software development is AI-augmented',
    bullets: [
      'AI agents are transforming every phase of the SDLC',
      'Energy & Banking are leading enterprise AI adoption',
      'DB90 + 3PO: 50% faster from idea to production',
      'Human expertise remains essential — AI augments, not replaces',
      'Start experimenting now — the learning curve is real',
    ],
  },
  {
    id: 21,
    title: 'Thank You',
    titleBold: 'Questions?',
    subtitle: 'Let\'s build the future together',
  },
  {
    id: 22,
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
