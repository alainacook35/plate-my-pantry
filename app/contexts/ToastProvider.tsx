'use client'
import React, {
  createContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type Severity = 'success' | 'error' | 'warning' | 'info';

interface IToastOptions {
  severity?: Severity;
  duration?: number;
}

export interface IToastContextValue {
  toast: (message: string, options?: IToastOptions) => void;
}

export const ToastContext = createContext<IToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Severity>('info');
  const [duration, setDuration] = useState<number | null>(4000);

  const toast = useCallback(
    (message: string, { severity = 'info', duration = 4000 }: IToastOptions = {}) => {
      setMessage(message);
      setSeverity(severity);
      setDuration(duration === 0 ? null : duration);
      setOpen(true);
    },
    [],
  );

  const handleClose = useCallback(
    (_: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') return;
      setOpen(false);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={severity}
          variant="filled"
          onClose={() => setOpen(false)}
          sx={{ minWidth: 300 }}
        >
          {message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
}
