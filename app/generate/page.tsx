"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { getClientProfile, ClientProfile } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostGeneratorForm } from "@/components/generate/post-generator-form";
import { AlertTriangleIcon } from "lucide-react";

export default function GeneratePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [profileComplete, setProfileComplete] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        // In a real app, we would get the user ID from authentication
        const userId = "bafce0db-0835-49ab-ac6b-e7feb37101a0";
        const profile = await getClientProfile(userId);
        console.log('Profile loaded:', profile);
        
        if (profile) {
          console.log("clientProfile loaded:", clientProfile);
          setClientProfile(profile);
          console.log("clientProfile loaded:", clientProfile);

          
          // Check if profile is complete
          const isComplete = Boolean(
            profile.business_name &&
            profile.logo_url &&
            profile.primary_color &&
            profile.segment
          );
          
          setProfileComplete(isComplete);
        } else {
          setProfileComplete(false);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
        toast.error("Falha ao carregar dados do perfil");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProfile();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerar Post para Redes Sociais</h1>
          <p className="text-muted-foreground mt-2">
            Crie posts lindos e personalizados para seu negócio de alimentação.
          </p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">Carregando...</p>
            </CardContent>
          </Card>
        ) : !profileComplete ? (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <AlertTriangleIcon className="h-5 w-5 mr-2" />
                Configuração do Perfil Necessária
              </CardTitle>
              <CardDescription>
                Por favor, complete seu perfil de negócio antes de gerar posts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Seu perfil de negócio está incompleto. Precisamos de informações sobre seu 
                negócio para criar posts personalizados que correspondam à sua identidade.
              </p>
              <Button asChild>
                <Link href="/profile">Completar Seu Perfil</Link>
              </Button>
            </CardContent>
          </Card>
        ) : clientProfile ? (
          <PostGeneratorForm clientProfile={clientProfile} />
        ) : null}
      </div>
    </div>
  );
}