import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import StatusBadge from "./StatusBadge";

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
  user_id: string;
  status: "open" | "in_progress" | "completed";
}

interface PostCardProps {
  post: Post;
  canManage: boolean;
  onDelete: (id: string) => void;
  index: number;
}

const PostCard = ({ post, canManage, onDelete, index }: PostCardProps) => {
  const navigate = useNavigate();

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in border-border/40 cursor-pointer rounded-2xl overflow-hidden"
      style={{ animationDelay: `${index * 0.08}s` }}
      onClick={() => navigate(`/posts/${post.id}`)}
    >
      {post.image_url && (
        <div className="overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge status={post.status} />
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </CardTitle>
          </div>
          {canManage && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8"
                onClick={(e) => { e.stopPropagation(); navigate(`/edit-post/${post.id}`); }}
              >
                <Pencil className="w-3.5 h-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={(e) => { e.stopPropagation(); onDelete(post.id); }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          )}
        </div>
        <CardDescription className="flex items-center gap-1.5 text-xs">
          <Calendar className="w-3 h-3" />
          {format(new Date(post.created_at), "PPP")}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground line-clamp-3">{post.content}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
