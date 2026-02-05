'use client';

import { useState, useEffect, useCallback, ReactNode } from 'react';

interface SlideProps {
  children: ReactNode;
  className?: string;
}

export function Slide({ children, className = '' }: SlideProps) {
  return (
    <div className={`slide ${className}`}>
      <div className="glow-left" />
      <div className="glow-right" />
      {children}
    </div>
  );
}

export function SlideTitle({ children, bold = false }: { children: ReactNode; bold?: boolean }) {
  return (
    <h1 className={bold ? 'slide-title-bold' : 'slide-title'}>
      {children}
    </h1>
  );
}

export function SlideSubtitle({ children }: { children: ReactNode }) {
  return <p className="slide-subtitle">{children}</p>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}

export function SlideContent({ children }: { children: ReactNode }) {
  return <div className="slide-content">{children}</div>;
}

export function SlideList({ items }: { items: string[] }) {
  return (
    <ul className="slide-list">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function Footer({ 
  company = 'Dualboot Partners', 
  title = 'Generative AI', 
  pageNumber 
}: { 
  company?: string; 
  title?: string; 
  pageNumber: number;
}) {
  return (
    <footer className="slide-footer">
      <span className="company">{company}</span>
      <span className="presentation-title">{title}</span>
      <span className="page-number">{pageNumber}</span>
    </footer>
  );
}

export function Logo() {
  return (
    <div className="logo">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2" />
        <circle cx="10" cy="16" r="3" fill="white" />
        <circle cx="22" cy="16" r="3" fill="white" />
      </svg>
    </div>
  );
}

interface PresentationProps {
  children: ReactNode[];
}

export function Presentation({ children }: PresentationProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = children.length;

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  }, [totalSlides]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'Enter':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          goToSlide(0);
          break;
        case 'End':
          e.preventDefault();
          goToSlide(totalSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  // Touch/click navigation
  const handleClick = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;
    
    if (clientX > innerWidth * 0.7) {
      nextSlide();
    } else if (clientX < innerWidth * 0.3) {
      prevSlide();
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children[currentSlide]}
      <div className="nav-hint">
        {currentSlide + 1} / {totalSlides} • Arrow keys to navigate
      </div>
    </div>
  );
}
