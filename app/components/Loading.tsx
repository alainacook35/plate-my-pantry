"use client";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Loading({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 400);
  }, []);

  return (
    <>
      {children}
      {!mounted && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={80} />
        </div>
      )}
    </>
  );
}
