'use client';

import { useEffect, useRef, useState } from 'react';

const CHECK_INTERVAL = 3000; // Check every 3 seconds

export function AutoReload() {
  const initialVersion = useRef<string | null>(null);
  const [status, setStatus] = useState<string>('connecting...');

  useEffect(() => {
    const fetchVersion = async (): Promise<{ buildTime: string }> => {
      const response = await fetch('/api/version?t=' + Date.now(), {
        cache: 'no-store',
      });
      return response.json();
    };

    // Get initial version
    fetchVersion()
      .then(data => {
        initialVersion.current = data.buildTime;
        setStatus(`live`);
        console.log('[AutoReload] Watching for changes. Build:', data.buildTime);
      })
      .catch((e) => {
        setStatus('offline');
        console.error('[AutoReload] Failed to connect:', e);
      });

    const checkForUpdates = async () => {
      if (!initialVersion.current) return;
      
      try {
        const data = await fetchVersion();
        
        if (data.buildTime && data.buildTime !== initialVersion.current) {
          console.log('[AutoReload] 🚀 New deployment detected!');
          setStatus('🚀 updating...');
          setTimeout(() => window.location.reload(), 300);
        }
      } catch (e) {
        // Silent fail
      }
    };

    const interval = setInterval(checkForUpdates, CHECK_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: 8,
      left: 8,
      fontSize: 9,
      color: status === 'live' ? '#4ade80' : '#fbbf24',
      opacity: 0.6,
      zIndex: 9999,
      fontFamily: 'monospace',
    }}>
      ● {status}
    </div>
  );
}
