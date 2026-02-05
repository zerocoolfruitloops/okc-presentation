'use client';

import { useState, useEffect } from 'react';

export default function ControlPage() {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [theme, setTheme] = useState('dark');
  const [totalSlides, setTotalSlides] = useState(33);
  const [jumpTo, setJumpTo] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState('');

  // Fetch initial state
  useEffect(() => {
    fetch('/api/control')
      .then(res => res.json())
      .then(data => {
        setCurrentSlide(data.currentSlide || 1);
        setTheme(data.theme || 'dark');
        setTotalSlides(data.totalSlides || 33);
      })
      .catch(console.error);
  }, []);

  const sendCommand = async (action: string, value?: number) => {
    setLoading(true);
    try {
      const res = await fetch('/api/control', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, value }),
      });
      const data = await res.json();
      if (data.success) {
        setCurrentSlide(data.currentSlide);
        setTheme(data.theme);
        setLastAction(`${action}${value ? ' ' + value : ''}`);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleJump = () => {
    const num = parseInt(jumpTo);
    if (num >= 1 && num <= totalSlides) {
      sendCommand('jump', num);
      setJumpTo('');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Presentation Control</h1>
      
      {/* Current Slide Display */}
      <div style={styles.slideDisplay}>
        <span style={styles.slideNumber}>{currentSlide}</span>
        <span style={styles.slideTotal}>/ {totalSlides}</span>
      </div>

      {/* Navigation Buttons */}
      <div style={styles.navButtons}>
        <button 
          style={styles.backButton} 
          onClick={() => sendCommand('back')}
          disabled={loading || currentSlide === 1}
        >
          ← Back
        </button>
        <button 
          style={styles.nextButton} 
          onClick={() => sendCommand('next')}
          disabled={loading || currentSlide === totalSlides}
        >
          Next →
        </button>
      </div>

      {/* Theme Toggle */}
      <button 
        style={styles.themeButton}
        onClick={() => sendCommand('toggle')}
        disabled={loading}
      >
        {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Jump to Slide */}
      <div style={styles.jumpSection}>
        <input
          type="number"
          min="1"
          max={totalSlides}
          value={jumpTo}
          onChange={(e) => setJumpTo(e.target.value)}
          placeholder="Slide #"
          style={styles.jumpInput}
        />
        <button 
          style={styles.jumpButton}
          onClick={handleJump}
          disabled={loading || !jumpTo}
        >
          Go
        </button>
      </div>

      {/* Status */}
      {lastAction && (
        <div style={styles.status}>
          Last: {lastAction}
        </div>
      )}

      {/* Loading indicator */}
      {loading && <div style={styles.loading}>...</div>}
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
    background: '#0a0a0f',
    color: '#fff',
    fontFamily: 'system-ui, sans-serif',
    gap: '1.5rem',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#60a5fa',
    margin: 0,
  },
  slideDisplay: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '0.5rem',
  },
  slideNumber: {
    fontSize: '5rem',
    fontWeight: 700,
    color: '#fff',
    lineHeight: 1,
  },
  slideTotal: {
    fontSize: '2rem',
    color: '#6b7280',
  },
  navButtons: {
    display: 'flex',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
  },
  backButton: {
    flex: 1,
    padding: '1.5rem 2rem',
    fontSize: '1.25rem',
    fontWeight: 600,
    border: '2px solid #374151',
    borderRadius: '12px',
    background: '#1f2937',
    color: '#fff',
    cursor: 'pointer',
  },
  nextButton: {
    flex: 2,
    padding: '1.5rem 2rem',
    fontSize: '1.5rem',
    fontWeight: 700,
    border: 'none',
    borderRadius: '12px',
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
  },
  themeButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 500,
    border: '2px solid #374151',
    borderRadius: '12px',
    background: '#1f2937',
    color: '#fff',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '400px',
  },
  jumpSection: {
    display: 'flex',
    gap: '0.75rem',
    width: '100%',
    maxWidth: '400px',
  },
  jumpInput: {
    flex: 1,
    padding: '1rem',
    fontSize: '1.25rem',
    border: '2px solid #374151',
    borderRadius: '12px',
    background: '#1f2937',
    color: '#fff',
    textAlign: 'center',
  },
  jumpButton: {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: 600,
    border: 'none',
    borderRadius: '12px',
    background: '#10b981',
    color: '#fff',
    cursor: 'pointer',
  },
  status: {
    fontSize: '0.9rem',
    color: '#6b7280',
  },
  loading: {
    fontSize: '1.5rem',
    color: '#60a5fa',
  },
};
