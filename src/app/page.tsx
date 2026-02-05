'use client';

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
import { useRealtimePresentation } from '@/hooks/useRealtimePresentation';
import { SlideContent as SlideContentType } from '@/lib/supabase';

function renderSlide(slide: SlideContentType, index: number) {
  // Title slide (has title and titleBold)
  if (slide.title && slide.titleBold) {
    return (
      <Slide key={slide.id}>
        <SlideContent>
          <SlideTitle>{slide.title}</SlideTitle>
          <SlideTitle bold>{slide.titleBold}</SlideTitle>
          {slide.subtitle && <SlideSubtitle>{slide.subtitle}</SlideSubtitle>}
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // Section slide with bullets
  if (slide.sectionTitle && slide.bullets) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <SlideList items={slide.bullets} />
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // Section slide with content
  if (slide.sectionTitle && slide.content) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <p className="text-2xl text-center" style={{ color: '#a0a0b0' }}>
            {slide.content}
          </p>
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // Fallback - simple content slide
  return (
    <Slide key={slide.id}>
      {slide.sectionTitle && <SectionTitle>{slide.sectionTitle}</SectionTitle>}
      <Logo />
      <SlideContent>
        {slide.title && <SlideTitle>{slide.title}</SlideTitle>}
        {slide.content && (
          <p className="text-2xl text-center" style={{ color: '#a0a0b0' }}>
            {slide.content}
          </p>
        )}
      </SlideContent>
      <Footer pageNumber={index + 1} />
    </Slide>
  );
}

export default function Home() {
  const { slides, status } = useRealtimePresentation();

  return (
    <Presentation status={status}>
      {slides.map((slide, index) => renderSlide(slide, index))}
    </Presentation>
  );
}
