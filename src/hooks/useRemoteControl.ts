'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

export type ControlState = {
  currentSlide: number;
  theme: 'light' | 'dark';
};

export function useRemoteControl() {
  const [controlState, setControlState] = useState<ControlState>({
    currentSlide: 1,
    theme: (typeof window !== 'undefined' && localStorage.getItem('presentation-theme') as 'light' | 'dark') || 'dark',
  });

  // Fetch initial state from server
  useEffect(() => {
    fetch('/api/control')
      .then(res => res.json())
      .then(data => {
        if (data.currentSlide || data.theme) {
          setControlState(prev => ({
            currentSlide: data.currentSlide || prev.currentSlide,
            theme: data.theme || prev.theme,
          }));
        }
      })
      .catch(console.error);
  }, []);

  // Subscribe to control updates
  useEffect(() => {
    const channel = supabase.channel('presentation-control');
    
    channel
      .on('broadcast', { event: 'control_update' }, (payload) => {
        const { currentSlide, theme } = payload.payload;
        console.log('Remote control update:', { currentSlide, theme });
        setControlState({ currentSlide, theme });
        // Save theme to localStorage
        if (theme) {
          localStorage.setItem('presentation-theme', theme);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Local toggle (for the on-screen button)
  const toggleTheme = useCallback(() => {
    setControlState(prev => {
      const newTheme = prev.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('presentation-theme', newTheme);
      return { ...prev, theme: newTheme };
    });
  }, []);

  // Local navigation
  const goToSlide = useCallback((slideNum: number) => {
    setControlState(prev => ({ ...prev, currentSlide: slideNum }));
  }, []);

  const nextSlide = useCallback((totalSlides: number) => {
    setControlState(prev => ({
      ...prev,
      currentSlide: Math.min(prev.currentSlide + 1, totalSlides),
    }));
  }, []);

  const prevSlide = useCallback(() => {
    setControlState(prev => ({
      ...prev,
      currentSlide: Math.max(prev.currentSlide - 1, 1),
    }));
  }, []);

  return {
    ...controlState,
    toggleTheme,
    goToSlide,
    nextSlide,
    prevSlide,
  };
}
