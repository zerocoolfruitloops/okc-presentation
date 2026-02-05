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
  image?: string;
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

  // About me slide with image and role
  if (slide.sectionTitle && slide.content && slide.role && slide.image) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <div className="bio-container">
            <img 
              src={slide.image} 
              alt={slide.content}
              className="bio-image"
            />
            <div className="bio-content">
              <h3 className="bio-name">{slide.content}</h3>
              <p className="bio-role">{slide.role}</p>
              {slide.bullets && (
                <ul className="bio-list">
                  {slide.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // About me slide with role (no image)
  if (slide.sectionTitle && slide.content && slide.role) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <div className="bio-content" style={{ textAlign: 'center', maxWidth: '700px' }}>
            <h3 className="bio-name">{slide.content}</h3>
            <p className="bio-role">{slide.role}</p>
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
          <p className="centered-message" style={{ marginBottom: slide.bullets ? '2.5rem' : 0 }}>
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
          <p className="centered-message">{slide.content}</p>
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
