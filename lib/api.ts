import { ClientProfile } from "./supabase";

interface GeneratePostResponse {
  success: boolean;
  data?: {
    imageUrl: string;
  };
  error?: string;
}

export async function generatePost(
  prompt: string,
  clientProfile: ClientProfile
): Promise<GeneratePostResponse> {
  try {
    return {
      success: true,
      data: {
        imageUrl: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
      },
    };
  } catch (error) {
    console.error("Error in generatePost:", error);
    return {
      success: false,
      error: "Failed to generate post",
    };
  }
} 