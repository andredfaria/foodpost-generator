"use client";

import { useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { toast } from "sonner";
import { InstagramIcon, ShareIcon, DownloadIcon } from "lucide-react";
import { ClientProfile, Post, updatePostStatus } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type PostPreviewProps = {
  post: Post;
  clientProfile: ClientProfile;
  showControls?: boolean;
};

export function PostPreview({ post, clientProfile, showControls = true }: PostPreviewProps) {
  const [isSharing, setIsSharing] = useState(false);
  
  const handleShare = async () => {
    try {
      setIsSharing(true);
      
      // Simulate API call to update post status
      await updatePostStatus(post.id || "", "published");
      
      // In a real app, this would integrate with Instagram API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Post compartilhado no Instagram!");
    } catch (error) {
      console.error("Error sharing post:", error);
      toast.error("Falha ao compartilhar post");
    } finally {
      setIsSharing(false);
    }
  };
  
  const handleDownload = () => {
    // In a real implementation, this would download the image
    toast.success("Imagem do post baixada!");
  };
  
  // Format the date
  const formattedDate = post.created_at 
    ? format(new Date(post.created_at), "d 'de' MMMM 'de' yyyy")
    : "Hoje";
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={post.image_url}
          alt="Post gerado"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
        
        {/* Business Logo Overlay */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm p-2 rounded-full">
          {clientProfile.logo_url && (
            <div className="relative h-8 w-8 rounded-full overflow-hidden">
              <Image
                src={clientProfile.logo_url}
                alt={clientProfile.business_name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <span className="font-semibold text-sm">{clientProfile.business_name}</span>
        </div>
        
        {/* Post Description Overlay */}
        <div 
          className={cn(
            "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white"
          )}
          style={{ 
            background: `linear-gradient(to top, ${clientProfile.primary_color}DD, transparent)` 
          }}
        >
          <p className="font-medium line-clamp-2">{post.prompt}</p>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold truncate">{clientProfile.business_name}</h3>
            <p className="text-muted-foreground text-sm">{formattedDate}</p>
          </div>
          <div 
            className="h-6 w-6 rounded-full"
            style={{ backgroundColor: clientProfile.primary_color }}
          />
        </div>
      </CardContent>
      
      {showControls && (
        <CardFooter className="border-t p-4 gap-2 flex">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={handleDownload}
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Baixar
          </Button>
          <Button 
            size="sm" 
            className="flex-1"
            onClick={handleShare}
            disabled={isSharing}
          >
            {isSharing ? (
              <>Compartilhando...</>
            ) : (
              <>
                <InstagramIcon className="h-4 w-4 mr-2" />
                Compartilhar
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}