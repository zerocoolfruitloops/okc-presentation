'use client';

import { useEffect, useRef } from 'react';

const CHECK_INTERVAL = 5000; // Check every 5 seconds

export function AutoReload() {
  const initialVersion = useRef<string | null>(null);

  useEffect(() => {
    // Get initial version
    fetch('/version.json?t=' + Date.now())
      .then(r => r.json())
      .then(data => {
        initialVersion.current = data.buildTime;
      })
      .catch(() => {});

    const checkForUpdates = async () => {
      if (!initialVersion.current) return;
      
      try {
        const response = await fetch('/version.json?t=' + Date.now());
        const data = await response.json();
        
        if (data.buildTime && data.buildTime !== initialVersion.current) {
          console.log('New deployment detected, reloading...');
          window.location.reload();
        }
      } catch (e) {
        // Silently fail
      }
    };

    const interval = setInterval(checkForUpdates, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return null;
}
