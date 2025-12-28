"use client";

import { useEffect, useState } from "react";

export default function Snowfall() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(150)].map((_, i) => {
        const left = Math.random() * 100;
        const size = Math.random() * 20 + 10;
        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 10;
        const opacity = Math.random() * 0.5 + 0.5;

        return (
          <div
            key={i}
            className="absolute text-white drop-shadow-lg"
            style={{
              left: `${left}vw`,
              fontSize: `${size}px`,
              animation: `snowfall ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              opacity,
            }}
          >
            ❄️
          </div>
        );
      })}

      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-15vh) rotate(0deg);
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            transform: translateY(115vh) rotate(1080deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
