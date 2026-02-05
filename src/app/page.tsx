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
  // Person to follow fields
  personName?: string;
  personTitle?: string;
  personCompany?: string;
  personBio?: string;
  personLinkedIn?: string;
  personTwitter?: string;
  // QR code fields
  qrCode?: string;
  qrLabel?: string;
  // Full graphic slide
  graphic?: string;
};

function renderSlide(slide: SlideData, index: number, total: number) {
  // Full graphic slide
  if (slide.graphic) {
    return (
      <Slide key={slide.id}>
        <div className="graphic-slide">
          <img 
            src={slide.graphic} 
            alt={slide.sectionTitle || 'Slide graphic'}
            className="slide-graphic"
          />
        </div>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // QR code / Connect slide
  if (slide.qrCode) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <div className="connect-card">
            <img 
              src={slide.qrCode} 
              alt="QR Code"
              className="qr-code"
            />
            <div className="connect-info">
              {slide.content && <h3 className="connect-name">{slide.content}</h3>}
              {slide.qrLabel && <p className="connect-label">{slide.qrLabel}</p>}
            </div>
          </div>
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // Person to follow slide
  if (slide.sectionTitle && slide.personName) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <div className="person-card">
            {slide.image && (
              <img 
                src={slide.image} 
                alt={slide.personName}
                className="person-image"
              />
            )}
            <div className="person-info">
              <h3 className="person-name">{slide.personName}</h3>
              <p className="person-title">{slide.personTitle}</p>
              {slide.personCompany && (
                <p className="person-company">{slide.personCompany}</p>
              )}
              {slide.personBio && (
                <p className="person-bio">{slide.personBio}</p>
              )}
              <div className="person-links">
                {slide.personLinkedIn && (
                  <a href={slide.personLinkedIn} target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </a>
                )}
                {slide.personTwitter && (
                  <a href={slide.personTwitter} target="_blank" rel="noopener noreferrer" className="social-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    @{slide.personTwitter.split('/').pop()}
                  </a>
                )}
              </div>
            </div>
          </div>
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

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
