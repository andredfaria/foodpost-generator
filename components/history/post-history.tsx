import { Post } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

interface PostHistoryProps {
  posts: Post[];
}

export function PostHistory({ posts }: PostHistoryProps) {
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "Rascunho";
      case "published":
        return "Publicado";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Post #{post.id?.slice(0, 8)}</span>
              <span className="text-sm font-normal px-2 py-1 rounded-full bg-muted">
                {getStatusLabel(post.status)}
              </span>
            </CardTitle>
            <CardDescription>
              {post.created_at && format(new Date(post.created_at), "PPP")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Descrição</h4>
                <p className="text-sm text-muted-foreground">{post.prompt}</p>
              </div>
              {post.image_url && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Imagem Gerada</h4>
                  <img
                    src={post.image_url}
                    alt="Post gerado"
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 