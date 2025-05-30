import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configuração da OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  return NextResponse.json({ message: "GET recebido" });
}

export async function POST(request: Request) {
  try {
    console.log("POST recebido");
    const body = await request.json();
    const { prompt, clientProfile } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { success: false, error: "Prompt é obrigatório" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: "Chave da API OpenAI não configurada" },
        { status: 500 }
      );
    }

    // Melhorar o prompt para geração de imagens de comida
    const enhancedPrompt = `
      Crie uma imagem profissional e apetitosa de comida para redes sociais com as seguintes características:
      ${prompt}
      
      Estilo: Fotografia profissional de comida, boa iluminação, cores vibrantes, apresentação elegante, fundo limpo e moderno.
      ${clientProfile ? `Perfil do cliente: ${clientProfile}` : ''}
    `;

    // Gerar imagem usando DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      style: "natural"
    });

    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
      throw new Error("Não foi possível gerar a imagem");
    }

    const successResponse = {
      success: true,
      data: {
        imageUrl: imageUrl,
        prompt: prompt,
        enhancedPrompt: enhancedPrompt,
        generatedAt: new Date().toISOString()
      }
    };

    return NextResponse.json(successResponse);

  } catch (error: any) {
    console.error("Erro ao gerar imagem:", error);
    
    // Tratamento de erros específicos da OpenAI
    if (error.status === 400) {
      return NextResponse.json(
        { success: false, error: "Prompt inválido ou muito longo" },
        { status: 400 }
      );
    } else if (error.status === 401) {
      return NextResponse.json(
        { success: false, error: "Chave da API inválida" },
        { status: 401 }
      );
    } else if (error.status === 429) {
      return NextResponse.json(
        { success: false, error: "Limite de requisições excedido. Tente novamente em alguns minutos." },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Erro interno do servidor ao gerar imagem",
        details: error.message 
      },
      { status: 500 }
    );
  }
} 