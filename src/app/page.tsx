'use client';

import React from 'react';
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
import { DB90Diagram } from '@/components/DB90Diagram';

type ProjectInfo = {
  name: string;
  logo: string;
  url: string;
  description: string;
  features?: string[];
};

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
  email?: string;
  website?: string;
  // Full graphic slide
  graphic?: string;
  // Projects (two-column layout)
  projects?: ProjectInfo[];
  // Callouts (stat cards)
  callouts?: {
    stat: string;
    label: string;
    sublabel?: string;
    icon?: string;
  }[];
  // Feature grid
  features?: {
    title: string;
    description: string;
    icon?: string;
  }[];
};

function renderSlide(slide: SlideData, index: number, total: number) {
  // Projects slide (two-column layout)
  if (slide.projects && slide.projects.length > 0) {
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <div className="projects-grid">
            {slide.projects.map((project, i) => (
              <div key={i} className="project-card">
                <img src={project.logo} alt={project.name} className="project-logo" />
                <h3 className="project-name">{project.name}</h3>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-url">
                  {project.url.replace('https://', '')}
                </a>
                <p className="project-description">{project.description}</p>
                {project.features && project.features.length > 0 && (
                  <ul className="project-features">
                    {project.features.map((feature, j) => (
                      <li key={j}>{feature}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // DB90 Diagram slide
  if (slide.graphic === '/db90-diagram.jpg' || slide.graphic === 'db90') {
    return (
      <Slide key={slide.id}>
        <SectionTitle>DB90: Build faster, <em style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400 }}>build better</em></SectionTitle>
        <Logo />
        <DB90Diagram />
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // Full graphic slide (with optional title/subtitle for screenshots)
  if (slide.graphic) {
    const hasTitle = slide.sectionTitle && slide.sectionTitle !== '';
    return (
      <Slide key={slide.id}>
        {hasTitle && (
          <>
            <SectionTitle>{slide.sectionTitle}</SectionTitle>
            <Logo />
          </>
        )}
        <div className={hasTitle ? 'screenshot-slide' : 'graphic-slide'}>
          {hasTitle ? (
            <div className="screenshot-wrapper">
              <img 
                src={slide.graphic} 
                alt={slide.sectionTitle || 'Slide graphic'}
                className="slide-screenshot"
              />
            </div>
          ) : (
            <img 
              src={slide.graphic} 
              alt={slide.sectionTitle || 'Slide graphic'}
              className="slide-graphic"
            />
          )}
          {slide.subtitle && (
            <p className="screenshot-caption">{slide.subtitle}</p>
          )}
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
              {slide.email && (
                <p className="connect-email">
                  <a href={`mailto:${slide.email}`}>{slide.email}</a>
                </p>
              )}
              {slide.website && (
                <p className="connect-website">
                  <a href={`https://${slide.website}`} target="_blank" rel="noopener noreferrer">{slide.website}</a>
                </p>
              )}
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
    // Determine QR code based on person name
    const qrCodeMap: Record<string, string> = {
      'Ryan Carson': '/ryan-carson-qr.svg',
      'Boris Cherny': '/boris-cherny-qr.svg',
      'Andrej Karpathy': '/andrej-karpathy-qr.svg',
      'Darryl Willis': '/darryl-willis-qr.svg',
      'Daniela Amodei': '/daniela-amodei-qr.svg',
    };
    const personQr = qrCodeMap[slide.personName];
    
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <div className="person-card">
            <div className="person-visual">
              {slide.image && (
                <img 
                  src={slide.image} 
                  alt={slide.personName}
                  className="person-image"
                />
              )}
              {personQr && (
                <div className="person-qr-wrapper">
                  <img 
                    src={personQr} 
                    alt={`${slide.personName} profile QR`}
                    className="person-qr"
                  />
                </div>
              )}
            </div>
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

  // Callouts slide (horizontal cards)
  if (slide.sectionTitle && slide.callouts && slide.callouts.length > 0) {
    const icons: Record<string, React.ReactNode> = {
      code: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>,
      file: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14,2 L6,2 C4.9,2 4,2.9 4,4 L4,20 C4,21.1 4.9,22 6,22 L18,22 C19.1,22 20,21.1 20,20 L20,8 L14,2 Z"/><polyline points="14,2 14,8 20,8"/></svg>,
      users: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17,21 L17,19 C17,16.8 15.2,15 13,15 L5,15 C2.8,15 1,16.8 1,19 L1,21"/><circle cx="9" cy="7" r="4"/><path d="M23,21 L23,19 C23,17.1 21.8,15.5 20,15"/><path d="M16,3 C17.8,3.5 19,5.1 19,7 C19,8.9 17.8,10.5 16,11"/></svg>,
      clock: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
      refresh: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23,4 23,10 17,10"/><path d="M20.5,15.5 C19.1,19.1 15.3,21.5 11,21 C5.5,20.4 1.5,15.5 2.1,10 C2.7,4.5 7.6,0.5 13.1,1.1 C17.3,1.5 20.7,4.4 21.8,8.3"/></svg>,
      alert: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29,3.86 L1.82,18 C1.64,18.3 1.64,18.69 1.82,19 C2,19.3 2.32,19.5 2.68,19.5 L21.32,19.5 C21.68,19.5 22,19.3 22.18,19 C22.36,18.69 22.36,18.3 22.18,18 L13.71,3.86 C13.53,3.56 13.21,3.36 12.85,3.36 L11.15,3.36 C10.79,3.36 10.47,3.56 10.29,3.86 Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
      database: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21,12 C21,13.7 17,15 12,15 C7,15 3,13.7 3,12"/><path d="M3,5 L3,19 C3,20.7 7,22 12,22 C17,22 21,20.7 21,19 L21,5"/></svg>,
      brain: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12,2 C8.1,2 5,5.1 5,9 C5,11.4 6.2,13.5 8,14.7 L8,22 L16,22 L16,14.7 C17.8,13.5 19,11.4 19,9 C19,5.1 15.9,2 12,2 Z"/><line x1="9" y1="22" x2="15" y2="22"/><line x1="10" y1="2" x2="10" y2="7"/><line x1="14" y1="2" x2="14" y2="7"/></svg>,
    };
    
    const isThreeColumn = slide.callouts.length === 6;
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          {slide.content && (
            <p className="callouts-problem-statement">{slide.content}</p>
          )}
          <div className={isThreeColumn ? 'callouts-grid callouts-grid-3' : 'callouts-grid'}>
            {slide.callouts.map((callout, i) => (
              <div key={i} className="callout-card">
                {callout.icon && icons[callout.icon] ? (
                  <span className="callout-icon">{icons[callout.icon]}</span>
                ) : (
                  <span className="callout-stat">{callout.stat}</span>
                )}
                <div className="callout-content">
                  <span className="callout-label">{callout.label}</span>
                  {callout.sublabel && <span className="callout-sublabel">{callout.sublabel}</span>}
                </div>
              </div>
            ))}
          </div>
        </SlideContent>
        <Footer pageNumber={index + 1} />
      </Slide>
    );
  }

  // Feature grid slide
  if (slide.sectionTitle && slide.features && slide.features.length > 0) {
    const featureIcons: Record<string, React.ReactNode> = {
      clock: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>,
      brain: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a9 9 0 0 1 9 9c0 3.1-1.5 5.8-4 7.5V21H7v-2.5C4.5 16.8 3 14.1 3 11a9 9 0 0 1 9-9z"/><path d="M9 21v1a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-1"/></svg>,
      shield: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z"/><polyline points="9,12 11,14 15,10"/></svg>,
      link: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.5-1.5"/></svg>,
      zap: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"/></svg>,
      rocket: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
      check: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>,
      target: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
    };
    const hasIcons = slide.features.some(f => f.icon);
    
    return (
      <Slide key={slide.id}>
        <SectionTitle>{slide.sectionTitle}</SectionTitle>
        <Logo />
        <SlideContent>
          <div className={hasIcons ? "features-grid features-grid-icons" : "features-grid"}>
            {slide.features.map((feature, i) => (
              <div key={i} className="feature-card">
                {feature.icon && featureIcons[feature.icon] && (
                  <div className="feature-icon">{featureIcons[feature.icon]}</div>
                )}
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
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
