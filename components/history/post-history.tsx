import { Post } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PostHistoryProps {
  posts: Post[];
}

export function PostHistory({ posts }: PostHistoryProps) {
  const getStatusLabel = (status: boolean) => {
    switch (status) {
      case true:
        return "Publicado";
      case false:
        return "Rascunho";
      default:
        return status;
    }
  };

  const getStatusColor = (status: boolean) => {
    switch (status) {
      case true:
        return "bg-green-100 text-green-800";
      case false:
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Históricos</h2>
        <p className="text-gray-600 mt-1">Visualize e gerencie seus posts anteriores</p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhum post encontrado</p>
          <p className="text-gray-400 text-sm mt-2">Crie seu primeiro post para vê-lo aqui</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="truncate">Post #{post.id?.slice(0, 8)}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(post.status)}`}>
                    {getStatusLabel(post.status)}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs">
                  {post.created_at && format(new Date(post.created_at), "dd/MM/yyyy")}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-4">
                  {/* Área da imagem ou placeholder */}
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {post.image_url ? (
                      <img
                        src={post.image_url}
                        alt="Post gerado"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg 
                          className="w-12 h-12" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5} 
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Descrição do prompt */}
                  <div>
                    <p className="text-sm text-gray-600 line-clamp-3" title={post.prompt}>
                      {post.prompt}
                    </p>
                  </div>
                  
                  {/* Botão de ação */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => {
                      // Aqui você pode adicionar a lógica para repostar ou editar
                      console.log('Postar:', post.id);
                    }}
                  >
                    Postar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 