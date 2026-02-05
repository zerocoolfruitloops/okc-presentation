import { 
  Presentation, 
  Slide, 
  SlideTitle, 
  SlideSubtitle, 
  SectionTitle,
  SlideContent,
  SlideList,
  Footer,
  Logo 
} from '@/components/Presentation';

export default function Home() {
  return (
    <Presentation>
      {/* Slide 1: Title Slide */}
      <Slide>
        <SlideContent>
          <SlideTitle>Generative AI:</SlideTitle>
          <SlideTitle bold>What&apos;s possible</SlideTitle>
          <SlideTitle bold>and what&apos;s next</SlideTitle>
          <SlideSubtitle>
            The technical evolution and business impact of generative AI
          </SlideSubtitle>
        </SlideContent>
        <Footer company="Dualboot Partners" title="Generative AI" pageNumber={1} />
      </Slide>

      {/* Slide 2: About Me */}
      <Slide>
        <SectionTitle>About me</SectionTitle>
        <Logo />
        <SlideContent>
          <div className="flex items-center justify-center gap-16">
            <div className="w-48 h-48 rounded-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500 text-4xl">📷</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold italic" style={{ fontFamily: 'Playfair Display, serif' }}>
                Billy Boozer - CEO
              </h3>
              <div className="mt-4 flex items-center gap-2">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2" />
                  <circle cx="10" cy="16" r="3" fill="white" />
                  <circle cx="22" cy="16" r="3" fill="white" />
                </svg>
                <span className="text-xl">dualboot</span>
                <span className="text-sm text-gray-400">PARTNERS</span>
              </div>
            </div>
          </div>
        </SlideContent>
        <Footer company="Dualboot Partners" title="Generative AI" pageNumber={2} />
      </Slide>

      {/* Slide 3: Agenda/Overview */}
      <Slide>
        <SectionTitle>What we&apos;ll cover</SectionTitle>
        <Logo />
        <SlideContent>
          <SlideList items={[
            'The evolution of AI and large language models',
            'What generative AI can do today',
            'Real-world applications and use cases',
            'Challenges and limitations',
            'What\'s next: trends and predictions',
          ]} />
        </SlideContent>
        <Footer company="Dualboot Partners" title="Generative AI" pageNumber={3} />
      </Slide>

      {/* Slide 4: Placeholder for more content */}
      <Slide>
        <SectionTitle>Ready for your content</SectionTitle>
        <Logo />
        <SlideContent>
          <p className="text-2xl text-center text-gray-400">
            Send me your presentation content and I&apos;ll populate the slides.
          </p>
        </SlideContent>
        <Footer company="Dualboot Partners" title="Generative AI" pageNumber={4} />
      </Slide>
    </Presentation>
  );
}
