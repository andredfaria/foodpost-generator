"use client";

import { ReactNode } from 'react';
import { useRequireAuth } from '@/hooks/use-require-auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { user, loading } = useRequireAuth();

  if (loading) {
    return (
      fallback || (
        <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Verificando autenticação...</p>
          </div>
        </div>
      )
    );
  }

  if (!user) {
    // O hook useRequireAuth já redireciona para login se não houver usuário
    return null;
  }

  return <>{children}</>;
} 