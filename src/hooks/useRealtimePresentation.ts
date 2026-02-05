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
        description: 'The most popular framework for building LLM-powered applications. Provides modular, composable components for creating sophisticated AI workflows from simple chatbots to complex autonomous agents.',
        features: ['Modular chains & agents architecture', 'Extensive integrations ecosystem', 'Production-ready with LangSmith observability'],
      },
      {
        name: 'AutoGPT',
        logo: '/autogpt-logo.png',
        url: 'https://autogpt.net',
        description: 'Pioneering open-source autonomous AI agent that sparked the agent revolution. Chains together LLM reasoning steps to accomplish complex goals with minimal human oversight.',
        features: ['Autonomous goal decomposition', 'Internet browsing & file operations', 'Plugin system for extensibility'],
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
        description: 'Framework for orchestrating role-playing AI agents that collaborate like a team. Define specialized agents with unique roles, goals, and tools to tackle complex multi-step tasks together.',
        features: ['Role-based agent collaboration', 'Flexible task delegation', 'Built-in memory & context sharing'],
      },
      {
        name: 'OpenCode',
        logo: '/opencode-logo.png',
        url: 'https://opencode.ai',
        description: 'Terminal-native AI coding assistant built for developers who value transparency. Full agentic coding capabilities with local execution, complete audit trails, and zero vendor lock-in.',
        features: ['Runs entirely in your terminal', 'Full codebase understanding', 'Works with any LLM provider'],
      },
    ],
  },
  // OPEN SOURCE AI - Page 3
  {
    id: 6,
    sectionTitle: 'Open Source AI Tools',
    projects: [
      {
        name: 'Temporal',
        logo: '/temporal-logo.png',
        url: 'https://temporal.io',
        description: 'Battle-tested durable execution platform used by Stripe, Netflix, and Snap. Perfect for orchestrating long-running AI workflows that need fault tolerance, retries, and full visibility.',
        features: ['Automatic failure recovery', 'Workflow versioning & replay', 'Language-agnostic SDKs'],
      },
      {
        name: 'LiteLLM',
        logo: '/litellm-logo.png',
        url: 'https://litellm.ai',
        description: 'Universal LLM gateway that provides a single OpenAI-compatible interface to 100+ models. Essential infrastructure for teams running multiple models with cost tracking and failover.',
        features: ['100+ model providers supported', 'Automatic load balancing & fallbacks', 'Built-in spend tracking & budgets'],
      },
    ],
  },
  // CLOSED SOURCE AI - Page 1
  {
    id: 7,
    sectionTitle: 'Closed Source AI',
    projects: [
      {
        name: 'OpenAI GPT-4',
        logo: '/openai-logo.png',
        url: 'https://openai.com',
        description: 'The model that defined the modern AI era. GPT-4 and its successors power ChatGPT and set the benchmark for reasoning, coding, and creative tasks with the largest developer ecosystem.',
        features: ['Best-in-class reasoning ability', 'Massive plugin & tool ecosystem', 'Enterprise-grade APIs & compliance'],
      },
      {
        name: 'Anthropic Claude',
        logo: '/anthropic-logo.png',
        url: 'https://anthropic.com',
        description: 'Built from the ground up with safety in mind using Constitutional AI. Claude offers a 200K token context window, exceptional writing quality, and honest, nuanced responses.',
        features: ['200K token context window', 'Constitutional AI safety', 'Excellent at analysis & coding'],
      },
    ],
  },
  // CLOSED SOURCE AI - Page 2
  {
    id: 8,
    sectionTitle: 'Closed Source AI',
    projects: [
      {
        name: 'Google Gemini',
        logo: '/gemini-logo.svg',
        url: 'https://gemini.google.com',
        description: 'Google\'s flagship multimodal AI that natively processes text, images, audio, and video. Deep integration with Google Workspace, Search, and Cloud makes it ideal for enterprise workflows.',
        features: ['Native multimodal understanding', 'Deep Google Workspace integration', '1M+ token context with Gemini 1.5'],
      },
      {
        name: 'GitHub Copilot',
        logo: '/copilot-logo.png',
        url: 'https://github.com/features/copilot',
        description: 'The original AI pair programmer that changed how developers write code. Trained on billions of lines from GitHub, it provides intelligent suggestions across every major language and IDE.',
        features: ['Real-time code suggestions', 'Works in all major IDEs', 'Copilot Chat for explanations'],
      },
    ],
  },
  // CLOSED SOURCE AI - Page 3
  {
    id: 9,
    sectionTitle: 'Closed Source AI',
    projects: [
      {
        name: 'Cursor',
        logo: '/cursor-logo.svg',
        url: 'https://cursor.com',
        description: 'Purpose-built AI code editor that goes beyond autocomplete. Understands your entire codebase, generates multi-file changes, and learns your coding patterns over time.',
        features: ['Full codebase awareness', 'Multi-file edit generation', 'Built-in chat & debugging'],
      },
      {
        name: 'OpenRouter',
        logo: '/openrouter-logo.svg',
        url: 'https://openrouter.ai',
        description: 'The smart router for LLMs. Single API to access GPT-4, Claude, Gemini, Llama, Mistral and 100+ models with automatic fallbacks, rate limit handling, and unified billing.',
        features: ['100+ models, one API', 'Automatic fallbacks & retries', 'Pay-per-token, no commitments'],
      },
    ],
  },
  // CLOSED SOURCE AI - Page 4 (AWS)
  {
    id: 10,
    sectionTitle: 'Closed Source AI',
    projects: [
      {
        name: 'Amazon Bedrock',
        logo: '/aws-logo.png',
        url: 'https://aws.amazon.com/bedrock',
        description: 'AWS\'s fully managed foundation model service. Access Claude, Llama, Titan, and Stable Diffusion through one API with enterprise security, fine-tuning, and RAG built in.',
        features: ['Multiple foundation models', 'Knowledge bases & RAG built-in', 'Enterprise security & compliance'],
      },
      {
        name: 'Amazon Q',
        logo: '/aws-logo.png',
        url: 'https://aws.amazon.com/q',
        description: 'AI assistant built for enterprise. Q Developer accelerates coding with AWS expertise, while Q Business connects to your company data for secure, intelligent answers.',
        features: ['Deep AWS service integration', 'Code transformation & upgrades', 'Connects to enterprise data'],
      },
    ],
  },
  // PEOPLE TO FOLLOW
  {
    id: 11,
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
    id: 12,
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
    id: 13,
    sectionTitle: 'Who to Follow',
    personName: 'Andrej Karpathy',
    personTitle: 'AI Researcher & Educator',
    personCompany: 'Former Tesla / OpenAI',
    personBio: 'Co-founded OpenAI. Former Director of AI at Tesla (Autopilot). One of the most influential voices in deep learning.',
    personTwitter: 'https://x.com/karpathy',
    image: '/andrej-karpathy.jpg',
  },
  {
    id: 14,
    sectionTitle: 'Who to Follow — Energy',
    personName: 'Darryl Willis',
    personTitle: 'Corporate Vice President, Energy & Resources',
    personCompany: 'Microsoft',
    personBio: 'Leading Microsoft\'s Energy & Resources Industry. Former BP executive with 25+ years in oil & gas.',
    personLinkedIn: 'https://linkedin.com/in/darryl-willis',
    image: '/darryl-willis.jpg',
  },
  {
    id: 15,
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
    id: 16,
    title: 'Introducing',
    titleBold: 'DB90',
    subtitle: 'AI-augmented software development that delivers 50% efficiency gains',
  },
  {
    id: 17,
    graphic: 'db90',
  },
  {
    id: 18,
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
    id: 19,
    title: 'Introducing',
    titleBold: '3PO',
    subtitle: 'AI-powered requirements that bridge the gap from idea to code',
  },
  {
    id: 20,
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
    id: 21,
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
    id: 22,
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
    id: 23,
    title: 'Thank You',
    titleBold: 'Questions?',
    subtitle: 'Let\'s build the future together',
  },
  {
    id: 24,
    sectionTitle: 'Let\'s Connect',
    qrCode: '/linkedin-qr.svg',
    content: 'Billy Boozer',
    qrLabel: 'linkedin.com/in/billyboozer',
    email: 'billy.boozer@dualbootpartners.com',
    website: 'dualbootpartners.com',
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
