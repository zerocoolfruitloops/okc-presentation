'use client';

import { useState, useEffect, useCallback, ReactNode, useRef } from 'react';

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
  title = 'AI Agents 2026: The Age of the Agent', 
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
      <img src="/dualboot-logo.svg" alt="Dualboot Partners" />
    </div>
  );
}

interface ThumbnailSidebarProps {
  totalSlides: number;
  currentSlide: number;
  onSlideSelect: (index: number) => void;
  isOpen: boolean;
  onToggle: () => void;
}

function ThumbnailSidebar({ totalSlides, currentSlide, onSlideSelect, isOpen, onToggle }: ThumbnailSidebarProps) {
  const activeRef = useRef<HTMLButtonElement>(null);
  
  // Scroll active thumbnail into view when slide changes
  useEffect(() => {
    if (isOpen && activeRef.current) {
      activeRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [currentSlide, isOpen]);
  
  return (
    <>
      {/* Toggle button */}
      <button 
        className="thumbnail-toggle"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        aria-label={isOpen ? 'Hide thumbnails' : 'Show thumbnails'}
      >
        {isOpen ? '◀' : '▶'}
      </button>
      
      {/* Sidebar */}
      <div className={`thumbnail-sidebar ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="thumbnail-list">
          {Array.from({ length: totalSlides }, (_, i) => {
            const slideNum = String(i + 1).padStart(2, '0');
            const isActive = i === currentSlide;
            return (
              <button
                key={i}
                ref={isActive ? activeRef : null}
                className={`thumbnail-item ${isActive ? 'active' : ''}`}
                onClick={() => onSlideSelect(i)}
                aria-label={`Go to slide ${i + 1}`}
              >
                <img 
                  src={`/screenshots/slide-${slideNum}.png`} 
                  alt={`Slide ${i + 1}`}
                  loading="lazy"
                />
                <span className="thumbnail-number">{i + 1}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

interface PresentationProps {
  children: ReactNode[];
  status?: 'connecting' | 'connected' | 'error';
  currentSlide?: number; // Remote-controlled slide (1-indexed)
  onSlideChange?: (slideNum: number) => void; // Callback when user navigates (1-indexed)
}

export function Presentation({ children, status = 'connected', currentSlide: remoteSlide, onSlideChange }: PresentationProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const totalSlides = children.length;
  
  // Convert from 1-indexed to 0-indexed for display
  const currentSlide = (remoteSlide || 1) - 1;

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalSlides) {
      // Notify parent to update state (convert back to 1-indexed)
      onSlideChange?.(index + 1);
    }
  }, [totalSlides, onSlideChange]);

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
        case 't':
        case 'T':
          // Toggle sidebar with 't' key
          setSidebarOpen(prev => !prev);
          break;
        case 'Escape':
          // Close sidebar with Escape
          setSidebarOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, totalSlides]);

  const handleClick = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;
    
    // Adjust click zones when sidebar is open
    const leftZone = sidebarOpen ? 0.4 : 0.3;
    
    if (clientX > innerWidth * 0.7) {
      nextSlide();
    } else if (clientX < innerWidth * leftZone && !sidebarOpen) {
      prevSlide();
    }
  };

  const statusColor = status === 'connected' ? '#4ade80' : status === 'connecting' ? '#fbbf24' : '#ef4444';

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <ThumbnailSidebar
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        onSlideSelect={goToSlide}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(prev => !prev)}
      />
      {children[currentSlide]}
      <div className="nav-hint">
        {currentSlide + 1} / {totalSlides}
      </div>
      {/* Minimal status dot - only visible when not connected */}
      {status !== 'connected' && (
        <div style={{
          position: 'fixed',
          bottom: 12,
          left: sidebarOpen ? 172 : 12,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: statusColor,
          opacity: 0.7,
          zIndex: 9999,
          animation: status === 'connecting' ? 'pulse 1.5s ease-in-out infinite' : 'none',
          transition: 'left 0.3s ease',
        }} />
      )}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
