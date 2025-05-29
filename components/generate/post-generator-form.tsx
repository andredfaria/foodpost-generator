"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import { ClientProfile, Post, savePost } from "@/lib/supabase";
import { promptSuggestions } from "@/lib/constants";
import { Button } from "@/components/ui/button";
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
import { Card, CardContent } from "@/components/ui/card";
import { PostPreview } from "./post-preview";

const formSchema = z.object({
  prompt: z.string().min(5, "Please enter at least 5 characters"),
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
      
      // In a real implementation, this would call an AI service to generate an image
      // For demo purposes, we'll simulate a delay and use a random stock image
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new post object
      const newPost: Post = {
        client_id: clientProfile.id || "bafce0db-0835-49ab-ac6b-e7feb37101a0",
        prompt: values.prompt,
        // For demo, we'll use a random food image from Pexels
        image_url: getRandomFoodImage(),
        status: "draft",
      };
      
      // Save post to database
      const savedPost = await savePost(newPost);
      
      if (savedPost) {
        setGeneratedPost(savedPost);
        toast.success("Post generated successfully");
        if (onPostGenerated) onPostGenerated(savedPost);
      } else {
        toast.error("Failed to generate post");
      }
    } catch (error) {
      console.error("Error generating post:", error);
      toast.error("An error occurred while generating your post");
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

  const useSuggestion = (suggestion: string) => {
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
                    <FormLabel>Describe your post</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe what you want in your post (e.g., weekend promotion, new menu item, special event)..."
                        className="min-h-32 resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be specific about what you want to promote or announce.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4">
                <p className="text-sm text-muted-foreground mb-2">Suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.slice(0, 5).map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      type="button"
                      onClick={() => useSuggestion(suggestion)}
                      className="text-xs"
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
            {isGenerating ? "Generating..." : "Generate Post"}
          </Button>
        </form>
      </Form>

      {generatedPost && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Generated Post</h2>
          <PostPreview post={generatedPost} clientProfile={clientProfile} />
        </div>
      )}
    </div>
  );
}