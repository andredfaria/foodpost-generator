"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { promptSuggestions } from "@/lib/constants";
import { ClientProfile, Post, savePost } from "@/lib/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { PostPreview } from "./post-preview";

const formSchema = z.object({
  prompt: z.string().min(5, "Por favor, digite pelo menos 5 caracteres"),
});

type PostGeneratorFormProps = {
  clientProfile: ClientProfile;
  onPostGenerated?: (post: Post) => void;
};

export function PostGeneratorForm({ clientProfile, onPostGenerated }: PostGeneratorFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<Post | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsGenerating(true);
      
      // Chamada para a API
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: values.prompt,
          clientProfile: clientProfile
        }), 
      });

      const data = await response.json();
      
      if (data.success && data.data?.imageUrl) {
        const newPost: Post = {
          client_id: clientProfile.id || "bafce0db-0835-49ab-ac6b-e7feb37101a0",
          prompt: values.prompt,
          image_url: data.data.imageUrl,
          status: false,
        };
        
        // Save post to database
        const savedPost = await savePost(newPost);
        
        if (savedPost) {
          setGeneratedPost(savedPost);
          toast.success("Post gerado com sucesso");
          if (onPostGenerated) onPostGenerated(savedPost);
        } else {
          toast.error("Falha ao salvar post");
        }
      } else {
        toast.error(data.error || "Falha ao gerar post");
      }
    } catch (error) {
      console.error("Error generating post:", error);
      toast.error("Ocorreu um erro ao gerar seu post");
    } finally {
      setIsGenerating(false);
    }
  };

  const getRandomFoodImage = () => {
    const foodImages = [
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
      "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
      "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg",
      "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
      "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
    ];
    return foodImages[Math.floor(Math.random() * foodImages.length)];
  };

  const applySuggestion = (suggestion: string) => {
    form.setValue("prompt", suggestion);
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descreva seu post</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva o que você quer no seu post (ex: promoção de fim de semana, novo item no cardápio, evento especial)..."
                        className="min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Seja específico sobre o que você quer promover ou anunciar.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Sugestões:</p>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.slice(0, 5).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      type="button"
                      className="text-xs"
                      onClick={() => applySuggestion(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto"
          >
            {isGenerating ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <SparklesIcon className="mr-2 h-4 w-4" />
            )}
            {isGenerating ? "Gerando..." : "Gerar Post"}
          </Button>
        </form>
      </Form>

      {generatedPost && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Post Gerado</h2>
          <PostPreview post={generatedPost} clientProfile={clientProfile} />
        </div>
      )}
    </div>
  );
}