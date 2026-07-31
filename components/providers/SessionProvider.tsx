"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

interface SessionContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  user: null,
  isLoading: true,
});

export function useSession() {
  return useContext(SessionContext);
}

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const queryClient = useQueryClient();

  // Track previous user ID so we only clear cache on actual user switch
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const supabase = createClient();

    // Load initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      prevUserIdRef.current = session?.user?.id ?? null;
      setIsLoading(false);
    });

    // Listen for auth changes (login, logout, token refresh)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, newSession) => {
      const newUserId = newSession?.user?.id ?? null;
      const prevUserId = prevUserIdRef.current;

      // Clear cache whenever user changes (different account or logout)
      const userChanged =
        prevUserId !== undefined && prevUserId !== newUserId;

      if (userChanged) {
        // Remove all cached queries — avoids showing stale data from old account
        queryClient.clear();
      }

      prevUserIdRef.current = newUserId;
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, [queryClient]);

  return (
    <SessionContext.Provider
      value={{ session, user: session?.user ?? null, isLoading }}
    >
      {children}
    </SessionContext.Provider>
  );
}
