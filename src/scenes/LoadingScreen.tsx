// components/LoadingScreen.jsx
import React from 'react';
import { useProgress, Html } from '@react-three/drei';

export function LoadingScreen() {
  // useProgress gibt dir u.a. den aktuellen Ladefortschritt zurück (0 - 100)
  const { progress } = useProgress();

  return (
    <Html center>
      <div
        style={{
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.5)',
          color: 'white',
          fontSize: '16px',
          borderRadius: '4px',
        }}
      >
        Lädt... {progress.toFixed(2)}%
      </div>
    </Html>
  );
}
