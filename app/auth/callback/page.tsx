"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Auth callback error:', error);
          toast.error('Erro na autenticação. Tente novamente.');
          router.push('/auth/login');
          return;
        }

        // Se há uma sessão, o usuário foi autenticado com sucesso
        if (data.session) {
          toast.success('Autenticação realizada com sucesso!');
          router.push('/');
        } else {
          // Se não há sessão, redireciona para login
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Unexpected error in auth callback:', error);
        toast.error('Erro inesperado. Tente novamente.');
        router.push('/auth/login');
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Processando autenticação...</h2>
        <p className="text-muted-foreground">
          Aguarde enquanto confirmamos sua autenticação.
        </p>
      </div>
    </div>
  );
} 