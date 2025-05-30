"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getPosts, Post } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PostHistory } from "@/components/history/post-history";

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function loadPosts() {
      try {
        const userId = "64dac051-d87f-4d4d-83e1-b5b9b40fa7ef";
        const clientPosts = await getPosts(userId);
        
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
  }, []);

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