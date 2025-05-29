"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { ClientProfile, saveClientProfile, uploadLogo } from "@/lib/supabase";
import { businessSegments } from "@/lib/constants";
import { ColorPicker } from "@/components/ui/color-picker";
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  business_name: z.string().min(2, "Business name must be at least 2 characters"),
  instagram_link: z.string().url("Please enter a valid Instagram URL"),
  segment: z.string().min(1, "Please select a business segment"),
  primary_color: z.string().min(1, "Please select a primary color"),
  secondary_color: z.string().min(1, "Please select a secondary color"),
});

type ClientProfileFormProps = {
  initialData?: ClientProfile;
  onSave?: (profile: ClientProfile) => void;
};

export function ClientProfileForm({ initialData, onSave }: ClientProfileFormProps) {
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>(initialData?.logo_url || "");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: initialData?.business_name || "",
      instagram_link: initialData?.instagram_link || "https://instagram.com/",
      segment: initialData?.segment || "",
      primary_color: initialData?.primary_color || "#FF5722",
      secondary_color: initialData?.secondary_color || "#FFC107",
    },
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      
      const userId = initialData?.fk_id_user || "bafce0db-0835-49ab-ac6b-e7feb37101a0";
      
      // Handle logo upload if there's a new file
      let logoUrl = initialData?.logo_url || "";
      if (logoFile) {
        const uploadedUrl = await uploadLogo(userId, logoFile);
        if (uploadedUrl) {
          logoUrl = uploadedUrl;
        }
      }
      
      // Create profile data
      const profileData: ClientProfile = {
        ...initialData,
        fk_id_user: userId,
        logo_url: logoUrl,
        business_name: values.business_name,
        instagram_link: values.instagram_link,
        segment: values.segment,
        primary_color: values.primary_color,
        secondary_color: values.secondary_color,
      };
      
      // Save profile to database
      const savedProfile = await saveClientProfile(profileData);
      
      if (savedProfile) {
        toast.success("Profile updated successfully");
        if (onSave) onSave(savedProfile);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("An error occurred while saving your profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Logo Upload */}
              <div className="space-y-2">
                <FormLabel>Business Logo</FormLabel>
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
                  <div 
                    className="w-32 h-32 rounded-md border border-input flex items-center justify-center overflow-hidden bg-muted"
                    style={{ 
                      backgroundImage: logoPreview ? `url(${logoPreview})` : 'none',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    {!logoPreview && (
                      <span className="text-muted-foreground text-sm text-center px-2">
                        No logo uploaded
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="max-w-xs"
                    />
                    <FormDescription>
                      Upload a square logo image for best results.
                    </FormDescription>
                  </div>
                </div>
              </div>

              {/* Business Name */}
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Delicious Bites" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Instagram Link */}
              <FormField
                control={form.control}
                name="instagram_link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://instagram.com/yourbusiness" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Business Segment */}
              <FormField
                control={form.control}
                name="segment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Segment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a business segment" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {businessSegments.map((segment) => (
                          <SelectItem key={segment.value} value={segment.value}>
                            {segment.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Brand Colors */}
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="primary_color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Color</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <ColorPicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <Input
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Main brand color for headers and accents
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secondary_color"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secondary Color</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2">
                          <ColorPicker
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <Input
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Complementary color for backgrounds and highlights
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Save Profile
        </Button>
      </form>
    </Form>
  );
}