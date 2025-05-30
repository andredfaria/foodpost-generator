"use client";

import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { useRedirectIfAuthenticated } from '@/hooks/use-require-auth';

export default function ForgotPasswordPage() {
  // Redireciona se o usuário já estiver autenticado
  useRedirectIfAuthenticated('/');

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            FoodPost Generator
          </h1>
          <p className="text-muted-foreground mt-2">
            Recupere o acesso à sua conta
          </p>
        </div>
        
        <ForgotPasswordForm />
      </div>
    </div>
  );
} 