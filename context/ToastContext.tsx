
import React, { createContext, useState, ReactNode, useCallback } from 'react';

interface Toast {
  id: number;
  message: string;
}

interface ToastContextType {
  addToast: (message: string) => void;
  removeToast: (id: number) => void;
  toasts: Toast[];
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  }, []);

  const removeToast = (id: number) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};
