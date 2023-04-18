import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { v4 as uuidV4 } from 'uuid';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'sucess' | 'error' | 'info';
  description?: string;
  title: string;
}

interface ToastContextData {
  // eslint-disable-next-line no-unused-vars
  addToast(message: Omit<ToastMessage, 'id'>): void;
  // eslint-disable-next-line no-unused-vars
  removeToast(id: string): void;
}

interface ToastProviderProps extends React.PropsWithChildren {
  children: React.ReactNode;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
}: ToastProviderProps) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuidV4();

      const newToast = {
        id,
        type,
        title,
        description,
      };

      setMessages(oldMessages => [...oldMessages, newToast]);
    },
    [],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  const value = useMemo(
    () => ({ addToast, removeToast }),
    [addToast, removeToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export function useToast(): ToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('toastContext must be on initialized');
  }

  return context;
}
