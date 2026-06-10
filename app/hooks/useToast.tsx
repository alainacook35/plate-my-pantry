import { useContext } from "react";
import { ToastContext, IToastContextValue } from "../contexts/ToastProvider";

export function useToast(): IToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used inside <ToastProvider>.');
  }
  return ctx;
}