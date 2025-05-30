"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/providers/auth-provider';

/**
 * Hook para proteger rotas que requerem autenticação
 * Redireciona para /auth/login se o usuário não estiver autenticado
 */
export function useRequireAuth() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  return { user, loading };
}

/**
 * Hook para redirecionamento de usuários autenticados
 * Usado em páginas como login/registro para redirecionar usuários já logados
 */
export function useRedirectIfAuthenticated(redirectTo: string = '/') {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push(redirectTo);
    }
  }, [user, loading, router, redirectTo]);

  return { user, loading };
} 