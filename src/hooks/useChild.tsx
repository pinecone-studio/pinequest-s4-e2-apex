import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { api, Child } from '../lib/api';

type ChildContextValue = {
  child: Child | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  setChild: (c: Child) => void;
};

const ChildContext = createContext<ChildContextValue | undefined>(undefined);

export function ChildProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const name =
        user.firstName ||
        user.username ||
        user.primaryEmailAddress?.emailAddress?.split('@')[0] ||
        'Найз';
      const data = await api.me({
        clerkId: user.id,
        name,
        email: user.primaryEmailAddress?.emailAddress,
      });
      setChild(data);
    } catch (e: any) {
      setError(e?.message ?? 'Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isLoaded && user) load();
  }, [isLoaded, user, load]);

  return (
    <ChildContext.Provider value={{ child, loading, error, refresh: load, setChild }}>
      {children}
    </ChildContext.Provider>
  );
}

export function useChild() {
  const ctx = useContext(ChildContext);
  if (!ctx) throw new Error('useChild must be used within a ChildProvider');
  return ctx;
}
