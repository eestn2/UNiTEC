import React, { createContext, useContext, useState, ReactNode } from 'react';
import NotImplementedToast from './NotImplementedToast';

interface Toast {
  id: number;
  message: string;
  duration?: number;
}

interface ToastManagerContextType {
  showToast: (message: string, duration?: number) => void;
}

const ToastManagerContext = createContext<ToastManagerContextType | undefined>(undefined);

let toastId = 0;

export const ToastManagerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, duration = 2500) => {
    const id = ++toastId;
    setToasts((prev) => [{ id, message, duration }, ...prev]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration + 350); // Wait for fade out
  };

  return (
    <ToastManagerContext.Provider value={{ showToast }}>
      {children}
      <div style={{
        position: 'fixed',
        top: 32,
        right: 32,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 12,
        pointerEvents: 'none',
      }}>
        {toasts.map((toast) => (
          <NotImplementedToast
            key={toast.id}
            show={true}
            duration={toast.duration}
            message={toast.message}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
          />
        ))}
      </div>
    </ToastManagerContext.Provider>
  );
};

export function useToastManager() {
  const ctx = useContext(ToastManagerContext);
  if (!ctx) throw new Error('useToastManager must be used within ToastManagerProvider');
  return ctx;
}
