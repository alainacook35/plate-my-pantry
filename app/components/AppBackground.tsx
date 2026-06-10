"use client";
import { useEffect, useMemo, useState } from "react";

export default function AppBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const backgrounds = useMemo(() => [
    "/backgrounds/pexels-katerina-holmes-5908187.jpg",
    "/backgrounds/pexels-klaus-nielsen-6287488.jpg",
    "/backgrounds/pexels-shvetsa-12673812.jpg",
  ], []);

  const [background, setBackground] = useState<string | null>(backgrounds[0]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBackground(backgrounds[Math.floor(Math.random() * backgrounds.length)]);
  }, [backgrounds]);

  return (
    <div
      style={{
        backgroundImage: background
          ? `url(${background})`
          : `url(${backgrounds[0]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backdropFilter: "blur(6px)",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}
