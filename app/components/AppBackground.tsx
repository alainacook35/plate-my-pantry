'use client'
import { useEffect, useState } from "react";

const backgrounds = [
  "/backgrounds/pexels-olly-3768169.jpg",
  "/backgrounds/pexels-rdne-10432699.jpg",
  "/backgrounds/pexels-wally-34732196.jpg",
];

export default function RandomBackground({ children }: { children: React.ReactNode }) {
  const [background, setBackground] = useState<string | null>(null);

  useEffect(() => {
    const random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    // We are ensuring only one render with the empty dependencies array, so disabling this warning
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBackground(random);
  }, []);

  return (
    <div
      style={{
        backgroundImage: background ? `url(${background})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div
      style={{
        backdropFilter: "blur(6px)",
        minHeight: "100vh",
      }}
    >
      {children}
      </div>
    </div>
  );
}