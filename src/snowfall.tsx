"use client";

import { useEffect, useState, useMemo } from "react";

export default function Snowfall() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const snowflakes = useMemo(() => {
    return [...Array(50)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 12 + 8,
      duration: 8 + Math.random() * 10,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.4 + 0.4,
    }));
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute will-change-transform"
            style={{
              left: `${flake.left}vw`,
              fontSize: `${flake.size}px`,
              animation: `snowfall ${flake.duration}s linear infinite`,
              animationDelay: `${flake.delay}s`,
              opacity: flake.opacity,
            }}
          >
            ❄️
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-10vh) translateZ(0);
          }
          100% {
            transform: translateY(110vh) translateZ(0);
          }
        }
      `}</style>
    </>
  );
}
