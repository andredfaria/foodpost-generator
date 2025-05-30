"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getPosts, Post, getClientProfile } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostHistory } from "@/components/history/post-history";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/lib/providers/auth-provider";

function HistoryContent() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      if (!user) return;
      
      try {
        // Primeiro busca o perfil do cliente
        const clientProfile = await getClientProfile(user.id);
        
        if (!clientProfile?.id) {
          toast.error("Perfil do cliente não encontrado");
          setIsLoading(false);
          return;
        }

        // Depois busca os posts usando o ID do perfil do cliente
        const clientPosts = await getPosts(clientProfile.id);
        
        if (clientPosts) {
          setPosts(clientPosts);
        }
      } catch (error) {
        console.error("Error loading posts:", error);
        toast.error("Falha ao carregar histórico de posts");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, [user]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-10">
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground">Carregando...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <PostHistory posts={posts} />;
}

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <HistoryContent />
    </ProtectedRoute>
  );
}