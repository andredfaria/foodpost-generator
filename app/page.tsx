import Link from "next/link";
import { ArrowRightIcon, ImageIcon, InstagramIcon, PaletteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Crie Posts Engajantes para Suas
            <span className="text-primary block mt-2">Redes Sociais</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Gere posts lindos e profissionalmente projetados para seu restaurante, 
            padaria, café ou qualquer negócio de alimentação em segundos. Aumente sua 
            presença nas redes sociais e atraia mais clientes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/generate">
                Começar a Criar Posts
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/profile">
                Configurar Perfil
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Recursos Desenvolvidos para Negócios de Alimentação
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Tudo que você precisa para criar conteúdo irresistível para redes sociais
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="bg-card rounded-lg p-6 transition-all duration-200 hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <PaletteIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Identidade Visual Personalizada</h3>
            <p className="mt-2 text-muted-foreground">
              Mantenha seus posts alinhados com sua logo, cores e identidade do negócio.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 transition-all duration-200 hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <ImageIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Posts Focados em Gastronomia</h3>
            <p className="mt-2 text-muted-foreground">
              Gere posts que destacam sua comida da forma mais apetitosa possível.
            </p>
          </div>

          <div className="bg-card rounded-lg p-6 transition-all duration-200 hover:shadow-md">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <InstagramIcon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Integração com Instagram</h3>
            <p className="mt-2 text-muted-foreground">
              Compartilhe seus posts diretamente no Instagram com apenas um clique.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 bg-muted rounded-lg my-12">
        <div className="mx-auto max-w-4xl text-center px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Crie conteúdo profissional para redes sociais em três passos simples
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 max-w-5xl mx-auto px-4">
          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-semibold">Configure Seu Perfil</h3>
            <p className="mt-2 text-muted-foreground">
              Adicione os detalhes do seu negócio, logo e cores da marca.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-semibold">Descreva Seu Post</h3>
            <p className="mt-2 text-muted-foreground">
              Diga-nos o que você quer promover ou anunciar.
            </p>
          </div>

          <div className="text-center">
            <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-semibold">Gere e Compartilhe</h3>
            <p className="mt-2 text-muted-foreground">
              Obtenha seu post lindo e compartilhe com seu público.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Pronto para Impulsionar Sua Presença nas Redes Sociais?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comece a criar posts profissionais que atraem mais clientes para seu negócio de alimentação.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/generate">
                Criar Seu Primeiro Post
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}