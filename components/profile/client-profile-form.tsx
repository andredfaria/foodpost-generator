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
import { useAuth } from "@/lib/providers/auth-provider";

const formSchema = z.object({
  business_name: z.string().min(2, "O nome do negócio deve ter pelo menos 2 caracteres"),
  instagram_link: z.string().url("Por favor, insira uma URL válida do Instagram"),
  segment: z.string().min(1, "Por favor, selecione um segmento de negócio"),
  primary_color: z.string().min(1, "Por favor, selecione uma cor primária"),
  secondary_color: z.string().min(1, "Por favor, selecione uma cor secundária"),
});

type ClientProfileFormProps = {
  initialData?: ClientProfile;
  onSave?: (profile: ClientProfile) => void;
};

export function ClientProfileForm({ initialData, onSave }: ClientProfileFormProps) {
  const { user } = useAuth();
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
    if (!user) {
      toast.error("Usuário não autenticado");
      return;
    }

    try {
      setIsLoading(true);
      
      const userId = user.id;
      
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
        toast.success("Perfil atualizado com sucesso");
        if (onSave) onSave(savedProfile);
      } else {
        toast.error("Falha ao atualizar perfil");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Ocorreu um erro ao salvar seu perfil");
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
                <FormLabel>Logo do Negócio</FormLabel>
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
                        Nenhuma logo enviada
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
                      Envie uma imagem quadrada para melhores resultados.
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
                    <FormLabel>Nome do Negócio</FormLabel>
                    <FormControl>
                      <Input placeholder="Deliciosos Sabores" {...field} />
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
                    <FormLabel>Link do Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="https://instagram.com/seunegocio" {...field} />
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
                    <FormLabel>Segmento do Negócio</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um segmento de negócio" />
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
                      <FormLabel>Cor Primária</FormLabel>
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
                        Cor principal da marca para cabeçalhos e destaques
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
                      <FormLabel>Cor Secundária</FormLabel>
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
                        Cor secundária para elementos complementares
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
          {isLoading ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {isLoading ? "Salvando..." : "Salvar Perfil"}
        </Button>
      </form>
    </Form>
  );
}