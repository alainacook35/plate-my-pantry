"use client";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

export default function TransparentLoading({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ setLoading }}>
      {children}
      <Backdrop
        open={loading}
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={80} />
      </Backdrop>
    </LoadingContext.Provider>
  );
}
