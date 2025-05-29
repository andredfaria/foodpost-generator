"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ClientProfile, Post } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { PostPreview } from "@/components/generate/post-preview";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type PostGridProps = {
  posts: Post[];
  clientProfile: ClientProfile;
};

export function PostGrid({ posts, clientProfile }: PostGridProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterPosts(query, statusFilter);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    filterPosts(searchQuery, value);
  };

  const filterPosts = (query: string, status: string) => {
    let filtered = posts;
    
    // Filter by search query
    if (query) {
      filtered = filtered.filter(post => 
        post.prompt.toLowerCase().includes(query)
      );
    }
    
    // Filter by status
    if (status !== "all") {
      filtered = filtered.filter(post => status === "true" ? post.status : !post.status);
    }
    
    setFilteredPosts(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <Select
          defaultValue="all"
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Posts</SelectItem>
            <SelectItem value="true">Published</SelectItem>
            <SelectItem value="false">Drafts</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found matching your filters.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("all");
              setFilteredPosts(posts);
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostPreview
              key={post.id}
              post={post}
              clientProfile={clientProfile}
            />
          ))}
        </div>
      )}
    </div>
  );
}