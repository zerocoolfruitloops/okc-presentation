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

type SlideData = {
  id: number;
  title?: string;
  titleBold?: string;
  subtitle?: string;
  sectionTitle?: string;
  bullets?: string[];
  content?: string;
  role?: string;
};

function renderSlide(slide: SlideData, index: number, total: number) {
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

  // About me slide with role
  if (slide.sectionTitle && slide.content && slide.role) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ 
              fontFamily: 'Playfair Display, serif', 
              fontStyle: 'italic',
              fontSize: '3rem',
              marginBottom: '1rem',
              color: 'white'
            }}>
              {slide.content}
            </h3>
            <p style={{ fontSize: '1.5rem', color: '#a0a0b0' }}>{slide.role}</p>
          </div>
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // Section slide with bullets
  if (slide.sectionTitle && slide.bullets && slide.bullets.length > 0) {
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

  // Section slide with content and optional bullets (wrap-up style)
  if (slide.sectionTitle && slide.content) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <p style={{ 
            fontSize: '2rem', 
            textAlign: 'center', 
            color: '#2563eb',
            fontWeight: '600',
            marginBottom: '2rem'
          }}>
            {slide.content}
          </p>
          {slide.bullets && slide.bullets.length > 0 && (
            <SlideList items={slide.bullets} />
          )}
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // Fallback
  return (
    <Slide key={slide.id}>
      {slide.sectionTitle && <SectionTitle>{slide.sectionTitle}</SectionTitle>}
      <Logo />
      <SlideContent>
        {slide.title && <SlideTitle>{slide.title}</SlideTitle>}
        {slide.content && (
          <p style={{ fontSize: '1.5rem', textAlign: 'center', color: '#a0a0b0' }}>
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
      {slides.map((slide, index) => renderSlide(slide as SlideData, index, slides.length))}
    </Presentation>
  );
}
