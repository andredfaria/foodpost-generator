"use client";

import { useState } from 'react';
import { AuthForm } from '@/components/auth/auth-form';
import { useRedirectIfAuthenticated } from '@/hooks/use-require-auth';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  // Redireciona se o usuário já estiver autenticado
  useRedirectIfAuthenticated('/');

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            FoodPost Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Crie posts incríveis para suas redes sociais
          </p>
        </div>
        
        <AuthForm mode={mode} onToggleMode={toggleMode} />
      </div>
    </div>
  );
} 