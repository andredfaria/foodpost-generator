"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getClientProfile, ClientProfile } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { ClientProfileForm } from "@/components/profile/client-profile-form";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/lib/providers/auth-provider";

function ProfileContent() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;
      
      try {
        const profile = await getClientProfile(user.id);
        
        if (profile) {
          setClientProfile(profile);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Falha ao carregar dados do perfil");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProfile();
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Perfil do Negócio</h1>
          <p className="text-muted-foreground mt-2">
            Configure seu perfil de negócio para criar posts personalizados para redes sociais.
          </p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">Carregando...</p>
            </CardContent>
          </Card>
        ) : (
          <ClientProfileForm initialData={clientProfile || undefined} />
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}