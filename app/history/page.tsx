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
        toast.error("Failed to load post history");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post History</h1>
          <p className="text-muted-foreground mt-2">
            View and manage your generated social media posts.
          </p>
        </div>

        {isLoading ? (
          <Card>
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">Loading...</p>
            </CardContent>
          </Card>
        ) : posts.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Posts Yet</CardTitle>
              <CardDescription>
                You havent generated any posts yet.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <PostHistory posts={posts} />
        )}
      </div>
    </div>
  );
}